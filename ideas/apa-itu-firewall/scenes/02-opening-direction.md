Anggaran: mulai 20,70 dtk · durasi `OPENING_SECONDS` (dari .env).
Tanpa VO — kartu judul tidak bicara (docs/10).

**Koreografinya milik `shared/StandarScenes.tsx` dan tidak dibuat ulang di sini.**
Yang ditetapkan berkas ini cuma dua hal yang memang milik episode ini: teks
judulnya, dan figur yang dikirim lewat prop `figur`.

judul:
   - JUDUL    : "Firewall"
   - SUBJUDUL : "Penjaga di depan pintu"
   - keduanya diatur di `Episode.tsx`, bukan di naskah.

figur (`scenes/02-opening.tsx` · `FigurPenjaga`):
   1. satu pintu bernomor, TERTUTUP, di sisi kanan.
   2. garis lantai — alas yang sama dengan seluruh episode.
   3. penjaga bertopi berdiri di depannya, menghadap KIRI, TANGAN KOSONG.

catatan:
   - **SUBJUDULNYA BUKAN KEPANJANGAN.** "Firewall" tidak punya kepanjangan —
     tidak seperti "DNS" di T14 yang kartunya bisa mengeja "Domain Name System".
     Baris kedua dipakai untuk menaruh gambaran L1-nya lebih dulu, dan ini
     satu-satunya tempat kata "penjaga" bertemu kata "firewall" sebelum scene 6.
   - **penjaganya digambar TANPA DAFTAR DAN TANPA BUKU**, dan itu keputusan.
     Bendanya boleh berdiri — ia memang `[what]` episode ini — tapi mekanismenya
     tidak: daftar adalah isi bagian 4 dan buku catatan isi bagian 5. Figur yang
     sudah memegang keduanya membocorkan jawaban di bagian 2.
   - **kartu ini menulis "Firewall" di sekitar detik 21**, sementara VO baru
     menamainya di detik ~115. Itu bukan pelanggaran HARD RULE 6: yang dilarang
     VO yang menyebut nama sebelum bendanya berdiri, bukan kartu judulnya. Karena
     itu penamaan di `06-penjaga` ditulis sebagai penegasan, bukan perkenalan.
   - **topi beraksen adalah satu-satunya bagian yang berwarna.** Ia pembeda
     penjaga dari sosok biasa di sepanjang episode, dan ia dipatok mulai dari
     kartu ini.
   - kalau koreografi masuknya perlu berubah, ubah di `shared/` untuk SEMUA
     episode — jangan menganimasikan apa pun di berkas figur ini.
