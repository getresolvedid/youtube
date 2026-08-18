Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Satu baris VO = satu tahap, tiga gerakan berurutan di dalamnya.

Sisi kedua pembandingnya. **Panggungnya sama persis dengan scene 2, isinya yang
berganti** — itu yang membuat keduanya terbaca sebagai perbandingan.

1. nama `IP` di atas berganti jadi `TCP`, di titik yang sama persis, dengan
   opacity silang. cabang dan tiga kotak tujuan memudar keluar.
   teks layar: "TCP: sampai benar?"

   di tempat yang sama muncul empat potongan yang sudah TIBA — berjajar, tapi
   urutannya `3 1 4 2`. mereka diam sebentar, lalu bergeser sampai urut
   `1 2 3 4`, dan tiap nomor dapat centang.
   (VO: "Sedangkan TCP membantu memastikan bagian data yang dikirim…")

motion:
   - nama berganti: opacity silang di titik yang SAMA, 0,35 dtk
   - cabang keluar: `t()` pada opacity → 0
   - potongan masuk: `masuk()` keempatnya, `jeda` 0,06
   - urut: `t()` pada x menuju slot nomornya, `E.power2out`, berselang 0,05 dtk;
     yang menyeberangi tetangganya TERANGKAT ke ketinggian berbeda
   - centang: `t()` per potongan setelah urutnya selesai

catatan:
   - **jangan menggambar perjalanan di scene ini.** yang ditunjukkan di sini
     adalah yang terjadi SESUDAH sampai. kalau potongan di sini juga menempuh
     jalur, kedua sisi jadi sama saja dan seluruh Short kehilangan alasannya.
   - **nama berganti di titik yang sama**, bukan satu keluar dan satu masuk dari
     tempat lain. tempat yang sama itu yang membuat keduanya terbaca sebagai dua
     jawaban atas satu pertanyaan.
   - **kotak yang menyeberang wajib terangkat** — dua kotak yang bertukar tempat
     di garis yang sama terbaca melebur, bukan bertukar (lihat scene 8 video
     panjang dan Short 2 scene 4).
   - frame terakhir: empat potongan urut + centang, nama `TCP` di atas. frame
     pertama `4-bersama` membelah layar.
