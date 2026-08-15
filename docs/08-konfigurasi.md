# 08 · Konfigurasi & Secret

**Semua** secret dan setelan produksi hidup di satu berkas: `.env` di akar repo.
Tidak ada API key di dalam dokumen, tidak ada angka setelan yang ditulis ulang di
skrip, tidak ada nilai yang dititipkan di berkas komposisi.

| Berkas | Di-commit? | Isinya |
|---|---|---|
| `.env.example` | ✅ ya | **Kontrak** — daftar lengkap variabel + penjelasan, nilai kosong/contoh |
| `.env` | ❌ tidak | Nilai asli di mesin ini, termasuk secret |
| `.gitignore` | ✅ ya | Mengunci `.env` (dan keluaran render) agar tidak ikut ter-commit |
| `tools/load-env.ps1` | ✅ ya | Memuat `.env` ke sesi PowerShell |

## Mulai

```powershell
Copy-Item .env.example .env      # sekali saja
# isi GEMINI_API_KEY, CHANNEL_NAME, ...
```

## Cara memakainya

**Skrip Node** — pakai flag bawaan Node 22, tanpa dependensi `dotenv`:

```powershell
node --env-file=.env tools/skrip.mjs
```

**Perintah lain** — muat dulu ke sesi terminal. Perhatikan **titik di depan**
(dot-sourcing); tanpa itu variabelnya hilang begitu skrip selesai:

```powershell
. .\tools\load-env.ps1
```

Opsi: `. .\tools\load-env.ps1 -Show` menampilkan variabel yang dimuat (secret
tetap disamarkan) dan mendaftar variabel yang masih kosong.

Variabel hanya berlaku di sesi terminal itu. Terminal baru = muat ulang.

### Komposisi Remotion — lewat berkas generate, bukan `process.env`

Komposisi di-bundle untuk browser; `process.env` di sana **tidak** berisi `.env`
kita. Jembatannya `tools/bangun-config.mjs`, yang menyalin **hanya nama yang ada
di daftar putihnya** ke `shared/config.gen.ts`:

```tsx
import { CFG, FPS, f } from "../../shared/config.gen";
```

Tiga hal yang mengikat:

1. **Variabel baru yang dibutuhkan komposisi wajib ditambahkan ke `IZIN` di
   `tools/bangun-config.mjs`** — kalau tidak, ia tidak sampai ke sana.
2. **Variabel yang nilainya cuma boleh salah satu dari beberapa pilihan**
   (mis. `SUBTITLE_MODE=auto|on|off`) didaftarkan di `PILIHAN`, bukan di
   `IZIN.teks` — supaya salah ketik menghentikan `npm run gen`, bukan diam-diam
   mengubah perilaku komposisi saat render.
3. **Jangan pernah menambahkan nama yang bernuansa secret ke daftar itu.**
   Bundle Remotion dikirim ke browser dan bisa ikut masuk berkas render;
   apa pun yang tersalin ke sana sama saja dengan dibocorkan. Skrip punya
   penjaga pola (`KEY|SECRET|TOKEN|PASSWORD|CLIENT_ID|CREDENTIAL`) yang
   menghentikan build, tapi jangan mengandalkan itu — pikirkan dulu.

`shared/config.gen.ts` di-ignore git, dibangun ulang `npm run gen`.

## Kelompok variabel

| Kelompok | Contoh variabel | Mengikat ke |
|---|---|---|
| Identitas channel | `CHANNEL_NAME`, `CHANNEL_HANDLE`, `CTA_URL` | [01](01-positioning.md), [06](06-publishing.md) |
| Gemini | `GEMINI_API_KEY` di sini; arahan pembacaan per topik di `ideas/<slug>/vo-gemini-profile.yaml` | [11 § Profil VO Gemini](11-rencana-vo.md#profil-vo-gemini--ideasslugvo-gemini-profileyaml) |
| Spesifikasi video | `LONG_WIDTH/HEIGHT`, `SHORT_WIDTH/HEIGHT`, `VIDEO_FPS`, durasi target | [02](02-format-video.md) |
| Timing VO | `VO_PAD_SECONDS`, `VO_WORDS_PER_MINUTE`, `VO_PLACEHOLDER_SECONDS`, `MUSIC_VOLUME`, `SUBTITLE_MODE` | [04 §3](04-pipeline-produksi.md#3-timing-estimasi-gratis) · [11](11-rencana-vo.md) |
| Scene standar | `OPENING_SECONDS`, `CLOSING_LONG_SECONDS`, `CLOSING_SHORT_SECONDS` | [10](10-scene-standar.md) |
| Render | `FFMPEG_PATH`, `FFPROBE_PATH`, `CHROME_PATH` | [04 §7](04-pipeline-produksi.md) |
| Loudness | `TARGET_LUFS`, `MUSIC_DUCK_LUFS` | [02](02-format-video.md) |
| YouTube | `YOUTUBE_*` | [06](06-publishing.md) — kosong selama unggah masih manual |

Nilai default beserta penjelasan per variabel ada langsung di
[`.env.example`](../.env.example) — itu dokumentasinya, jangan diduplikasi di sini.

## Aman saat push ke GitHub

Repo ini sudah disiapkan supaya secret tidak bisa ikut ter-push. Tiga lapis:

| Lapis | Berkas | Yang dilakukan |
|---|---|---|
| 1 | `.gitignore` | `.env` dan berkas kredensial lain tidak pernah masuk staging |
| 2 | `.git/hooks/pre-commit` | Menolak commit yang membawa `.env`, berkas kredensial, atau pola secret (`sk_…`, `ghp_…`, `AKIA…`, private key) di isi berkas |
| 3 | `tools/git-setup.ps1` | Memindai seluruh berkas yang akan ter-push, dan memverifikasi `.env` benar-benar ter-ignore |

Penyiapan (aman dijalankan ulang kapan saja — tidak pernah commit atau push):

```powershell
.\tools\git-setup.ps1
```

Hook **tidak ikut ter-clone** — `.git/hooks/` bukan bagian dari repo. Sumbernya
disimpan di `tools/hooks/` dan dipasang oleh skrip di atas. **Di mesin baru,
jalankan `git-setup.ps1` lebih dulu sebelum commit pertama.**

Hook bisa dilewati dengan `git commit --no-verify`. Jangan pakai itu untuk
menembus peringatan secret — satu-satunya alasan sah adalah kalau hook-nya
sendiri yang salah, dan itu berarti hook-nya yang harus diperbaiki.

### Sebelum push pertama

- [ ] `.\tools\git-setup.ps1` bersih — tidak ada pola secret dilaporkan.
- [ ] `git status --untracked-files=all --short` — pastikan `.env` **tidak** ada di daftar.
- [ ] Repo GitHub dibuat **private** kalau naskah/strategi belum siap publik.
- [ ] Kalau ada key yang pernah bocor (ter-commit, ter-share, masuk screenshot,
      dikirim ke layanan lain): **cabut di dashboard, terbitkan yang baru,
      `add` + `rotate`.** Menghapus dari berkas tidak menonaktifkan key.

### Kalau secret terlanjur ter-commit

Menghapusnya di commit berikutnya **tidak cukup** — nilainya tetap ada di
riwayat dan tetap bisa dibaca siapa pun yang meng-clone.

1. **Cabut key-nya lebih dulu** di dashboard. Ini langkah yang benar-benar
   menghentikan kerugian; sisanya cuma kebersihan.
2. Terbitkan key baru di AI Studio, ganti nilainya di `.env`.
3. Baru bersihkan riwayat (`git filter-repo`, atau buat repo baru kalau
   riwayatnya masih pendek), lalu force-push.

Urutannya penting: membersihkan riwayat lebih dulu tanpa mencabut key hanya
membuat kita merasa aman, padahal key-nya masih hidup.

## Rotasi API key Gemini

Gemini tidak punya mekanisme rotasi seperti dulu — tidak ada slot cadangan, tidak
ada perintah `rotate`, dan tidak ada endpoint sisa kuota yang bisa dipakai
memutuskan kapan harus berpindah. Yang ada cuma satu nilai:

```
GEMINI_API_KEY=
```

Menggantinya berarti menerbitkan key baru di
[Google AI Studio](https://aistudio.google.com/apikey), menempelkannya ke `.env`,
lalu **mencabut yang lama di sana**. Menghapusnya dari `.env` tidak menonaktifkan
apa pun.

**Konsekuensi yang perlu diketahui:** dulu `bikin-vo.mjs` memeriksa sisa kuota
sebelum berkas pertama dibuat, jadi "kehabisan di tengah topik" tertangkap lebih
dulu. Sekarang tidak ada yang bisa memeriksanya — satu-satunya rem otomatis
adalah `VO_MAX_CHARS_PER_TOPIC`, dan itu mengukur panjang naskah, bukan
tagihan. Kalau kuota habis di tengah jalan, ketahuannya saat satu permintaan
gagal; berkas yang sudah jadi tidak perlu dibuat ulang.

## Aturan

1. **Variabel baru wajib masuk `.env.example` juga**, dengan nilai kosong atau
   contoh — bukan nilai asli. Kalau hanya ditambahkan ke `.env`, orang lain
   (atau mesin lain) tidak akan tahu variabel itu ada.
2. **Jangan pernah menulis secret di berkas apa pun selain `.env`** — termasuk di
   naskah, komposisi HTML, dokumen, pesan commit, dan potongan kode di chat.
3. **Angka yang mengikat guideline** (resolusi, padding VO, track index, LUFS)
   diambil dari `.env`, bukan diketik ulang di skrip. Kalau angkanya berubah,
   ubah di `.env` **dan** di dokumen guideline yang bersangkutan — keduanya harus
   sepakat.
4. **Suara dikunci untuk seluruh channel** (`voice` di `ideas/<slug>/vo-gemini-profile.yaml`). Menggantinya di tengah
   jalan mengubah identitas channel; perlakukan seperti perubahan brand, bukan
   perubahan setelan.
5. Kalau `.env` bocor (ter-commit, ter-share, masuk screenshot): **cabut API key
   di Google AI Studio**, terbitkan yang baru, jangan sekadar menghapus berkasnya.

## Kalau nanti ada mesin/orang lain

Cukup tiga langkah: clone repo → `Copy-Item .env.example .env` → isi nilainya.
Tidak ada konfigurasi tersembunyi di luar berkas itu; kalau ada sesuatu yang
tidak jalan tanpa nilai yang tidak tercatat di `.env.example`, itu bug pada
konfigurasi, bukan pada mesinnya.
