Anggaran: mulai 23,34 dtk · durasi 2,50 dtk (`OPENING_SECONDS`). Tanpa VO.

**BUKAN scene episode ini.** Koreografinya milik `shared/StandarScenes.tsx`
(`<KartuJudul>`) dan tidak dibuat ulang di episode mana pun
([docs/10](../../../docs/10-scene-standar.md)). Yang ditetapkan berkas ini cuma
dua hal: teks kartunya, dan figur yang dikirim `Episode.tsx` lewat prop `figur`
(`02-opening.tsx`).

teks kartu:

    judul     Enkripsi
    subjudul  Kotak yang cuma satu orang bisa buka

**Judulnya menulis "Enkripsi" di detik ~23, sementara VO baru menamainya di
`07-gembok-terbuka` (~detik 116), dan itu disengaja.** Yang dilarang HARD RULE 6
adalah VO yang menyebut nama sebelum bendanya berdiri, bukan kartu judulnya.

**Subjudulnya menaruh gambaran L1 lebih dulu** — dan ini satu-satunya tempat kata
"kotak" bertemu kata "enkripsi" sebelum scene 7. Ia sengaja berbentuk gambar
("kotak yang cuma satu orang bisa buka"), bukan definisi ("mengubah isi jadi
tidak terbaca"): definisi di kartu judul membuat seluruh bagian 3 terasa
mengulang sesuatu yang sudah dijawab.

figur (`02-opening.tsx`):

   - satu kotak tertutup, tegak, dengan **gembok terjepit** di bibirnya.
   - gemboknya dalam keadaan TERKUNCI, bukan terbuka.
   - garis lantai pendek di bawahnya, sama seperti alas seluruh episode.
   - tidak ada kunci, tidak ada meja, tidak ada jalan, tidak ada tangan.

catatan:
   - **kuncinya tidak boleh ada di figur ini.** kartu judul lewat di detik 23,
     jauh sebelum penonton tahu bahwa gembok dan kunci adalah dua benda
     terpisah — dan pemisahan itu seluruh isi bagian 4. figur yang sudah
     memperlihatkan keduanya membocorkan jawabannya di bagian 2. alasan yang
     sama persis dengan penjaga T15 yang digambar tanpa daftar dan tanpa buku.
   - **jalannya juga tidak ada.** kotak yang sudah berdiri di atas jalan
     mengumumkan bahwa masalahnya soal perjalanan; di detik 23 penonton baru
     dapat pertanyaannya, dan menjawabnya lewat gambar sama saja menjawabnya.
   - jangan menganimasikan apa pun di berkas figur — koreografi masuknya milik
     `shared/`.
