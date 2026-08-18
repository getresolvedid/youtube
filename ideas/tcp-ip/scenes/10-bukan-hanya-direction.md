Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Lima baris VO = lima tahap.

Scene paling berat di episode ini: **empat nama baru di menit ketiga.** Yang
menahannya cuma satu hal — tiap simpul wajib punya gambaran kecil yang BERGERAK,
bukan kotak berisi huruf.

1. tulisan `TCP/IP` dari scene 9 masih di tengah, di tempat yang sama persis.
   kamera mulai mundur, skala 1 → 0,8.
   (VO: "Namun, TCP/IP sebenarnya bukan hanya TCP dan IP.")

2. mundurnya selesai. sekeliling tulisan itu sekarang punya ruang kosong, dan
   empat lingkaran redup muncul menandai tempat yang belum terisi.
   (VO: "TCP/IP adalah kumpulan berbagai protokol yang bekerja bersama.")

3. simpul kiri-atas terisi: `HTTP / HTTPS`. gambarannya sebuah bidang peramban
   kecil dan sebuah halaman, dihubungkan panah bolak-balik yang berdenyut.
   (VO: "Ada HTTP dan HTTPS yang digunakan untuk komunikasi website.")

4. simpul kanan-atas terisi: `DNS`. gambarannya tulisan `contoh.com` yang
   BERUBAH jadi deret angka alamat. perubahannya di tempat, bukan dua baris.
   (VO: "Ada DNS yang membantu menerjemahkan nama…")

5. simpul bawah terisi: `UDP`. gambarannya lima potongan kecil melesat ke kanan
   beruntun, salah satunya lenyap di tengah jalan **dan tidak ada yang
   memintanya kembali**.
   (VO: "Ada juga UDP yang digunakan untuk komunikasi yang membutuhkan kecepatan…")

motion:
   - mundur: `t()` pada skala kamera, `E.power2out`, pelan
   - lingkaran penanda: `masuk()` keempatnya bersamaan, opacity rendah
   - tiap simpul terisi: `masuk()` + `t()` pada skala 0,8 → 1 supaya terasa
     "mendarat" di tempat yang sudah disediakan
   - denyut HTTP: `tPP()` pada opacity panah
   - DNS: `t()` opacity silang antara teks nama dan teks angka, di titik yang
     SAMA
   - UDP: lima `t()` berselang 0,1 dtk; yang ketiga opacity → 0 di tengah jalur

catatan:
   - **UDP-nya harus terbaca sebagai KEBALIKAN scene 7.** satu potongan hilang,
     dan tidak ada yang berjalan balik ke kiri. itu satu-satunya pembeda yang
     bisa ditunjukkan tanpa kalimat tambahan, dan ia gratis karena penonton
     baru saja melihat versi yang sebaliknya.
   - **jangan pakai buku dari scene 3 lagi** sebagai gambaran "kumpulan". buku
     itu benda scene 3 saja; memakainya lagi di sini akan membuat penonton
     mengira ada yang berulang.
   - di layar dipakai `contoh.com`, bukan merek yang disebut VO — tidak ada
     merek yang boleh tampil sebagai klaim (naskah.md § Sumber).
   - kalau episode harus dipangkas, **ini yang kedua dibuang** setelah scene 8.
   - frame terakhir: empat simpul terisi mengelilingi `TCP/IP`. frame pertama
     `11-buka-website` masuk ke simpul DNS — kamera mendekat ke simpul kanan-atas,
     jadi sambungannya lewat POSISI, bukan potong bersih.
