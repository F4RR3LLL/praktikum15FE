import { buatTugas } from "@/app/actions";
import TugasForm from "@/components/TugasForm";

export default async function TugasBaru({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <main>
      <h1>Tambah tugas</h1>
      <TugasForm action={buatTugas} submitLabel="Simpan tugas" error={sp.error === "invalid"} />
    </main>
  );
}
