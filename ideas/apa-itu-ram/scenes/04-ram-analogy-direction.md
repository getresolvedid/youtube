Anggaran: mulai 30,95 dtk · durasi 13,25 dtk (estimasi, VO belum jadi).
Lima kalimat VO = lima tahap.

Frame pertama scene ini = frame terakhir `03-bolak-balik`: lemari di kiri
(skala 0,86), prosesor di kanan, siluet meja putus-putus di tengah. **Tidak ada
yang masuk atau menepi di sini** — panggungnya sudah berdiri, dan itu sebabnya
potongan kerasnya terbaca sebagai "lubangnya terisi", bukan sebagai layar baru.
Koordinatnya dipakai bersama lewat `ideas/apa-itu-ram/panggung-analogi.tsx`.

Versi pertama scene ini melakukan semuanya sendiri dalam 9,4 dtk — memperkenalkan
gudang, memindahkan berkas, menamai RAM. Terlalu buru-buru: masalahnya belum
terasa, jadi jawabannya terdengar seperti definisi. Perkenalan gudangnya sudah
dipindah ke scene 3 (HARD RULE 5); yang tersisa di sini murni jawabannya.

1. berkas di laci tengah menyala jadi aksen, lalu SALINANNYA lepas dan berangkat.
   yang di laci tetap ada, tidak ikut pergi, dan tidak meredup.
   jalur perjalanannya DITINGGALKAN di layar — beda dengan antar-jemput di
   scene 3 yang tidak berjejak. yang ini cuma terjadi sekali, dan panjangnya
   adalah jaraknya.
   (VO: "Jadi berkasnya disalin dulu.")

2. meja NYATA tumbuh mengisi siluet putus-putus itu — melebar dari tengah,
   bukan muncul utuh. siluetnya padam begitu mejanya penuh.
   salinan mendarat di atas papan, memantul kecil sekali, lalu tenang.
   label "meja kerja" muncul di bawahnya.
   (VO: "Ke meja kerja yang jauh lebih dekat.")

3. perhatian balik ke lemari: berkas asli di lacinya berdenyut sekali,
   dan sebuah lingkaran tipis mengembang dari situ lalu hilang.
   dua berkas di layar pada saat yang sama — itu seluruh isi tahap ini.
   (VO: "Aslinya tetap di gudang, tidak ke mana-mana.")

4. animation:
   - tautan pendek meja ke prosesor tergambar
   - prosesor MENYALA dan tetap menyala — kebalikan langsung dari scene 3
   - satu titik kecil melompat meja ke prosesor, berulang cepat, tiga kali
   - jarak lompatannya sengaja terlihat mungil di sebelah jalur panjang
     dari tahap 1, yang masih tertinggal di layar. dua garis itu tebal, warna,
     dan opasitasnya SAMA — begitu bobotnya beda, yang dibandingkan penonton
     bukan lagi panjangnya
   (VO: "Sekarang prosesor tinggal meraih, tanpa bolak-balik lagi.")

5. kata RAM mendarat di bawah label "meja kerja". besar, aksen, sendirian.
   (VO: "Ya, meja kerja itu ram.")

motion:
   - berkas sumber: denyut `scale 1→1,2→1` sekali, sinus
   - salinan: lengkung kuadratik, `power2.out`, membesar dari ukuran laci
     ke ukuran penuh; jalur tergambar dengan `p` yang SAMA supaya ujung garis
     tidak pernah mendahului bendanya
   - meja tumbuh: `scaleX 0,24→1` + `y`, `expo.out`
   - pendaratan: pantulan `yoyo` 0,3 dtk, lalu napas sinus pelan
   - lingkaran tahap 3: `scale 0,3→1` + fade keluar, `expo.out`
   - lompatan tahap 4: `power2.out`, siklus tetap
   - RAM: fade + naik 22px, `expo.out`
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

catatan:
   - meja TIDAK menempel ke prosesor. yang menempel itu cache, dan cache baru
     datang di bagian 6 (`naskah.md § Titik putus analogi`). di sini meja cuma
     jauh lebih dekat daripada gudang.
   - indigo dipakai HANYA untuk jawaban: meja, berkas, jalur, kata RAM. lemari
     tetap abu-abu; prosesor baru boleh indigo di tahap 4, saat ia berhenti
     menunggu.
   - RAM muncul paling akhir dan sendirian. kartu judul sudah menulis "RAM" di
     detik ~10, jadi kalau ia muncul bersama mejanya ia terbaca sebagai
     pengulangan judul. muncul setelah mejanya berdiri dan terpakai, ia jadi
     penegasan.
