Anggaran: mulai 22,34 dtk · durasi 7,02 dtk (estimasi, VO belum jadi).
Dua beat. **Mitosnya dieksekusi di layar** — loketnya benar-benar diganti — dan
bilah yang sama memperlihatkan bahwa yang tersentuh cuma ujung paling depannya.

Frame pertamanya = frame terakhir scene 4: bilah utuh, sosok di 740, loket lama
masih di pojok kiri.

1. loketnya diganti (beat 0):
   - loket lama meluncur turun keluar frame; loket baru masuk dari bawah ke
     **koordinat yang sama persis**
   - hanya potongan pendek di ujung bilah yang berkedip — tidak memanjang, tidak
     memendek
   (VO: "Ganti loketnya, yang berganti cuma bagian bertanya tadi.")

2. sisanya tidak tersentuh (beat 1):
   - sisa bilah menyala sama persis seperti sebelum penukaran
   - garis kurung tipis di bawah sisa bilah dengan label "tidak berubah"
   (VO: "Sisa perjalanannya lewat jalur yang sama persis.")

teks di layar:
   beat 0 → "Ganti loketnya."
   beat 1 → "Sisa jalurnya sama persis."

catatan komposisi:
   - **loket baru masuk ke koordinat yang sama persis.** Loket yang mendarat
     sedikit bergeser terbaca sebagai "ada yang berubah di susunannya", padahal
     yang dimaksud justru sebaliknya. Keduanya memakai `X_LOKET_S2` yang sama.
   - **potongan pendek itu BERKEDIP, tidak memanjang dan tidak memendek.**
     Godaannya besar untuk memendekkannya supaya "loket baru lebih cepat" — dan
     itu klaim berangka yang tidak punya sumber. Yang boleh ditunjukkan cuma
     bahwa bagian itu yang tersentuh.
   - **sisa bilahnya tidak dianimasikan ulang.** Kalau ia ikut berkedip "supaya
     seimbang", kalimat "sama persis" terbantah di layar oleh gambarnya sendiri.
   - loket baru dibedakan dengan **aksen**, bukan dengan bentuk lain. Bentuk yang
     berbeda akan terbaca sebagai benda yang berbeda; yang berbeda cuma siapa
     yang duduk di situ.
   - sosoknya diam di 740. Ia sudah berjalan di scene 4; menggerakkannya lagi di
     sini membuat penonton mengira perjalanannya diulang.

motion:
   - loket lama keluar: geser +180px ke bawah + opacity 1→0, `power2in`,
     0,4 dtk, mulai beat 0 + 0,15
   - loket baru masuk: geser −180px → 0 + opacity 0→1, `expoOut`, 0,5 dtk,
     mulai beat 0 + 0,45
   - kedip potongan tanya: `getar()` pada opacity aksennya, 2 kedip, 0,6 dtk,
     mulai beat 0 + 0,6
   - kurung "tidak berubah": `gambarGaris()` 0,5 dtk + label `masuk()` 0,35 dtk,
     mulai beat 1 + 0,3
