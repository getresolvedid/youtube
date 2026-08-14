Anggaran: mulai 101,57 dtk · durasi 16,73 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `06-belum-pernah-ketemu`: dua meja tersorot,
seluruh tangan menyala, kunci masih tergeletak di jalan.

**Scene yang menamai subjek episode.** Perpindahannya bukan dari "tidak bisa" ke
"bisa", melainkan dari **mengirim kunci** ke **membagikan gembok** — dan itu
terjadi di tahap 0 dan 1, saat kuncinya berjalan MUNDUR pulang.

1. kunci yang sejak scene 5 ada di jalan berbalik arah dan berjalan MUNDUR, ke
   kanan, pulang ke meja penerima. arah baliknya sengaja terlihat jelas.
   (VO: "Kedengarannya mustahil. Ternyata tidak.")

2. kunci mendarat di permukaan meja kanan dan berhenti. sejak detik ini sampai
   scene selesai ia TIDAK BERGERAK sama sekali.
   (VO: "Yang dibagikan memang bukan kuncinya.")

3. dari meja yang sama keluar gembok-gembok TERBUKA, menyebar ke sisi jalan dan
   tergeletak di SELA-SELA tangan, satu di tiap celah. semuanya identik.
   (VO: "Yang dibagikan gemboknya, dalam keadaan terbuka.")

4. satu gembok terangkat dari tumpukan dan melayang ke meja kiri. gembok yang
   lain TETAP tergeletak, tidak berkurang artinya.
   (VO: "Siapa pun boleh mengambil satu. Termasuk kamu.")

5. di meja kiri: surat masuk ke kotak, tutup menutup, gembok terjepit. lalu
   baris tulisan pada surat yang sempat terbaca berubah jadi deretan tanda yang
   tidak terbaca, sekali, cepat.
   (VO: "Suratmu masuk, gemboknya dijepit, dan tulisannya berhenti terbaca.")

6. nama resminya mendarat di bawah kotak. besar, aksen, SENDIRIAN — tidak ada
   elemen lain yang bergerak di tahap ini.
   (VO: "Mengunci isi seperti tadi itu namanya enkripsi.")

motion:
   - kunci pulang: `t()` pada x ke `X_TERIMA`, `E.power2out`, 1,0 dtk
   - gembok menyebar: `t()` per gembok dari titik meja ke posisi tepinya,
     stagger 0,06, `E.power2out` — indeks dipakai sebagai tundaan tetap
   - gembok terpilih: `t()` melengkung lewat kontrol y yang lebih tinggi
   - tulisan teracak: satu tween `acak` 0 -> 1; tiap baris surat diganti bentuk
     tanda pada ambang yang berbeda, jadi pergantiannya menyapu dari atas
   - nama: `masuk()` geser 24, durasi 0,5, mulai `beat + 0,12`

catatan:
   - **tahap 5 adalah satu-satunya tempat tulisan teracak boleh muncul di seluruh
     episode** (`naskah.md` § Analogi utama). ia diperlihatkan, tidak dijelaskan:
     begitu cara mengacaknya digambar, penonton menyimpan "enkripsi itu soal
     huruf" dan seluruh bagian 5 kehilangan sasarannya.
   - **gembok yang tersisa di tepi jalan tidak boleh ikut hilang** saat satu
     diambil. justru itu isinya: mengambil satu tidak mengurangi apa pun.
   - **nama resmi di tahap 6 muncul SENDIRIAN.** kartu judul sudah menulis
     "Enkripsi" di detik ~23; kalau nama ini datang bersama gerakan lain, ia
     terbaca sebagai pengulangan judul, bukan sebagai penegasan atas benda yang
     barusan bekerja (HARD RULE 6).
   - **kunci yang mendarat di tahap 2 menetapkan satu posisi untuk lima scene.**
     ia harus berada di titik yang sama di scene 8, 9, 11 dan 16
     (`panggung-kiriman.tsx` · `P_KUNCI_MEJA`).
   - frame terakhir (kotak terkunci di meja kiri + nama di bawahnya + kunci di
     meja kanan) adalah frame pertama scene 8.
