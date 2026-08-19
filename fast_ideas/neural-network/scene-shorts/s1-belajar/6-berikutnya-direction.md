# 6-berikutnya — gantungan episode berikutnya

Anggaran: dihitung `npm run gen`. Target unggahan `0:28–0:30` — di repo ini ia
digeser ke ±`0:26–0:28`, karena dua detik terakhir milik kartu penutup
(`naskah.md` § Penyimpangan tercatat 3; keputusan tertunda 2).

**Frame pertamanya = frame terakhir `5-intinya`:** rantai empat kata + siluet
jaringan di belakangnya.

## Di layar

1. rantai empat kata memudar. siluet jaringannya tetap.

2. kamera masuk ke **satu** simpul di tengah. sisa jaringannya kabur dan
   menepi — tidak hilang, cuma berhenti jadi yang dilihat.

3. simpul itu sendirian di frame, masih diam. teks layar:
   **BERIKUTNYA: SATU NEURON**

## Kamera

Satu-satunya dorongan besar di seluruh Short (`scale` 1,0 → 1,6 ke arah simpul
terpilih). Yang dijelaskannya: episode berikutnya tinggal **di dalam** yang
barusan — bukan topik lain, melainkan satu tingkat lebih dalam.

## Gerak

- rantai keluar: `keluar()` 0,25 dtk
- dorongan: `E.inOutQuad`, berhenti mulus — bukan `backOut`; ini bukan mendarat,
  ini mendekat
- sisa jaringan: opasitas turun ke ±0,15 bersamaan dengan dorongan
- teks: `masuk()` setelah dorongannya berhenti, di frame yang sudah diam

## Kotak aman

Simpul terpilih **di tengah kotak aman**, bukan di tengah kanvas — dua detik
terakhir Short adalah tempat judul dan nama channel digambar YouTube di bawah,
dan simpul yang mendarat di `y > 1480` tertutup persis saat ia jadi satu-satunya
benda di layar.

## Dari unggahan

> **VO:** "Next: what is the neuron actually doing?"
> **VO Direction:** Curious, slightly faster, designed to create anticipation.
> **Animation:** Zoom into one neuron. The surrounding network fades into the
> background. The selected neuron remains visible.
> **On-Screen Text:** NEXT: THE ARTIFICIAL NEURON
> **End on the neuron.**

## Catatan

- **Ini bukan CTA, dan tidak boleh berubah jadi CTA.** Unggahan § 8: "Do not
  sacrifice the main explanation just to add a CTA." Tidak ada "jangan lupa
  subscribe" di sini; docs/02 menaruh CTA Shorts di VO penutup, bukan di layar.
- **Kata "neuron" jatuh di sini untuk pertama kali**, dan itu sah karena ia
  menunjuk benda yang sudah ada di layar sejak detik nol — simpul yang barusan
  didekati. Yang dilarang HARD RULE 6 adalah nama yang datang sebelum bendanya.
- **Kalau episode 2 belum tentu dibuat, scene ini yang pertama dibuang** — janji
  yang tidak ditepati lebih mahal daripada Short yang selesai dua detik lebih
  cepat.
- Frame terakhir: satu simpul besar di tengah. Kartu penutup menyusul sesudahnya.
