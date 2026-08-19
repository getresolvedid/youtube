# 4-keluaran — payoff

Anggaran: dihitung `npm run gen`. Target peta `0:17–0:24`.

**Frame pertamanya = frame terakhir `3-jumlah-bias`:** angka `1,54` di pusat
simpul, kapsul bias sudah lenyap.

## Di layar

1. angka itu **turun ke tepi bawah** simpul dan mengecil sedikit — dari isi
   simpul jadi sesuatu yang siap dikirim. teks layar: **KELUARAN**

2. sebuah sambungan keluar digambar ke bawah, dan satu **denyut** berangkat di
   sepanjangnya menuju lapis berikutnya.

## Kamera

Diam.

## Gerak

- angka turun: `t()` pada y, `E.power2out` 0,5 dtk, ukuran turun 92 → 68
- sambungan keluar: opasitasnya naik bersamaan denyut berangkat
- denyut: `E.sineInOut`, sekali jalan — bentuk yang sama persis dengan denyut
  Short 1, karena ia memang benda yang sama

## Kotak aman

Angka keluaran tetap di dalam `y` 240–1480. Denyutnya boleh berjalan sampai
`y` 1440; yang tidak boleh keluar kotak aman adalah angkanya.

## Dari unggahan

> **VO:** "That value becomes the neuron's output."
> **Animation:** output pulse leaves toward the next layer.
> **Text:** OUTPUT

## Catatan

- **TIDAK ADA AMBANG DAN TIDAK ADA "MENYALA" DI SINI.** Peta Episode 02 berhenti
  di keluaran; yang mengubah bentuk hasil adalah fungsi aktivasi, dan itu
  Episode 04. Versi lama scene ini melanggarnya (naskah § Bentrok tercatat 1).
- **Sambungan keluar baru digambar sekarang**, bukan sejak scene 1: sebelum ini
  simpulnya belum punya apa pun untuk dikirim.
