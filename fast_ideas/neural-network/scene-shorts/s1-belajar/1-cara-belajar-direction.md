# 1-cara-belajar — hook

Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`. Target unggahan
`0:00–0:03`; angka itu anggaran menulis VO, bukan angka yang diketik di `.tsx`.

Frame pertama Short. Tugasnya satu: menaruh satu benda yang belum dikenal
penonton **sudah bergerak**, lalu menggantung satu pertanyaan — dalam tiga detik.

## Di layar

1. frame bersih. tiga simpul muncul berurutan di sepertiga tengah, cepat —
   bukan memudar masuk bersamaan. tiap simpul lingkaran kosong, tidak berlabel.

2. sambungan tumbuh antar-simpul, satu tarikan garis. jaringannya masih redup
   dan belum berarti apa-apa — memang belum boleh berarti.

3. satu denyut berjalan **dari atas ke bawah** melewati sambungan itu, sekali.
   teks layar jatuh bersamanya: **BAGAIMANA AI BELAJAR?**

**Arahnya memutar 90°.** Diagram jaringan baku mengalir kiri → kanan (unggahan
§ 18), tapi di 1080 × 1920 sisi kanan `x > 920` adalah rail tombol YouTube — dan
di situlah jawaban jaringan akan keluar. Jadi lapisannya ditumpuk: masukan di
atas, jawaban di bawah. Perputaran ini berlaku di **seluruh** Short seri ini;
yang tidak boleh cuma satu scene memutar arahnya sendiri.

## Kamera

Dorongan **sangat** halus ke arah jaringan — `scale` 1,00 → 1,03 sepanjang
scene, `E.outQuad`. Yang dijelaskannya: ke sinilah penonton harus melihat.
Bukan gerak hias; kalau dorongannya terasa, ia sudah terlalu besar.

## Gerak

- simpul muncul: `masuk()` bertahap 0,08 dtk antar-simpul
- sambungan: `gambarGaris()` 0,4 dtk, ketiganya bersamaan
- denyut: titik bergerak sepanjang path, `E.inOutQuad`, sekali jalan
- teks: `masuk()` tepat saat denyut mulai berjalan

## Kotak aman

Judul di baris `y` 300 (bukan 360: pada 360 baris keduanya menyentuh kartu
contoh yang turun di scene 2), tetap di dalam kotak aman `x` 90–920.
Jaringannya boleh melebar melewati kotak aman — yang **tidak** boleh adalah
simpul terluar yang nanti dipakai scene 3 jatuh di balik rail kanan.

## Dari unggahan

> **VO:** "How does AI actually learn?"
> **VO Direction:** Curious and direct. Slight emphasis on "actually learn."
> Ask the question as if the answer is surprising. Brief pause after "AI."
> **Animation:** Start with a clean vertical frame. A few neural-network nodes
> appear one after another. Connections rapidly form between them. One signal
> pulse travels through the network.
> **Camera:** Very subtle push toward the network.
> **On-Screen Text:** HOW DOES AI LEARN?

## Catatan

- **Simpulnya tidak berlabel, dan itu disengaja.** Label di detik nol menyuruh
  penonton membaca; jaringan yang cuma bergerak menyuruhnya menonton.
- **Kata "neural network" belum boleh jatuh di sini** (HARD RULE 6). Bendanya
  baru berdiri, belum dipakai, dan belum menyelesaikan apa pun. Namanya jatuh
  tepat sekali, di `5-intinya`.
- Frame terakhir: jaringan redup + denyut yang baru selesai lewat. Frame pertama
  `2-belum-tahu` memakai jaringan di posisi yang sama persis — yang berubah cuma
  ada contoh yang masuk dari kiri.
