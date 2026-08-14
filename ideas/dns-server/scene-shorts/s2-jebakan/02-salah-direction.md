Anggaran: mulai 4,37 dtk · durasi 4,37 dtk (estimasi, VO belum jadi).
Dua beat. Frame pertamanya = frame terakhir scene 1: kalimat mitos utuh, bilah
kecepatan penuh, tidak ada yang bergeser.

1. dicoret (beat 0):
   - dua garis coret **ditarik** menembus kedua baris mitosnya, cepat, dari kiri
     ke kanan
   - bilah kecepatan di bawahnya jatuh balik ke nol pada saat yang sama
   (VO: "Salah.")

2. layarnya dikosongkan (beat 1):
   - kalimat tercoret dan bilahnya meluncur keluar lewat atas layar
   - yang tersisa layar hampir kosong — ruang untuk gambaran baru di scene 3
   (VO: "Dan yang benar justru lebih berguna daripada itu.")

teks di layar:
   beat 0 → kalimat mitos yang sedang dicoret ITU teksnya
   beat 1 → "Yang benar lebih berguna."

catatan komposisi:
   - **coretnya digambar, bukan muncul jadi.** Garis yang tiba-tiba ada terbaca
     sebagai hiasan; garis yang ditarik terbaca sebagai keputusan.
   - **bentuk dan sudut coretnya dipatok di `../jalur-tanya.tsx`** (`SUDUT_CORET`)
     karena scene 7 harus memakai coretan yang SAMA PERSIS. Itu yang membuat
     scene 7 terbaca sebagai janji yang ditagih, bukan sebagai coretan baru yang
     kebetulan mirip.
   - **jangan menjelaskan apa pun di sini.** Godaan terbesarnya adalah langsung
     membocorkan "yang berubah cuma waktu bertanya". Itu milik scene 4;
     dibocorkan di sini, tiga scene bukti sesudahnya jadi pengulangan.
   - **"Salah." berdiri sendiri sebagai satu beat**, dan jeda sesudahnya yang
     bekerja. Jangan mengisi jeda itu dengan gerakan tambahan.

motion:
   - coret: dua garis, tween 0→1 bersamaan, `power4out`, 0,3 dtk, mulai beat 0
   - bilah janji: 1→0, `power2in`, 0,45 dtk, mulai beat 0 + 0,1
   - keluar ke atas: geser −340px + opacity 1→0, `power2in`, 0,5 dtk,
     mulai beat 1
   - teks pengganti: `masuk()` geser 20px, 0,4 dtk, mulai beat 1 + 0,35
