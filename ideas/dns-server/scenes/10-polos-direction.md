Anggaran: mulai 211,84 dtk · durasi 32,11 dtk (estimasi, VO belum jadi).
Sembilan baris VO = sembilan tahap.

Scene paling tegang di episode. Frame pertamanya = frame terakhir
`09-jenis-catatan`: tiga kartu berjalan di jalur mendatar, terbuka.

**Ia tidak boleh menakut-nakuti.** Yang dijelaskan sifat mekanismenya — tidak ada
pemeriksaan — bukan penjahatnya. Semua keputusan visual di bawah tunduk pada itu.

1. kartu-kartu berjalan di jalur panjang, kiri ke kanan. laju tetap.
   jalurnya melebar mengisi frame; loket-loket tinggal siluet di kedua ujung.
   (VO: "Karena dari awal, pertanyaannya memang berjalan terbuka.")

2. satu kartu diperbesar saat lewat tengah. isinya terbaca jelas dari luar.
   tidak ada sampul, tidak ada gembok, tidak ada apa pun yang menutupinya.
   (VO: "Tidak ada amplop, tidak ada gembok.")

3. sebuah sosok muncul di TEPI jalur, berdiri diam. netral — tanpa tudung,
   tanpa topeng, tanpa warna bahaya. kepalanya berputar mengikuti kartu yang lewat.
   (VO: "Siapa pun yang kebetulan ada di jalur itu bisa membacanya.")

4. isi kartu tersalin ke papan kecil di sebelah sosok itu: nama, dan jam.
   barisnya bertambah tiap kartu yang lewat.
   (VO: "Dia tahu nama apa yang kamu tanyakan, dan kapan kamu menanyakannya.")

5. papan catatannya menepi. jalur ke loket tetap menyala.
   sosok itu bergeser sedikit LEBIH DEKAT ke jalur. tidak ada yang lain terjadi.
   satu tahap yang isinya cuma jeda — dan itu memang tugasnya.
   (VO: "Tapi ada yang lebih penting daripada dibaca.")

6. sosok itu melempar kartunya SENDIRI ke jalur, ke arah yang berlawanan.
   kartunya berangkat lebih dulu daripada kartu asli yang masih di perjalanan.
   (VO: "Dia juga bisa menjawab duluan.")

7. di ujung penerima: dua kartu mendekat. bentuk, warna, ukuran SAMA PERSIS.
   tidak ada satu pun tanda yang membedakan keduanya.
   penerima tidak punya alat apa pun di tangannya — tidak ada kaca pembesar,
   tidak ada stempel, tidak ada daftar periksa.
   (VO: "Dan yang bertanya tidak punya cara memeriksa siapa yang menjawab.")

8. kartu palsu tiba lebih dulu dan LANGSUNG diterima — masuk, tanpa jeda.
   kartu asli tiba sepersekian detik sesudahnya, memantul di pintu yang sudah
   tertutup, dan jatuh.
   (VO: "Dia percaya jawaban yang datang paling awal.")

9. garis dari penerima berangkat — ke bangunan yang BERBEDA dari yang dituju.
   layar diam di situ sampai potongan keras. tidak ada tanda seru, tidak ada
   silang merah, tidak ada peringatan.
   (VO: "Jadi jawaban yang keliru cuma perlu lebih cepat. Bukan lebih benar.")

motion:
   - kartu berjalan: `x` linear, siklus tetap dari `d` — tanpa acak
   - kartu diperbesar: `scale` naik saat mendekati tengah lalu turun, `tPP()`
   - kepala sosok berputar: rotasi kecil dipetakan dari posisi kartu terdekat,
     fungsi murni dari `d`
   - papan terisi: jumlah baris = `Math.floor(t(...))`, bukan state
   - lemparan tahap 6: lengkung `E.power2out`, laju LEBIH TINGGI daripada kartu
     asli — perbandingan laju itu seluruh isi scene
   - kedua kartu di tahap 7: satu komponen yang sama, dipanggil dua kali dengan
     posisi berbeda. bukan dua komponen berbeda — kalau berbeda di kode, cepat
     atau lambat ia berbeda di layar
   - pintu tertutup: `scaleY` cepat `E.power2in`, 0,18 dtk
   - kartu asli memantul: `x` mundur + rotasi + `y` jatuh, `E.power2in`
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **sosok di tepi jalur netral, dan ini keputusan yang paling gampang
     dilanggar.** tanpa tudung, tanpa topeng, tanpa merah, tanpa siluet gelap.
     inti scene ini justru bahwa siapa pun yang kebetulan ada di jalur bisa
     melakukannya, tanpa perlu jadi siapa-siapa. penjahat berkostum mengubahnya
     jadi cerita tentang orang jahat, dan penonton pulang berpikir "berarti aman
     kalau tidak ada orang jahat".
   - **tahap 7 adalah gambar terpenting scene ini: dua kartu yang tidak bisa
     dibedakan.** kalau yang palsu digambar beda — warna lain, sobek, mencurigakan
     — seluruh scene runtuh, karena penonton akan bertanya kenapa penerimanya
     tidak lihat saja. keduanya WAJIB dari komponen yang sama.
   - **penerima tidak boleh punya alat pemeriksa.** kaca pembesar, stempel,
     daftar periksa — semuanya membocorkan scene 11.
   - **tahap 5 sengaja hampir kosong.** dua gagasan berat (dibaca, lalu dijawab
     duluan) butuh napas di antaranya; tanpa itu yang kedua lewat tanpa terasa.
   - **tahap 9 tanpa tanda bahaya sama sekali.** tidak ada silang merah, tidak
     ada tanda seru. yang bikin ngeri justru bahwa tidak ada apa pun yang
     kelihatan salah — dan itu memang keadaannya.
   - tidak ada nama tambalan di scene ini, termasuk di layar. keduanya milik
     scene 11.
