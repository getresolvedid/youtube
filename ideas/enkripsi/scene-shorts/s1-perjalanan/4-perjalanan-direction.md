Anggaran: durasi 5,25 dtk (estimasi, VO belum jadi).
Satu baris VO = satu tahap.

Scene dengan gambar paling panjang dan kalimat paling sedikit. Yang ditunjukkan
cuma satu hal, dan cuma satu hal yang boleh ditunjukkan: **ia berjalan, tidak
melompat.**

1. paket menyusuri simpul satu per satu, dari atas ke bawah. tiap simpul menyala
   sebentar saat paketnya sampai, lalu redup lagi. HP penerima mulai terlihat di
   ujung bawah jalur, masih jauh dan masih redup.
   (VO: "Data itu bisa melewati beberapa perangkat dan jaringan sebelum mencapai tujuannya.")
   TEKS LAYAR: "Lewat banyak tempat."

motion:
   - paket turun: satu `t()` pada y, `E.linear`. TIDAK melambat dan tidak
     berhenti di simpul mana pun — yang melambat terbaca sebagai pemeriksaan,
     dan tidak ada yang diperiksa di Short ini
   - nyala simpul: `nyalaSimpul(yPaket)` yang sama persis dengan scene 3
   - HP penerima: opasitas naik pelan sepanjang tahap, dari 0 ke 0,6 — ia
     MENDEKAT dalam arti terlihat, bukan bergerak

catatan:
   - **rutenya sengaja lurus dan sederhana** — arahan user: *"Do not make the
     route technically complicated."* Percabangan, antrean, atau rute alternatif
     mengajarkan hal yang tidak diajarkan Short ini.
   - **ini scene tempat menambah kalimat** kalau target 35–40 detik mengikat.
     gambarnya sudah panjang dan bisa menampung satu baris lagi tanpa terasa
     penuh — usulannya di `4-perjalanan-vo.md`.
   - **belum ada yang mengamati**, walaupun simpul jauh sudah terlihat. sosok
     ketiga di sini membuat scene 6 tinggal mengulang.
