import Link from "next/link";
import type { Tugas } from "@prisma/client";
import { prisma } from "@/lib/db";
import { hapusTugas } from "./actions";
import DeleteButton from "@/components/DeleteButton";
import { STATUS_LABEL, type Status, formatTanggal, selisihHari } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Beranda({
  searchParams,
}: {
  searchParams: Promise<{ notif?: string; error?: string }>;
}) {
  const sp = await searchParams;

  let daftar: Tugas[] = [];
  let dbError = false;
  try {
    daftar = await prisma.tugas.findMany({ orderBy: { tenggat: "asc" } });
  } catch {
    dbError = true;
  }

  return (
    <main>
      <header className="top">
        <h1>Tugas Kuliah</h1>
        <Link href="/tugas/baru" className="btn btn-primary">
          Tambah tugas
        </Link>
      </header>

      {sp.error === "write" && (
        <p className="alert alert-error" role="alert">
          Perubahan tidak bisa disimpan. Database SQLite di Vercel bersifat read-only, jadi tambah,
          ubah, dan hapus data dijalankan di localhost.
        </p>
      )}
      {dbError && (
        <p className="alert alert-error" role="alert">
          Database tidak bisa dibaca. Jalankan <code>npx prisma db push</code> lalu{" "}
          <code>npm run db:seed</code>.
        </p>
      )}

      <ul className="list">
        {daftar.map((t) => {
          const lewat = t.status !== "SELESAI" && selisihHari(t.tenggat) < 0;
          return (
            <li key={t.id} className={`item s-${t.status.toLowerCase()}`}>
              <div className="item-main">
                <h2>{t.judul}</h2>
                <p className="meta">
                  {t.mataKuliah}, {formatTanggal(t.tenggat)}
                  {lewat && <span className="late"> (lewat tenggat)</span>}
                </p>
                {t.deskripsi && <p className="desc">{t.deskripsi}</p>}
              </div>
              <div className="item-side">
                <span className="badge">{STATUS_LABEL[t.status as Status] ?? t.status}</span>
                <div className="actions">
                  <Link href={`/tugas/${t.id}/edit`} className="btn">
                    Ubah
                  </Link>
                  <form action={hapusTugas.bind(null, t.id)}>
                    <DeleteButton judul={t.judul} />
                  </form>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}