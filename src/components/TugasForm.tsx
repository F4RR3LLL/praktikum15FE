import Link from "next/link";
import { STATUS_LABEL, STATUS_LIST } from "@/lib/format";

type Props = {
  action: (fd: FormData) => void | Promise<void>;
  submitLabel: string;
  error?: boolean;
  defaults?: {
    judul: string;
    mataKuliah: string;
    deskripsi: string | null;
    tenggat: Date;
    status: string;
  };
};

export default function TugasForm({ action, submitLabel, error, defaults }: Props) {
  return (
    <form action={action} className="form">
      {error && (
        <p className="alert alert-error" role="alert">
          Judul, mata kuliah, dan tenggat wajib diisi.
        </p>
      )}

      <label>
        Judul tugas
        <input name="judul" required defaultValue={defaults?.judul} placeholder="Contoh: Laporan praktikum 4" />
      </label>

      <label>
        Mata kuliah
        <input name="mataKuliah" required defaultValue={defaults?.mataKuliah} placeholder="Contoh: Front End Programming" />
      </label>

      <div className="row">
        <label>
          Tenggat
          <input
            type="date"
            name="tenggat"
            required
            defaultValue={defaults?.tenggat.toISOString().slice(0, 10)}
          />
        </label>
        <label>
          Status
          <select name="status" defaultValue={defaults?.status ?? "BELUM"}>
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Catatan
        <textarea name="deskripsi" rows={4} defaultValue={defaults?.deskripsi ?? ""} placeholder="Opsional" />
      </label>

      <div className="actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        <Link href="/" className="btn">
          Batal
        </Link>
      </div>
    </form>
  );
}
