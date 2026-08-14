Anggaran: mulai 64,13 dtk · durasi 18,82 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Scene yang **menamai subjek episode**. Frame pertamanya = frame terakhir
`04-daftar-yang-basi`: daftar merah yang membeku, ekornya masih menggantung
keluar bawah frame.

Loketnya berdiri **di tempat daftar itu runtuh**, bukan di tempat lain. Itu yang
membuat potongannya terbaca sebagai "jalan keluarnya diganti", bukan sebagai
layar baru. Geometrinya milik `../panggung-loket.tsx` (`Loket`, `X_LOKET`,
`Y_LANTAI`) — scene 6, 7, 8 dan 12 memakai loket yang sama persis.

1. daftar merah runtuh ke bawah — bukan memudar, tapi jatuh dan keluar frame.
   yang tertinggal cuma garis lantai kosong.
   (VO: "Makanya nomornya memang tidak disimpan.")

2. dari garis lantai itu, sebuah loket TUMBUH ke atas.
   satu benda utuh, bukan dirakit bagian per bagian.
   (VO: "Ia ditanyakan, tiap kali dibutuhkan.")

3. detailnya menyala berurutan: jendela terbuka, meja kecil menjorok keluar,
   satu laci tertutup di bawah meja.
   (VO: "Ada satu loket yang tugasnya cuma itu.")

4. kartu bertuliskan NAMA masuk lewat jendela dari kiri.
   sebentar di dalam. lalu kartu bertuliskan NOMOR keluar ke kiri.
   sekali, bersih, tanpa antre dan tanpa jeda dramatis.
   (VO: "Kamu sebut namanya, dia sebut nomornya.")

5. kamera turun ke laci di bawah meja. loket bagian atas keluar frame.
   lacinya mengisi paruh bawah layar, masih tertutup.
   (VO: "Dan sekarang lihat lacinya.")

6. laci ditarik keluar. penuh — SAMPAI KE DASARNYA — dan kosong.
   dasarnya harus terlihat: garis dalam laci digambar, supaya kekosongannya
   terbaca sebagai fakta, bukan sebagai laci yang belum sempat digambar isinya.
   (VO: "Kosong. Loket itu tidak memegang daftar apa pun.")

7. kamera mundur ke loket utuh.
   nama resminya mendarat di bawah loket: besar, aksen, sendirian.
   tidak ada elemen lain yang bergerak di tahap ini.
   (VO: "Ya, loket itu namanya D N S server.")

motion:
   - daftar runtuh: `y` mempercepat + rotasi kecil, `E.power2in`
   - loket tumbuh: `scaleY 0->1` dari lantai + sedikit `backOut(1,4)` di ujung
   - detail menyala: `masuk()` dengan `urutan` 0,1,2 dan `jeda` 0,12
   - kartu masuk/keluar: `t()` x, `E.power2out` masuk, `E.power2out` keluar,
     dua tween terpisah dengan jeda 0,45 dtk di dalam loket
   - kamera turun: satu `translateY` yang dipakai SELURUH grup, bukan tiap
     elemen sendiri-sendiri — kalau tidak, yang terbaca elemen berpencar
   - laci ditarik: `t()` x + bayangan dalam yang menguat, `E.expoOut`
   - nama resmi: `masuk()` geser 24, durasi 0,5
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **loketnya berdiri persis di koordinat tempat daftar runtuh.** kalau ia
     muncul di tempat lain, hubungan sebab-akibatnya hilang dan penonton
     mendapat dua gambar yang kebetulan berurutan.
   - **laci kosong adalah inti scene, bukan detail.** ia dapat dua tahap sendiri
     (5 dan 6) karena ia yang membedakan jawaban ini dari daftar yang barusan
     gagal. dasarnya wajib terlihat.
   - **tahap 4 sengaja cepat dan tidak dramatis.** loketnya belum boleh terasa
     rumit; kerumitannya milik scene 6, dan kontras itu yang membuat tangga di
     sana terasa sebagai penemuan.
   - **aksen mulai berarti "jawaban" sejak scene ini** dan seterusnya: kartu
     nomor yang keluar, dan nama resmi di tahap 7. loket sendiri tetap abu-abu —
     ia perabot, bukan jawaban.
   - **tidak ada orang di balik loket.** sosok baru muncul di scene 6 tahap 10,
     saat pemilik situsnya perlu punya wajah. loket yang sudah berpenghuni sejak
     awal akan membuat pertanyaan "siapa yang menjawab" di scene 10 kehilangan
     tenaganya.
   - nama resmi di tahap 7 muncul SENDIRIAN — tidak ada elemen lain yang
     bergerak bersamaan. kartu judul sudah menulis "DNS" di detik ~19; kalau
     nama ini datang bersama gerakan lain, ia terbaca sebagai pengulangan judul,
     bukan sebagai penegasan.
