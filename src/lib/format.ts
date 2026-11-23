export const STATUS_LABEL = {
  BELUM: "Belum dikerjakan",
  PROSES: "Sedang dikerjakan",
  SELESAI: "Selesai",
} as const;

export type Status = keyof typeof STATUS_LABEL;
export const STATUS_LIST = Object.keys(STATUS_LABEL) as Status[];

export function formatTanggal(d: Date) {
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function selisihHari(d: Date) {
  const n = new Date();
  const hariIni = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate());
  return Math.round((d.getTime() - hariIni) / 86400000);
}

export function labelSelisih(hari: number) {
  if (hari < 0) return `Lewat ${-hari} hari`;
  if (hari === 0) return "Hari ini";
  return `${hari} hari lagi`;
}
