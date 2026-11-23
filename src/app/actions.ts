"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { STATUS_LABEL } from "@/lib/format";

function bacaForm(fd: FormData) {
  const judul = String(fd.get("judul") ?? "").trim();
  const mataKuliah = String(fd.get("mataKuliah") ?? "").trim();
  const deskripsi = String(fd.get("deskripsi") ?? "").trim();
  const status = String(fd.get("status") ?? "BELUM");
  const tenggat = new Date(`${String(fd.get("tenggat") ?? "")}T00:00:00Z`);

  if (!judul || !mataKuliah || Number.isNaN(tenggat.getTime()) || !(status in STATUS_LABEL)) {
    return null;
  }
  return { judul, mataKuliah, deskripsi: deskripsi || null, tenggat, status };
}

// CREATE
export async function buatTugas(fd: FormData) {
  const data = bacaForm(fd);
  if (!data) redirect("/tugas/baru?error=invalid");
  try {
    await prisma.tugas.create({ data });
  } catch {
    redirect("/?error=write");
  }
  revalidatePath("/");
  redirect("/?notif=dibuat");
}

// UPDATE
export async function ubahTugas(id: number, fd: FormData) {
  const data = bacaForm(fd);
  if (!data) redirect(`/tugas/${id}/edit?error=invalid`);
  try {
    await prisma.tugas.update({ where: { id }, data });
  } catch {
    redirect("/?error=write");
  }
  revalidatePath("/");
  redirect("/?notif=diubah");
}

// DELETE
export async function hapusTugas(id: number) {
  try {
    await prisma.tugas.delete({ where: { id } });
  } catch {
    redirect("/?error=write");
  }
  revalidatePath("/");
  redirect("/?notif=dihapus");
}
