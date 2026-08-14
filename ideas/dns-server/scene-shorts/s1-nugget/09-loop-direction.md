Anggaran: mulai 46,91 dtk · durasi 5,70 dtk (estimasi, VO belum jadi).
Dua beat. Tugasnya bukan merangkum, melainkan **mendaratkan penonton kembali ke
frame pertama**.

1. kembali ke namanya (beat 0):
   - tangga dan huruf "DNS" memudar keluar
   - bilah alamat dan nama situs utuh kembali — **di posisi, ukuran, dan
     ketajaman yang sama persis dengan scene 1**, tanpa garis pemisah, tanpa
     sorotan
   (VO: "Jadi lain kali kamu mengetik nama.")

2. penandanya masuk lagi (beat 1):
   - penanda masuk dari luar frame kanan ke potongan paling kanan — gerakan yang
     sama persis dengan frame pertama Short ini
   (VO: "Yang dibaca duluan titik paling kanannya.")

teks di layar:
   beat 0 → "Lain kali kamu mengetik nama…"
   beat 1 → "…yang dibaca duluan paling kanan."
   Elipsisnya menyambungkan dua kalimat jadi satu — dan kalimat yang belum
   selesai adalah alasan orang menonton putaran kedua.

catatan komposisi:
   - **loop-nya visual, bukan cuma kalimat.** Frame terakhir scene ini disusun
     semirip mungkin dengan frame pertama `01-dari-belakang`: posisi nama,
     ukuran huruf, bilah alamat, arah masuk penanda — semuanya sama. Timing
     masuk penandanya **dibaca dari berkas scene 1** (`MASUK_PENANDA`), bukan
     diketik ulang; dua salinan angka yang wajib sama adalah dua angka yang akan
     berbeda dalam seminggu.
   - **nama dan bilah alamat tidak pernah diskalakan** di Short ini. Kamera
     mundur scene 7 cuma menyentuh grup tangga, justru supaya frame ini bisa
     identik dengan scene 1.
   - **tidak ada CTA yang diucapkan.** Ajakan ke video panjang ditaruh sebagai
     teks kecil di layar dan di kartu penutup.
   - jangan menyorot potongan mana pun — scene 1 juga tidak.

motion:
   - tangga & "DNS": opacity 1→0, 0,4 dtk, mulai beat 0
   - bilah alamat & nama: opacity 0→1, 0,45 dtk, mulai beat 0 + 0,2
   - penanda: `MASUK_PENANDA` dari `01-dari-belakang.tsx`, digeser ke beat 1
   - CTA kecil: `masuk()` geser 16px, 0,4 dtk, mulai beat 1 + 0,8
