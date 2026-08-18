Anggaran: mulai 0 dtk · durasi ±5,3 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

**Frame pertamanya harus terbaca sebagai tempat yang sudah dikenal** oleh yang
sudah menonton Short 1, **dan sebagai tempat yang jelas** oleh yang belum. Dua
tuntutan itu dipenuhi benda yang sama: jaringan tegak dengan satu paket turun.

1. jaringan tegak, sama persis dengan Short 1 — simpul di jalur, simpul jauh di
   latar. paket turun dari atas, simpul menyala saat dilewati lalu redup lagi.
   tidak ada yang lain di frame.
   (VO: "Satu kalimat lagi jalan di internet, lewat banyak tempat sebelum sampai.")
   TEKS LAYAR: "Satu kalimat," / "lagi jalan."

motion:
   - paket turun: `t()` pada y, `E.linear` — tidak melambat dan tidak berhenti
   - nyala simpul: `nyalaSimpul(yPaket)` dari `../panggung-short.tsx`, sama
     persis dengan Short 1
   - tidak ada gerak kamera. Short 1 sudah memakai mundur dan merapat; Short 2
     membuka diam supaya perapatan di scene 3 terasa

catatan:
   - **TIDAK ADA SATU KOORDINAT PUN DI BERKAS INI.** semuanya dari
     `../panggung-short.tsx` — dan itu yang membuat "jaringan yang sama"
     benar-benar sama, bukan sekadar mirip.
   - **belum ada pengamat di frame ini.** dia tersingkap di scene 2, dan
     kemunculannya di sini membuat scene 2 tinggal mengulang.
   - **belum ada gembok, kunci, atau kata "enkripsi".** yang terakhir baru jatuh
     di scene 6, sebagai penutup.
