Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Lima baris VO = lima tahap.

Scene rangkuman. Bentuknya paling sederhana di seluruh episode, dan itu
disengaja: yang bekerja di sini kalimatnya, bukan gerakannya.

1. layar hampir kosong. cuma pertanyaannya di tengah, besar. **tidak ada apa pun
   yang bergerak** selama satu ketukan.
   (VO: "Jadi, apa itu TCP/IP?")

2. jaring jaringan menyala kembali di belakangnya — jaring yang SAMA dengan
   scene 1, posisi yang sama. pertanyaannya naik ke atas untuk memberi ruang.
   (VO: "TCP/IP adalah sekumpulan protokol yang memungkinkan…")

3. baris pertama rangkuman jatuh: `IP` / `ADDRESS & ROUTING`, dengan satu
   potongan kecil bergerak di sampingnya.
   (VO: "IP membantu menentukan alamat dan jalur tujuan.")

4. baris kedua jatuh di bawahnya: `TCP` / `RELIABLE DELIVERY`, dengan tiga
   potongan kecil yang berbaris urut.
   (VO: "TCP membantu memastikan data dikirim dan diterima secara andal.")

5. baris ketiga menutup keduanya: `TCP/IP` / `COMMUNICATION`. jaring menyala
   penuh dan berdenyut sekali.
   (VO: "Dan bersama berbagai protokol lainnya…")

motion:
   - tahap 1: NOL tween. keheningannya isinya — storyboard meminta jeda
     0,5–0,8 dtk di VO, dan di layar jeda itu dibuat dengan tidak bergerak
   - jaring: `JaringLatar` dengan `maju` 0 → 1, `E.power1out`
   - tiga baris: `masuk()` masing-masing di beat-nya sendiri, `geser` 20
   - denyut penutup: `tPP()` pada opacity jaring, satu kali, 1,2 dtk

catatan:
   - **tiga baris jatuh satu per satu, tidak pernah bersamaan.** tiga baris yang
     muncul serentak dibaca sebagai daftar, dan daftar tidak diingat.
   - **jaringnya wajib jaring yang sama dengan scene 1** (`SIMPUL_LATAR`).
     itu yang membuat episode terasa kembali ke tempat ia mulai; jaring baru
     dengan posisi berbeda akan terbaca sebagai tempat lain.
   - frame terakhir: tiga baris + jaring penuh. frame pertama `13-penutup`
     mengecilkan semuanya jadi satu titik — sambungannya lewat gerakan yang
     sama, jadi KETAT.
