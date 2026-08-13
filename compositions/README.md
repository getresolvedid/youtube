# compositions/

Satu berkas HTML per episode per format:

```
T01-long.html      1920×1080  (hf-16x9)
T01-short-1.html   1080×1920  (hf-9x16)
T01-short-2.html   1080×1920  (hf-9x16)
```

Titik mulai tercepat: salin [`../index.html`](../index.html) — komposisi uji
scene standar yang sudah lolos `npm run check` dan sudah terbukti dirender.

Aturan yang mengikat:

- Wrapper: `class="hf-stage hf-16x9"` (atau `hf-9x16`), `data-composition-id`
  unik, plus `data-width` / `data-height` / `data-duration`.
- Kunci `window.__timelines` **harus sama** dengan `data-composition-id`.
- Path aset relatif ke akar repo, **tanpa `../`**: `shared/theme.css`,
  `topics/T01-slug/vo/L-001.mp3`.
- Opening & closing disalin dari [`../shared/scenes.html`](../shared/scenes.html),
  jangan dibuat ulang — lihat [docs/10](../docs/10-scene-standar.md).
- Jalankan `npm run check` setiap selesai menyunting.

Render satu komposisi:

```powershell
npx hyperframes render -c compositions/T01-long.html -o topics/T01-slug/render/T01-L.mp4
```
