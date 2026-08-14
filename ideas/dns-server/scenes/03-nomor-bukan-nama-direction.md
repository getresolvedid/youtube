Anggaran: mulai 21,34 dtk · durasi 19,26 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertama scene ini = frame terakhir `01-hook-alamat` **minus perambannya**:
nama besar di tengah, tanda tanya di sebelahnya. Kartu judul lewat di antara
keduanya, tapi sambungannya tetap langsung — opening tidak bicara
([docs/10](../../../docs/10-scene-standar.md)), jadi pertanyaan yang digantung
scene 1 masih menganga saat scene ini mulai.

Koordinat namanya dipakai bersama lewat `../panggung-loket.tsx` (`X_NAMA`,
`Y_NAMA`) — scene 6 memakai posisi yang sama saat namanya dipecah jadi potongan.

1. tanda tanya dari scene lalu padam. nama bergeser ke KIRI, memberi ruang kanan.
   tidak ada yang masuk dulu — satu detik dengan nama sendirian di kiri.
   (VO: "Masalahnya, nama yang kamu ketik tadi tidak dikenal siapa pun di sana.")

2. kamera masuk: sebuah bangunan sederhana tumbuh dari garis lantai di kanan.
   kotak, atap datar, satu pintu. papan namanya terpasang di atas pintu, dan
   isinya sama persis dengan nama di kiri.
   (VO: "Sekarang lihat tempat yang kamu tuju itu dari dekat.")

3. papan namanya lepas dari satu sisi, berputar, jatuh keluar bawah frame.
   tempat papan itu tadi kosong sesaat — jeda ini penting, jangan langsung diisi.
   (VO: "Papan namanya dicopot.")

4. sederet nomor menyala di tempat papan tadi. mono, tanpa titik-titik yang
   membuatnya terbaca sebagai alamat internet tertentu — kelompok angka biasa.
   (VO: "Yang tersisa cuma sederet nomor.")

5. garis dari siluet komputer di kiri bawah berjalan ke kanan.
   ia melewati nama di kiri TANPA menyentuhnya, dan BERHENTI tepat di nomornya.
   ujung garisnya menempel di nomor, bukan di bangunan.
   (VO: "Ke situlah komputermu harus berangkat, dan cuma ke situ.")

6. nama di kiri berdenyut sekali, lalu nomor di kanan berdenyut sekali.
   bergantian, tidak bersamaan.
   lalu keduanya diam, dengan ruang kosong lebar di antaranya.
   frame terakhir: dua benda berjauhan, tidak ada yang menghubungkannya.
   (VO: "Sementara yang kamu hafal cuma namanya.")

motion:
   - nama bergeser: `t()` x, `E.power2out`, 0,6 dtk
   - bangunan tumbuh: `scaleY 0->1` dari garis lantai, `transformOrigin: bottom`,
     `E.expoOut`
   - papan jatuh: rotasi dari sudut kiri + `y` mempercepat, `E.power2in` —
     ia jatuh, dan yang jatuh tidak melambat di ujung
   - nomor menyala: `masuk()` geser 10, ditambah kilau `opacity` 0,4 -> 1 -> 0,85
   - garis: `gambarGaris()` dari `shared/anim.ts`, `E.power2out`
   - denyut bergantian: dua `tPP()` dengan `mulai` berjarak, bukan satu
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **nomornya tidak boleh berbentuk alamat internet sungguhan.** empat kelompok
     angka dengan titik akan langsung dibaca sebagian penonton sebagai "I P", dan
     seluruh episode sengaja tidak pernah menyebut istilah itu (`naskah.md §
     Kamus pengucapan`). yang dibutuhkan cuma kesan "sederet angka yang tidak
     mungkin dihafal".
   - **garis di tahap 5 berhenti di nomor, tidak sampai ke bangunan.** ini bukan
     detail rapi-rapian: kalau ia menembus ke bangunannya, penonton melihat
     "komputer pergi ke tempat itu" dan bukan "komputer cuma bisa memakai
     nomornya".
   - **ruang kosong di tahap 6 adalah isinya, bukan sisa tata letak.** jarak
     antara nama dan nomor itulah masalah yang dibawa episode ini, dan scene 4
     akan mencoba menjembataninya dengan cara yang salah.
   - bangunan digambar netral: tanpa logo, tanpa etalase, tanpa merek. ia
     "sebuah tempat", bukan sebuah toko tertentu.
   - warna aksen belum boleh dipakai untuk nomor. di bagian 3 belum ada apa pun
     yang berstatus jawaban; nomornya abu-abu terang, dan yang menyala cuma
     kilau sesaat di tahap 4.
