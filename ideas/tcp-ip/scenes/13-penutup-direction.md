Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Scene terakhir yang bicara. Sesudahnya `99-closing` — tanda brand standar, tanpa
VO (docs/10).

1. semua isi scene 12 menyusut ke tengah jadi SATU titik cahaya, lalu titik itu
   mekar lagi — kali ini jadi peta perangkat: ponsel, laptop, server, awan,
   halaman, potongan kiriman, semuanya tersambung.
   (VO: "Jadi, setiap kali kamu membuka website, mengirim pesan…")

2. kamera menjauh perlahan dan terus menjauh. peta mengecil jadi bentuk abstrak.
   kartu akhir berdiri diam di tengah: `TCP/IP` dan satu baris di bawahnya.
   (VO: "Dan salah satu fondasi terpenting di balik komunikasi tersebut…")

motion:
   - menyusut: `t()` pada skala 1 → 0,02 dengan `E.power2in`, cepat
   - mekar: `t()` pada skala 0,02 → 1 dengan `E.expoOut`, lebih lambat daripada
     menyusutnya — asimetri itu yang membuatnya terbaca "membuka", bukan
     "berkedip"
   - menjauh: `t()` pada skala kamera 1 → 0,74, durasi panjang, `E.sineInOut`
   - kartu akhir: `masuk()` sekali, lalu DIAM sampai scene habis

catatan:
   - **beat 1 wajib makin tenang, bukan makin ramai.** storyboard menyebutnya
     eksplisit: jangan menambah elemen baru setelah kalimat terakhir. yang
     bergerak setelah itu cuma kamera.
   - **titik cahaya di awal adalah gerakan akhir scene 12 yang DIBALIK.**
     mengecil lalu mekar; itu yang menyambung keduanya tanpa transisi apa pun.
   - **frame terakhir harus diam.** `99-closing` mengambil alih dengan tanda
     brand; scene yang masih bergerak di frame terakhirnya membuat potongan ke
     sana terbaca sebagai terpotong.
