Anggaran: mulai 45,12 dtk · durasi 5,25 dtk (estimasi, VO belum jadi).
Dua beat. Satu kalimat keputusan, tanpa pagar. Penonton harus bisa
mengulanginya ke temannya besok.

Frame pertamanya = frame terakhir scene 8 dikurangi loket lama: yang tersisa
loket baru dan papannya, di piksel yang sama.

1. menggantinya boleh (beat 0):
   - loket lama dan papannya memudar keluar; loket baru tetap berdiri
   - **tidak ada tanda silang di mana pun** — menggantinya memang tidak salah
   (VO: "Jadi menggantinya boleh.")

2. yang kamu beli (beat 1):
   - dua label mendarat berurutan di kanan loket: "terbuka" dengan centang,
     "kencang" dengan silang
   - teks CTA kecil muncul di bawah garis lantai, **tidak diucapkan**
   (VO: "Asal kamu tahu yang kamu beli itu apa.")

teks di layar:
   beat 0 → "Menggantinya boleh."
   beat 1 → "Asal tahu yang kamu beli."
   ditambah dua label besar di panggung dan satu baris CTA kecil.

catatan komposisi:
   - **tidak ada tanda silang pada loketnya sendiri.** Short ini membantah alasan
     orang menggantinya, bukan tindakannya. Menyilang loketnya membuat penonton
     yang sudah mengganti merasa disalahkan, dan orang yang merasa disalahkan
     tidak membagikan videonya.
   - **CTA tidak diucapkan**, cuma teks di layar. Kalimat CTA memakan detik
     terakhir yang justru paling menentukan apakah kalimat keputusan di atas
     menempel.
   - CTA-nya ditaruh **di bawah garis lantai** (y 1460), satu-satunya jalur yang
     tidak berpotongan dengan loket maupun papannya.
   - centang dan silangnya memakai `<Tanda>` yang sama dengan scene 6 — bentuk
     yang sama, jadi penonton tidak perlu belajar simbol baru di detik terakhir.
   - **bukan rangkuman.** Tidak ada "jadi intinya" — bagian yang selesai adalah
     tempat orang merasa boleh berhenti, dan di Short itu berarti berhenti
     sebelum loop-nya sempat memutar (HARD RULE 7).

motion:
   - loket lama & papannya: opacity 1→0, 0,4 dtk, mulai beat 0
   - label "terbuka": `masuk()` geser 20px, 0,4 dtk, mulai beat 1 + 0,1
   - label "kencang": `masuk()` geser 20px, 0,4 dtk, mulai beat 1 + 0,45
   - CTA: `masuk()` geser 14px, 0,4 dtk, mulai beat 1 + 1,1
