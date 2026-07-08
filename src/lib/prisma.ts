import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaClient: PrismaClient;

if (!globalForPrisma.prisma) {
  try {
    const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';
    let dbPath: string;

    if (databaseUrl) {
      dbPath = databaseUrl.startsWith('file:') ? databaseUrl.slice(5) : databaseUrl;
    } else {
      dbPath = path.join(process.cwd(), 'dev.db');
    }

    console.log('[Prisma] Using database at:', dbPath);

    const adapter = new PrismaBetterSqlite3(dbPath);
    prismaClient = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  } catch (error) {
    console.error('[Prisma] Failed to initialize adapter:', error);
    // Fallback to default client
    prismaClient = new PrismaClient({
      log: ['error'],
    });
  }
  globalForPrisma.prisma = prismaClient;
} else {
  prismaClient = globalForPrisma.prisma;
}

export const prisma = prismaClient;