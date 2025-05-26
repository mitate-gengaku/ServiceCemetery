import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "リポジトリを選択してください",
    invalid_type_error: "文字列を入力してください",
  }),
  description: z.string().nullable(),
  url: z.string({
    required_error: "リポジトリを選択してください",
    invalid_type_error: "文字列を入力してください",
  }),
  reflection: z.string().max(256, "256文字まで入力できます").nullable().optional(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        value: z.string(),
        label: z.string(),
      }),
    )
    .nullable()
    .optional(),
});
