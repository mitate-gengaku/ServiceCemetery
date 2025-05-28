import { Octokit } from "@octokit/rest";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { redis } from "@/server/cache";
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
    const cacheKey = `repositories:${ctx.session.user.id}`;

    try {
      const cachedData = await redis.get<Repository[]>(cacheKey);

      if (cachedData) {
        return cachedData ?? [];
      }

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

      await redis.set(cacheKey, JSON.stringify(repositories), { ex: 10800 });

      return repositories;
    } catch (e) {
      if (e instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
          cause: e.cause
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "エラーが発生しました",
      });
    }
  }),
});
