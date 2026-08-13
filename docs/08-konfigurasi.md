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
| `tools/elevenlabs-keys.mjs` | ✅ ya | Kelola & rotasi API key ElevenLabs |

## Mulai

```powershell
Copy-Item .env.example .env      # sekali saja
# isi ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID, CHANNEL_NAME, ...
```

## Cara memakainya

**Skrip Node** — pakai flag bawaan Node 22, tanpa dependensi `dotenv`:

```powershell
node --env-file=.env tools/skrip.mjs
```

**Perintah yang tidak bisa baca `.env` sendiri** (terutama `npx hyperframes`) —
muat dulu ke sesi terminal. Perhatikan **titik di depan** (dot-sourcing); tanpa
itu variabelnya hilang begitu skrip selesai:

```powershell
. .\tools\load-env.ps1
npx hyperframes render -o render/T01-L.mp4
```

Opsi: `. .\tools\load-env.ps1 -Show` menampilkan variabel yang dimuat (secret
tetap disamarkan) dan mendaftar variabel yang masih kosong.

Variabel hanya berlaku di sesi terminal itu. Terminal baru = muat ulang.

## Kelompok variabel

| Kelompok | Contoh variabel | Mengikat ke |
|---|---|---|
| Identitas channel | `CHANNEL_NAME`, `CHANNEL_HANDLE`, `CTA_URL` | [01](01-positioning.md), [06](06-publishing.md) |
| ElevenLabs | `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`, `ELEVENLABS_MODEL_ID`, setelan suara | [04 §3](04-pipeline-produksi.md#3-voice-over-elevenlabs) |
| Spesifikasi video | `LONG_WIDTH/HEIGHT`, `SHORT_WIDTH/HEIGHT`, `VIDEO_FPS`, durasi target | [02](02-format-video.md) |
| Timing VO | `VO_PAD_SECONDS`, `VO_WORDS_PER_MINUTE`, `TRACK_VO`, `TRACK_MUSIC` | [04 §4–5](04-pipeline-produksi.md#4-tabel-timing) |
| Render | `HYPERFRAMES_QUALITY`, `HYPERFRAMES_WORKERS`, `FFMPEG_PATH`, `CHROME_PATH` | [04 §6](04-pipeline-produksi.md#6-render) |
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
2. Terbitkan key baru → `node tools/elevenlabs-keys.mjs add sk_baru` → `rotate`.
3. Baru bersihkan riwayat (`git filter-repo`, atau buat repo baru kalau
   riwayatnya masih pendek), lalu force-push.

Urutannya penting: membersihkan riwayat lebih dulu tanpa mencabut key hanya
membuat kita merasa aman, padahal key-nya masih hidup.

## Rotasi API key ElevenLabs

Key ElevenLabs bisa dirotasi tanpa menyunting berkas secara manual. Yang dipakai
semua skrip **selalu** `ELEVENLABS_API_KEY`; `ELEVENLABS_API_KEY_2`, `_3`, dan
seterusnya adalah cadangan — bisa key dari akun lain, atau key pengganti yang
sudah disiapkan untuk rotasi keamanan.

```powershell
node tools/elevenlabs-keys.mjs status        # daftar key (nilainya disamarkan)
node tools/elevenlabs-keys.mjs check         # sisa kuota tiap key (memanggil API)
node tools/elevenlabs-keys.mjs add sk_xxx    # tambah cadangan
node tools/elevenlabs-keys.mjs rotate        # promosikan cadangan jadi aktif
node tools/elevenlabs-keys.mjs rotate --auto # rotasi HANYA kalau key aktif habis/ditolak
node tools/elevenlabs-keys.mjs drop 2        # buang key slot ke-2
```

`rotate` menggeser urutan key di `.env` dan menulis ulang berkasnya **di tempat** —
komentar, urutan baris, dan variabel lain tidak tersentuh. Key lama tidak dibuang,
hanya turun jadi cadangan, jadi rotasi bisa dibalik.

Setelah rotasi, terminal yang sedang terbuka masih memegang nilai lama. Muat ulang:

```powershell
. .\tools\load-env.ps1
```

**Kapan merotasi:**

| Situasi | Tindakan |
|---|---|
| Kuota key aktif habis di tengah produksi | `rotate --auto`, lanjutkan generate VO |
| Rotasi keamanan berkala | terbitkan key baru → `add` → `rotate` → **cabut key lama di dashboard** → `drop` |
| Key bocor (ter-commit, ter-share, masuk screenshot) | **cabut di dashboard lebih dulu**, baru `add` + `rotate` |

`drop` hanya menghapus key dari `.env` — **itu tidak menonaktifkan key-nya**.
Pencabutan hanya sah kalau dilakukan di
[dashboard ElevenLabs](https://elevenlabs.io/app/settings/api-keys).

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
4. **`ELEVENLABS_VOICE_ID` dikunci untuk seluruh channel.** Menggantinya di tengah
   jalan mengubah identitas channel; perlakukan seperti perubahan brand, bukan
   perubahan setelan.
5. Kalau `.env` bocor (ter-commit, ter-share, masuk screenshot): **cabut API key
   di dashboard ElevenLabs**, terbitkan yang baru, jangan sekadar menghapus berkasnya.

## Kalau nanti ada mesin/orang lain

Cukup tiga langkah: clone repo → `Copy-Item .env.example .env` → isi nilainya.
Tidak ada konfigurasi tersembunyi di luar berkas itu; kalau ada sesuatu yang
tidak jalan tanpa nilai yang tidak tercatat di `.env.example`, itu bug pada
konfigurasi, bukan pada mesinnya.
