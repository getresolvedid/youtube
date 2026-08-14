Anggaran: mulai 0,0 dtk · durasi 2,97 dtk (estimasi, VO belum jadi).
Satu beat. Frame pertama sudah bergerak, dan yang bergerak adalah kalimatnya
sendiri (docs/02 § Short 2 — Jebakan: "Ditulis besar di layar, apa adanya").

Panggung 1080×1920, kotak aman x 90–990 · y 240–1480 (docs/03 § Safe area Shorts).
Koordinat bersama seluruh Short ini ada di [`../meja-kerja.tsx`](../meja-kerja.tsx);
jangan menulis ulang angkanya di scene mana pun.

1. mitosnya memenuhi layar:
   - kalimat "RAM lebih besar = komputer lebih cepat" masuk sebagai kutipan,
     `--fs-display`, dua sampai tiga baris, di sepertiga atas layar
   - masuknya per kata, cepat — bukan mengetik huruf demi huruf (mengetik
     memakan detik yang tidak dipunya Short)
   - di belakangnya, batang ram berjajar bertambah dari kiri ke kanan:
     satu, dua, empat batang — makin banyak, dan itu yang dijanjikan mitosnya
   (VO: "Ram lebih besar, komputer lebih cepat.")

teks di layar:
   kalimat mitosnya ITU teksnya. Tidak ada label "MITOS" atau tanda kutip
   besar — begitu dilabeli, penonton yang mempercayainya langsung tahu ia
   sedang disalahkan, dan scene 2 kehilangan efeknya.

catatan komposisi:
   - batang ram memakai `<Ic n="ram" />`, bukan gambar baru.
   - warnanya masih netral (`--ink-1`), belum aksen. Aksen di Short ini dipakai
     untuk yang BENAR; mitosnya tidak boleh tampil sebagai kesimpulan.
   - jangan menaruh tanda silang, panah, atau apa pun yang membantah di scene
     ini. Bantahan seluruhnya milik scene 2.

motion:
   - kata masuk: `masuk()` geser 24px, stagger 0,06 dtk, `expoOut`
   - batang ram: `backOut(1.5)` per batang, stagger 0,18 dtk
   - tidak ada gerak keluar — potongan ke scene 2 keras
