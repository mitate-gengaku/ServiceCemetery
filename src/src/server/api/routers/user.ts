import { Octokit } from "@octokit/rest";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { accounts } from "@/server/db/schema";
import { type Repository } from "@/types/repository";

export const userRouter = createTRPCRouter({
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
      per_page: 72,
      page: 1,
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
