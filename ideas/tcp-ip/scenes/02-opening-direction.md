Kartu judul standar — `OPENING_SECONDS` dari `.env` (4,0 dtk). **Tidak ada VO**
(docs/10), jadi tidak ada berkas `-vo.md`.

Koreografi kartunya milik `shared/StandarScenes.tsx` dan berlaku untuk **semua**
episode — jangan diubah dari sini. Yang milik episode ini cuma **figurnya**,
di `02-opening.tsx`, dikirim lewat prop `figur` di `<KartuJudul>`.

judul: **TCP/IP**
subjudul: **Aturan yang dipakai internet**

figur: tiga potongan bernomor berjalan beriringan ke kanan, dan yang **tengah
tertinggal** sedikit di detik kedua.

1. ketiganya masuk beriringan, berselang 0,14 dtk.
2. ketiganya bergerak pelan ke kanan, `E.sineInOut`, bolak-balik halus.
3. yang tengah melambat dan tertinggal ~26 px dari barisannya.

motion:
   - gerak mendatar: `t()` dari -30 ke 30 pada x, `E.sineInOut` — cukup untuk
     tidak diam, tidak cukup untuk menarik perhatian dari judulnya
   - tertinggal: `t()` terpisah pada potongan tengah saja, mulai 1,2 dtk

catatan:
   - **figurnya menjanjikan isi episode tanpa satu kata**: benda yang sama,
     bernomor, dan salah satunya tidak sejalan. itu persis yang dibongkar
     `07-peran-tcp`. figur yang cuma "logo jaringan" akan membuang empat detik.
   - **subjudulnya bukan kepanjangan.** kepanjangan TCP baru disebut VO di scene
     7; kartu ini memakai baris kedua untuk menaruh gambaran L1-nya lebih dulu.
   - nama "TCP/IP" di kartu ini **bukan** pelanggaran tambahan — VO scene 1
     sudah menyebutnya lebih dulu (naskah.md § Penyimpangan tercatat).
   - jahitan: menganga — kartu judul memang layar lain, dan sambungan
     `01-hook` → `03-apa-itu` yang diperiksa mata, bukan potongan ke kartu ini.
