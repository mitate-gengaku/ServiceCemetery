import { config } from "dotenv";
import { type Config } from "drizzle-kit";

config({ path: ".env.local" });

// import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  tablesFilter: ["app_*"],
} satisfies Config;
