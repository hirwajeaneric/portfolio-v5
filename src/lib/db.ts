import { PrismaClient } from "@prisma/client";

// Initialize PrismaClient with proper singleton pattern for server actions
// This prevents multiple client instances and ensures it only runs on the server
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 