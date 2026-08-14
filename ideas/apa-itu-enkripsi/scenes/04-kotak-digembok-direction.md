Anggaran: mulai 46,53 dtk · durasi 14,96 dtk (estimasi, VO belum jadi).
Lima baris VO = lima tahap.

Frame pertamanya = frame terakhir `03-jalan-umum`: kotak terang sendirian di
tengah jalan yang meredup, kotak-kotak lain masih ada tapi tenggelam.

Scene ini **memberi penonton jawaban yang salah, utuh dan meyakinkan.** Tidak
ada satu pun tanda bahwa ada yang keliru; keliruannya milik scene 5.

1. kotak yang sama, sendirian. tutupnya TERBUKA — untuk pertama kalinya sejak
   scene 1 isinya terlihat lagi: satu surat dengan baris tulisan yang terbaca.
   (VO: "Yang paling masuk akal cuma satu.")

2. surat masuk ke dalam kotak, tutupnya menutup, dan gembok menjepit di bibirnya.
   satu gerakan berurutan, tanpa jeda di antaranya.
   (VO: "Suratnya ditaruh di dalam kotak, kotaknya dikunci.")

3. jalan menyala lagi. kotak berangkat ke kanan dan berpindah tangan persis
   seperti di scene 1 — lintasan yang sama, jarak yang sama, tempo yang sama.
   (VO: "Kurirnya tetap membawa, tapi sekarang cuma membawa.")

4. satu tangan di tengah MENAHAN kotaknya. membolak-balik, menarik gemboknya,
   mengangkat tutupnya. tidak terjadi apa-apa. lalu ia melepasnya lagi.
   (VO: "Dia bisa memegang kotak itu seharian dan tetap tidak tahu apa-apa.")

5. kotak berhenti di tengah jalan, tergembok, terang, utuh. semua tenang.
   (VO: "Kelihatannya selesai.")

motion:
   - tutup menutup: rotasi tutup 0 -> -100 derajat pada engsel belakang,
     `E.power2in`, 0,4 dtk
   - gembok menjepit: `t()` turun 40 px + `E.backOut(2)` di ujung, disusul
     `getar()` kecil sekali — bunyi klik yang terlihat
   - lintasan tahap 3: koordinat x yang SAMA PERSIS dengan scene 1
     (`posTangan()`), bukan lintasan baru yang mirip
   - tahap 4: `tPP()` rotasi kotak ±7 derajat, dua kali, lalu `getar()` pada
     gembok saat ditarik

catatan:
   - **isi kotak diperlihatkan ke PENONTON, bukan ke tangan-tangan itu.** tahap 1
     terjadi di tengah jalan yang sepi karena penonton perlu ingat ada apa di
     dalamnya; yang di jalan tidak pernah melihatnya.
   - **tahap 4 wajib ada.** kalau tangan cuma lewat, penonton mengira gemboknya
     belum pernah diuji, dan kegagalan di scene 5 terasa seperti tuduhan.
   - **tidak ada kunci di layar sama sekali di scene ini.** kunci baru muncul di
     scene 5, dan kemunculannya di sana yang jadi kejutannya.
   - **jangan menambahkan tanda "aman" apa pun** — tidak ada centang hijau, tidak
     ada perisai. tahap 5 harus terasa tenang, bukan menang.
   - frame terakhir (kotak tergembok diam di tengah jalan) adalah frame pertama
     scene 5. jangan menutup scene ini dengan apa pun yang memudar.
