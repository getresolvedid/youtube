Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Satu baris VO = satu tahap.

Tutup Short 4, dan sambungan loop-nya.

1. isi kedua bidang memudar; yang tersisa cuma dua namanya. keduanya merapat
   sampai bertemu di tengah, dan di titik pertemuannya muncul garis miring:
   `TCP` `/` `IP`. sesudah itu diam.
   (VO: "Itulah mengapa kita sering mendengar istilah TCP/IP.")

motion:
   - isi memudar: `t()` pada opacity → 0, 0,5 dtk
   - merapat: **MELEBAR DULU** (`t()` pada x menuju jarak akhir), baru bertemu
     (`t()` pada y menuju satu garis) — dua gerakan berurutan, bukan diagonal.
     dikoreksi 2026-08-18 setelah `npm run tumpang`: urutan sebaliknya membuat
     kedua nama melewati titik yang sama persis di tengah frame dan saling
     menimpa penuh. melebar dulu juga lebih benar isinya — keduanya memang harus
     terpisah sebelum garis miring punya tempat untuk berdiri
   - garis miring: `masuk()` dengan `geser` 0 tepat saat keduanya bertemu
   - DIAM sampai scene habis

catatan:
   - **garis miringnya yang jadi payoff, bukan namanya.** nama "TCP/IP" sudah
     disebut di scene 1; yang baru di sini adalah penonton akhirnya tahu kenapa
     ada dua nama dan kenapa dipisah garis miring. karena itu ia muncul
     BELAKANGAN, setelah keduanya bertemu — bukan bersamaan.
   - **loop-nya lewat kedua nama itu.** frame terakhir Short ini dan frame
     pertamanya sama-sama `TCP` dan `IP` berdampingan; yang berubah cuma apakah
     penonton sudah tahu bedanya.
   - **frame terakhir harus DIAM** sebelum `99-closing` mengambil alih.
   - storyboard mengulang kalimat VO ini dua kali (di blok VO dan lagi di Scene
     05); dipakai sekali.
