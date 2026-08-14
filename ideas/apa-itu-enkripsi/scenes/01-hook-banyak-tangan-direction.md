Anggaran: mulai 0,00 dtk · durasi 23,34 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Scene pembuka. Frame pertamanya tidak menyambung apa pun — ia yang menetapkan
seluruh panggung episode: **jalan mendatar, kiri ke kanan, dengan kotak yang
berjalan di atasnya.** Semua scene sesudahnya memakai garis yang sama persis
(`../panggung-kiriman.tsx`).

**ARAHNYA MENGIKAT: kiri = kamu, kanan = yang kamu kirimi.** Kotak selalu
bergerak ke kanan. Tidak ada satu pun scene yang boleh membaliknya; scene 10
memang punya arus dua arah, dan justru itu yang membuatnya terasa berbeda.

1. layar kecil di meja kiri. satu baris tulisan terketik di dalamnya, terbaca
   jelas. lalu kotak kecil terbentuk dari baris itu dan bergeser ke tepi meja.
   (VO: "Kamu baru saja mengetik sesuatu, lalu menekan kirim.")

2. kamera MUNDUR. layar mengecil jadi salah satu ujung, dan jalan panjang
   terbuka ke kanan sampai tepi frame. ujung kanannya belum ada apa-apa.
   (VO: "Kalimatnya berangkat dari layarmu, dan kamu tidak pernah melihat jalannya.")

3. tangan-tangan muncul dari bawah garis jalan, satu per satu dari kiri ke kanan.
   lima buah, jarak sama. semuanya bentuknya identik.
   (VO: "Di jalan itu ada tangan. Bukan satu, bukan dua.")

4. kotak berjalan ke kanan dan berpindah dari tangan ke tangan. tiap serah
   terima kotaknya terangkat sedikit lalu turun lagi. tidak pernah berhenti.
   (VO: "Kotak kecilmu berpindah dari satu tangan ke tangan berikutnya.")

5. tiap tangan yang sedang memegang menyala sebentar lalu padam. warnanya sama
   dengan tangan lain — tidak ada yang merah, tidak ada yang bertudung.
   (VO: "Semuanya asing. Semuanya bisa saja membuka.")

6. kotak berhenti di tengah jalan. tutupnya tetap rapat, dan baris tulisan yang
   tadi terbaca di tahap 1 sekarang tidak terlihat sama sekali.
   (VO: "Tapi tidak satu pun dari mereka tahu isinya.")

7. semua diam. tanda tanya besar naik di atas kotak yang berhenti itu, sendirian.
   (VO: "Kenapa tidak?")

motion:
   - kamera mundur: `kamera()` dengan `skala` 2,2 -> 1, `E.power2out`, 1,1 dtk
   - tangan muncul: `masuk()` geser 26, stagger 0,12 dtk dari kiri ke kanan
   - kotak berjalan: `t()` pada x, `E.linear` — kurir tidak melambat sendiri
   - serah terima: `tPP()` pada y setinggi 18 px, sekali per tangan
   - tangan menyala: `tPP()` pada opacity, mengikuti x kotak, bukan waktu tetap
   - tanda tanya: `masuk()` geser 30, durasi 0,55

catatan:
   - **kotaknya JANGAN digambar tergembok di sini.** gembok baru masuk di scene
     4; kalau ia sudah menempel sejak hook, seluruh bagian 3 kehilangan
     pertanyaannya dan penonton mengira jawabannya sudah diberikan.
   - **tulisan di tahap 1 harus benar-benar terbaca** walau cuma satu baris pendek.
     ia satu-satunya bukti bahwa isi kotak itu ada, dan tahap 6 bertumpu pada
     penonton mengingat bahwa ia tadi terlihat.
   - **tangannya netral.** tanpa wajah, tanpa tudung, tanpa warna bahaya —
     alasan yang sama dengan ketukan di T15: begitu digambar sebagai penjahat,
     masalahnya berubah jadi masalah orang lain.
   - **layar di tahap 1 dan meja di scene 5 harus seukuran dan setinggi.** layar
     itu meja kiri yang sama, dilihat dari dekat; kalau ukurannya berbeda,
     mundurnya kamera terbaca sebagai pindah tempat, bukan pindah jarak.
   - jahitan ke scene 3 melompati kartu judul, dan itu memang tidak diperiksa
     `npm run jahit` (scene standar menyela). yang menyambung VO-nya.
