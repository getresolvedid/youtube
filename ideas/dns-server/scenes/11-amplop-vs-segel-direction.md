Anggaran: mulai 243,95 dtk · durasi 34,68 dtk (estimasi, VO belum jadi).
Sepuluh baris VO = sepuluh tahap.

Scene terakhir bagian 6. Frame pertamanya = frame terakhir `10-polos`: garis yang
berangkat ke tempat yang salah, layar diam.

Seluruh scene berdiri di **dua kolom yang setara**. Tata letaknya itu sendiri
adalah argumennya: begitu satu kolom digambar lebih besar, lebih terang, atau
lebih lama, penonton pulang dengan jawaban untuk pertanyaan yang tidak dia
tanyakan.

1. layar yang membeku dari scene lalu ditarik mundur dan TERBELAH jadi dua kolom
   selebar sama. keduanya mewarisi gambar yang sama persis — jalur, sosok di
   tepinya, penerima di ujung.
   (VO: "Ada dua tambalan untuk itu. Dan keduanya sering dikira barang yang sama.")

2. KIRI: kartu yang berjalan masuk ke dalam amplop tertutup. isinya tidak
   terbaca lagi dari luar.
   (VO: "Yang pertama, pertanyaannya dimasukkan ke amplop.")

3. KIRI: sosok di tepi jalur masih di sana — tidak hilang, tidak diusir.
   papan catatannya kali ini KOSONG, dan tetap kosong saat amplop lewat.
   (VO: "Orang di tepi jalur tidak bisa lagi membaca apa yang kamu tanyakan.")

4. KIRI: amplop tiba di ujung. jawabannya keluar dari amplop —
   dan tidak ada segel apa pun di atasnya. tanda tanya kecil muncul di sebelahnya.
   (VO: "Tapi amplop tidak membuktikan apa pun soal isi jawabannya.")

5. KANAN: kartu jawaban distempel di loket ujung. lilin merah, jelas, satu
   gerakan menekan. kartunya lalu berangkat — TERBUKA, tanpa amplop.
   (VO: "Yang kedua, jawabannya diberi segel oleh yang menulisnya.")

6. KANAN: di ujung penerima, dua kartu datang lagi seperti scene 10 —
   tapi kali ini yang satu bersegel dan yang satu tidak.
   penerima memeriksa segelnya; yang tanpa segel ditolak dan jatuh.
   (VO: "Segelnya bisa diperiksa, jadi jawaban yang dibuat orang lain langsung ketahuan.")

7. KANAN: sosok di tepi jalur di kolom ini papan catatannya TERISI —
   isinya terbaca sepanjang jalan, sama seperti scene 10.
   (VO: "Tapi segel tidak menutupi apa-apa. Isinya tetap terbaca dari luar.")

8. kedua kolom disederhanakan: gambar rumitnya memudar, tersisa dua ikon besar —
   amplop di kiri, segel di kanan. satu kata di bawah masing-masing.
   nama resminya boleh ditulis di sini, kecil, mono, di bawah katanya.
   (VO: "Satu menyembunyikan. Satu membuktikan.")

9. kedua ikon digeser berdampingan di tengah, UKURAN SAMA PERSIS, tinggi sama,
   jarak ke garis tengah sama. tidak ada yang lebih terang.
   (VO: "Dan yang satu tidak pernah menggantikan yang lain.")

10. kedua ikon meredup — SAMA BANYAK, keduanya ke opasitas yang sama — dan
    perhatian pindah ke bawahnya: satu jalur tergambar melintang di garis 900,
    lalu kartu pertanyaan berjalan menyusurinya dari kiri dan BERHENTI di titik
    kosong di kanan. tidak ada loket di situ. tidak ada penanda tambahan.
    setelah kalimatnya selesai, kedua ikon habis sama sekali.
    frame terakhir: satu jalur dan satu kartu yang berhenti di tempat yang belum
    ada apa-apanya — TIDAK ADA lagi ikon di layar. itu disengaja: scene 12 tidak
    perlu menggambar ulang keduanya cuma untuk memudarkannya, dan menggambar
    ulang benda milik scene lain adalah dua sumber kebenaran untuk satu gambar.
    (VO: "Yang kamu tanyai tetap tahu semuanya. Dua-duanya tidak menyentuh itu.")

motion:
   - terbelah: garis vertikal `gambarGaris()` dari atas, lalu kedua kolom
     `t()` x menjauh sedikit — SAMA persis dengan cara scene 8 membelah panggung
   - amplop menutup: dua sisi `scaleY` bertemu di tengah, `E.expoOut`
   - papan kosong (tahap 3): tidak ada tween sama sekali. kekosongannya harus
     bertahan sepanjang tahap, bukan animasi yang berakhir kosong
   - stempel: `scale 1,6->1` + `y` menekan turun, `E.power3out`, lalu getar
     kecil sekali lewat `getar()` — tekanan yang mendarat
   - pemeriksaan segel: lingkaran tipis mengembang dari segelnya, `E.expoOut`
   - kartu ditolak: `x` mundur + rotasi + jatuh, `E.power2in` — sama dengan
     kartu asli yang memantul di scene 10, karena gerakannya memang gerakan
     yang sama
   - penyederhanaan tahap 8: opasitas gambar rumit -> 0 dan ikon -> 1, dipetakan
     dari `p` yang SAMA, jadi tidak pernah ada frame kosong di antaranya
   - tahap 10: jalur `gambarGaris()` dari kiri, kartu `t()` `E.power2out` supaya
     ia MELAMBAT sampai berhenti — kartu yang berhenti mendadak terbaca sebagai
     ditolak, dan tidak ada yang menolaknya di sini
   - redupnya kedua ikon dipetakan dari SATU nilai (`ikonRedup`), bukan dua yang
     kebetulan sama. dua tween terpisah adalah dua tempat untuk meleset
   - semua nilai fungsi murni dari frame — `useDetik()` + `shared/anim.ts`

catatan:
   - **kedua kolom wajib setara di setiap ukuran yang bisa diukur**: lebar,
     tinggi ikon, jumlah tahap, dan opasitas. ini bukan estetika — ini isi
     scene-nya. VO bilang keduanya tidak saling menggantikan, dan tata letak
     yang berat sebelah membantahnya di layar sambil VO menyangkal.
   - **tahap 3 dan tahap 7 adalah pasangan, dan keduanya kelemahan.** papan
     kosong di kiri lalu papan terisi di kanan — struktur "ini bagusnya, ini
     yang tidak dia selesaikan" dipakai dua kali berturut-turut supaya terbaca
     sebagai pembandingan yang adil, bukan promosi salah satu.
   - **sosok di tepi jalur tidak pernah diusir dari kedua kolom.** ia tetap
     berdiri di sana di kiri maupun kanan; yang berubah cuma apa yang bisa dia
     dapat. mengusirnya di salah satu kolom akan menjanjikan hal yang tidak
     dijanjikan tambalan mana pun.
   - **nama resmi kedua tambalan cuma di layar, kecil, di tahap 8** — tidak
     pernah diucapkan (`10-vo.md`, `naskah.md § Sumber`). nomor RFC-nya masih
     baris ⚠; jangan menulisnya di layar sampai gerbangnya lewat.
   - segel digambar sebagai lilin, bukan sebagai gembok. gembok berarti tertutup,
     dan tertutup persis yang TIDAK dilakukan segel — itu kolom sebelahnya.
   - **kartu di tahap 10 berhenti tepat di `TANGGA.x0`, dan itu bukan pilihan
     estetika.** di koordinat itu loket terdekat tumbuh di frame pertama
     `12-ganti-loket`, jadi potongan kerasnya jatuh di atas dua benda yang tidak
     bergerak — jalur dan kartu. jangan menggeser salah satunya sendirian;
     keduanya membaca `TANGGA` dari `../panggung-loket.tsx`.
   - **tidak ada loket digambar di tahap 10.** menggambarnya di sini mendahului
     scene 12 dan membuat mundurnya kamera di sana kehilangan isi. yang menunjuk
     titik itu cuma kartu yang berhenti — dan titik kosong yang ditunjuk sesuatu
     lebih menuntut daripada titik yang sudah diisi.
