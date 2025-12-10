import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/database/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
