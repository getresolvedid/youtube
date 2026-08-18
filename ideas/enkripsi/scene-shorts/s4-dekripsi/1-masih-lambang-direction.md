Anggaran: mulai 0 dtk · durasi ±5,3 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

1. HP penerima, dekat — mengisi sebagian besar frame. layarnya menyala, dan yang
   tampil `X7K9@2#L8$Q`, bukan kalimat. kamera merapat pelan.
   (VO: "Satu pesan sampai di HP temanmu, tapi isinya masih berupa lambang.")
   TEKS LAYAR: "Sampai — tapi" / "belum terbaca."

motion:
   - merapat: `kamera({skala})` 1,0 → 1,08, `E.expoOut`. pelan dan sedikit
   - lambang: `masuk()` opasitas saja, tanpa geser — ia sudah ada di layar sejak
     frame pertama, cuma menegas
   - tidak ada gerakan lain

catatan:
   - **isinya HARUS masih lambang di frame pertama.** kalau sudah terbaca,
     seluruh Short ini kehilangan alasannya ada.
   - **tidak ada kunci, tidak ada kotak proses.** keduanya di scene 2 dan 3.
   - **tidak ada sosok penerima di sini** — ia baru muncul di scene 3, saat
     kalimatnya kembali dan ada yang bisa membacanya.
   - **koordinat HP-nya dari `../panggung-short.tsx`**, bukan diketik ulang:
     Short 1 dan 3 menutup di HP yang sama, dan Short 4 membuka di HP itu juga.
