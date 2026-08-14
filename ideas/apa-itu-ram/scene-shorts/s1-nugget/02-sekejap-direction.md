Anggaran: mulai 2,97 dtk · durasi 6,4 dtk (estimasi, VO belum jadi).
Dua beat, dua tahap. Kesinambungan: chip mulai PERSIS di posisi & ukuran akhir
`01-menunggu` — potongannya keras, jadi kesinambungan itu satu-satunya yang
menyambungkan keduanya jadi satu ruangan.

1. chip butuh sesuatu:
   - sebuah berkas dipanggil dari luar bingkai bawah — garis panggil terulur
     dari chip ke arah gelap di tepi bawah layar, ujungnya belum sampai
   - garisnya `--ink-2` putus-putus: belum ada apa-apa di sana, cuma arah
   (VO: "Setiap kali dia butuh sesuatu yang belum ada di dekatnya,")

2. berhenti:
   - denyut chip berhenti total; garis panggil menggantung di tempat
   - hitungan diam melompat naik — angkanya melompat, bukan merayap
   (VO: "dia berhenti, dan menunggu.")

teks di layar:
   beat 0 → "butuh sesuatu yang jauh"
   beat 1 → "berhenti"  (ganti keras, bukan crossfade)

catatan komposisi:
   - yang di ujung garis TIDAK diperlihatkan. Tempatnya baru berdiri di
     `03-satu-detik`; memperlihatkannya di sini membuang undangan scene itu.
   - garis panggil menunjuk KE BAWAH karena di 9:16 jarak dibaca vertikal, dan
     ketiga tempat di scene 3–7 berdiri dari atas (dekat) ke bawah (jauh).
     Arah itu dipakai konsisten sampai scene terakhir.

motion:
   - garis panggil: `gambarGaris()`, `power2out`, 0,5 dtk
   - berhenti denyut: keras, tanpa easing keluar
   - lompatan hitungan: nilai baru langsung, tanpa tween — merayap terbaca
     sebagai stopwatch, melompat terbaca sebagai "banyak yang terlewat"
