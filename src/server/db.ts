import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const createPrismaClient = () => {
  // Check if we're using placeholder database URL
  if (env.DATABASE_URL.includes("placeholder") || env.DATABASE_URL.includes("localhost")) {
    console.warn("⚠️  Using placeholder database URL. Database features will be limited.");
    // Return a mock client that won't try to connect
    return new PrismaClient({
      log: ["error"],
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }

  return new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db =
  globalForPrisma.prisma ??
  createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;