# publish.md — enkripsi (T17 provisional)

**Fase 4 & 5.** Judul & deskripsi untuk video panjang dan keempat Short, plus kartu
yang sudah dirender di folder ini.

> **SIAP DIUNGGAH — 2026-08-18.** Gerbang docs/04 §5 terbuka (tiga sumber primer
> dibuka), naskah beku untuk kelima keluaran, VO jadi dan diratakan ke −14 LUFS,
> dan kelima MP4 sudah dirender di folder ini.
>
> **Yang tersisa manual dan tidak bisa diotomatiskan repo ini:** mengunggah.
> Tidak ada integrasi YouTube API di `tools/`. Yang disiapkan repo cuma
> bahannya — MP4, lima PNG, dan teks di bawah yang tinggal disalin ke kolomnya.

## Kartu yang sudah jadi

| Berkas | Ukuran | Komposisi | Brief |
|---|---|---|---|
| `T17-enkripsi.mp4` | 1920×1080 · 2:28 | `T17-enkripsi` | — |
| `T17-enkripsi-s1.mp4` | 1080×1920 · 0:30 | `T17-enkripsi-s1` | — |
| `T17-enkripsi-s2.mp4` | 1080×1920 · 0:33 | `T17-enkripsi-s2` | — |
| `T17-enkripsi-s3.mp4` | 1080×1920 · 0:43 | `T17-enkripsi-s3` | — |
| `T17-enkripsi-s4.mp4` | 1080×1920 · 0:53 | `T17-enkripsi-s4` | — |
| `thumb.png` | 1280×720 | `T17-thumb` | [thumbnail.md](../thumbnail.md) |
| `thumb-s1.png` | 2160×3840 | `T17-thumb-s1` | idem |
| `thumb-s2.png` | 2160×3840 | `T17-thumb-s2` | idem |
| `thumb-s3.png` | 2160×3840 | `T17-thumb-s3` | idem |
| `thumb-s4.png` | 2160×3840 | `T17-thumb-s4` | idem |

**MP4 sudah dirender** — kelimanya di folder ini, semuanya bersuara (aac).

**Uji 210×118 belum dilakukan** — itu ukuran nyatanya di feed ponsel, dan tidak
ada pemeriksaan yang bisa menggantikannya. Kecilkan `thumb.png` dan lihat
sendiri sebelum mengunggah.

---

## Video panjang · 2 mnt 28 dtk

### Judul — 3 kandidat

| # | Judul | Karakter | Bentuk |
|---|---|---|---|
| **1** ✅ | `Apa yang terjadi pada pesanmu setelah kamu tekan kirim?` | 55 | pembongkaran |
| 2 | `Kenapa pesanmu bisa dibaca orang lain di jalan?` | 47 | pertanyaan mekanisme |
| 3 | `Enkripsi: bagaimana pesanmu dikunci sebelum berangkat` | 53 | hasil konkret |

**Dipilih #1.** Ia bertanya soal tindakan yang penonton lakukan puluhan kali
sehari, dan jawabannya benar-benar isi videonya — bukan janji yang tidak
ditepati. Kandidat 2 lebih tajam tapi membocorkan masalahnya di judul, dan
seluruh bagian 3 video ini bekerja dengan membuat masalah itu **terasa** dulu.

**Tidak berbagi satu kata pun dengan thumbnail** (`LAYAR SAMA, ISI BEDA`) —
syarat docs/06: judul menjelaskan, thumbnail menarik. Kalau #1 diganti, periksa
lagi: kata *layar*, *sama*, *isi*, dan *beda* semuanya terlarang di judul.

### Deskripsi

```
Pesan yang kamu kirim tidak langsung muncul di HP temanmu — ia menempuh jalan panjang dulu, dan di jalan itu ada yang bisa membacanya.
Untuk siapa pun yang pakai aplikasi chat. Tidak perlu tahu apa pun soal coding.

⏱ Bab
00:00 Pesan yang dikirim
00:20 Diketik, lalu berangkat
00:38 Lewat internet
00:51 Ada yang bisa membacanya
01:07 Enkripsi
01:23 Terkunci di jalan
01:38 Dekripsi
01:53 Ringkasan
02:10 Apa itu enkripsi

📌 Yang dibahas
• Kenapa pesanmu melewati banyak tempat sebelum sampai
• Apa yang terlihat oleh pihak lain di jalur itu
• Bagaimana enkripsi mengubah isinya, dan dekripsi mengembalikannya

🔗 Sumber & bacaan lanjutan
- RFC 3552 §3.5 — Internet Threat Model (BCP 72) — https://www.rfc-editor.org/rfc/rfc3552
- RFC 791 §2.2 — Internet Protocol, Model of Operation — https://www.rfc-editor.org/rfc/rfc791
- RFC 7258 — Pervasive Monitoring Is an Attack (BCP 188) — https://www.rfc-editor.org/rfc/rfc7258
- NIST SP 800-57 Part 1 Rev. 5 — definisi enkripsi — https://csrc.nist.gov/glossary/term/encryption

🎬 Video terkait
- Apa itu firewall — <url>

Get Resolved — penjelasan teknologi, coding, dan engineering dalam Bahasa Indonesia.
youtube.com/@GetResolved · getresolved.id

#enkripsi #keamanandigital #teknologi
```

**Chapter-nya diturunkan dari `timing.gen.ts`, bukan diketik dari perasaan** —
sembilan bab, yang pertama `00:00`, jarak terpendeknya 12 detik (00:38 → 00:51).
Ketiganya syarat YouTube; kalau salah satu tidak dipenuhi, chapter-nya tidak
ditampilkan sama sekali.

> **DIPERBARUI 2026-08-18, setelah VO jadi.** Angka pertama di berkas ini
> diturunkan dari PERKIRAAN jumlah kata; sesudah MP3-nya ada, `npm run gen`
> mengukurnya dari berkasnya dan **seluruh bab bergeser 2–9 detik** (video
> panjangnya sendiri melar dari 2:19 ke 2:28). Bab yang meleset sembilan detik
> tidak error di mana pun — ia cuma mengantar penonton ke tempat yang salah.
> Kalau satu kalimat VO diubah lagi, angka-angka ini basi lagi: baca ulang dari
> `npm run gen`, jangan percaya tabel ini.

**Empat sumber di deskripsi, tiga klaim di naskah.** RFC 3552 §3.5 menutup dua
klaim sekaligus dengan satu kalimat — *"Such gateways are naturally able to
read, modify, or remove any datagram transmitted along that path"* — dan itu
persis masalah yang dibangun bagian 3, ditulis IETF sendiri. Tabel lengkapnya
beserta kutipan verbatimnya di [naskah.md § Sumber](../naskah.md).

---

## Shorts · serial empat bagian

Judul Short **≤ 40 karakter, satu klaim, tanpa nama channel** (docs/06).
Deskripsinya 1–2 kalimat + `#Shorts` + tautan ke video panjang.

### S1 · 30,2 dtk — "Apa yang terjadi pada pesanmu?"

**Judul:** `Pesanmu tidak langsung sampai` (29)

```
Ada perjalanan panjang antara tombol kirim dan HP temanmu. Ini isinya.
Video lengkapnya: <url>
#Shorts
```

### S2 · 33,4 dtk — "Apa ada yang bisa melihatnya?"

**Judul:** `Siapa yang bisa baca pesanmu?` (29)

```
Di sepanjang jalan itu ada yang bisa melihat isinya — dan dia bukan orang yang kamu kirimi.
Video lengkapnya: <url>
#Shorts
```

### S3 · 42,5 dtk — "Bagaimana enkripsi bekerja?"

**Judul:** `Begini cara enkripsi mengunci pesan` (35)

```
Kalimat yang sama, jalan yang sama, orang yang sama — dan yang terlihat berubah total.
Video lengkapnya: <url>
#Shorts
```

### S4 · 53,2 dtk — "Bagaimana penerima membacanya?"

**Judul:** `Kenapa cuma dia yang bisa baca` (30)

```
Kalau isinya sudah tidak terbaca, bagaimana temanmu membukanya lagi? Jawabannya satu benda.
Video lengkapnya: <url>
#Shorts
```

### Jadwal rilis

Sembilan hari untuk satu topik (docs/06 § Jadwal rilis), jarak minimal 48 jam
antar-Short:

| Hari | Yang tayang |
|---|---|
| H | Video panjang |
| H (+2 jam) | S1 · Pesanmu tidak langsung sampai |
| H+3 | S2 · Siapa yang bisa baca pesanmu? |
| H+5 | S3 · Begini cara enkripsi mengunci pesan |
| H+7 | S4 · Kenapa cuma dia yang bisa baca |

**Urutannya bukan selera.** S1 duluan karena ia yang paling mudah ditemukan
penonton baru; S4 paling belakang karena ia paling berguna bagi yang sudah
mengikuti. Empat Short yang dilepas berdekatan bukan empat kali jangkauan,
melainkan satu jangkauan yang dibagi empat.

## Yang masih menghalangi rilis

~~1. Nol sumber dibuka~~ — **beres 2026-08-18.** Tiga sumber primer dibuka,
tabelnya di [naskah.md § Sumber](../naskah.md), gerbang docs/04 §5 terbuka.

~~2. VO belum ada~~ — **beres 2026-08-18.** 33 berkas MP3 di
`public/vo/enkripsi/`, semuanya diratakan ke −14 LUFS, dan timing kelima
keluaran sekarang DIUKUR dari MP3-nya. Pencocokan naskah vs yang diucapkan
**100% di ketiga batch video panjang** — Gemini mengucapkan naskahnya, bukan
parafrasenya.

3. **Kode topik masih provisional.** `t17` dipakai di `src/Root.tsx`,
   `tools/prefiks.mjs`, dan `package.json`; topiknya belum ada di docs/07. Syarat
   4 (bisa diverifikasi) sekarang **lolos** — sumbernya sudah dibuka — jadi yang
   menahan tinggal syarat 2: tangga L3 masih kosong. Selama kodenya provisional,
   id komposisi dan nama berkas render menunjuk kode yang belum resmi.
4. **`ide.md` masih bercerita tentang sudut yang sudah gugur** — loker di gudang
   sewaan, hook tombol "Lupa password?". Ia perlu ditulis ulang atau ditandai
   gugur; membiarkannya berarti dua sumber kebenaran.
5. **Uji thumbnail 210×118 belum dilakukan.** Harus mata, bukan alat.
