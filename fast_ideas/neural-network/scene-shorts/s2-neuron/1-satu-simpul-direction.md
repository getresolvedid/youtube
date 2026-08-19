# 1-satu-simpul — hook

Anggaran: dihitung `npm run gen`. Target unggahan `0:00–0:03` (di sini ±5 dtk:
hook serial memakai satu frasa lebih untuk memperkenalkan ulang bendanya).

Frame pertama Short 2. **Jaringan yang sama dengan Short 1**, komponen yang sama
— bukan gambar mirip yang digambar ulang.

## Di layar

1. jaringan tiga lapis terlihat utuh, redup, sudah bergerak sedikit. satu simpul
   di lapis tengah menyala di antara yang lain.

2. kamera masuk ke simpul itu sampai ia memenuhi sepertiga tengah frame.
   isinya masih gelap — belum ada apa pun di dalamnya. teks layar:
   **APA ISI SATU SIMPUL?**

## Kamera

Dorongan besar dan mantap ke simpul terpilih (`scale` 1,0 → 2,2), berhenti mulus
sebelum teksnya jatuh. Yang dijelaskannya: Short ini terjadi DI DALAM benda yang
Short 1 tunjukkan dari luar.

## Gerak

- simpul terpilih: nyala naik 0,4 dtk, `E.expoOut`
- dorongan: `E.sineInOut` — mendekat, bukan mendarat
- teks: `masuk()` setelah dorongan berhenti, di frame yang sudah diam

## Kotak aman

Simpul besar berhenti **di tengah kotak aman**, bukan di tengah kanvas: sisa
frame bawah dipakai kartu hasil di scene 4–5, dan yang di bawah `y 1480`
tertutup judul serta nama channel.

## Catatan

- **Simpulnya kosong di dalam, dan itu disengaja.** Isi yang sudah tergambar di
  detik nol membuat empat scene sesudahnya cuma memberi label pada yang sudah
  terlihat.
- **Kata "neuron" belum jatuh** (HARD RULE 6) — namanya milik scene 5.
- Frame terakhir: simpul besar kosong di tengah. `2-tiga-masuk` memakainya di
  posisi yang sama persis.
