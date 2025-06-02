import { z } from "zod";

export const searchSchema = z.object({
  search: z
    .string({
      required_error: "入力してください",
    })
    .min(1, "入力してください"),
});
