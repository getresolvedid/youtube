Anggaran: mulai 16,20 dtk · durasi 6,14 dtk (estimasi, VO belum jadi).
Dua beat. **Gambar yang membuktikan seluruh Short ini.** Frame pertamanya =
frame terakhir scene 3: lantai, sosok, loket, dan tujuan di piksel yang sama.

1. bilah waktunya (beat 0):
   - bilah mendatar tergambar dari kiri ke kanan di y 1020, memenuhi lebar aman —
     itu waktu memuat satu halaman, utuh
   - potongan **paling pendek di paling depan** diberi aksen; pemisah tegak
     menandai batasnya
   - label kecil di bawahnya: "bertanya" di potongan pendek, "sisa perjalanannya"
     di sisanya
   (VO: "Bertanya itu cuma sekali, di paling awal.")

2. sisanya jalan sendiri (beat 1):
   - titik penanda berjalan di sepanjang bilah, dari batas potongan pendek sampai
     ujung kanan
   - sosok di lantai berjalan ke kanan seirama, **melewati loket tanpa berhenti**
     — dan loketnya tertinggal di belakang
   (VO: "Setelah alamatnya ketemu, kamu jalan sendiri.")

teks di layar:
   beat 0 → "Bertanya cuma sekali, di awal."
   beat 1 → "Sisanya kamu jalan sendiri."

catatan komposisi:
   - **panjang relatif adalah buktinya, dan itu menggantikan angka.** Berapa lama
     bertanya nama dan berapa besar porsinya dari pemuatan halaman adalah baris ⚠
     di `naskah.md § Sumber`. Jangan menambahkan satu label angka pun ke bilah ini
     sebelum pengukurannya jadi — dan kalau nanti jadi, angkanya masuk ke LAYAR,
     tidak pernah ke VO.
   - **bilahnya digambar sekali dan tidak pernah dibentuk ulang** sampai scene 6.
     Bilah yang panjangnya berubah antar-scene membuat penonton membandingkan
     bilah dengan bilah, bukan potongan dengan sisanya.
   - sosoknya berhenti di 740, **tidak menyentuh tempat tujuannya**. Sosok yang
     menempel ke bangunan terbaca sebagai sudah sampai, dan scene ini justru soal
     perjalanan yang masih jalan.
   - loketnya tetap menyala di pojok kiri. Meredupkannya di sini terlalu dini —
     scene 5 yang menggantinya.

motion:
   - bilah: tween 0→1, `power2out`, 0,7 dtk, mulai beat 0
   - aksen potongan tanya: opacity 0→1, 0,3 dtk, mulai beat 0 + 0,55
   - label: `masuk()` geser 14px, 0,35 dtk, stagger 0,1 dtk, mulai beat 0 + 0,7
   - titik penanda & sosok: tween 0→1 bersamaan, `power1inout`, 1,6 dtk,
     mulai beat 1 + 0,1 — keduanya **wajib seirama**; kalau tidak, bilahnya
     berhenti terbaca sebagai waktu perjalanan itu
