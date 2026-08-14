Anggaran: mulai 25,57 dtk · durasi 5,97 dtk (estimasi, VO belum jadi).
Dua beat. Balik arah: keadaan tempat mitos di scene 1 sebenarnya BENAR mulai
dibangun di sini.

1. meja kembali normal, lalu penuh:
   - meja menyusut balik ke lebar semula (cepat — ini bukan kejadian, ini
     mengembalikan panggung)
   - berkas berdatangan bertubi-tubi sampai permukaan meja tertutup rapat,
     saling menempel, tidak ada lagi ruang kosong
   (VO: "Sekarang bukanya banyak, dan mejanya benar-benar penuh.")

2. tidak ada tempat:
   - satu berkas baru datang dari atas dan BERHENTI melayang di atas meja
   - ia bergoyang kecil di tempat, tidak mendarat, tidak pergi
   - goyangannya berlanjut sampai scene habis
   (VO: "Berkas baru tidak punya tempat lagi.")

teks di layar:
   beat 0 → "penuh"  (`--warn`)
   beat 1 → "mau ditaruh di mana?"

catatan komposisi:
   - **mejanya wajib kembali ke lebar semula.** Kalau penuhnya terjadi di meja
     yang sudah dilebarkan, yang terbaca adalah "meja lebar pun tetap penuh" —
     kebalikan dari maksudnya, dan scene 9 jadi tidak masuk akal.
   - berkas yang menggantung TIDAK boleh jatuh atau hilang di scene ini. Ia
     menggantung sampai scene 7 memberinya tempat; itu yang membuat scene 7
     terbaca sebagai jalan keluar, bukan kejadian baru.
   - goyangannya kecil dan teredam, jangan berputar-putar. Yang harus terbaca
     "tidak menemukan tempat", bukan "melayang-layang".

motion:
   - meja menyusut: `power2out`, 0,3 dtk — cepat, tidak menuntut perhatian
   - berkas berdatangan: stagger memendek (0,14 · 0,11 · 0,09 …), `power2out`
   - berkas menggantung: `tPP` naik-turun 6px, `sineInOut`, berulang pelan
