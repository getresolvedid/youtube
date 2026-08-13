# 10 · Scene Standar — Opening & Closing

Dua scene dipakai **identik di setiap episode**: brand sting di depan, end card
di belakang. Tujuannya pengenalan — penonton harus tahu ini channel yang sama
dari satu setengah detik animasi, tanpa membaca nama.

Berkasnya:

| Berkas | Isi |
|---|---|
| [`shared/StandarScenes.tsx`](../shared/StandarScenes.tsx) | Komponen + koreografi: `<BrandSting>` dan `<EndCard>` |
| [`shared/scenes.css`](../shared/scenes.css) | Gaya kedua scene, sudah menangani 16:9 dan 9:16 |
| [`public/logos/`](../public/logos/) | Mark & wordmark (salinan dari brand getresolved) |

> **Status: sudah terbukti jalan.** Keduanya sudah dirender jadi PNG 1920×1080
> dan diperiksa framenya setelah migrasi ke Remotion (2026-08-13). Uji regresi
> visual setelah mengubah `shared/StandarScenes.tsx`, `shared/scenes.css`, atau
> `shared/theme.css`:
>
> ```powershell
> npm run check                                         # otomatis menyampel keduanya
> npx remotion still s-opening out/opening.png --frame 20
> npx remotion still s-closing out/closing.png --frame 60
> ```
>
> `npm run check` sudah menyampel kedua scene ini — bukan kebetulan: keduanya
> milik `shared/`, jadi kalau salah satu rusak, **semua** episode ikut rusak.
> Tapi ia hanya membuktikan framenya ada isinya. Buka PNG-nya dan lihat.

---

## Aturan penempatan

| | Opening (brand sting) | Closing (end card) |
|---|---|---|
| Durasi 16:9 | **1,5 dtk** (`OPENING_SECONDS`) | **5,0 dtk** (`CLOSING_LONG_SECONDS`) |
| Durasi 9:16 | **tidak dipakai** | **2,0 dtk** (`CLOSING_SHORT_SECONDS`) |
| Posisi | **bagian 2 flow** — tepat setelah [question] | scene terakhir, setelah [case] |
| ID di timing | `opening` | `closing` |

Durasinya hidup di `.env`, dan dibaca **dua** pihak: `tools/bangun-timing.mjs`
(untuk menyusun timeline) dan `shared/StandarScenes.tsx` (untuk koreografinya).
Ditulis dua kali berarti cepat atau lambat keduanya berbeda dan semua scene
sesudahnya bergeser.

Penempatannya **otomatis**, bukan disalin tangan: `tools/bangun-timing.mjs`
menyisipkan `opening` tepat setelah baris terakhir bagian 1 di tabel scene
`naskah.md`, dan `closing` di paling akhir.

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

Untuk memeriksa zona end screen saat preview, pasang `<Panggung debug>` —
batas kotak aman dan zona end screen akan tergambar. **Jangan dinyalakan saat
render.**

## Cara pakai

Tidak ada yang perlu disalin. `Episode.tsx` sudah memasang keduanya:

```tsx
export const CTA = <>Yang dipakai, <em>di RAM</em>.</>;

export const isiScene = (t: Timing) => {
  if (t.id === "opening") return <BrandSting />;
  if (t.id === "closing") return <EndCard cta={CTA} />;
  // ...
};
```

Untuk Shorts:

```tsx
<EndCard cta={CTA} rasio="9x16" />   // 2 dtk, tanpa baris deskripsi
```

Waktunya tidak ditulis di sini sama sekali. `<Sequence>` di `Episode.tsx` yang
menentukan kapan scene berjalan, dan angkanya dari `timing.gen.ts`. Di dalam
komponennya, `useDetik()` mengembalikan detik ke berapa scene ini sedang
berjalan — selalu mulai dari 0, tak peduli dipasang di detik ke berapa. Itu
sebabnya `<BrandSting/>` bisa dipreview satuan dan hasilnya identik dengan saat
ia berjalan di menit ke-6.

Handle channel diambil dari `CHANNEL_HANDLE` di `.env`, bukan ditulis di
komponen.

## Yang boleh dan tidak boleh diubah

**Boleh diubah per episode:**

- Prop `cta` — maksimal **6 kata**, satu ajakan. Kata yang ditekankan dibungkus
  `<em>` (jadi indigo).
- Prop `sub` (16:9 saja) — satu baris deskripsi channel.

Keduanya prop, bukan hasil menyalin komponen. Kalau kamu sedang menyalin
`StandarScenes.tsx` ke episode, kamu sudah salah jalan.

**Tidak boleh diubah:**

- Durasi (1,5 / 5,0 / 2,0 detik) — ada di `.env`, bukan di komponen.
- **Ukuran mark**: 200px (16:9) / 260px (9:16) di opening, 124px di closing.
  Angka ini hasil pengujian pada render 1920×1080 penuh — 132px yang dipakai
  di rancangan awal terlihat kerdil di layar besar.
- Struktur, kelas, dan urutan elemen.
- Koreografi di `StandarScenes.tsx` — kalau memang perlu berubah, ubah di
  `shared/` sekali untuk **semua** episode, jangan di satu episode.
- Warna, ukuran mark, dan bentuk logo. Logo tidak pernah direntangkan,
  dimiringkan, diwarnai ulang, atau diberi efek ([03 · Tema visual](03-tema-visual.md)).

## Efeknya ke timing

Kedua scene ini **memakan durasi** dan sudah masuk hitungan otomatis:

- Opening menambah 1,5 dtk di babak 2.
- Closing 5 dtk adalah bagian dari babak 6 (rangkuman + CTA), bukan tambahan
  di luar target durasi.

`tools/bangun-timing.mjs` menyisipkan keduanya beserta durasinya saat menyusun
`timing.gen.ts`, jadi tidak ada yang perlu ditambahkan manual. Yang perlu
diingat cuma satu: `tools/estimate-timing.mjs` (perkiraan untuk dibaca manusia)
**tidak** menghitungnya — totalnya akan 6,5 dtk lebih pendek dari total
sebenarnya.

## Checklist sebelum render

- [ ] Opening ada di babak 2, bukan di detik 0 — dan tidak ada di Shorts.
- [ ] Prop `cta` maksimal 6 kata.
- [ ] `CHANNEL_HANDLE` di `.env` benar (`@GetResolved`) — handle-nya dari sana.
- [ ] `<Panggung debug>` tidak menyala.
- [ ] Paruh kanan end card 16:9 kosong.
- [ ] Closing Shorts memakai `rasio="9x16"` (2 dtk), bukan default 5 dtk.
