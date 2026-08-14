Anggaran: mulai 172,52 dtk · durasi 29,97 dtk (estimasi, VO belum jadi).
Sembilan baris VO = sembilan tahap.

Lapis L2 pertama di episode. Daftar yang sama, dilihat sebagai **urutan** dan
bukan sebagai kumpulan. Ini scene yang paling berguna buat penonton yang
benar-benar pernah menulis daftar seperti itu.

Daftar jadi benda utama: kamera tetap di dekatnya sepanjang scene, penjaga dan
dinding tinggal jadi siluet di tepi frame.

1. daftar berdiri utuh di tengah frame. semua barisnya sama terangnya, belum ada
   yang menyala.
   (VO: "Dan daftar itu tidak dibaca sekaligus.")

2. satu ketukan masuk. penanda baca turun dari baris teratas, berhenti sejenak
   di tiap baris, satu demi satu.
   (VO: "Dibacanya dari atas, satu baris demi satu baris.")

3. penanda berhenti di baris yang cocok. baris itu menyala aksen.
   (VO: "Begitu ketemu baris yang cocok, dia berhenti.")

4. semua baris di bawahnya meredup sekaligus. penandanya tidak pernah sampai ke
   sana, dan itu terlihat dari posisinya yang berhenti.
   (VO: "Yang di bawahnya tidak pernah terbaca.")

5. sebuah baris baru DISELIPKAN di atas baris pertama. seluruh daftar bergeser
   turun satu langkah.
   (VO: "Sekarang, satu baris longgar diselipkan di paling atas.")

6. baris baru itu menyala warna peringatan, dan lebarnya penuh — cocok untuk apa
   pun yang datang.
   (VO: "Bunyinya boleh untuk siapa saja.")

7. kamera mundur sedikit. seluruh daftar terlihat utuh: masih rapi, masih
   panjang, tidak ada yang hilang.
   (VO: "Sisa daftarnya masih ada, masih rapi, masih panjang.")

8. ketukan demi ketukan masuk. semuanya berhenti di baris pertama, semuanya
   lewat. penanda baca tidak pernah turun lagi.
   (VO: "Cuma tidak ada satu pun yang sempat dibaca lagi.")

9. seluruh daftar di bawah baris sisipan meredup jadi abu-abu dan TINGGAL begitu
   sampai akhir scene.
   (VO: "Satu baris di tempat yang salah, dan penjaganya berhenti memilih.")

motion:
   - penanda baca: `t()` pada y melintasi posisi baris, `E.linear` dengan jeda
     kecil per baris — bacaan yang mulus terbaca sebagai geseran, bukan sebagai
     membaca
   - baris meredup: satu opasitas untuk grup baris di bawah `sorot`
   - sisipan: tinggi baris baru 0 -> penuh + seluruh grup daftar bergeser turun
     dalam tween yang SAMA, supaya terbaca sebagai mendorong
   - kamera mundur: `kamera({skala})` 1,25 -> 1,0, `E.expoOut`
   - aliran tahap 8: tundaan tetap antar ketukan, tidak pernah acak

catatan:
   - **baris longgar itu tidak digambarkan sebagai sabotase.** tidak ada tangan
     misterius, tidak ada warna merah. warnanya peringatan, bukan bahaya — yang
     menyelipkannya biasanya orang yang sedang buru-buru, dan itu yang membuatnya
     sering terjadi.
   - **penanda baca harus BERHENTI, bukan memudar.** posisinya yang berhenti di
     tengah daftar adalah seluruh isi tahap 4; kalau ia memudar, yang terbaca
     "pembacaannya selesai".
   - **daftar tidak boleh dihapus di tahap 9.** ia harus tetap terlihat lengkap
     dan abu-abu. daftar yang menghilang berarti aturannya dihapus; daftar yang
     abu-abu berarti aturannya ada dan tidak berlaku, dan itu jauh lebih dekat ke
     kenyataannya.
   - nol angka: tidak ada "baris ke berapa", tidak ada jumlah baris di layar.
