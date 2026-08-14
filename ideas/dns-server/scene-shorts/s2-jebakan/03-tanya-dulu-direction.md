Anggaran: mulai 8,74 dtk · durasi 7,46 dtk (estimasi, VO belum jadi).
Dua beat. **Scene yang mendirikan panggung Short ini** — enam scene sesudahnya
memakai lantai, sosok, dan loket yang sama persis, dan tidak pernah
mendirikannya lagi (HARD RULE 6: undangannya cuma sekali).

1. sebelum berangkat (beat 0):
   - lantai tergambar; sosok berdiri di tengah kiri, tempat tujuan jauh di kanan
   - belum ada garis, belum ada loket — cuma jaraknya
   (VO: "Coba bayangkan sebelum berangkat ke sebuah tempat.")

2. loketnya ditanya (beat 1):
   - satu loket naik di **pojok kiri, di belakang sosoknya** — bukan di antara
     sosok dan tujuannya
   - kartu bertanda tanya berjalan dari sosok ke jendela loket dan masuk
   - kartu bernomor keluar dari jendela yang sama, kembali ke sosoknya
   (VO: "Kamu tanya alamatnya dulu ke loket di pojok jalan.")

teks di layar:
   beat 0 → "Sebelum berangkat…"
   beat 1 → "…kamu tanya alamatnya dulu."

catatan komposisi:
   - **loketnya di pojok kiri, di BELAKANG sosoknya.** Seluruh Short bertumpu
     pada loket yang ditanya sebelum berangkat lalu ditinggalkan. Loket yang
     berdiri di tengah jalur akan dilewati sosoknya di scene 4, dan gambar itu
     mengatakan persis kebalikan dari kalimatnya.
   - **tempat tujuannya tanpa papan nama** (`papan={0}`). Pada skala sejauh itu
     tulisannya cuma 14px dan tidak terbaca; papan yang tidak terbaca cuma
     menambah benda di layar.
   - kartu tanya dan kartu nomor memakai `<Kartu>` yang sama — bedanya cuma
     isinya. Dua komponen berbeda cepat atau lambat jadi dua gambar berbeda.
   - nomornya tidak dibacakan VO; kartu yang keluar cukup terlihat.

motion:
   - lantai: `gambarGaris()` 0,5 dtk, mulai beat 0
   - sosok & tujuan: `masuk()` geser 28px, `expoOut`, 0,5 dtk, stagger 0,12 dtk
   - loket: `masuk()` geser 60px dari bawah, `expoOut`, 0,6 dtk, mulai beat 1
   - kartu tanya: sosok → jendela, `power2inout`, 0,7 dtk, mulai beat 1 + 0,5;
     memudar di titik masuknya
   - kartu nomor: jendela → sosok, `power2out`, 0,7 dtk, mulai beat 1 + 1,45
