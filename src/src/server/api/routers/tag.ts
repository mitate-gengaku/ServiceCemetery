import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Tag } from "@/types/tag";

export const tagRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const tags: Tag[] = await ctx.db.query.tags.findMany({
      orderBy: (tags, { desc }) => [desc(tags.createdAt)],
    });

    return tags ?? null;
  }),
});
