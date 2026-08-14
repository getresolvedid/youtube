Anggaran: mulai 38,10 dtk · durasi 7,02 dtk (estimasi, VO belum jadi).
Dua beat. **Beat yang paling gampang hilang saat memotong durasi, dan yang
paling tidak boleh hilang**: tanpa dia, Short ini berakhir sebagai saran
terselubung untuk mengganti loket.

1. papannya terisi (beat 0):
   - lantai dan loket baru kembali terang penuh
   - papan catatan tumbuh tepat di atas loket baru, lalu terisi baris demi baris
     tiap kali satu nama lewat
   (VO: "Dan loket barunya tetap melihat semua yang kamu tanyakan.")

2. loket lama juga (beat 1):
   - sosok dan tempat tujuan memudar keluar — yang dibahas bukan lagi
     perjalanannya
   - loket lama masuk di kanan dengan papan yang **sama persis**, sama-sama penuh
   - label kecil di atas keduanya: "loket lama" dan "loket baru"
   (VO: "Yang berubah cuma siapa yang menjawab.")

teks di layar:
   beat 0 → "Loketnya melihat semua yang kamu tanya."
   beat 1 → "Yang berubah cuma siapa yang menjawab."

catatan komposisi:
   - **dua papan yang SAMA-SAMA PENUH, bukan satu yang lebih penuh.** Begitu
     salah satunya digambar lebih penuh, Short ini berubah jadi rekomendasi
     memilih loket — dan itu klaim tentang pihak tertentu yang tidak punya
     sumber.
   - **tidak menyebut satu pun penyedia**, di layar maupun di VO. Nama layanan
     mana pun akan membuat beat ini terbaca sebagai tuduhan, dan tuduhan butuh
     sumber yang tidak dipunya Short lima puluh detik.
   - papannya memakai `<Papan>` dari `../../panggung-loket.tsx`, gambar yang sama
     persis dengan yang dipakai `scenes/10-polos` dan `scenes/12-ganti-loket` di
     video panjang. Kesamaan itu yang membuat beat ini mendarat tanpa perlu
     dijelaskan lagi — tapi Short ini tetap berdiri sendiri: penonton yang belum
     menonton episodenya cuma melihat papan yang terisi, dan itu sudah cukup.
   - **sosok dan tujuan wajib keluar sebelum loket lama masuk.** Keduanya
     memperebutkan piksel yang sama di sisi kanan; ini satu-satunya tempat di
     Short ini yang panggungnya berubah, dan perubahannya dibayar dengan
     memudarkan yang lama lebih dulu, bukan menumpuknya.

motion:
   - loket & lantai terang lagi: opacity 0,28→1, 0,35 dtk, mulai beat 0
   - papan tumbuh: `masuk()` geser 30px, `expoOut`, 0,5 dtk, mulai beat 0 + 0,3
   - baris papan terisi: satu baris tiap 0,45 dtk, mulai beat 0 + 0,8
   - sosok & tujuan keluar: opacity 1→0, 0,4 dtk, mulai beat 1
   - loket lama + papannya masuk: `masuk()` geser 40px, 0,5 dtk,
     mulai beat 1 + 0,25 — **barisnya langsung penuh**, tidak diisi ulang satu
     per satu; yang dibandingkan hasilnya, bukan prosesnya
