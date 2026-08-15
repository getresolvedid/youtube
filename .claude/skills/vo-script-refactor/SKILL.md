---
name: vo-script-refactor
description: Jalankan vo-script-audit lalu perbaiki naskah VO-nya — memendekkan baris, memecah beat, membenahi undangan dan sambungan, membersihkan istilah ke ejaan kamus. Pakai saat diminta memperbaiki, menulis ulang, merapikan, atau menindaklanjuti temuan audit naskah VO. WAJIB lewat dua gerbang: topik yang naskahnya sudah beku, dan perubahan jumlah baris yang menggeser indeks beat di .tsx.
---

# vo-script-refactor

Menjalankan `vo-script-audit` lalu **memperbaiki** naskahnya. Bedanya dengan
audit cuma satu, tapi besar: skill ini menulis ke berkas.

Karena itu ia punya dua gerbang yang audit tidak punya. Keduanya menahan
kerusakan yang **tidak menghasilkan error** — tidak ada yang gagal, tidak ada
yang merah, hasilnya cuma salah.

---

## GERBANG 1 · Naskah yang sudah beku

Baca `naskah_beku` di frontmatter `ideas/<slug>/naskah.md`, **per keluaran**
(`L`, `S1`, `S2`).

```yaml
naskah_beku:
  L: 2026-08-14      # <- BEKU. VO-nya sudah dibayar.
  S1:                # <- belum beku, bebas
```

Keluaran yang **sudah punya tanggal** berarti VO-nya sudah digenerate dan
dibayar. Menulis ulang teksnya sekarang membuat naskah dan audio bercerai —
dan tidak ada satu pun pemeriksaan yang akan memberitahumu, karena `bikin-vo.mjs`
melewati scene yang MP3-nya sudah ada.

**Untuk keluaran yang beku: berhenti dan tanya.** Sebutkan berapa karakter yang
harus dibayar ulang (`karakter_terpakai` di frontmatter, dibagi per keluaran).
Lanjut hanya kalau user menyatakan tegas bahwa generate ulang menyusul.

Kalau lanjut, generate ulangnya bagian dari pekerjaan yang sama — bukan
"nanti". Naskah yang sudah diubah tapi VO-nya belum dibuat ulang adalah keadaan
paling berbahaya di repo ini, karena semuanya terlihat normal.

---

## GERBANG 2 · Indeks beat itu posisional

Komposisi memanggil beat **dengan nomor**:

```tsx
const B_TUNGGU = beat(ID, 4);       // baris ke-5 blok ## VO
const B = (i: number) => beat("ram-tugas", i);
```

**Memecah satu baris jadi dua menggeser semua indeks sesudahnya**, dan tiap
`.tsx` yang menunjuk indeks lama diam-diam menunjuk kalimat yang berbeda. Tanpa
error. Tanpa `tsc` gagal. Animasi cuma mendarat di kata yang salah.

Ini penyakit yang sama dengan HARD RULE 5, tapi **di dalam scene** dan tanpa
nama berkas yang membuatnya kelihatan.

### Tiga kelas, menurut radius ledakannya

| Kelas | Contoh | Yang wajib ikut |
|---|---|---|
| **1 · dalam baris** | ganti kata, ejaan kamus, buang simbol | tidak ada — jumlah baris tetap |
| **2 · jumlah baris berubah** | pecah baris, gabung baris | **remap indeks beat di `.tsx`** |
| **3 · lintas scene** | pindah kalimat, ubah baris pertama/terakhir | remap + periksa kedua tetangganya |

**Kelas 2 dan 3 tidak boleh berhenti di berkas `-vo.md`.** Dalam suntingan yang
sama:

1. Cari tiap pemakaian beat scene itu: `grep -rn 'beat(' ideas/<slug>` dan cari
   pemakaian pembantu `B(n)`.
2. Geser indeksnya sesuai posisi barisnya yang baru.
3. Perbarui komentar kalimat di sebelahnya kalau ada — sebagian scene menulis
   `// "Selama dijemput, prosesor cuma menunggu."`, dan komentar itu satu-satunya
   yang membuat pergeseran terlihat manusia. Scene yang belum punya, **tambahkan**.

Untuk kelas 3, buka berkas VO **kedua tetangganya** dan baca baris yang
bersentuhan. Scene yang baris pertamanya berubah punya sambungan baru ke scene
sebelumnya; yang paling sering terlupa adalah sambungan ke scene *sesudahnya*.

---

## Langkah

1. **Jalankan `vo-script-audit`** — pakai skill-nya, jangan ulangi analisisnya
   di sini. Tingkat A wajib nol setelah selesai.
2. **Periksa Gerbang 1.** Beku → berhenti, tanya.
3. **Usulkan perubahan lengkap dulu, jangan menyunting.** Per scene: baris
   sekarang, baris usulan, kelasnya (1/2/3), dan remap beat yang menyertainya.
4. **Tunggu persetujuan user.** HARD RULE 4: Claude menulis, user merevisi —
   tapi user melihatnya dulu.
5. **Tulis** — `-vo.md`, lalu `.tsx` untuk kelas 2/3, dalam langkah yang sama.
6. **Tulis alasannya di `## Catatan`** untuk tiap temuan yang sengaja
   *tidak* diubah. Tanpa itu, sesi berikutnya akan mengangkatnya lagi.
7. **Jalankan ulang** `npm run vo-script-audit <slug>` dan `npm run sisa`.
8. **Laporkan** yang berubah, yang sengaja dibiarkan, dan — kalau Gerbang 1
   dilewati dengan izin — berapa karakter yang sekarang harus digenerate ulang.

---

## Yang boleh diperbaiki, dan bagaimana

**Ritme datar.** Obatnya satu baris pendek yang menahan bobot, bukan menulis
ulang seluruh scene. Cari kalimat yang sebenarnya dua gagasan dan pecah — atau
buang kata yang tidak mengerjakan apa pun.

**Dua kalimat dalam satu beat.** Pecah **hanya kalau** keduanya butuh momen
animasi sendiri. Jembatan cepat ("Dekatnya memang membantu. Tapi bukan cuma
itu.") dan anafora klaim-lalu-koreksi memang bentuknya begitu — biarkan, dan
catat di `## Catatan`.

**Ejaan kamus.** Ubah ke kolom kiri `## Kamus pengucapan` (`SSD`, bukan `S S D`)
**hanya untuk topik yang belum beku**. Kalau istilahnya belum ada di tabel,
tambahkan barisnya di tabel `## Kamus pengucapan`, lalu **dengarkan** —
`kamus.version` di frontmatter — keduanya, atau jangan sama sekali.

**Undangan dan sambungan.** Perbaikan sambungan yang lompat hampir selalu ada di
**baris terakhir scene sebelumnya**, bukan di scene barunya: gantung sesuatu di
sana. Mengubah baris terakhir itu perubahan kelas 3.

---

## Yang tidak boleh

- **Jangan menyunting sebelum user melihat usulannya.**
- **Jangan mengubah `timing.gen.ts`** — ia turunan, dibangun `npm run gen`.
- **Jangan menyeimbangkan ritme sampai seragam.** Tujuannya variasi, bukan
  keteraturan yang lain.
- **Jangan menghapus temuan dengan mengubah ambangnya** di
  `tools/vo-script-audit.mjs`.
- **Jangan menambah kalimat cuma untuk memenuhi durasi.** Durasi mengikuti isi.
