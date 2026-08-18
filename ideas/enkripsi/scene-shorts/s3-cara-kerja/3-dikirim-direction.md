Anggaran: durasi ±3,5 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

1. potong keras dari kotak ke jaringan. paket BERGEMBOK keluar dari atas dan
   turun di jalur; simpul menyala satu per satu saat dilewati. tidak ada yang
   lain di frame.
   (VO: "Data inilah yang kemudian dikirim melalui internet.")
   TEKS LAYAR: "Yang dikirim ini."

motion:
   - paket turun: `t()` pada y, `E.linear` — tidak melambat, tidak berhenti
   - nyala simpul: `nyalaSimpul(yPaket)`, sama persis dengan Short 1 dan 2
   - `terkunci` DIPATOK 1, tanpa tween

catatan:
   - **TIDAK ADA SATU KOORDINAT PUN DI BERKAS INI.** semuanya dari
     `../panggung-short.tsx`, dan itu yang membuat "jaringan yang sama"
     benar-benar sama.
   - **belum ada pengamat di frame ini.** dia tersingkap di scene 4, dan
     kemunculannya di sini membuat scene 4 tinggal mengulang.
   - **tidak ada teks "AMAN" dan tidak ada centang.** paketnya cuma berjalan;
     yang menilai baru scene 5.
