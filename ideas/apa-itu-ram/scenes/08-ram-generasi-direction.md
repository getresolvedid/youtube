Anggaran: mulai 86,99 dtk · durasi 17,11 dtk (estimasi, VO belum jadi).
Tujuh beat = lima tahap — tahap 1 memakan tiga beat (kalimatnya lalu dua nama
generasi, masing-masing satu beat). Titik waktunya diambil dari `beat("ram-generasi", i)`,
bukan diketik — sama seperti scene sebelumnya.

Frame pertama = frame terakhir `07-ram-bentuk`, tapi cuma satu bendanya yang
dibawa: **batang di kartu desktop**. Ketiga kartu lain sudah pergi. Kesinambungan
di sini bukan seluruh panggung, melainkan satu benda yang penonton baru saja
lihat ditancapkan.

Seluruh scene terjadi pada satu benda yang sama dilihat dari dekat. Tidak ada
kartu, tidak ada panel — ini scene paling "zoom in" di episode.

1. tiga generasi berjajar.
   - batang dari scene sebelumnya naik ke tengah layar dan membesar
   - dua salinannya turun: satu di atasnya, satu di bawahnya
   - label mono di kiri tiap batang: DDR3 · DDR4 · DDR5, urut dari atas
   - DDR3 sengaja lebih redup sejak awal: ia tidak diucapkan VO, dan ia memang
     yang paling jarang ada di mesin penonton
   (VO: "Di batangnya ada angka lain." / "D D R empat." / "D D R lima."
    — tiga beat, label menyala satu per satu mengikuti namanya)

2. ketiganya diakui sebagai satu deret.
   - kurung tegak tipis digambar di kiri, merangkul ketiga label
   - kata "generasi" muncul di sisinya, kecil
   - beat ini cuma 0,86 dtk — satu ketukan, tidak boleh ada gerakan lain
   (VO: "Itu generasinya.")

3. yang berubah tiap generasi.
   - prosesor (ikon `chip`) mendarat di kanan
   - garis dari tiap batang ke prosesor digambar BERGANTIAN dari atas ke bawah,
     tiap garis mengganti yang sebelumnya
   - ketiga garis beda ritmenya: titik yang berjalan di garis DDR3 paling
     jarang, DDR5 paling rapat — perbedaan yang terlihat tanpa satu angka pun
   - JANGAN menulis angka kecepatan apa pun di layar. baris ⚠ di naskah §
     Sumber belum ditutup, dan scene ini tidak membutuhkannya
   (VO: "Tiap generasi mengubah cara meja bicara dengan prosesor.")

4. coakan.
   - prosesor & garis padam; ketiga batang bergeser rata kiri
   - deretan kaki di sisi bawah tiap batang membesar (perbesaran, bukan pindah
     tempat — batangnya tetap di tempatnya, cuma bagian kakinya yang ditarik
     mendekat)
   - coakan tiap batang disorot: lingkaran tipis, lalu garis tegak putus-putus
     turun dari ketiganya ke bilah pembanding di bawah
   - ketiga garis itu JELAS tidak segaris. itu seluruh isi tahap ini
   (VO: "Dan menggeser satu coakan kecil di kaki batangnya.")

5. tidak masuk.
   - tinggal satu slot di bawah, berlabel "slot DDR4", dengan kunci kecil
     menonjol di posisi coakan DDR4
   - batang DDR5 diturunkan ke slot itu
   - ia BERHENTI di atas kunci — tertahan, tidak pernah menyentuh dasar slot
   - getar mendatar teredam, lalu naik lagi sedikit dan diam
   - tanda silang muncul di sisi kanan, dan garis tegak menegaskan kunci vs
     coakan yang tidak sejajar
   - JANGAN dilanjutkan dengan "yang benar begini": scene ini berakhir pada
     kegagalan itu. penonton yang sudah paham kenapa tidak perlu diberi
     jawabannya lagi, dan beat untuk itu tidak ada
   (VO: "Jadi batang baru tidak masuk ke slot lama.")

motion:
   - batang naik & membesar: `y` + `scale`, `power3.out`
   - dua salinan turun: `y` dari batang tengah, stagger 0,12 dtk, `power2.out`
   - label: fade + geser 12px, `expo.out`
   - kurung tahap 2: `scaleY 0→1` dari tengah, `expo.out`, 0,3 dtk
   - garis ke prosesor: `gambarGaris` dari `shared/anim.ts`, `power2.out`
   - titik berjalan di garis: fungsi murni dari frame, periode tetap per
     generasi (bukan `setInterval`, bukan state)
   - perbesaran kaki tahap 4: `scale` pada bagian kaki saja, `power3.out`
   - garis putus-putus turun: `scaleY 0→1` dari atas, stagger 0,08 dtk
   - penurunan batang tahap 5: `y` `power2.in` sampai menyentuh kunci, BERHENTI
     mendadak — tanpa easing keluar, karena ia memang ditahan benda keras
   - getar: `getar()` dari `shared/anim.ts`, teredam sampai nol sendiri
     (getar berdurasi tetap yang dipotong di tengah ayunan meninggalkan batang
     beberapa piksel dari tempatnya)
   - silang: `back.out(2)` + fade
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

catatan akurasi:
   - **posisi coakan SKEMATIS.** Bahwa posisinya berbeda antar generasi itu benar
     dan itulah gagasan scene ini; angkanya belum ditopang sumber primer (baris ⚠
     JEDEC di `naskah.md` § Sumber). Di layar ketiganya sengaja dibuat berjauhan
     supaya bedanya terbaca dari kursi penonton — bukan gambar teknik. VO tidak
     pernah menyebut ukuran, jadi tidak ada klaim angka yang menggantung
   - jumlah kaki di batang juga skematis dan jauh lebih sedikit daripada aslinya.
     menggambar seluruh kaki menghasilkan sisir abu-abu yang tidak terbaca
   - yang ditunjukkan cuma coakan pada MODUL desktop. laptop punya coakan sendiri
     di posisi lain; itu tidak dibicarakan, dan layar tidak mengklaim sebaliknya

catatan waktu:
   detiknya TIDAK diketik di `.tsx` — tiap tahap dipatok ke
   `beat("ram-generasi", i)` dari `timing.gen.ts` (HARD RULE 4).
