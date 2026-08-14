Anggaran: mulai 74,6 dtk · durasi 21,83 dtk (estimasi, VO belum jadi).
Tujuh beat VO = lima tahap — tahap 3 dan 4 masing-masing memakan dua beat,
karena satu kalimatnya sengaja dipotong dua baris (lihat `06-ram-size-vo.md`).
Tahap 5 adalah jembatan ke scene berikutnya, bukan isi baru.

1. lanjutan dari ram-analogy — meja RAM tidak dibuang.
   Lemari & prosesor keluar frame ke sisinya masing-masing,
   meja naik ke tengah dan membesar.
   Tiga angka mendarat di atas meja, berjarak: 8 · 16 · 32
   (angka polos, Mono 800 — BUKAN tabel spesifikasi, belum boleh
   pakai satuan resmi sampai baris ⚠ di naskah § Sumber ditutup)
   (VO: "Pernah sadar ukuran ram selalu delapan, enam belas, tiga puluh dua?")

2. ketiga angka meredup jadi jejak samar di atas layar — tidak hilang,
   dipakai lagi di tahap 4.
   permukaan meja terbuka jadi kisi kotak kosong (`.grid` di figur.css).
   (VO: "Itu bukan angka pilihan pabrik.")

3. animation — kotak dapat nomor:
   - mulai dari DUA kotak saja, besar, di tengah meja
   - nomor muncul di bawah masing-masing: 0 dan 1
   - tekankan kehabisan: cuma segitu yang bisa disebut dengan satu digit
   (VO: "Setiap kotak di meja itu punya nomor, dan nomornya cuma ditulis
   dengan nol dan satu.")

4. animation — melipat:
   - satu digit ditambahkan di depan tiap nomor; kotak langsung pecah jadi
     dua kali lipat: 2 → 4 → 8 → 16, mengecil tiap lipatan sampai memenuhi kisi
   - pelipatannya yang jadi tontonan, bukan angkanya — penonton harus
     MELIHAT jumlahnya berlipat, bukan membaca hasilnya
   - di lipatan terakhir, tiga angka dari tahap 1 (8 · 16 · 32) menyala kembali
     terang: itu jawabannya, dan itu asalnya
   (VO: "Tambah satu digit, jumlah kotaknya langsung dua kali lipat.")

5. jembatan ke ram-bentuk (HARD RULE 7) — membingkai, bukan membubarkan:
   - seluruh gambar (meja + kisi + angka + deret slot) mundur satu langkah:
     mengecil ~0,9 dan turun sedikit, seolah penonton bersandar ke belakang
   - bingkai putus-putus tergambar mengelilinginya, warna redup (`--ink-2`),
     radius besar — yang barusan dijelaskan dibingkai sebagai GAMBARAN
   - tidak ada yang dihapus, tidak memudar ke hitam: scene 7 memotong keras
     dari sini ke benda aslinya, dan potongan itu yang jadi jawabannya
   (VO: "Sejauh ini, meja itu masih ada di kepala kita saja.")

motion:
   - meja naik + membesar: `scale` & `y`, `power3.out`
   - tiap angka tahap 1 mendarat `back.out(1.6)`, stagger 0.15 dtk
   - kisi terbuka: sel fade + `scale 0.7→1`, stagger dari tengah ke tepi
   - tiap lipatan tahap 4: `expo.out`, jeda antar-lipatan makin pendek
     (percepatan terasa) — lipatan terakhir paling cepat
   - nyala balik 8 · 16 · 32: fade + pulse warna aksen, `power2.out`
   - mundur tahap 5: `scale` & `y` bersama, `power2.out`, 0,7 dtk — pelan,
     ini gerak menutup; bingkainya menyusul 0,25 dtk sesudahnya (fade saja,
     garisnya tidak digambar berkeliling supaya tidak menarik mata berputar)
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

catatan akurasi:
   kelipatan dua bukan hukum mutlak — die DDR5 24 Gb melahirkan modul 24 dan
   48 GB. Titik putus itu TIDAK masuk scene ini (satu scene satu gagasan),
   tapi utang, dan sudah tercatat di naskah § Sumber.
