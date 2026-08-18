Tanda brand penutup — `CLOSING_SHORT_SECONDS` dari `.env` (2,0 dtk). **Tidak ada
VO** (docs/10), jadi tidak ada berkas `-vo.md`.

Komponennya `<TandaBrand rasio="9x16" />` dari `shared/StandarScenes.tsx` dan
berlaku untuk **semua** Short di semua topik — jangan diubah dari sini. Kalau
koreografinya perlu berubah, ubah di `shared/`, dan sadari itu mengubah setiap
Short yang pernah dibuat.

**Dua detik, bukan lima.** Short tidak punya intro brand sama sekali (docs/02),
jadi penutup ini satu-satunya tempat logo muncul — dan di feed, dua detik tanpa
isi baru sudah cukup lama untuk digeser.

**Frame terakhir `5-sampai` harus sudah tenang** sebelum kartu ini mengambil
alih. Scene yang masih bergerak di frame terakhirnya membuat potongan ke sini
terbaca sebagai terpotong, bukan sebagai selesai.
