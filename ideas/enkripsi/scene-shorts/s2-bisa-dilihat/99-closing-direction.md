Anggaran: scene terakhir · durasi `CLOSING_SHORT_SECONDS` (2 dtk, dari .env).
Tanpa VO — tanda brand tidak bicara ([docs/10](../../../../docs/10-scene-standar.md)).

Seluruhnya milik `shared/StandarScenes.tsx` (`<TandaBrand rasio="9x16"/>`), dan
Short ini tidak menyetel apa pun.

**Dua detik, bukan lima.** Versi 9:16 memakai `CLOSING_SHORT_SECONDS`: di feed
Shorts tidak ada end screen yang perlu waktu untuk diklik, dan lima detik logo
di akhir Short adalah lima detik penonton menggeser.

catatan:
   - **INILAH SATU-SATUNYA TEMPAT LOGO MUNCUL DI SEBUAH SHORT.** Tidak ada intro
     brand di Shorts (docs/02) — pembuka video panjang tidak pernah cukup agresif
     untuk feed, dan tiga detik logo di awal adalah tiga detik yang hilang.
   - **Nomornya dipatok 99 dan tidak pernah ikut bergeser**, satu-satunya scene
     yang begitu (`tools/baca-episode.mjs`). Closing selalu scene terakhir, jadi
     nomor urut sebenarnya akan berubah tiap kali satu scene disisipkan di mana
     pun — dan tiap pergeseran itu mengganti nama berkas ini tanpa ada yang
     berubah pada closing-nya sendiri.
   - **Baris `sub`-nya tidak dipakai di 9:16** — `<TandaBrand>` menyembunyikannya
     pada rasio ini, karena dua detik tidak cukup untuk membaca satu kalimat di
     samping logo.
   - Kalau ritmenya perlu berubah, ubah di `shared/` untuk SEMUA Short semua
     topik — jangan menyalin lalu menyetel ulang di satu Short.
