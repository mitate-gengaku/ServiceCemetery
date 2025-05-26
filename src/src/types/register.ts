import { type z } from "zod";

import { type registerSchema } from "@/schema/register";

export type Register = z.infer<typeof registerSchema>;
