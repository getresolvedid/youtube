Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Empat baris VO = empat tahap.

Scene rangkuman, dan **satu-satunya yang boleh simetris**. Sisa episode selalu
punya arah kiri → kanan; di sini arah itu sengaja dibekukan supaya dua tugasnya
terbaca sejajar, bukan berurutan.

1. satu garis tegak turun di tengah layar dan membelahnya jadi dua bidang sama
   besar. keduanya masih kosong.
   (VO: "Jadi, TCP dan IP memiliki tugas yang berbeda.")

2. sisi KIRI hidup: judulnya `IP` / `ADDRESS & ROUTING`. di bawahnya satu
   potongan sampai di persimpangan bercabang tiga; satu cabang menyala dan
   potongan mengambilnya. gerakan ini didaur ulang dari scene 5.
   (VO: "IP berfokus pada alamat dan pengiriman paket menuju tujuan.")

3. sisi KANAN hidup: judulnya `TCP` / `RELIABLE DELIVERY`. di bawahnya empat
   potongan berbaris tidak urut, lalu bertukar tempat sampai urut, dan tiap
   nomor dapat centang. gerakan ini didaur ulang dari scene 7 dan 8.
   (VO: "Sedangkan TCP berfokus pada memastikan komunikasi…")

4. garis pemisah memudar. kedua judul bergerak ke tengah dan bertemu jadi
   `TCP/IP`. jaring latar menyala di belakangnya.
   (VO: "Keduanya bekerja bersama sebagai bagian penting…")

motion:
   - garis belah: `gambarGaris()` dari atas ke bawah
   - sisi kiri & kanan: `masuk()` masing-masing, dijatuhkan di beat-nya sendiri
   - cabang menyala: `t()` pada opacity cabang terpilih; dua cabang lain tetap
     terlihat tapi redup — pilihan harus terbaca sebagai PILIHAN, jadi yang
     tidak dipilih tidak boleh hilang
   - bertukar tempat: `t()` pada x tiap potongan menuju slot nomornya
   - menyatu: `t()` pada x kedua judul menuju 960, opacity garis → 0, lalu
     `masuk()` untuk tulisan gabungannya

catatan:
   - **gerakan di kedua sisi WAJIB daur ulang, bukan baru.** rangkuman yang
     memperkenalkan gerakan baru bukan rangkuman — penonton akan menonton yang
     baru itu alih-alih mengingat yang lama.
   - **cabang yang tidak dipilih tetap terlihat.** kalau ia hilang, yang terbaca
     "cuma ada satu jalan", dan itu membatalkan seluruh scene 6.
   - **titik cabangnya wajib punya simpul** — dikoreksi 2026-08-18 setelah
     melihat still-nya. tanpa benda di titik itu, tiga garis yang bertemu cuma
     terbaca sebagai garis yang menyala, bukan sebagai memilih. ujung tiap
     cabang juga diberi titik, supaya ketiganya terbaca sebagai tiga TUJUAN.
   - **tahap 4 adalah alasan judul episodenya.** garis miring di "TCP/IP" baru
     masuk akal setelah penonton melihat dua benda menyatu.
   - frame terakhir: `TCP/IP` di tengah + jaring latar. frame pertama
     `10-bukan-hanya` memakai tulisan yang sama di tempat yang sama, lalu
     mundur — sambungannya KETAT.
