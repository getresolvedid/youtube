# ideas/ — tempat masuk semua ide

**Semua ide posting ditulis di sini dulu — dan seluruh produksinya juga hidup
di sini.** Satu ide, satu folder `ideas/<slug>/`.

Menangkap ide harus murah: cukup buat `ideas/<slug>/ide.md` dan tulis apa adanya.
Tidak perlu rapi, tidak perlu lengkap. Yang penting tidak hilang. Berkas lain
(`naskah.md`, `vo/`, `render/`) menyusul kalau dan ketika ide itu digarap.

```
ideas/apa-itu-ram/
├── ide.md        ← selalu ada
├── naskah.md     ← setelah lolos 4 syarat
├── vo/           ← setelah naskah beku
└── render/       ← MP4 + thumbnail + publish.md
```

## Alur sebuah ide

```
ideas/<slug>/ide.md      →   docs/07-backlog-topik.md   →   ideas/<slug>/naskah.md
   ide mentah                 lolos 4 syarat,                naskah, VO, komposisi,
   (siapa pun, kapan pun)     dapat kode T{nn}               render
       ↓ tidak lolos
   status: ditolak
   (tetap disimpan, beserta alasannya)
```

**Aturan supaya tidak jadi dua daftar yang bersaing:**

- `ideas/` = **semua** ide, termasuk yang belum diuji dan yang ditolak.
- [`docs/07-backlog-topik.md`](../docs/07-backlog-topik.md) = **hanya** yang sudah
  lolos 4 syarat dan punya kode `T{nn}`. Isinya ringkas — sudut video panjang +
  dua Shorts.
- Ide yang sudah lolos **tetap tinggal di sini**, statusnya diubah jadi
  `lolos → T01`. Jangan dihapus; catatan penolakan dan pertimbangan awalnya
  berguna saat topik itu digarap.

## Empat syarat kelulusan

Disalin dari [docs/07](../docs/07-backlog-topik.md#syarat-sebuah-topik-masuk-backlog)
supaya bisa diuji langsung di berkas ide:

1. **Bisa dijelaskan dengan bahasa anak 5 tahun** — ≤ 60 kata, nol istilah teknis.
2. **Punya lapisan untuk dua audiens** — versi L1 yang berdiri sendiri *dan* L3
   yang memberi developer sesuatu di luar artikel blog.
3. **Ada mekanisme untuk ditunjukkan** — sesuatu yang bergerak, bukan daftar poin.
4. **Bisa diverifikasi** — klaimnya bisa ditelusuri ke sumber primer.

Gagal satu pun = belum boleh masuk backlog. Ide yang gagal tidak dibuang: sering
kali ia bisa digabung dengan ide lain, atau diturunkan jadi Shorts saja.

## Template

Salin ke `ideas/<slug>/ide.md`:

```markdown
---
judul:
diusulkan: YYYY-MM-DD
pilar:            # P1–P5, kosongkan kalau belum jelas
lapis:            # umum | umum → dev | dev
status: mentah    # mentah | diuji | lolos → T{nn} | ditolak | jadi Shorts saja
---

# <Judul>

## Ide mentah

> <Tulis apa adanya, kalimat aslinya. Boleh satu baris.>

## Penjelasan 5 tahun (draf)

> <≤ 60 kata, nol istilah teknis. Kalau macet di sini, itu sinyal — catat saja
> apa yang bikin macet.>

**Titik putus analogi:** <di mana analoginya berhenti berlaku>

## Uji 4 syarat

| Syarat | Lolos? | Catatan |
|---|---|---|
| 1 Bahasa anak 5 tahun | | |
| 2 Dua lapis (L1 + L3) | | |
| 3 Ada mekanisme | | |
| 4 Bisa diverifikasi | | |

## Sudut video panjang

## Sudut dua Shorts

- **Nugget:**
- **Jebakan:**

## Catatan
```

Ide yang cuma satu baris pun tetap sah ditulis — bagian di bawahnya boleh diisi
belakangan.
