# 99-closing — kartu penutup Short

Komponennya milik `shared/` — `<EndCard rasio="9x16">`
([docs/10](../../../../docs/10-scene-standar.md)). **Tidak dibangun ulang di
sini**, dan tidak didaftarkan di `SCENES`. Berkas ini ada karena HARD RULE 3:
kalau koreografinya berubah, ia berubah untuk **semua** Short di semua topik.

Durasi: `CLOSING_SHORT_SECONDS` dari `.env` (2 dtk). Tidak punya rencana VO —
penutup tidak bicara.

**Frame pertamanya = frame terakhir `6-berikutnya`:** satu sambungan yang menyala dan baru selesai bergetar, lalu potong keras ke
kartu penutup.

## Catatan

- **Sambungan ke sini memang menganga — `jahitan: menganga` — dan itu disengaja.**
  Kartu penutup memang layar lain; ia bukan kelanjutan adegan, ia tanda bahwa
  adegannya selesai. `npm run jahit` tidak memeriksanya.
- Isinya identik dengan penutup Short lain seri ini. Kalau salah satu berbeda,
  yang salah yang berbeda.
