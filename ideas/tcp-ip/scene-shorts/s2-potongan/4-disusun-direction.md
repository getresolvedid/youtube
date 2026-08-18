Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Satu baris VO = satu tahap, dua gerakan berurutan di dalamnya.

Yang baru di scene ini **urutan**, bukan kedatangan.

1. kelima potongan mendarat berjajar di garis kumpul, tapi urutannya BERANTAKAN
   — `2 5 1 3 4` dari kiri. mereka diam sedetik penuh di keadaan itu, cukup lama
   untuk dibaca. teks layar: "Datangnya acak."

   lalu mereka bergeser ke tempatnya masing-masing sampai urut `1 2 3 4 5`.
   yang menyeberangi tetangganya TERANGKAT ke ketinggian berbeda saat lewat.
   teks layar berganti: "Disusun ulang."
   (VO: "Di sana, bagian-bagian tersebut disatukan kembali…")

motion:
   - mendarat: `t()` pada y masing-masing dengan durasi berbeda, `E.power1out`
   - diam: TIDAK ada tween selama ±1 dtk — keberantakannya harus sempat dibaca
   - susun: `t()` pada x menuju slot nomornya, `E.power2out`, berselang 0,05 dtk
   - angkat: `t()` pada y berbentuk lengkung (`s * (1 - s)`), tingginya berbeda
     per potongan dari tabel `LAJUR`

catatan:
   - **jeda sebelum menyusun itu isinya, bukan kelambatan.** kalau penyusunan
     mulai begitu potongan mendarat, penonton tidak pernah melihat keadaan
     "berantakan" yang justru jadi sebab scene ini ada.
   - **kotak yang menyeberang wajib terangkat.** dua kotak yang bertukar tempat
     di garis yang sama terbaca MELEBUR, bukan bertukar — kesalahan ini sudah
     terjadi sekali di scene 8 video panjang dan ketahuan lewat `npm run
     tumpang`. jangan diulang.
   - frame terakhir: lima potongan urut rapi. frame pertama `5-utuh` memakai
     barisan yang sama persis.
