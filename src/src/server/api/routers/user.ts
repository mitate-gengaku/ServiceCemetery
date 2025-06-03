import { Octokit } from "@octokit/rest";
import { TRPCError } from "@trpc/server";
import { count, eq, like } from "drizzle-orm";
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
          cause: e.cause,
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "エラーが発生しました",
      });
    }
  }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string().nullable(),
        page: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query, page } = input;
      const currentPage = parseInt(page || "1");
      const limit = 6;
      const offset = (currentPage - 1) * limit;
      const conditions = like(users.name, `%${query}%`);

      try {
        const searchResults = await ctx.db.query.users.findMany({
          where: conditions,
          limit: limit,
          offset: offset,
          columns: {
            id: true,
            name: true,
            image: true,
          },
        });

        const totalCountResult = await ctx.db.select({ count: count() }).from(users).where(conditions);
        const totalCount = totalCountResult[0]?.count || 0;
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = currentPage < totalPages;
        const hasPrevPage = currentPage > 1;

        return {
          data: searchResults,
          pagination: {
            currentPage,
            totalPages,
            totalCount,
            limit,
            hasNextPage,
            hasPrevPage,
            nextPage: hasNextPage ? currentPage + 1 : null,
            prevPage: hasPrevPage ? currentPage - 1 : null,
          },
          searchInfo: {
            query,
            resultsCount: searchResults.length,
          },
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            message: "検索中にエラーが発生しました",
            code: "INTERNAL_SERVER_ERROR",
            cause: error.cause,
          });
        }
        throw new TRPCError({
          message: "検索中にエラーが発生しました",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
