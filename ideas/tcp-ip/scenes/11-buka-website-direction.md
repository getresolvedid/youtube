Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Tujuh baris VO = tujuh tahap, tapi **satu gerakan tanpa jeda** — bukan tujuh
adegan yang disambung.

Scene terpanjang, dan satu-satunya yang memakai semua yang sudah ditunjukkan.
Kamera bergerak terus dari kiri ke kanan lalu balik, sekali jalan.

1. peramban di kiri, bilah alamatnya kosong. `contoh.com` diketik huruf demi
   huruf. kursor berkedip di ujungnya.
   (VO: "Sekarang bayangkan kamu mengetik sebuah alamat website di browser.")

2. **peramban BERHENTI.** bilah pemuatannya diam di ujung kiri. tidak ada yang
   bergerak selama satu ketukan penuh.
   (VO: "Browser membutuhkan alamat server tujuan.")

3. tulisan `contoh.com` terbang ke satu simpul di atas, lalu kembali ke bilah
   sebagai `93.184.0.10`. bilah pemuatan mulai berjalan.
   (VO: "DNS membantu menemukan alamat IP dari nama website tersebut.")

4. dari peramban keluar tiga potongan bernomor, berangkat ke kanan lewat jalur
   yang sudah dikenal.
   (VO: "Setelah mengetahui tujuan, data dikirim melalui jaringan…")

5. potongan melewati tiga persimpangan yang menyala berurutan saat dilewati,
   lalu masuk ke server di kanan. tiap potongan yang masuk mendapat centang.
   (VO: "TCP dapat membantu memastikan data diterima dengan benar…")

6. server menyala. tiga potongan baru keluar dari server dan berjalan **KE
   KIRI** — arah yang sejak scene 7 cuma dipakai untuk sesuatu yang kembali.
   (VO: "Server kemudian mengirimkan data kembali ke perangkatmu.")

7. potongan masuk ke peramban; halaman terisi — judul, gambar, paragraf.
   kamera mundur pelan.
   (VO: "Semua proses ini terjadi dalam waktu yang sangat singkat.")

motion:
   - mengetik: jumlah huruf = `Math.floor(t() * panjang)` — bukan animasi lebar,
     supaya hurufnya benar-benar bertambah satu per satu
   - kursor: `tPP()` pada opacity, periode 0,9 dtk
   - berhenti di tahap 2: TIDAK ada tween yang berjalan sama sekali. keheningan
     itu isinya
   - DNS: `t()` pada x/y tulisan menuju simpul lalu kembali, `E.power2out`
   - potongan berangkat & pulang: `t()` pada x, tiga potongan berselang 0,12 dtk
   - persimpangan: `nyala` dipicu POSISI potongan, sama seperti scene 4
   - halaman terisi: `masuk()` tiap elemen dengan `urutan` 0..3

catatan:
   - **tahap 2 gampang hilang, dan tanpa itu scene ini rusak.** jeda di mana
     peramban tidak bisa melanjutkan itulah yang membuat tahap 3 terasa sebagai
     jawaban. kalau peramban langsung jalan, simpul DNS cuma jadi langkah
     tambahan yang tidak jelas gunanya.
   - **tahap 6 memakai arah kanan → kiri.** ia bekerja gratis karena penonton
     sudah dilatih sejak scene 7 bahwa arah itu berarti "kembali". jangan
     memakai arah itu di scene lain.
   - **laptopnya sama dengan scene 1.** peramban di sini bagian dari benda yang
     sama; kalau digambar sebagai layar melayang, kepulangan ke scene 1 hilang.
   - scene ini melewati batas T05 (naskah.md § Penyimpangan tercatat).
   - frame terakhir: halaman utuh di kiri, server di kanan, jalur tenang.
