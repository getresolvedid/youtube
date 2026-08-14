Anggaran: mulai 25,57 dtk · durasi 3,83 dtk (estimasi, VO belum jadi).
Satu beat. Puncak Short ini — selisih yang bikin orang berhenti scrolling.

1. gudang menyala, dan jam tidak lagi cukup:
   - `.lemari` di posisi paling bawah menyala `--accent`, dua tempat lain redup
   - jam MENGECIL dan bergeser, digantikan kalender yang membalik lembar demi
     lembar dan berhenti di lembar ketiga
   - "3 bulan" mendarat di bawah "1 menit"
   (VO: "Lemari arsip di gudang: sekitar tiga bulan.")

teks di layar:
   "3 bulan" — ukuran sama dengan dua angka di atasnya, warna sama.
   Yang membesar bukan hurufnya, melainkan jaraknya di kolom.

catatan komposisi:
   - **jam DIGANTI, bukan diputar lebih banyak.** Tiga bulan di muka jam sama
     saja dengan satu putaran lagi, dan seluruh isi Short ini adalah selisih
     itu. Alat ukur yang berganti adalah cara paling jujur menggambar "ini
     sudah di luar skala yang tadi".
   - jam tidak dihapus, cuma mengecil ke sudut. Ia harus tetap terlihat supaya
     "satu menit" tadi tidak ikut hilang dari ingatan penonton.
   - kalender membalik **tiga** lembar, dan berhenti di situ. Lembar keempat
     terbaca sebagai "berbulan-bulan, entah berapa" dan menghapus angkanya —
     batasnya angka yang diucapkan, bukan angka dua.

motion:
   - jam: `scale 1 → 0,45` + geser ke sudut, `power2out`, 0,5 dtk
   - kalender: tiga balikan, `power3out`, jeda 0,22 dtk lalu memendek sedikit;
     balikan terakhir sedikit lebih lambat — berhentinya harus terasa mendarat,
     bukan terpotong
   - "3 bulan": `backOut(1.6)`, jatuh bersama lembar ketiga mendarat
