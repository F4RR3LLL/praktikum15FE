import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const font = Schibsted_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tugas Kuliah",
  description: "Catat tugas kuliah, tenggat, dan statusnya (CRUD Next.js + Prisma + SQLite).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={font.className}>
        <div className="shell">{children}</div>
      </body>
    </html>
  );
}
