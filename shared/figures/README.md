# `shared/figures/` — figur SVG yang lintas episode

Tempat bentuk yang **sudah terbukti dipakai lebih dari satu topik**. Bukan
tempat menabung bentuk yang mungkin berguna nanti.

## Bedanya dengan tiga tetangganya

| berkas | isinya | ruang lingkup |
|---|---|---|
| [`../Icons.tsx`](../Icons.tsx) | sprite ikon 96×96, satu simbol satu glyph | dipasang di alur teks, `<Ic n="ram" />` |
| [`../figur.css`](../figur.css) | kosakata **CSS**: sumbu, bar, piramida, kisi, tabel spesifikasi | figur berbasis kotak DOM |
| **`figures/`** | bentuk **SVG** di dalam satu `<svg viewBox>` panggung | adegan yang punya ruang & koordinat |
| `ideas/<slug>/panggung-*.tsx` | koordinat, tata letak, dan bentuk khas **satu topik** | satu episode saja |

Yang menentukan sebuah bentuk tinggal di sini atau di `panggung-*.tsx` bukan
seberapa umum kedengarannya, tapi satu hal: **apakah ia sudah lahir dua kali.**
`Sosok` sudah tiga kali, `Gembok` dua kali — dan ketiga salinan `Sosok` sudah
mulai berbeda diam-diam (jari-jari kepala 30 / 31 / 40, tebal garis 6 / 6 / 7).
Perbedaan seperti itu tidak pernah muncul sebagai error; ia muncul sebagai
episode yang terasa digambar orang yang berbeda.

**Tiga figur manusia adalah pengecualian dari aturan itu, dan pengecualiannya
punya batas.** `Penjaga` dan `Peretas` baru lahir sekali (T15), tapi keduanya
masuk bersama `Sosok` karena yang dipakai bukan salah satunya melainkan
**perbandingan** di antara ketiganya: tinggi baku yang sama, titik tumpu yang
sama, prop yang sama, dan satu koleksi siluet yang sama
([`sumber-svgrepo.ts`](./sumber-svgrepo.ts)). Set yang dipecah — dua di sini,
satu di `panggung-*.tsx` — akan kehilangan justru sifat yang membuatnya bekerja,
karena tidak ada satu tempat pun yang memaksa ketiganya tetap sebanding. Aturan
"sudah lahir dua kali" berlaku untuk **bentuk**; sebuah **set** masuk utuh atau
tidak sama sekali.

Sebaliknya `Bangunan` juga ada dua kali — dan **tidak** ada di sini, karena yang
dua itu bentuk yang berbeda yang kebetulan senama: satu gedung berpapan nama
yang papannya bisa jatuh (T14), satu rumah kecil berlampu (enkripsi).
Menyatukannya cuma menghasilkan satu komponen dengan sepuluh prop yang tak satu
pun scene memakai lebih dari tiga.

## Aturan yang mengikat isi folder ini

1. **Semua bentuk mengembalikan `<g>`**, dipasang di dalam `<svg viewBox>` milik
   scene. Tidak ada yang membuat `<svg>`-nya sendiri — panggung yang punya
   sistem koordinat, bukan figurnya.
2. **Titik acuannya KAKI**, bukan pusat. `y` adalah garis lantainya, dan tidak
   ada bagian yang digambar di bawah `y = 0` (kecuali bayangan yang memang
   menempel di lantai). Ini yang membuat menaruh benda di lantai cuma butuh satu
   koordinat — dan yang mencegah benda terbaca amblas ke dalam lantai.
3. **Tidak ada ukuran mutlak yang mengasumsikan 1920×1080.** Bentuk digambar
   pada skala 1 di sekitar titik nolnya; yang menempatkannya di frame adalah
   `panggung-*.tsx` topiknya. Satu pengecualian yang disengaja: `<Lantai>`,
   yang memang bentangan selebar panggung — dan karena itu `x1`/`x2`-nya prop.
4. **Warna lewat `palet.ts`, tidak pernah hex.** `docs/03` yang memutuskan
   warnanya; figur cuma menyebut perannya.
5. **Deterministik.** Tidak ada `Math.random()`, `Date.now()`, atau state.
   Semua gerak masuk sebagai prop 0..1 yang dihitung scene dari `useDetik()` —
   figur di sini **tidak** memanggil hook Remotion sama sekali, supaya ia bisa
   dipakai di still, di preview, dan di dalam `<Sequence>` mana pun.

## Yang TIDAK masuk sini

- Bentuk yang cuma dipakai satu topik → `ideas/<slug>/panggung-*.tsx`.
- Bentuk yang cuma dipakai satu scene → tulis inline di scene itu.
- Ikon kecil dalam alur teks → [`../Icons.tsx`](../Icons.tsx).
- Diagram berbasis kotak DOM (bar, sumbu, tabel) → [`../figur.css`](../figur.css).

## Memindahkan bentuk ke sini

Saat sebuah bentuk lahir kedua kalinya, yang benar adalah **memindahkannya**,
bukan menyalinnya: hapus dari kedua `panggung-*.tsx`, impor dari sini. Dua
salinan yang wajib sama adalah dua salinan yang akan berbeda dalam seminggu —
alasan yang persis sama dengan kenapa koordinat tinggal di `panggung-*.tsx` dan
bukan diketik ulang di tiap scene.

Yang wajib diperiksa setelah memindahkan: **render still scene-scene lamanya.**
Menyatukan `Sosok` mengubah piksel di episode yang sudah jadi, dan itu bukan
regresi yang ketahuan `npm run check` maupun `npm run tumpang`.
