# 99-closing — kartu penutup Short

Komponennya milik `shared/` — `<EndCard rasio="9x16">`
([docs/10](../../../../docs/10-scene-standar.md)). **Tidak dibangun ulang di sini**, dan
tidak didaftarkan di `SCENES`. Berkas ini ada karena HARD RULE 3: kalau
koreografinya berubah, ia berubah untuk **semua** Short di semua topik.

Durasi: `CLOSING_SHORT_SECONDS` dari `.env` (2 dtk), bukan angka di komposisi.
Tidak punya rencana VO — penutup tidak bicara.

## Di layar

Tanda brand getresolved, diam, 2 detik. Tanpa teks CTA di layar (docs/10 § 259:
dua setengah detik tidak cukup untuk membaca dua blok teks; CTA Shorts hidup di
VO penutup).

**Frame pertamanya = frame terakhir `6-berikutnya`:** satu simpul besar di tengah,
lalu potong keras ke kartu penutup.

## Catatan

- **Sambungan ke sini memang menganga — `jahitan: menganga` — dan itu disengaja.**
  Kartu penutup memang layar lain; ia bukan kelanjutan adegan, ia tanda bahwa
  adegannya selesai. Sama seperti kartu judul di video panjang, sambungan ini
  tidak diperiksa `npm run jahit`.
- **Ini yang menekan anggaran isi jadi 28 detik**, bukan 30. Unggahan memakai dua
  detik terakhir untuk teaser episode berikutnya; di repo ini teaser itu jadi
  scene `6-berikutnya` dan kartu penutup menyusul sesudahnya
  (`naskah.md` § Yang perlu keputusan user 2).
