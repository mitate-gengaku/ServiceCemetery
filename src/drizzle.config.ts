import { config } from "dotenv";
import { type Config } from "drizzle-kit";

import { env } from "@/env";

config({ path: ".env.local" });

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL ?? "",
  },
  tablesFilter: ["app_*"],
} satisfies Config;
