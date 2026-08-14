Anggaran: mulai 18,84 dtk · durasi 2,5 dtk (`OPENING_SECONDS` di `.env`).

Scene standar. Komponennya milik `shared/StandarScenes.tsx` (`<KartuJudul>`) dan
**tidak dibuat ulang** di episode ini — [docs/10](../../../docs/10-scene-standar.md).
Yang dikirim episode cuma tiga hal:

1. judul **"DNS"** — dari `JUDUL` di `Episode.tsx`
2. subjudul **"Domain Name System"** — dari `SUBJUDUL`
3. figur benda utama episode di paruh kanan, lewat prop `figur`:
   `FigurLoket` di `02-opening.tsx`

Berkas `02-opening.tsx` **bukan scene** dan karena itu tidak didaftarkan di
`SCENES` — isinya cuma figurnya (docs/10 § Figur episode).

**Figurnya: satu loket, tampak depan.** Jendela persegi dengan meja kecil
menjorok, dan satu laci tertutup di bawahnya. Digambar garis, tanpa isian,
setebal ikon di `shared/Icons.tsx`, dan **kosong** — tidak ada kartu, tidak ada
orang, tidak ada nomor. Loketnya baru berisi di scene 5.

catatan:
   - **kepanjangannya ditulis di sini dan tidak pernah diucapkan.** VO episode
     ini tidak mengeja "Domain Name System" sekali pun; itu tugas kartu judul,
     bisu, sekali (`naskah.md § Scene standar`).
   - **kartu judul menulis "DNS" jauh sebelum VO menamainya di scene 5, dan itu
     disengaja.** yang dilarang HARD RULE 6 adalah VO yang menyebut nama sebelum
     bendanya berdiri. penamaan di `05-loket` karena itu ditulis sebagai
     penegasan, bukan perkenalan.
   - **loketnya digambar kosong dan tertutup.** kartu judul lewat di detik ~19,
     saat penonton belum tahu apa-apa soal loket; figur yang sudah bekerja akan
     membocorkan jawaban bagian 4 di bagian 2.
   - koreografi masuk figurnya milik `shared/` — jangan menganimasikannya di
     `02-opening.tsx`. kalau koreografinya perlu berubah, ubah di `shared/`
     untuk semua episode.
