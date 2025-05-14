import { Octokit } from "@octokit/rest";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { accounts, projects } from "@/server/db/schema";
import { type Project } from "@/types/project";

export const projectRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  all: protectedProcedure.query(async ({ ctx }) => {
    const projectsResult: Project[] = await ctx.db.query.projects.findMany({
      limit: 72,
      where: eq(projects.createdById, ctx.session.user.id),
    });

    return projectsResult;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        description: z.string().nullable(),
        url: z.string().nonempty(),
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

      await ctx.db.insert(projects).values({
        name: input.name,
        description: input.description,
        url: input.url,
        reflection: input.reflection,
        languages: Object.keys(languages.data).length ? languages.data : null,
        createdById: ctx.session.user.id,
      });
    }),
});
