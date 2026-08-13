# 10 · Scene Standar — Kartu Judul & Tanda Brand

Dua scene dipakai **identik di setiap episode**: kartu judul di depan, tanda
tangan brand di belakang. Tujuannya pengenalan — penonton harus tahu ini
channel yang sama dari beberapa detik animasi, tanpa membaca nama.

> **Perannya pernah terbalik.** Sampai 2026-08-13 pembuka cuma logo besar dan
> **penutup** yang membawa judul episode. Itu salah tempat: judul yang muncul
> di detik terakhir tidak lagi memberi tahu penonton sedang menonton apa, ia
> cuma mengulang. Sekarang judul di pembuka, brand di penutup — dan pembuka
> naik dari 1,5 ke 2,5 dtk karena judul butuh waktu untuk dibaca.

Berkasnya:

| Berkas | Isi |
|---|---|
| [`shared/StandarScenes.tsx`](../shared/StandarScenes.tsx) | Komponen + koreografi: `<KartuJudul>` dan `<TandaBrand>` |
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

| | Pembuka — kartu judul | Penutup — tanda brand |
|---|---|---|
| Komponen | `<KartuJudul judul="…">` | `<TandaBrand>` |
| Durasi 16:9 | **2,5 dtk** (`OPENING_SECONDS`) | **5,0 dtk** (`CLOSING_LONG_SECONDS`) |
| Durasi 9:16 | **tidak dipakai** | **2,0 dtk** (`CLOSING_SHORT_SECONDS`) |
| Posisi | **bagian 2 flow** — tepat setelah [question] | scene terakhir, setelah [case] |
| ID di timing | `opening` | `closing` |
| Membawa judul | **ya** | tidak |

Durasinya hidup di `.env`, dan dibaca **dua** pihak: `tools/bangun-timing.mjs`
(untuk menyusun timeline) dan `shared/StandarScenes.tsx` (untuk koreografinya).
Ditulis dua kali berarti cepat atau lambat keduanya berbeda dan semua scene
sesudahnya bergeser.

Penempatannya **otomatis**, bukan disalin tangan: `tools/bangun-timing.mjs`
menyisipkan `opening` tepat setelah baris terakhir bagian 1 di tabel scene
`naskah.md`, dan `closing` di paling akhir.

**Kartu judul tidak pernah muncul di detik nol.** Frame pertama video selalu
[question] — pertanyaan mendahului brand. Ini aturan retensi yang sudah dikunci di
[02 · Format](02-format-video.md#aturan-babak); scene standar mengikutinya, bukan
membatalkannya.

**Shorts tidak punya kartu judul sama sekali.** Di feed Shorts, dua setengah
detik judul di awal adalah dua setengah detik yang dipakai penonton untuk
menggeser layar.

**Kenapa 2,5 detik dan bukan 1,5.** Dulu 1,5 dtk, saat scene ini isinya cuma
logo. Judul butuh lebih lama: pada 2,5 dtk ia baru masuk di `0,70` dan mulai
memudar di `2,22` — sekitar 1,5 dtk tampil penuh. Di 1,5 dtk, judul hanya
tampil setengah detik dan praktis tidak terbaca. Menaikkannya lagi bukan
perbaikan; ini jeda di tengah babak, bukan babak sendiri.

## Isi pembuka

Rata kiri, bukan di tengah — logo dan judul yang ditengahkan terbaca sebagai
poster, rata kiri terbaca sebagai kepala bab. Itu memang fungsinya di sini.

| Waktu | Yang terjadi |
|---|---|
| `0,05–0,50` | Mark masuk, `back.out(1.8)` |
| `0,30–0,82` | Wordmark disingkap dari kiri |
| `0,55–1,00` | Garis aksen menggambar diri |
| `0,70–1,20` | Judul episode naik + memudar masuk |
| `2,22–2,50` | Semua memudar |

**Judul episode maksimal 5 kata**, dan **tidak boleh membocorkan jawaban
episode**. Kartu ini tayang sekitar detik 10; kalau istilah yang baru
diperkenalkan di menit ke-1 sudah tertulis di sini, seluruh tangga abstraksi
([09](09-tangga-abstraksi.md)) yang dibangun sesudahnya jadi percuma. T01
memakai "Di mana data bekerja", bukan "Apa itu RAM".

Yang **tidak** ada di dalamnya, dan tidak boleh ditambahkan: suara whoosh, musik
sting terpisah, tagline, alamat website, animasi partikel, handle channel.

## Isi penutup

**16:9 (5 detik)** — konten ditaruh di **paruh kiri**. Paruh kanan sengaja
dikosongkan untuk elemen end screen YouTube (video terkait + tombol subscribe)
yang dipasang saat unggah. Kalau area itu diisi, elemen end screen akan menimpa
teks kita.

Isinya, berurutan: mark besar + wordmark → garis aksen → handle channel →
satu baris deskripsi channel. **Tidak ada judul** — itu tugas pembuka.

| Waktu | Yang terjadi |
|---|---|
| `0,10–0,60` | Mark masuk, `back.out(1.6)` |
| `0,22–0,84` | Cincin putih **menggambar diri** (stroke draw) |
| `0,60–1,02` | Titik hijau muncul — *the resolve point* |
| `0,78–1,30` | Wordmark disingkap dari kiri |
| `1,05–1,55` | Garis aksen menggambar diri |
| `1,20 · 1,42` | Handle, lalu deskripsi |
| `1,80–4,40` | Mark bernapas `y ±6px` — 5 detik tidak boleh jadi layar diam |

Pembangunan mark yang penuh ada di sini, bukan di pembuka, karena di sini
marknya 200px. Pada mark 104px di pembuka, cincin yang menggambar diri tidak
terbaca sebagai apa pun.

**5 detik itu batas bawah, bukan pilihan.** End screen YouTube baru bisa
diklik kalau tayang minimal 5 detik. Memendekkan penutup berarti membuang
end screen sepenuhnya.

**9:16 (2 detik)** — konten di tengah kotak aman, tanpa baris deskripsi. Dua
detik tidak cukup untuk membaca dua blok teks.

Untuk memeriksa zona end screen saat preview, pasang `<Panggung debug>` —
batas kotak aman dan zona end screen akan tergambar. **Jangan dinyalakan saat
render.**

## Cara pakai

Tidak ada yang perlu disalin. `Episode.tsx` sudah memasang keduanya:

```tsx
export const JUDUL = "Di mana data bekerja";

export const isiScene = (t: Timing) => {
  if (t.id === "opening") return <KartuJudul judul={JUDUL} />;
  if (t.id === "closing") return <TandaBrand />;
  // ...
};
```

Untuk Shorts:

```tsx
<TandaBrand rasio="9x16" />   // 2 dtk, tanpa baris deskripsi
```

Waktunya tidak ditulis di sini sama sekali. `<Sequence>` di `Episode.tsx` yang
menentukan kapan scene berjalan, dan angkanya dari `timing.gen.ts`. Di dalam
komponennya, `useDetik()` mengembalikan detik ke berapa scene ini sedang
berjalan — selalu mulai dari 0, tak peduli dipasang di detik ke berapa. Itu
sebabnya `<KartuJudul/>` bisa dipreview satuan dan hasilnya identik dengan saat
ia berjalan di menit ke-6.

Handle channel diambil dari `CHANNEL_HANDLE` di `.env`, bukan ditulis di
komponen.

## Yang boleh dan tidak boleh diubah

**Boleh diubah per episode:**

- Prop `judul` di `<KartuJudul>` — maksimal **5 kata**, tidak membocorkan
  jawaban episode.
- Prop `sub` di `<TandaBrand>` (16:9 saja) — satu baris deskripsi channel.

Keduanya prop, bukan hasil menyalin komponen. Kalau kamu sedang menyalin
`StandarScenes.tsx` ke episode, kamu sudah salah jalan.

**Tidak boleh diubah:**

- Durasi (2,5 / 5,0 / 2,0 detik) — ada di `.env`, bukan di komponen. 5,0 dtk
  penutup adalah batas bawah end screen YouTube, bukan angka selera.
- **Ukuran mark**: 104px di pembuka, 200px (16:9) / 176px (9:16) di penutup.
  Angka ini hasil pengujian pada render 1920×1080 penuh — 132px yang dipakai
  di rancangan awal terlihat kerdil di layar besar.
- **Judul hanya di pembuka.** Penutup tidak pernah membawa judul; kalau merasa
  butuh, yang kurang adalah pembukanya.
- Struktur, kelas, dan urutan elemen.
- Koreografi di `StandarScenes.tsx` — kalau memang perlu berubah, ubah di
  `shared/` sekali untuk **semua** episode, jangan di satu episode.
- Warna, ukuran mark, dan bentuk logo. Logo tidak pernah direntangkan,
  dimiringkan, diwarnai ulang, atau diberi efek ([03 · Tema visual](03-tema-visual.md)).

## Efeknya ke timing

Kedua scene ini **memakan durasi** dan sudah masuk hitungan otomatis:

- Kartu judul menambah 2,5 dtk di babak 2.
- Tanda brand 5 dtk adalah bagian dari babak 6 (rangkuman + CTA), bukan tambahan
  di luar target durasi.

`tools/bangun-timing.mjs` menyisipkan keduanya beserta durasinya saat menyusun
`timing.gen.ts`, jadi tidak ada yang perlu ditambahkan manual. Yang perlu
diingat cuma satu: `tools/estimate-timing.mjs` (perkiraan untuk dibaca manusia)
**tidak** menghitungnya — totalnya akan 7,5 dtk lebih pendek dari total
sebenarnya.

## Checklist sebelum render

- [ ] Kartu judul ada di babak 2, bukan di detik 0 — dan tidak ada di Shorts.
- [ ] Prop `judul` maksimal 5 kata **dan tidak membocorkan jawaban episode**.
- [ ] Penutup tidak membawa judul apa pun.
- [ ] `CHANNEL_HANDLE` di `.env` benar (`@GetResolved`) — handle-nya dari sana.
- [ ] `<Panggung debug>` tidak menyala.
- [ ] Paruh kanan penutup 16:9 kosong.
- [ ] Penutup Shorts memakai `rasio="9x16"` (2 dtk), bukan default 5 dtk.
