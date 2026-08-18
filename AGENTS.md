# Project Remotion — aturan framework

Aturan produksi channel ada di [CLAUDE.md](CLAUDE.md) dan [`docs/`](docs/).
Berkas ini hanya soal frameworknya: [Remotion](https://www.remotion.dev) 4.x,
React 19, TypeScript.

## Perintah

```powershell
npm run gen        # .env → config.gen.ts · naskah.md + scenes/*-vo.md → timing.gen.ts
npm run check      # tsc --noEmit + tools/periksa-frame.mjs
npm run sisa       # placeholder + rencana VO/direction yang belum ada
npm run studio     # Remotion Studio (server panjang — jalankan di background)
npm run render:t15 # episode utuh (satu skrip per topik, `:t<nn>`)
npm run still      # `npm run still -- t15-05-dikunci-semua out/dikunci.png`
```

`gen` jalan otomatis sebagai pre-script sebelum `studio` / `render` / `check` /
`sisa` / `still`.

> **`npm run studio` adalah server yang berjalan terus.** Di Claude Code
> jalankan dengan `run_in_background: true`. Sebagai perintah biasa ia akan
> timeout dan servernya mati.

> **Versi dipatok tepat** di `package.json` (`4.0.509`, tanpa `^`) supaya
> episode lama render identik berbulan-bulan kemudian. Naikkan dengan sadar,
> lalu `npm run check` dan bandingkan still-nya.

## Struktur

```
remotion.config.ts        setelan CLI (bukan ukuran komposisi)
src/index.ts              registerRoot
src/Root.tsx              daftar <Composition> — episode + satu per scene
shared/
  config.gen.ts           DIGENERATE dari .env — jangan disunting
  Stage.tsx               <Panggung> + <Scene>
  anim.ts                 helper animasi (pengganti GSAP)
  Icons.tsx               <Ic n="ram" /> + sprite
  StandarScenes.tsx       <KartuJudul> + <TandaBrand>
  Placeholder.tsx         <BelumDibuat> untuk scene yang belum digarap
  theme.css figur.css scenes.css
public/logos/             aset — diakses lewat staticFile()
ideas/<slug>/
  naskah.md               materi topik + DAFTAR scene
  timing.gen.ts           DIGENERATE dari naskah.md + scenes/*-vo.md — jangan disunting
  Episode.tsx             merangkai <Sequence>, tidak berisi scene
  scenes/index.ts         SCENES: id → komponen
  scenes/01-hook-question-vo.md         teks VO scene itu (HARD RULE 4)
  scenes/01-hook-question-direction.md  apa yang terjadi di layar (HARD RULE 3)
  scenes/01-hook-question.tsx           satu scene = satu berkas, bernomor urut
```

## Aturan yang mengikat

1. **Animasi = fungsi murni dari frame.** Pakai `useDetik()` dan helper di
   `shared/anim.ts`. Dilarang `useState`/`useEffect` untuk animasi,
   `Math.random()`, `Date.now()`, `setInterval`. Remotion merender frame 1.234
   tanpa pernah merender 1.233, dan merender banyak frame paralel di proses
   berbeda — apa pun yang menyimpan state akan pecah.
2. **Waktu ditulis dalam detik, dikonversi sekali.** Naskah, timing, dan docs
   semuanya bicara detik. `f()` di `shared/config.gen.ts` satu-satunya tempat
   detik jadi frame.
3. **Batas <Sequence> dihitung dari titik mulai dua scene berurutan**, bukan
   dari durasi masing-masing — lihat komentar di `Episode.tsx`. Membulatkan
   durasi sendiri-sendiri menyisakan frame hitam di antara scene.
4. **Ukuran & fps tidak pernah ditulis literal.** Semuanya dari `.env` lewat
   `shared/config.gen.ts`. Variabel baru wajib masuk daftar putih di
   `tools/bangun-config.mjs` **dan** `.env.example`.
5. **Aset lewat `staticFile()`** dari `public/`. Jangan mengimpor berkas biner
   sebagai modul.
6. **Font lewat `@remotion/google-fonts`** (`shared/fonts.ts`), bukan `@import`
   di CSS — loader-nya menahan render sampai font siap.
7. **Jangan sunting berkas `*.gen.ts`.** Ubah sumbernya (`.env` / `naskah.md` /
   `scenes/<kunci>-vo.md`) lalu `npm run gen`.
8. **Detik VO tidak diketik di dalam scene.** Pakai `beat("<id>", i)` dari
   `timing.gen.ts` — ia dihitung dari rencana VO scene itu, jadi ikut bergeser
   sendiri saat kalimatnya berubah (HARD RULE 4).

## Setelah menyunting komposisi

```powershell
npm run check
```

`check` = `tsc --noEmit` + bukti frame tidak kosong. Ia menangkap "tidak ada
yang terlihat", **bukan** "jelek". Kontras teks, kotak aman, dan ritme gerak
tetap harus dilihat mata:

```powershell
npx remotion still 15-s016 out/s016.png --frame 30
```

Lalu buka PNG-nya. `check` lulus bukan bukti gambarnya benar — alasannya ada di
[CLAUDE.md](CLAUDE.md#1-satu-scene--satu-berkas-di-ideasslugscenes).

## Dokumentasi

- Remotion — <https://www.remotion.dev/docs>
- API yang paling sering dipakai di repo ini: `interpolate`, `Easing`,
  `useCurrentFrame`, `useVideoConfig`, `Sequence`, `AbsoluteFill`, `staticFile`,
  `Audio`, `Composition`.
