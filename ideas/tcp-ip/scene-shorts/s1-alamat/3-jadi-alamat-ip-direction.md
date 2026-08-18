Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Satu baris VO = satu tahap, dua perubahan yang jatuh berurutan di dalamnya.

Scene terpendek Short ini. Yang harus tertangkap penonton cuma satu hal: benda
yang tadi dipegang tangan sekarang jadi benda yang berjalan di jaringan.

1. kotak kiriman memudar dan di titik yang SAMA PERSIS muncul potongan digital
   bernomor. sepersekian detik sesudahnya, tulisan `TO: B` di labelnya berganti
   jadi `192.168.1.10` — berganti di tempat, bukan berpindah baris.
   teks layar: "Alamatnya jadi angka."
   (VO: "Setiap perangkat memiliki alamat yang disebut IP address.")

motion:
   - kotak → potongan: opacity silang 0,45 dtk, TANPA geser dan TANPA skala
   - label: opacity silang kedua, tertunda 0,3 dtk setelah yang pertama — supaya
     terbaca sebagai dua hal berurutan, bukan satu kedipan
   - potongan lalu berdenyut sekali (`tPP` pada skala) supaya scene sependek ini
     tidak terasa diam

catatan:
   - **perubahannya di TEMPAT.** kalau bendanya berpindah sedikit pun, yang
     terbaca dua benda yang saling menggantikan — bukan satu benda yang berubah
     wujud.
   - **jangan menambahkan apa pun di scene ini.** ia sengaja cuma punya satu
     kejadian; benda tambahan akan mencuri satu-satunya perubahan yang harus
     dilihat.
   - frame terakhir: potongan berlabel angka di tengah, di atas jaringan. frame
     pertama `4-cari-jalur` melanjutkan dari titik itu.
