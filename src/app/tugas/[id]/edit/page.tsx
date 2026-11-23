import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ubahTugas } from "@/app/actions";
import TugasForm from "@/components/TugasForm";

export const dynamic = "force-dynamic";

export default async function UbahTugas({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const nomor = Number(id);
  if (!Number.isInteger(nomor)) notFound();

  const tugas = await prisma.tugas.findUnique({ where: { id: nomor } });
  if (!tugas) notFound();

  return (
    <main>
      <h1>Ubah tugas</h1>
      <TugasForm
        action={ubahTugas.bind(null, tugas.id)}
        submitLabel="Simpan perubahan"
        error={sp.error === "invalid"}
        defaults={tugas}
      />
    </main>
  );
}
