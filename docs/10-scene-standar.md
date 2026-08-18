# 10 · Scene Standar — Kartu Judul & Tanda Brand

Dua scene dipakai **identik di setiap episode**: kartu judul di depan, tanda
tangan brand di belakang. Tujuannya pengenalan — penonton harus tahu ini
channel yang sama dari beberapa detik animasi, tanpa membaca nama.

> **Perannya pernah terbalik.** Sampai 2026-08-13 pembuka cuma logo besar dan
> **penutup** yang membawa judul episode. Itu salah tempat: judul yang muncul
> di detik terakhir tidak lagi memberi tahu penonton sedang menonton apa, ia
> cuma mengulang. Sekarang judul di pembuka, brand di penutup — dan pembuka
> naik dari 1,5 ke 2,5 dtk karena judul butuh waktu untuk dibaca, lalu ke
> **4,0 dtk** (2026-08-13) setelah figur episode masuk ke paruh kanannya.

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
> npx remotion still 02-opening out/opening.png --frame 40
> npx remotion still 83-closing out/closing.png --frame 60
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
| Durasi 16:9 | **4,0 dtk** (`OPENING_SECONDS`) | **5,0 dtk** (`CLOSING_LONG_SECONDS`) |
| Durasi 9:16 | **tidak dipakai** | **2,0 dtk** (`CLOSING_SHORT_SECONDS`) |
| Posisi | **bagian 2 flow** — tepat setelah [question] | scene terakhir, setelah [case] |
| ID di timing | `opening` | `closing` |
| Membawa judul | **ya** | tidak |

Durasinya hidup di `.env`, dan dibaca **dua** pihak: `tools/baca-episode.mjs`
(untuk menyusun timeline) dan `shared/StandarScenes.tsx` (untuk koreografinya).
Ditulis dua kali berarti cepat atau lambat keduanya berbeda dan semua scene
sesudahnya bergeser.

Penempatannya **otomatis**, bukan disalin tangan: `tools/baca-episode.mjs`
menyisipkan `opening` tepat setelah baris terakhir bagian 1 di tabel scene
`naskah.md`, dan `closing` di paling akhir.

**Keduanya tidak punya rencana VO** — memang tidak ada yang diucapkan, jadi
durasinya dari `.env`, bukan dari jumlah kata (HARD RULE 4 ·
[docs/11](11-rencana-vo.md)). **Direction-nya tetap ada** dan justru paling
penting: koreografi yang berubah di sini berubah untuk semua episode.

**Kartu judul tidak pernah muncul di detik nol.** Frame pertama video selalu
[question] — pertanyaan mendahului brand. Ini aturan retensi yang sudah dikunci di
[02 · Format](02-format-video.md#aturan-babak); scene standar mengikutinya, bukan
membatalkannya.

**Shorts tidak punya kartu judul sama sekali.** Di feed Shorts, dua setengah
detik judul di awal adalah dua setengah detik yang dipakai penonton untuk
menggeser layar.

**Kenapa 4 detik.** Angkanya sudah dua kali naik, dan dua-duanya karena isinya
bertambah — bukan karena kartunya kurang megah.

| | Isi | Kenapa naik |
|---|---|---|
| 1,5 dtk | logo saja | — |
| 2,5 dtk | + judul & subjudul | pada 1,5 dtk judul cuma tampil ~0,5 dtk dan praktis tidak terbaca |
| **4,0 dtk** | + figur episode | pada 2,5 dtk enam kejadian harus muat dalam 2,2 dtk; kartunya masih bergerak saat mulai memudar |

Yang dibeli tambahan 1,5 detik itu **jedanya**, bukan gerakannya: sekarang
semua sudah di tempatnya sekitar `2,7` sementara pudarnya baru mulai `3,72` —
satu detik penuh saat kartu berhenti dan bisa dibaca. Tiap gerakannya sendiri
justru dibuat lebih lambat.

**Ini batas atasnya.** Empat detik sudah sepanjang yang boleh untuk jeda di
tengah babak; lebih dari itu ia berhenti jadi kepala bab dan mulai jadi babak
sendiri — di posisi (sekitar detik 10) yang paling mahal untuk retensi. Kalau
suatu saat terasa masih kurang, yang kurang hampir pasti bukan durasinya.

## Isi pembuka

Rata kiri, bukan di tengah — logo dan judul yang ditengahkan terbaca sebagai
poster, rata kiri terbaca sebagai kepala bab. Itu memang fungsinya di sini.

| Waktu | Yang terjadi |
|---|---|
| `0,10–0,62` | Mark masuk, `back.out(1.8)` |
| `0,42–0,94` | Wordmark disingkap dari kiri |
| `0,78–1,30` | Garis aksen menggambar diri |
| `1,00–1,58` | Judul episode naik + memudar masuk |
| `1,12–1,74` | Figur episode masuk dari kanan (kalau ada) — lihat di bawah |
| `1,32–1,84` | Subjudul (kalau ada) |
| `~1,9–2,7` | Animasi di dalam figur selesai (isi episode) |
| `2,60–3,70` | Figur bernapas `y ±7px` — jeda satu detik tidak boleh jadi frame beku |
| `3,72–4,00` | Semua memudar |

Titik masuknya ada di satu konstanta `BEAT` di
[`shared/StandarScenes.tsx`](../shared/StandarScenes.tsx) — yang menentukan
rasa kartu ini adalah jarak antar angkanya, dan jarak itu tidak terbaca kalau
nilainya tersebar di enam `style`. Yang dibaca dari `.env` cuma panjang
kartunya: kapan ia memudar, dan kapan figurnya boleh bernapas.

**Judul episode maksimal 5 kata.** Lebih dari ~22 karakter sudah melewati lebar
aman pada 96px dan patah di tempat yang salah. Kalau judulnya akronim, pecah
jadi dua: `judul="DNS"` + `subjudul="Domain Name System"` — baris kedua
otomatis lebih kecil dan mono. Membiarkan `"DNS (Domain Name System)"` jadi
satu string akan membungkus di tengah tanda kurung.

**Judul boleh menyebut istilah inti episode**, dan episode-episode sejauh ini
memang begitu. Tapi sadari
konsekuensinya: kartu ini tayang sekitar detik 10, sementara [tangga
abstraksi](09-tangga-abstraksi.md) menuntut istilah teknis baru muncul setelah
bendanya digambarkan. Kalau judul mendahuluinya, **scene yang menamai istilah
itu nanti harus ditulis ulang** — kalau tidak, ia mengulang sesuatu yang sudah
penonton baca satu menit sebelumnya, dan terasa seperti video yang lupa apa yang
sudah dikatakannya. Itu keputusan naskah, bukan keputusan komponen.

Yang **tidak** ada di dalamnya, dan tidak boleh ditambahkan: suara whoosh, musik
sting terpisah, tagline, alamat website, animasi partikel, handle channel.

### Figur episode — paruh kanan

> **Ditambahkan 2026-08-13.** Sampai saat itu kartu judul isinya cuma logo dan
> teks — satu-satunya scene di repo ini yang lolos dari [HARD RULE
> 2](../CLAUDE.md) ("tidak ada scene yang isinya cuma teks"), padahal ia scene
> yang paling sering ditonton karena ada di setiap episode. Paruh kanannya
> memang kosong sejak awal (blok teks berhenti di 62% lebar); sekarang kosong
> itu punya isi.

```tsx
<KartuJudul judul="DNS" subjudul="Domain Name System" figur={<FigurLoket />} />
```

**Figurnya milik episode, koreografi masuknya milik `shared/`.** Slot
`.open-figur` yang menggeser dan memudarkannya (`0,80–1,35`, dari kanan
54px, `expo.out`) — jadi semua episode punya ritme pembuka yang sama walaupun
bendanya berbeda. Yang di dalam figur (bagian yang menyala, garis yang
menggambar diri) urusan episode.

**Figur masuk di antara judul dan subjudul, bukan mengantre di belakang
keduanya.** Kanan dan kiri yang bergerak bersamaan terbaca sebagai satu
gerakan; berurutan, ia terbaca sebagai daftar yang harus ditunggu.

Angka yang harus dijaga episode bukan "kapan mulai", tapi **kapan berhenti**:
apa pun yang terjadi di dalam figur wajib tuntas sekitar `2,7`, menyisakan
~1 dtk semuanya diam sebelum `3,72`. Kartu yang masih bergerak saat mulai
memudar terbaca buru-buru walaupun tiap gerakannya sendiri tidak cepat — itu
persis yang terjadi pada versi 2,5 dtk, dan menaikkan durasi tanpa menjaga
batas ini cuma memindahkan masalahnya.

| | |
|---|---|
| Letak berkas | `ideas/<slug>/scenes/<urutan>-opening.tsx` |
| Didaftarkan di `SCENES`? | **tidak** — opening bukan scene milik episode |
| Yang memasang | `Episode.tsx`, lewat prop `figur` |
| Area | kanan, lebar 30% frame, di dalam kotak aman |

Aturannya:

- **Benda utama episode, bukan dekorasi.** T14 memakai loket penanya nama. Kalau
  episodenya belum punya benda yang jelas, kosongkan — prop ini opsional dan
  kartu tanpa figur tetap sah.
- **Bukan logo getresolved dalam bentuk lain.** Mark sudah ada di kiri; dua
  logo dalam satu kartu adalah kartu tanpa isi.
- **Bukan teks.** Label, angka, dan keterangan milik judul/subjudul.
- **Gerak di dalamnya secukupnya.** Satu gagasan gerak sudah penuh — 4 dtk
  bukan undangan untuk memasang dua.
- Figur yang cuma dipakai satu episode ditulis inline di berkas itu. Yang
  ternyata berguna di episode lain naik ke `shared/figur.css` atau jadi ikon
  baru di `shared/Icons.tsx` ([03 § Ikon & figur](03-tema-visual.md#ikon--figur)).
- **9:16 tidak menampilkannya** — kartu judul memang tidak dipakai di Shorts.

## Isi penutup

**16:9 (5 detik)** — konten ditaruh di **paruh kiri**. Paruh kanan sengaja
dikosongkan untuk elemen end screen YouTube (video terkait + tombol subscribe)
yang dipasang saat unggah. Kalau area itu diisi, elemen end screen akan menimpa
teks kita.

Isinya, berurutan: mark besar + wordmark → garis aksen → handle channel →
**satu baris ajakan**. **Tidak ada judul** — itu tugas pembuka.

> **Baris terakhir itu CTA, bukan deskripsi channel** (diperbaiki 2026-08-13).
> Sampai saat itu ia berbunyi *"Penjelasan teknologi, coding, dan engineering
> dalam Bahasa Indonesia."* — keterangan tentang kami yang tidak menyuruh
> penonton melakukan apa pun, dan yang sudah diketahui siapa pun yang bertahan
> tujuh menit. Padahal ini **satu-satunya** tempat channel ini boleh meminta
> subscribe ([02 § Aturan babak](02-format-video.md) melarang CTA di tengah
> video), dan [03 § Komponen](03-tema-visual.md) memang sudah menuliskannya
> sebagai "Mark + 1 kalimat CTA + handle channel" — implementasinya yang
> melenceng, bukan aturannya.
>
> Isi bakunya sekarang:
>
> ```
> Masih penasaran cara kerja yang lain? Subscribe, lalu lanjut ke video di sebelah.
> ```
>
> Dua hal yang mengikat, bukan kalimatnya: **satu kalimat** (maksimal dua baris
> tayang — ini baris terakhir video, bukan paragraf penutup), dan **arahnya ke
> paruh kanan** — "di sebelah" itu
> end screen YouTube, satu-satunya benda yang bisa diklik selama 5 detik ini.
> Karena isinya permintaan, gayanya juga naik: `--ink-0` berat 600, setara
> handle di atasnya, bukan abu-abu `--ink-1` seperti keterangan kaki.

| Waktu | Yang terjadi |
|---|---|
| `0,10–0,60` | Mark masuk, `back.out(1.6)` |
| `0,22–0,84` | Cincin putih **menggambar diri** (stroke draw) |
| `0,60–1,02` | Titik hijau muncul — *the resolve point* |
| `0,78–1,30` | Wordmark disingkap dari kiri |
| `1,05–1,55` | Garis aksen menggambar diri |
| `1,20 · 1,42` | Handle, lalu baris ajakan |
| `1,80–4,40` | Mark bernapas `y ±6px` — 5 detik tidak boleh jadi layar diam |

Pembangunan mark yang penuh ada di sini, bukan di pembuka, karena di sini
marknya 200px. Pada mark 104px di pembuka, cincin yang menggambar diri tidak
terbaca sebagai apa pun.

**5 detik itu batas bawah, bukan pilihan.** End screen YouTube baru bisa
diklik kalau tayang minimal 5 detik. Memendekkan penutup berarti membuang
end screen sepenuhnya.

**9:16 (2 detik)** — konten di tengah kotak aman, tanpa baris ajakan. Dua
detik tidak cukup untuk membaca dua blok teks; di Shorts, CTA-nya ditaruh di
VO penutup, bukan di layar ([02 § Aturan Shorts](02-format-video.md)).

Untuk memeriksa zona end screen saat preview, pasang `<Panggung debug>` —
batas kotak aman dan zona end screen akan tergambar. **Jangan dinyalakan saat
render.**

## Cara pakai

Tidak ada yang perlu disalin. `Episode.tsx` sudah memasang keduanya:

```tsx
export const JUDUL = "DNS";
export const SUBJUDUL = "Domain Name System";

export const isiScene = (t: Timing) => {
  if (t.id === "opening") return <KartuJudul judul={JUDUL} subjudul={SUBJUDUL} />;
  if (t.id === "closing") return <TandaBrand />;
  // ...
};
```

Untuk Shorts:

```tsx
<TandaBrand rasio="9x16" />   // 2 dtk, tanpa baris ajakan
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

- Prop `judul` di `<KartuJudul>` — maksimal **5 kata** / ~22 karakter.
- Prop `subjudul` di `<KartuJudul>` — kepanjangan akronim atau penajam judul.
  Bukan tempat kalimat.
- Prop `figur` di `<KartuJudul>` — figur benda utama episode di paruh kanan.
  Isinya milik episode; slot dan koreografi masuknya tidak (§ Figur episode).
- Prop `sub` di `<TandaBrand>` (16:9 saja) — satu baris ajakan. Boleh diganti
  kalau episodenya punya lanjutan yang spesifik ("Bagian dua: kenapa loketnya
  bisa berbohong"); yang tidak boleh cuma mengembalikannya jadi deskripsi channel.

Keduanya prop, bukan hasil menyalin komponen. Kalau kamu sedang menyalin
`StandarScenes.tsx` ke episode, kamu sudah salah jalan.

**Tidak boleh diubah:**

- Durasi (4,0 / 5,0 / 2,0 detik) — ada di `.env`, bukan di komponen. 5,0 dtk
  penutup adalah batas bawah end screen YouTube, bukan angka selera; 4,0 dtk
  pembuka adalah batas atas (§ Kenapa 4 detik).
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

- Kartu judul menambah 4,0 dtk di babak 2.
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
- [ ] Baris terakhir penutup adalah **ajakan** (subscribe + tonton berikutnya),
      bukan deskripsi channel.
- [ ] `CHANNEL_HANDLE` di `.env` benar (`@GetResolved`) — handle-nya dari sana.
- [ ] `<Panggung debug>` tidak menyala.
- [ ] Paruh kanan penutup 16:9 kosong.
- [ ] Penutup Shorts memakai `rasio="9x16"` (2 dtk), bukan default 5 dtk.
