# 5-kenapa-cepat · rencana VO

Bagian 5 [why] — satu-satunya scene di bagian ini, dan sebelum ini bagian 5
memang **kosong**: episode melompat dari jawabannya (`04-ram-analogy`) langsung ke
penjelasan ukurannya (`06-ram-size`). Lompatan itu meninggalkan pertanyaan yang
paling wajar muncul begitu mejanya berdiri — *kenapa lewat meja bisa lebih
cepat?* — dan pertanyaan yang tidak dijawab tepat waktu berubah jadi kecurigaan
bahwa jawabannya cuma "karena memang begitu".

Yang harus berubah di kepala penonton setelah scene ini: cepatnya bukan sifat
ajaib mejanya, melainkan akibat dari dua hal yang bisa ia lihat sendiri — **tidak
ada yang perlu dicari**, dan **perjalanan jauhnya cuma sekali**.

**Tidak ada undangan membayangkan di sini, dan itu disengaja** (HARD RULE 6).
Gambarannya sama persis dengan dua scene sebelumnya: gudang yang sama, meja yang
sama, prosesor yang sama, sampai ke koordinat pikselnya lewat
`panggung-analogi.tsx`. Undangan baru berarti gambaran baru; yang terjadi di sini
cuma penonton diajak melihat **kenapa** yang barusan ia lihat itu berhasil.
Baris pertamanya justru dibuka dengan mengakui apa yang sudah ia simpulkan
sendiri ("dekatnya memang membantu") supaya scene ini terbaca sebagai lanjutan,
bukan sebagai pengulangan.

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Dekatnya memang membantu. Tapi bukan cuma itu.
Di gudang, berkasnya masih harus dicari, laci demi laci.
Di meja, semuanya sudah terhampar di depan mata.
Mau yang paling kiri atau paling kanan, tinggal diraih.
Dan perjalanan jauh tadi cuma terjadi sekali.
Sesudahnya, berkas yang sama dipakai lagi ribuan kali.
Tinggal satu: berapa banyak yang muat di meja itu.

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`5-kenapa-cepat-direction.md`](5-kenapa-cepat-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Tautan pendek meja–prosesor berdenyut sekali, lalu perhatian pindah ke lemari. |
| 1 | Sorot menelusuri laci lemari satu per satu, dari atas ke bawah, sampai berhenti di laci yang berkasnya ada. |
| 2 | Permukaan meja terisi berkas berjejer — semuanya terlihat sekaligus, tidak ada yang tertutup. |
| 3 | Prosesor meraih berkas paling kiri, lalu paling kanan; **dua raihan itu memakan waktu yang sama persis**. |
| 4 | Jalur panjang gudang→meja menyala sekali penuh, dan angka `1×` mendarat di tengahnya. |
| 5 | Lompatan pendek meja↔prosesor berulang cepat; penghitung di sebelahnya lari naik, lalu berhenti sebagai "ribuan kali". |
| 6 | Kedua tanda meredup; garis ukur lebar meja tergambar dari tepi ke tepi, dan permukaannya menyala sekali. |

## Catatan

- **Beat 0 sengaja dua kalimat dalam satu baris.** Keduanya satu gerakan:
  tautan pendeknya berdenyut ("dekatnya memang membantu") lalu perhatian
  berpindah ("tapi bukan cuma itu"). Dipecah jadi dua beat, layar akan menunggu
  tiga detik dengan tautan yang sudah selesai berdenyut.
- **Jaraknya tidak dijelaskan ulang.** `04-ram-analogy` sudah menggambarnya —
  jalur panjang tertinggal di layar di sebelah tautan pendek — jadi mengulanginya
  di sini akan membuat scene ini terasa mundur. Beat 0 mengakuinya dalam empat
  kata, lalu pindah ke yang belum pernah ditunjukkan.
- **"dicari, laci demi laci" adalah isi sebenarnya scene ini.** Sampai scene 4,
  yang mahal dari gudang cuma jaraknya. Di sini penonton melihat sebab kedua:
  di gudang isinya masih harus ditelusuri, dan penelusuran itu berjalan di layar
  sampai terasa lama.
- **Beat 3 adalah akses acak, dan namanya sengaja tidak jatuh.** "Random access"
  adalah kepanjangan yang sudah terbaca di kartu judul, dan menamainya di sini
  akan memaksa penonton berhenti membayangkan untuk mengurus istilah
  (HARD RULE 6). Yang dijual kalimat ini bukan namanya, tapi kenyataannya: yang
  mana pun sama saja. Menghubungkan kalimat ini ke kepanjangan judul adalah utang
  yang bisa dibayar di scene bagian 6, bukan di sini.
- **"berkas", bukan "data"**, sama seperti scene 3 dan 4. Yang di layar memang
  berkas dari laci yang sama, dan "data" ada di daftar larangan kosakata L1
  ([docs/09](../../../docs/09-tangga-abstraksi.md)).
- **"ribuan kali" adalah bilangan analogi, bukan klaim teknis** — sama statusnya
  dengan "ribuan berkas" di scene 3, jadi tidak butuh baris `sumber:` di
  `naskah.md`. Tidak ada satu pun angka latensi di scene ini: baris ⚠ di
  `naskah.md § Sumber` belum ditutup, dan scene ini tetap utuh tanpanya. Yang
  dijual bukan berapa cepatnya, tapi kenapa cepatnya.
- **Tidak ada nama baru sama sekali.** "ram" sudah dinamai di scene 4 dan tidak
  perlu diulang di sini; cache belum boleh muncul (dia milik bagian 6), dan
  "kotak" belum boleh dipakai karena `06-ram-size` yang memperkenalkannya sebagai
  gagasan.
- **Beat 6 adalah jembatan ke `06-ram-size`** (HARD RULE 7). Tanpa baris ini
  scene ini tutup rapat di "ribuan kali", dan scene berikutnya mulai dari nol
  dengan "Pernah sadar ukuran ram selalu delapan, enam belas…?" — tidak ada yang
  keliru di kedua kalimat itu, yang hilang cuma alasan kenapa yang kedua datang
  sesudah yang pertama. Beat ini menggantung pertanyaannya di sini, jadi scene
  berikutnya terbaca sebagai jawabannya. Ia sengaja **bertanya, bukan
  mengklaim**: "berapa banyak yang muat" tidak menyatakan bahwa meja lebih luas
  otomatis lebih cepat — klaim itu justru mitos yang dibantah Short 2.
- Beat 4 dan 5 satu kalimat yang dipotong dua baris. "Cuma sekali" perlu jalur
  panjangnya menyala lebih dulu; "ribuan kali" perlu waktunya sendiri karena
  pengulangannya harus benar-benar berjalan di layar — kalau digabung, penonton
  mendengar kesimpulannya sebelum sempat melihat sebabnya.
