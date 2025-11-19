import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // datasource can read from process.env reliably
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
});