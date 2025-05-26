import { GoogleGenerativeAI } from "@google/generative-ai";
import { Octokit } from "@octokit/rest";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { analyzeRatelimit, createRatelimit } from "@/server/cache";
import { accounts, projects, projectsTags } from "@/server/db/schema";
import { type Project } from "@/types/project";
import { requestToUithub } from "@/utils/uithub";

export async function generateStreamingContent(prompt: string) {
  const genAI = new GoogleGenerativeAI("AIzaSyBysuOyIqJkRiMkFrl_KR9vrvqLtnShp6w");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // We need to return a readable stream that the client can consume
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
          controller.enqueue(chunk.text());
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return stream;
}

const prompt = (text: string) => `# System Architecture Diagram Generation Prompt

## Instructions
Analyze the following system, code, or application and generate an architecture diagram using Mermaid.js:

~~~
${text}
~~~

## Output Requirements
- Display major structural layers such as database layer, API layer, frontend layer, etc.
- Write all labels and descriptions in Japanese
- Show communication protocols and port numbers on arrows (e.g., '--"HTTP:80"-->')
- Do not include Docker-related details

## Mermaid Syntax Constraints
- Arrow labels must use the format '--"label name"-->' and always be enclosed in double quotes
- Use square brackets '[]' instead of parentheses '()'
- Define subgraphs using the format 'subgraph "key name"'
- Do not define the same arrow multiple times
- Do not use the '@' symbol

## Diagram Direction
- Only use LR (left-to-right) direction

## Example (Reference Format)
~~~mermaid
flowchart LR
    subgraph "データベース層"
        DB1["PostgreSQL"]
        DB2["Redis"]
    end
    
    subgraph "バックエンド層"
        API["REST API"]
        Auth["認証サービス"]
    end
    
    subgraph "フロントエンド層"
        Web["Webアプリ"]
        Mobile["モバイルアプリ"]
    end
    
    Web --"HTTP:443"--> API
    Mobile --"HTTP:443"--> API
    API --"TCP:5432"--> DB1
    API --"TCP:6379"--> DB2
    Auth --"TCP:5432"--> DB1
~~~
`;

export const projectRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const projectsResult: Project[] = await ctx.db.query.projects.findMany({
      limit: 72,
      where: eq(projects.createdById, ctx.session.user.id),
      with: {
        projectsTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    return projectsResult ?? null;
  }),

  analyze: protectedProcedure
    .input(
      z.object({
        projectName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await analyzeRatelimit.limit(`analyze:${ctx.session.user.id}`);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "1日5回まで解析を行うことができます" });

      const userName = ctx.session.user.name;

      if (!userName) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "プロジェクトの解析中にエラーが発生しました",
        });
      }

      try {
        let result = "";
        const { data } = await requestToUithub(userName, input.projectName);
        const stream = await generateStreamingContent(prompt(data));
        const reader = stream.getReader();

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          result += value;
        }
        return result;
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "プロジェクトの解析中にエラーが発生しました",
          cause: e,
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        description: z.string().nullable(),
        url: z.string().nonempty(),
        tags: z.string().array().nullable(),
        reflection: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await createRatelimit.limit(`create:${ctx.session.user.id}`);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const result = await ctx.db.query.accounts.findFirst({
        where: eq(accounts.userId, ctx.session.user.id),
        with: {
          user: {
            with: {
              projects: true,
            },
          },
        },
      });
      const token = result?.access_token;

      const octokit = new Octokit({
        auth: token,
      });

      const languages = await octokit.request("GET /repos/{owner}/{repo}/languages", {
        owner: ctx.session.user.name ?? "",
        repo: input.name,
      });

      if (result && result.user.projects.length >= 72) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "プロジェクトを追加できるのは72個までです",
        });
      }

      try {
        await ctx.db.transaction(async (tx) => {
          const [{ id }] = await tx
            .insert(projects)
            .values({
              name: input.name,
              description: input.description,
              url: input.url,
              reflection: input.reflection,
              languages: Object.keys(languages.data).length ? languages.data : null,
              createdById: ctx.session.user.id,
            })
            .returning();

          if (input.tags && input.tags.length) {
            input.tags.forEach(async (tagId) => {
              await tx.insert(projectsTags).values({
                tagId: tagId,
                projectId: id,
              });
            });
          }
        });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "プロジェクトの作成中にエラーが発生しました",
          cause: e,
        });
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        architecture: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(projects)
          .set({
            architecture: input.architecture,
          })
          .where(and(eq(projects.id, input.id), eq(projects.createdById, ctx.session.user.id)));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "プロジェクトの削除中にエラーが発生しました",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const id = input.id;

        await ctx.db.transaction(async (tx) => {
          await tx.delete(projects).where(and(eq(projects.id, id), eq(projects.createdById, ctx.session.user.id)));

          await tx.delete(projectsTags).where(eq(projectsTags.projectId, id));
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "プロジェクトの削除中にエラーが発生しました",
          cause: error,
        });
      }
    }),
});
