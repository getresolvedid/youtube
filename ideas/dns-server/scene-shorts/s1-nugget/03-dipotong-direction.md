Anggaran: mulai 8,74 dtk · durasi 5,70 dtk (estimasi, VO belum jadi).
Dua beat. **Scene yang mendirikan panggung Short ini** — enam scene sesudahnya
memakai ruang yang sama persis dan tidak pernah mendirikannya lagi.

1. namanya dipecah (beat 0):
   - garis putus-putus turun di tiap titik; nama pecah jadi tiga potongan yang
     berdiri sendiri
   - bilah alamat memudar keluar bersamaan — setelah ini yang dibahas bentuk
     namanya, bukan tempat mengetiknya
   (VO: "Coba bayangkan namanya dipotong di tiap titik.")

2. loketnya berdiri (beat 1):
   - siluet komputer naik di kanan bawah — itu kamu, anak tangga terbawah
   - tiga loket naik dari bawah sebagai siluet redup, makin ke atas makin kecil
     dan makin ke kiri
   - belum ada yang menyala, belum ada garis yang menghubungkannya ke potongan
   (VO: "Tiap potongan punya loketnya sendiri.")

teks di layar:
   beat 0 → "Potong di tiap titiknya."
   beat 1 → "Tiap potongan punya loketnya."

catatan komposisi:
   - **loketnya masuk sebagai siluet, belum menyala.** Yang menyala di scene ini
     cuma potongannya. Loket yang langsung terang membuat scene 4 tidak punya apa
     pun untuk dinyalakan, dan tiga payoff berikutnya kehilangan tangganya.
   - **arah tangganya mengikat**: bawah = kamu, atas = pemilik situs, sama persis
     dengan video panjang. Membaliknya memutus scene 4, 5, 6, dan 7 sekaligus.
   - miring ke kiri, bukan lurus menumpuk — supaya garis dari potongan ke
     loketnya tidak pernah menyilang (alasan lengkapnya di `../tangga-tegak.tsx`).
   - komputer di anak tangga terbawah memakai `<Komputer>` dari
     `../../panggung-loket.tsx`, bukan gambar baru.

motion:
   - garis pecah: tween 0→1, `expoOut`, 0,55 dtk, mulai beat 0 + 0,1
   - bilah alamat: opacity 1→0, 0,4 dtk, mulai beat 0
   - komputer & loket: `masuk()` geser 40px dari bawah, `expoOut`, 0,6 dtk,
     stagger 0,12 dtk dari bawah ke atas — urutannya mengajarkan arah tangganya
