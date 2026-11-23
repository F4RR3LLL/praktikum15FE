import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function hariKe(n) {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n));
}

async function main() {
  const jumlah = await prisma.tugas.count();
  if (jumlah > 0) {
    console.log(`Database sudah berisi ${jumlah} data, seed dilewati.`);
    return;
  }
  await prisma.tugas.createMany({
    data: [
      {
        judul: "Deploy latihan CRUD ke Vercel",
        mataKuliah: "Front End Programming",
        deskripsi: "Push ke GitHub, import project di Vercel, isi environment variables.",
        tenggat: hariKe(3),
        status: "PROSES",
      },
      {
        judul: "Artikel ilmiah supervised learning",
        mataKuliah: "Machine Learning",
        deskripsi: "Format Jurnal JIKSI.",
        tenggat: hariKe(10),
        status: "BELUM",
      },
      {
        judul: "Website portofolio satu halaman",
        mataKuliah: "Front End Programming",
        deskripsi: "HTML/CSS, JavaScript hanya untuk hamburger menu.",
        tenggat: hariKe(-2),
        status: "SELESAI",
      },
    ],
  });
  console.log("Seed selesai: 3 data contoh ditambahkan.");
}

main().finally(() => prisma.$disconnect());
