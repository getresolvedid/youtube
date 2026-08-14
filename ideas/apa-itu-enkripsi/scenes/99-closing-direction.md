Anggaran: mulai 360,56 dtk · durasi `CLOSING_LONG_SECONDS` (dari .env).
Tanpa VO — tanda brand tidak bicara (docs/10).

**Komponennya `<TandaBrand>` di `shared/StandarScenes.tsx`, dipakai apa adanya.**
Tidak ada berkas `.tsx` untuk scene ini di `scenes/`, dan memang tidak boleh ada:
kalau koreografinya perlu berubah, ubah di `shared/` untuk SEMUA episode.

isi:
   1. tanda tangan brand, tanpa judul episode.
   2. tanpa kartu "video berikutnya", tanpa daftar tautan.

catatan:
   - **frame terakhir sebelum scene ini adalah GAMBAR, bukan teks**: jalan yang
     bagian tengahnya meredup dan kedua ujungnya tetap terang
     (`16-bukan-gemboknya`, tahap 7). Potongan ke tanda brand terjadi dari gambar
     yang sudah tenang, bukan dari gerakan.
   - **satu-satunya ajakan berlangganan di seluruh episode ada di sini**
     ([docs/02](../../../docs/02-format-video.md)). Tidak ada CTA di tengah video,
     dan `16-bukan-gemboknya` sengaja berakhir tanpa permintaan apa pun.
   - **closing dipatok di nomor 99** dan tidak pernah ikut bergeser saat scene
     disisipkan di tengah (HARD RULE 5 · `tools/baca-episode.mjs`).
