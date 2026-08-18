Anggaran: durasi ±8,8 dtk (estimasi, VO belum jadi).
Dua baris VO = dua tahap.

**Kebalikan persis dari Short 3 scene 2**, dan pengulangan terbalik itulah yang
mengajarkan — bukan kalimatnya.

1. kotak berlabel DEKRIPSI muncul di sekeliling lambangnya. kuncinya menyentuh
   gemboknya; gemboknya TERBUKA — sengkangnya terangkat, badannya diam. lalu
   daun kotaknya MEMBUKA (kebalikan dari Short 3), dan isinya berganti kembali
   jadi "HALO, APA KABAR?".
   (VO: "Dekripsi mengubah data terenkripsi kembali menjadi bentuk yang dapat dibaca.")
   TEKS LAYAR: "DEKRIPSI"

2. kalimatnya keluar dari kotak dan mendarat di ruang percakapan HP-nya sebagai
   gelembung chat biasa. penerimanya terlihat di sisi bawah; bahunya turun
   sedikit.
   (VO: "Dengan kunci yang tepat, penerima dapat membaca pesan aslinya.")
   TEKS LAYAR: "Halo, apa kabar?"

motion:
   - `tutup` bergerak 1 → 0 — kebalikan persis dari Short 3 scene 2
   - gembok terbuka: nilai `terbuka` 0 → 1 yang mengangkat dan memiringkan
     sengkangnya. badannya tidak bergerak
   - perubahan isi: dua opasitas berlawanan di rentang yang sama, dan barisnya
     MEMENDEK — kebalikan dari yang melar di Short 3
   - gelembung mendarat: `masuk()` geser 26
   - bahu: satu `t()` geser 0 → 5px, durasi 0,8. tidak ada wajah yang berubah

catatan:
   - **GELEMBUNGNYA BENTUKNYA SAMA PERSIS dengan yang diketik di Short 1 scene 1.**
     kalau ia digambar sedikit berbeda, gagasan "dikembalikan ke bentuk aslinya"
     ikut bocor.
   - **warna kembali ke biru** di sini — arahan warna user: biru → ungu → biru.
     itu terpenuhi sendiri oleh `terkunci` yang berbalik ke 0.
   - **tidak ada yang mengamati di scene ini.** perannya selesai di Short 3;
     menampilkannya lagi membuat penonton menunggu dia berbuat sesuatu.
