# 10 · Scene Standar — Opening & Closing

Dua scene dipakai **identik di setiap episode**: brand sting di depan, end card
di belakang. Tujuannya pengenalan — penonton harus tahu ini channel yang sama
dari satu setengah detik animasi, tanpa membaca nama.

Berkasnya:

| Berkas | Isi |
|---|---|
| [`shared/scenes.html`](../shared/scenes.html) | Markup untuk disalin apa adanya |
| [`shared/scenes.css`](../shared/scenes.css) | Gaya kedua scene, sudah menangani 16:9 dan 9:16 |
| [`shared/scenes.js`](../shared/scenes.js) | Koreografi: `HFScenes.opening()` dan `HFScenes.closing()` |
| [`shared/assets/logos/`](../shared/assets/logos/) | Mark & wordmark (salinan dari brand getresolved) |
| [`compositions/uji-scene-standar.html`](../compositions/uji-scene-standar.html) | **Komposisi uji** — kedua scene dirangkai jadi video 10,5 dtk |

> **Status: sudah terbukti jalan.** `compositions/uji-scene-standar.html` adalah komposisi uji
> yang merangkai opening + closing dengan dua scene filler. Sudah lolos
> `npm run check` (0 error, kontras 11/11 WCAG AA) dan sudah dirender jadi MP4
> 1920×1080 · 30fps · 10,5 detik. Jalankan ulang kapan saja sebagai **uji regresi
> visual** setelah mengubah `shared/scenes.*` atau `shared/theme.css`:
>
> ```powershell
> npm run check
> npx hyperframes render -c compositions/uji-scene-standar.html -o render/uji-scene-standar.mp4
> ```

---

## Aturan penempatan

| | Opening (brand sting) | Closing (end card) |
|---|---|---|
| Durasi 16:9 | **1,5 dtk** | **5,0 dtk** |
| Durasi 9:16 | **tidak dipakai** | **2,0 dtk** |
| Posisi | **bagian 2 flow** — tepat setelah [question] | scene terakhir, setelah [case] |
| Track | `1` (overlay) | `1` (overlay) |

**Opening tidak pernah muncul di detik nol.** Frame pertama video selalu
[question] — pertanyaan mendahului brand. Ini aturan retensi yang sudah dikunci di
[02 · Format](02-format-video.md#aturan-babak); scene standar mengikutinya, bukan
membatalkannya.

**Shorts tidak punya opening sama sekali.** Di feed Shorts, satu setengah detik
logo di awal adalah satu setengah detik yang dipakai penonton untuk menggeser layar.

## Isi opening

Brand sting membangun mark getresolved dari nol, dalam urutan yang punya arti:

| Waktu | Yang terjadi |
|---|---|
| `0,05` | Kotak indigo meredup masuk |
| `0,05–0,67` | Cincin putih **menggambar diri** (stroke draw) |
| `0,40` | Titik hijau muncul — *the resolve point* |
| `0,58–1,10` | Wordmark disingkap dari kiri |
| `1,22–1,50` | Semua memudar |

Yang **tidak** ada di dalamnya, dan tidak boleh ditambahkan: suara whoosh, musik
sting terpisah, tagline, alamat website, animasi partikel.

## Isi closing

**16:9 (5 detik)** — konten ditaruh di **paruh kiri**. Paruh kanan sengaja
dikosongkan untuk elemen end screen YouTube (video terkait + tombol subscribe)
yang dipasang saat unggah. Kalau area itu diisi, elemen end screen akan menimpa
teks kita.

Isinya, berurutan: mark → satu kalimat ajakan → garis aksen → handle channel →
satu baris deskripsi channel.

**9:16 (2 detik)** — konten di tengah kotak aman, tanpa baris deskripsi. Dua
detik tidak cukup untuk membaca dua blok teks.

Untuk memeriksa zona end screen saat preview, tambahkan kelas `debug-endscreen`
pada `#stage` — batasnya akan tergambar. **Hapus sebelum render.**

## Cara pakai

Semua path ditulis relatif terhadap **root project** (akar repo), tanpa `../` —
HyperFrames menolak aset yang menunjuk di atas root.

```html
<link rel="stylesheet" href="shared/theme.css">
<link rel="stylesheet" href="shared/scenes.css">
```

Salin markup dari [`shared/scenes.html`](../shared/scenes.html), lalu:

```html
<script src="shared/scenes.js"></script>
<script>
  const tl = gsap.timeline({ paused: true });

  // ... scene-scene episode ...

  HFScenes.opening(tl, { at: 15.0 });                  // 16:9 saja
  HFScenes.closing(tl, { at: 475.0 });                 // 16:9, 5 dtk
  // HFScenes.closing(tl, { at: 48.0, format: "9x16" });  // Shorts, 2 dtk

  window.__timelines = window.__timelines || {};
  window.__timelines.t01l = tl;
</script>
```

Wrapper komposisi wajib memakai kelas `hf-stage` + `hf-16x9` / `hf-9x16`, dan
kunci `window.__timelines` harus sama dengan `data-composition-id`.

`at` adalah `data-start` scene-nya — harus sama persis dengan nilai di markup.
Kedua fungsi mengembalikan durasi scene, jadi bisa dipakai untuk menghitung
scene berikutnya:

```javascript
let t = 15.0;
t += HFScenes.opening(tl, { at: t });   // t sekarang 16.5
```

## Yang boleh dan tidak boleh diubah

**Boleh diubah per episode:**

- Teks `.close-cta` — maksimal **6 kata**, satu ajakan. Kata yang ditekankan
  dibungkus `<em>` (jadi indigo).
- Teks `.close-sub` (16:9 saja) — satu baris deskripsi channel.

**Tidak boleh diubah:**

- Durasi (1,5 / 5,0 / 2,0 detik).
- **Ukuran mark**: 200px (16:9) / 260px (9:16) di opening, 124px di closing.
  Angka ini hasil pengujian pada render 1920×1080 penuh — 132px yang dipakai
  di rancangan awal terlihat kerdil di layar besar.
- Struktur, kelas, id, dan urutan elemen.
- Koreografi di `scenes.js` — kalau memang perlu berubah, ubah di
  `shared/scenes.js` sekali untuk **semua** episode, jangan di satu komposisi.
- Warna, ukuran mark, dan bentuk logo. Logo tidak pernah direntangkan,
  dimiringkan, diwarnai ulang, atau diberi efek ([03 · Tema visual](03-tema-visual.md)).

## Efeknya ke timing

Kedua scene ini **memakan durasi** dan harus masuk hitungan sejak awal:

- Opening menambah 1,5 dtk di babak 2.
- Closing 5 dtk adalah bagian dari babak 6 (rangkuman + CTA), bukan tambahan
  di luar target durasi.

`tools/estimate-timing.mjs` hanya menghitung scene yang punya kolom VO. Scene
standar tidak punya VO, jadi **tambahkan manual**: +1,5 dtk (opening) dan +5,0
atau +2,0 dtk (closing) pada total, dan geser `data-start` scene sesudahnya.

## Checklist sebelum render

- [ ] Opening ada di babak 2, bukan di detik 0 — dan tidak ada di Shorts.
- [ ] `data-start` di markup sama persis dengan `at` di pemanggilan `HFScenes`.
- [ ] `.close-cta` maksimal 6 kata.
- [ ] Handle channel tertulis `@GetResolved`.
- [ ] Kelas `debug-endscreen` sudah dihapus dari `#stage`.
- [ ] Paruh kanan end card 16:9 kosong.
- [ ] Closing Shorts memakai `format: "9x16"` (2 dtk), bukan default 5 dtk.
