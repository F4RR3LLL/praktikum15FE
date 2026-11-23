"use client";

export default function DeleteButton({ judul }: { judul: string }) {
  return (
    <button
      type="submit"
      className="btn btn-danger"
      onClick={(e) => {
        if (!confirm(`Hapus tugas "${judul}"?`)) e.preventDefault();
      }}
    >
      Hapus
    </button>
  );
}
