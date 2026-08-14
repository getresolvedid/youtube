Anggaran: mulai 0,0 dtk · durasi 4,37 dtk (estimasi, VO belum jadi).
Satu beat. Frame pertama sudah bergerak, dan yang bergerak adalah kalimatnya
sendiri (docs/02 § Short 2 — Jebakan: "Ditulis besar di layar, apa adanya").

Panggung 1080×1920, kotak aman x 90–990 · y 240–1480 (docs/03 § Safe area Shorts).
Koordinat bersama seluruh Short ini ada di [`../jalur-tanya.tsx`](../jalur-tanya.tsx);
jangan menulis ulang angkanya di scene mana pun.

1. mitosnya memenuhi layar:
   - "Ganti DNS, / internet jadi kencang." masuk **per kata**, cepat, dua baris
     yang patahannya dipilih sendiri di `BARIS_MITOS` — bukan diserahkan ke
     pembungkus otomatis
   - di bawahnya, lima bilah kecepatan tumbuh dari kiri ke kanan, makin tinggi:
     itu yang **dijanjikan** mitosnya
   (VO: "Ganti D N S, internet kamu jadi lebih kencang.")

teks di layar:
   kalimat mitosnya ITU teksnya. Tidak ada label "MITOS", tidak ada tanda kutip
   besar — begitu dilabeli, penonton yang mempercayainya langsung tahu ia sedang
   disalahkan, dan scene 2 kehilangan efeknya.

catatan komposisi:
   - **masuk per KATA, bukan per huruf.** Mengetik huruf demi huruf memakan detik
     yang tidak dipunya Short.
   - **bilah kecepatannya netral (`--ink-1`), belum aksen.** Aksen di Short ini
     dipakai untuk yang BENAR; mitosnya tidak boleh tampil sebagai kesimpulan.
   - **jangan menaruh tanda silang, panah, atau apa pun yang membantah di scene
     ini.** Bantahan seluruhnya milik scene 2.
   - **tidak ada nomor loket yang ditulis di layar.** Deretan angka yang beredar
     sebagai tips akan mengubah Short ini jadi rekomendasi setelan, padahal
     isinya justru bahwa yang dijanjikan tips itu keliru.
   - mitosnya menempati pita yang sama dengan teks di layar scene lain (y 250–505)
     — tidak ada yang melompat saat scene berganti.

motion:
   - kata masuk: opacity 0→1, `expoOut`, 0,4 dtk, stagger 0,14 dtk
   - bilah janji: tumbuh 0→1, `backOut(1.4)`, mulai 0,5 dtk, durasi 1,4 dtk
   - tidak ada gerak keluar — potongan ke scene 2 keras
