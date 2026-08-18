Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Empat baris VO = empat tahap.

Scene yang membongkar separuh kiri label scene 4. Bentuknya sama seperti scene 4:
dunia fisik dulu, lalu berubah jadi jaringan di tempat yang sama.

1. tiga rumah berdiri berjajar di garis lantai, papan nomornya redup.
   (VO: "Kita mulai dari IP.")

2. papan nomor menyala satu per satu dari kiri, `01` `02` `03`. sebuah potongan
   berjalan pelan menyusuri ketiganya di jalur atas, seperti mencocokkan.
   (VO: "Setiap perangkat yang berkomunikasi melalui jaringan…")

3. rumah berubah jadi komputer di tempat yang sama — atapnya turun jadi bidang
   layar. papan nomor berubah jadi alamat angka; yang tengah dibaca penuh:
   `192.168.1.10`. potongan berhenti di atas yang tengah dan turun ke sana.
   (VO: "IP address berfungsi seperti alamat rumah.")

4. potongan KEDUA masuk dari kiri **tanpa label alamat**. ia sampai di
   persimpangan, berputar sekali, lalu berhenti dan meredup. tidak ada yang
   menerimanya.
   (VO: "Tanpa alamat tujuan, jaringan tidak akan tahu…")

motion:
   - papan menyala: `t()` pada `nyala` tiap rumah, berselang 0,18 dtk
   - rumah → komputer: opacity silang di titik yang SAMA, plus `t()` pada tinggi
     atap → 0. bukan potong: bendanya berubah
   - potongan mencocokkan: `t()` pada x, `E.sineInOut`, pelan — gerak "mencari"
     harus terbaca ragu, bukan terarah
   - potongan turun: `t()` pada y dari jalur atas ke kepala komputer tengah
   - potongan tanpa alamat: `getar()` kecil di persimpangan lalu opacity → 0,35

catatan:
   - **tahap 4 tidak boleh dipotong** kalau scene ini kepanjangan. ia satu-satunya
     tempat di episode yang memperlihatkan apa yang terjadi kalau alamatnya tidak
     ada — tanpa itu alamat cuma disebutkan, tidak terasa perlu.
   - **potongan kedua wajib komponen `Paket` yang sama** dengan yang pertama,
     cuma tanpa prop `label`. dua komponen berbeda akan jadi dua gambar berbeda,
     dan seluruh tahap 4 bergantung pada keduanya identik kecuali labelnya.
   - nomor rumah `01`/`02`/`03` bukan nomor jalan realistis — supaya
     perubahannya jadi alamat angka terbaca sebagai bentuk yang sama.
   - frame terakhir: tiga komputer + potongan yang mati di persimpangan. frame
     pertama `06-jadi-paket` memakai baris komputer yang sama di kanan.
