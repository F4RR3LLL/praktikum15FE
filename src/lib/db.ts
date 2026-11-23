import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

// Di Vercel, folder project bersifat read-only. File SQLite disalin ke /tmp
// agar Prisma bisa membukanya. Data bawaan tetap berasal dari prisma/dev.db
// yang di-commit ke GitHub (perubahan di Vercel tidak permanen).
function urlDatabase(): string | undefined {
  if (!process.env.VERCEL) return undefined; // lokal: pakai DATABASE_URL dari .env

  const sumber = path.join(process.cwd(), "prisma", "dev.db");
  const tujuan = "/tmp/dev.db";
  if (!fs.existsSync(tujuan) && fs.existsSync(sumber)) {
    fs.copyFileSync(sumber, tujuan);
  }
  return `file:${tujuan}`;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ datasourceUrl: urlDatabase() });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
