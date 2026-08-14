Anggaran: mulai 97,20 dtk · durasi 20,70 dtk (estimasi, VO belum jadi).
Tujuh baris VO = tujuh tahap.

Scene yang **menamai subjek episode**. Frame pertamanya = frame terakhir
`05-dikunci-semua`: dua benda identik diam di depan dinding yang tergembok.

**Penjaganya berdiri PERSIS di ruang kosong antara benda-benda itu dan dinding**
— ruang yang sudah terlihat sejak scene 1 dan tidak pernah diisi siapa pun. Kalau
ia muncul di tempat lain, hubungan sebab-akibatnya hilang dan penonton cuma
mendapat dua gambar yang kebetulan berurutan.

1. gembok-gembok lepas dari daun pintu dan jatuh ke bawah, keluar frame. pintunya
   tidak dibuka, cuma tidak lagi terkunci.
   (VO: "Yang kurang bukan kuncinya.")

2. ruang kosong di depan dinding menyala sebentar — bidang yang selama ini
   memang kosong, sekarang ditunjuk.
   (VO: "Yang kurang, seseorang yang memilih.")

3. dari garis lantai di titik itu, satu sosok penjaga TUMBUH ke atas. satu benda
   utuh, bukan dirakit bagian per bagian. topinya beraksen.
   (VO: "Jadi di depan pintu ditaruh satu penjaga.")

4. ketukan yang berdatangan berhenti di satu garis tegak di depannya, mengantre
   rapi. tidak ada yang lewat.
   (VO: "Semua yang datang berhenti dulu di situ.")

5. daftar terbuka di sisi kanan penjaga, agak di atas. barisnya tergambar satu
   per satu dari atas; baris terakhirnya berwarna berbeda tapi belum dibahas.
   (VO: "Dia pegang daftar, isinya siapa boleh lewat ke pintu mana.")

6. satu ketukan dicocokkan ke daftar lalu LEWAT ke pintu; satu lagi dicocokkan
   lalu berbalik ke kiri. sekali, cepat, tanpa drama.
   (VO: "Cocok, dibukakan. Tidak cocok, tidak masuk.")

7. nama resminya mendarat di bawah penjaga. besar, aksen, sendirian — tidak ada
   elemen lain yang bergerak di tahap ini.
   (VO: "Penjaga di depan pintu itu namanya firewall.")

motion:
   - gembok jatuh: `t()` pada y mempercepat + opasitas turun, `E.power2in`,
     tiap gembok tertunda 0,04 dtk
   - penjaga tumbuh: `scaleY 0 -> 1` dari garis lantai + `backOut(1,3)` di ujung
   - antrean ketukan: `t()` x berhenti di `X_PENJAGA - 90`, tiga ketukan dengan
     tundaan tetap
   - daftar: `masuk()` untuk kartunya, lalu `baris` bertambah lewat `t()` yang
     dibulatkan — bukan state
   - nama resmi: `masuk()` geser 24, durasi 0,5, mulai `beat + 0,12`

catatan:
   - **nama resmi di tahap 7 muncul SENDIRIAN.** kartu judul sudah menulis
     "Firewall" di detik ~21; kalau nama ini datang bersama gerakan lain, ia
     terbaca sebagai pengulangan judul dan bukan sebagai penegasan atas benda
     yang barusan dilihat bekerja (HARD RULE 6).
   - **penjaganya menghadap KIRI**, ke arah ketukan, dan tetap begitu sampai
     scene 11. arah itu mengikat sepuluh scene (`../panggung-gedung.tsx`).
   - **topi beraksen adalah satu-satunya pembeda penjaga dari sosok biasa.**
     tanpa itu, penjaga di sini dan sosok di scene 14 tidak bisa dibedakan — dan
     scene 14 justru bertumpu pada bedanya.
   - **tahap 6 sengaja cepat dan tidak dramatis.** penjaganya belum boleh terasa
     pintar; kepintarannya milik scene 7, dan kontras itu yang membuat buku
     catatannya terasa sebagai penemuan.
   - baris terakhir daftar sudah digambar berbeda warna sejak tahap 5, tapi TIDAK
     disorot dan tidak disebut. ia menunggu scene 8; yang ditanam di sini cuma
     bahwa ia ada.
