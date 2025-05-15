import { Octokit } from "@octokit/rest";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { accounts, users } from "@/server/db/schema";
import { type Repository } from "@/types/repository";

export const userRouter = createTRPCRouter({
  user: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.name, input.name),
        with: {
          projects: {
            with: {
              projectsTags: {
                with: {
                  tag: true,
                },
              },
            },
          },
        },
      });

      return user;
    }),
  repositories: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.accounts.findFirst({
      where: eq(accounts.userId, ctx.session.user.id),
    });
    const token = result?.access_token;

    const octokit = new Octokit({
      auth: token,
    });

    const { data } = await octokit.rest.repos.listForUser({
      username: ctx.session.user.name ?? "",
      per_page: 100,
      sort: "updated",
    });

    const repositories: Repository[] = data.map(({ name, description, html_url }) => ({
      name,
      description,
      url: html_url,
    }));

    return repositories;
  }),
});
