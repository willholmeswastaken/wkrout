// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./migrations",
  schema: "./lib/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
