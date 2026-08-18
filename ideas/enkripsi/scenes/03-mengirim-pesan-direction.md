Anggaran: mulai 18,96 dtk · durasi 15,41 dtk (estimasi, VO belum jadi).
Lima baris VO = lima tahap.

Frame pertama sesudah kartu judul. Yang harus terjadi cuma satu: penonton
mengenali situasinya sebagai situasinya sendiri. **Scene ini tidak mengajarkan
apa pun** — kalau ada yang terasa sedang dijelaskan di sini, itu tandanya ada
yang bocor dari scene sesudahnya.

**Gerakannya pelan, dan itu arahan user:** *"Movement should be natural and
relatively slow."* Ini satu-satunya scene di episode yang boleh terasa santai.

1. medium shot di meja: sosok duduk sedikit di kiri tengah, meja, laptop
   tertutup, dan satu benda kecil di atas meja. sisi kanan frame sengaja
   DIKOSONGKAN — ke sanalah seluruh episode nanti bergerak. ia menyadari
   HP-nya, mengangkatnya sedikit, lalu melihat layarnya.
   (VO: "Sekarang, bayangkan kamu ingin mengirim pesan kepada temanmu.")

2. kamera MERAPAT ke HP — bukan potong. HP tumbuh mengisi frame sambil meja
   dan sosoknya keluar bingkai. layarnya jadi percakapan: nama "Teman" di
   atas, ruang kosong di tengah, kolom "Ketik pesan…" di bawah. kolom itu
   menyala sedikit saat ibu jari mendekatinya.
   (VO: "Kamu membuka percakapan.")

3. HP mengisi ~75% frame. "Halo, apa kabar?" tumbuh huruf demi huruf di kolom
   ketik, kecepatannya wajar — bukan seketika, bukan satu huruf per detik.
   ibu jari bergerak di area papan ketik, tidak perlu tepat di tiap tombolnya.
   (VO: "Kamu mengetik, 'Halo, apa kabar?'")

4. tombol kirim terlihat jelas. ibu jari bergerak ke sana, BERHENTI SEBENTAR,
   baru menekan. gelembung "Halo, apa kabar?" naik dari kolom ketik ke ruang
   percakapan.
   (VO: "Lalu, kamu menekan tombol kirim.")

5. gelembung bergerak ke tepi kanan layar. begitu menyeberangi tepinya ia
   MENGECIL dan sudutnya mengeras — keluar sebagai paket. kamera ikut paketnya
   ke kanan, HP-nya keluar bingkai, paketnya terus berjalan.
   (VO: "Tapi sebenarnya, pesan itu harus melewati internet terlebih dahulu sebelum sampai ke temanmu.")

motion:
   - tahap 1 → 2 MERAPAT, bukan potong keras (arahan user: "Instead of cutting
     immediately, move the camera toward the smartphone"). satu `kamera({skala})`
     dipakai SELURUH grup, `E.expoOut`. ini pengecualian yang disengaja dari
     patokan 95% potong keras di docs/02 — dan satu-satunya di scene ini
   - jeda ibu jari di tahap 4: tweennya memang berhenti, bukan diperlambat.
     `mulai` tombolnya digeser 0,35 dtk sesudah ibu jari sampai
   - teks tumbuh: satu `t()` pada JUMLAH HURUF yang terlihat, bukan opasitas
     per huruf — yang kedua terbaca sebagai teks berkedip
   - gelembung → paket di tahap 5: satu tween untuk radius sudut DAN lebar,
     rentang yang sama. dua tween terpisah membuat sudutnya selesai lebih dulu
     dari lebarnya, dan bentuk antaranya terbaca sebagai bentuk ketiga

catatan:
   - **paketnya lahir di sini, dan bentuknya dipatok sampai akhir episode.**
     `Paket` di `../panggung-kiriman.tsx` — tiga bilah putih di dalamnya =
     kalimat yang masih terbaca. jangan menggambar paket versi sendiri di scene
     mana pun.
   - **kalimatnya "Halo, apa kabar?", dan tidak pernah berganti** sampai scene
     10 (arahan user: *"Do not switch to different messages halfway through"*).
     `PESAN` di `../panggung-kiriman.tsx` adalah sumbernya; jangan mengetik
     ulang kalimatnya di berkas scene.
   - **belum ada gembok, belum ada kunci, belum ada lambang acak.** semuanya
     lahir di scene 6. satu gembok kecil di sini akan menjawab masalahnya
     sebelum masalahnya sempat terasa.
   - **belum ada yang mengamati.** dia berdiri di scene 5. sosok ketiga di sini
     mengubah scene santai jadi scene tegang, dan bagian 3 kehilangan tangganya.
   - **sisi kanan frame dikosongkan di tahap 1**, dan itu arahan user. seluruh
     episode bergerak ke kanan; komposisi yang penuh di kedua sisi membuat
     tahap 5 terasa mendorong benda keluar, bukan melepasnya.
   - jahitan dari `01-pesan-dikirim` melewati kartu judul, dan **ia lompat** —
     alasannya dan usul penutupnya ada di `03-mengirim-pesan-vo.md`, bukan di
     sini.
