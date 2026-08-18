Anggaran: mulai 121,47 dtk · durasi 12,31 dtk (estimasi, VO belum jadi).
Dua baris VO = dua tahap.

Scene terakhir sebelum tanda brand. **Ini bukan `[case]` dalam arti docs/02** —
alasannya di [naskah.md](../naskah.md) dan `10-definisi-vo.md`, bukan di sini.

1. layar bersih. gembok besar di tengah. lalu benda-benda sehari-hari muncul
   MENGELILINGINYA, satu per satu, di lingkaran: gelembung chat, HP, laptop,
   halaman web, dokumen. sesudah semuanya berdiri, judul dan definisinya
   mendarat — gembok dan ikonnya MUNDUR ke belakang, tidak dihapus.
   (VO: "Jadi, enkripsi adalah proses mengubah data menjadi bentuk yang tidak mudah dibaca tanpa kunci yang tepat.")
   TEKS LAYAR: "APA ITU ENKRIPSI?" lalu di bawahnya "Mengubah data menjadi
   bentuk yang tidak mudah dibaca tanpa kunci yang tepat."

2. teksnya memudar. gembok kembali ke depan dan MENUTUP di sekeliling satu
   ikon isi. di bawahnya satu baris terakhir mendarat.
   (VO: "Itulah mengapa enkripsi penting untuk melindungi informasi kita di dunia digital.")
   TEKS LAYAR: "ENKRIPSI = MELINDUNGI DATA"

motion:
   - ikon mengelilingi gembok: `masuk()` dengan `urutan`, jeda 0,1 — mereka
     berdatangan berurutan searah jarum jam, bukan serentak. posisinya DITULIS
     di larik, bukan dihitung dari acak
   - judul & definisi: `masuk()` geser 24, judul dulu lalu definisinya
     (arahan user: "The first line appears. Then the definition appears
     underneath. Do not animate every word individually")
   - gembok mundur: satu tween opasitas 1 → 0,25 dan skala 1 → 0,8 di rentang
     yang sama. ia masih di sana, cuma tidak lagi yang dibaca
   - gembok menutup tahap 2: nilai `terbuka` 1 → 0 — sengkangnya turun dan lurus
   - frame terakhir DITAHAN ~1 detik tanpa gerakan sebelum scene ini habis
     (arahan user), lalu `<TandaBrand/>` mengambil alih

catatan:
   - **IKON-IKONNYA MEMENUHI HARD RULE 2, dan itu bukan formalitas.** shot 10B
     di arahan user isinya teks saja — judul besar plus satu kalimat definisi.
     layar penuh teks adalah slide presentasi, dan penonton YouTube menutup
     slide. karena itu gembok dan ikonnya TIDAK dihilangkan saat definisinya
     mendarat; keduanya tinggal di frame, cuma mundur.
   - **ikonnya dari `shared/Icons.tsx`**, bukan digambar ulang di sini — kalau
     ada yang belum ada di sana, tambahkan ke sprite-nya supaya episode lain
     ikut kebagian (HARD RULE 2).
   - **tidak ada logo getresolved di scene ini.** ia terbatas di kartu judul dan
     tanda brand ([docs/10](../../../docs/10-scene-standar.md)) — dan tanda
     brand-nya justru datang tepat sesudah scene ini.
   - **"ENKRIPSI = MELINDUNGI DATA" memakai kata yang dilarang kosakata L1**, di
     tempat yang paling diingat penonton. usulan penggantinya di
     `10-definisi-vo.md`. **belum diubah.**
   - **definisi di layar dan definisi di VO sama persis, dan itu disengaja** —
     penonton mendengar dan membacanya bersamaan. ini kebalikan dari masalah di
     `01-pesan-dikirim`, tempat teks layar dan VO berbunyi berbeda dan saling
     menutupi.
