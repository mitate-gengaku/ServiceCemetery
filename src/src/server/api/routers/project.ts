import { Octokit } from "@octokit/rest";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { accounts, projects, projectsTags } from "@/server/db/schema";

export const projectRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  all: protectedProcedure.query(async ({ ctx }) => {
    const projectsResult = await ctx.db.query.projects.findMany({
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

    return projectsResult;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        description: z.string().nullable(),
        url: z.string().nonempty(),
        tags: z.string().array(),
        reflection: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.query.accounts.findFirst({
        where: eq(accounts.userId, ctx.session.user.id),
      });
      const token = result?.access_token;

      const octokit = new Octokit({
        auth: token,
      });

      const languages = await octokit.request("GET /repos/{owner}/{repo}/languages", {
        owner: ctx.session.user.name ?? "",
        repo: input.name,
      });

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

        if (input.tags.length) {
          input.tags.forEach(async (tagId) => {
            await tx.insert(projectsTags).values({
              tagId: tagId,
              projectId: id,
            });
          });
        }
      });
    }),
});
