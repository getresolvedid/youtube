Anggaran: mulai 31,54 dtk · durasi 8,97 dtk (estimasi, VO belum jadi).
Dua beat. Scene terpanjang Short ini, dan satu-satunya yang memperlihatkan
mekanismenya bergerak.

1. yang lama dikembalikan:
   - satu berkas lama diangkat dari meja, dibawa TURUN, dan masuk ke lemari di
     tepi bawah layar — lemarinya naik sedikit ke dalam bingkai supaya
     perjalanannya terlihat sampai tujuan
   - berkas yang menggantung sejak scene 6 akhirnya mendarat di tempat kosong
     yang baru saja ditinggalkan
   (VO: "Jadi yang lama dikembalikan dulu ke gudang, biar ada tempat.")

2. dijemput lagi, dan iramanya patah:
   - berkas yang tadi dibuang dibutuhkan lagi: ia naik kembali dari lemari,
     dan berkas lain harus turun untuk memberi tempat
   - tangan meneruskan pekerjaannya TAPI berhenti menunggu di antara gerakan —
     tiap kali ia butuh berkas yang sedang di bawah, ia diam sampai berkasnya
     sampai
   - jedanya tidak seragam lagi: itulah patahnya
   (VO: "Begitu dibutuhkan lagi, dijemput lagi. Itu yang kamu rasakan lambat.")

teks di layar:
   beat 0 → "dikembalikan ke gudang"
   beat 1 → "dijemput lagi"  + hitungan bolak-balik kecil yang terus bertambah
            di sudut, dan tidak pernah berhenti sampai scene habis

catatan komposisi:
   - **patahnya irama tangan adalah bukti scene ini**, bukan berkas yang
     naik-turun. Naik-turun cuma kejadian; yang dirasakan penonton di
     komputernya sendiri adalah menunggu.
   - iramanya tetap dibaca dari konstanta yang sama dengan scene 4 & 5 — yang
     ditambahkan cuma jeda tunggu di antaranya. Kalau iramanya diganti dengan
     angka baru, perbandingan tiga scene ini bubar.
   - lemari naik ke dalam bingkai, tidak dipindah ke tengah. Ia harus tetap
     terasa "di bawah sana", jauh dari meja.

motion:
   - berkas turun: `power1in` 0,55 dtk — berangkatnya enggan, jatuhnya cepat
   - berkas naik: `power2out` 0,7 dtk, lebih lambat daripada gerak tangan mana
     pun, supaya penonton merasakan tangan menunggunya
   - jeda tunggu tangan: konstanta, bukan acak (`Math.random()` dilarang)
   - hitungan bolak-balik: turunan frame, tidak menyimpan state
