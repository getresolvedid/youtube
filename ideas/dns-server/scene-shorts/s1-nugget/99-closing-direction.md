Anggaran: 2,0 dtk (`CLOSING_SHORT_SECONDS` di `.env`), scene terakhir Short 1.

Komponennya **milik `shared/`** — `<TandaBrand rasio="9x16" />` dari
[`shared/StandarScenes.tsx`](../../../../shared/StandarScenes.tsx). Berkas ini
ada karena HARD RULE 3 berlaku untuk scene standar juga: koreografinya dipakai
SEMUA Short di semua episode, jadi justru ini yang paling perlu punya tempat
menetap. Jangan membuat versi sendiri di folder ini.

1. mark getresolved menggambar diri (cincin + titik hijau), 176px —
   lebih kecil daripada versi 16:9 karena kotak amannya jauh lebih ketat
2. wordmark disingkap di bawahnya, tinggi 72px
3. garis tipis melebar, lalu handle channel muncul

yang TIDAK ada di versi 9:16 (dan alasannya):
   - **baris deskripsi/ajakan** — 2 detik tidak cukup untuk membacanya, dan
     baris yang tidak terbaca cuma memakan ruang aman (`.close-sub` disembunyikan
     di `shared/scenes.css`)
   - **gerak naik-turun pelan** di tengah scene — pada 2 detik ia terbaca sebagai
     getaran, bukan gerakan (`pendek` di `TandaBrand`)
   - **kartu judul** — Shorts tidak punya opening sama sekali (docs/02 § Aturan
     Shorts: tanpa intro brand, logo hanya di 2 detik terakhir)

catatan khusus Short ini:
   - **loop-nya sudah selesai sebelum scene ini.** `09-loop` yang mendaratkan
     penonton kembali ke frame pertama; tanda brand datang sesudahnya sebagai
     penutup, bukan sebagai bagian dari putarannya. Jangan memindahkan CTA ke
     sini — CTA-nya sudah tertulis kecil di `09-loop`.

motion:
   - seluruhnya milik `shared/StandarScenes.tsx`; tidak ada nilai animasi yang
     ditulis di folder Short ini
   - kalau koreografinya perlu berubah, ubah di `shared/` untuk semua episode
     dan perbarui berkas ini — bukan sebaliknya (docs/10)
