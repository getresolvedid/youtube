---
name: vo-script-audit
description: Audit naskah VO sebuah topik — jalankan pemeriksaan mekanis lalu nilai yang tidak bisa dinilai mesin (HARD RULE 6 undangan & penamaan, HARD RULE 7 sambungan antar-scene, kosakata L1, VO vs direction, ritme). Pakai sebelum mengisi naskah_beku, setelah menulis atau menyunting berkas -vo.md, atau saat diminta memeriksa/meninjau naskah VO. Memeriksa TEKS, bukan audio — dan tidak pernah menyunting berkas.
---

# vo-script-audit

Memeriksa **naskah** VO, bukan suaranya. Yang dinilai teks di blok `## VO` tiap
`ideas/<slug>/scenes/<kunci>-vo.md` dan `scene-shorts/*/`.

**Skill ini tidak pernah menyunting berkas.** Ia melapor. Yang menyunting
`vo-script-refactor`, dan ia dijalankan terpisah setelah kamu setuju.

## Kenapa ada dua lapis

Pemeriksaan naskah VO terbelah tajam, dan belahannya bukan soal keparahan
melainkan soal **siapa yang bisa memutuskan**:

- Mesin tahu `[excited]` salah di blok `## VO` tanpa membaca
  kalimatnya. Itu `tools/vo-script-audit.mjs`, tingkat A, `exit 1`.
- Mesin **tidak** bisa tahu apakah "Dekatnya memang membantu. Tapi bukan cuma
  itu." adalah dua kalimat yang berdesakan atau jembatan terbaik di episode.
  Itu pekerjaanmu di sini.

Menghitung kata dengan model itu lebih lambat, lebih mahal, dan hasilnya bisa
berbeda tiap dijalankan. Jadi **jalankan script-nya dulu, jangan hitung ulang
apa pun yang sudah dihitungnya.**

## Langkah

### 1 · Jalankan lapis mekanis

```powershell
node --env-file=.env tools/vo-script-audit.mjs <slug>
```

Baca keluarannya. **Tingkat A wajib nol** sebelum melanjutkan — semuanya
berakhir sebagai kesalahan yang terdengar di MP3 dan cuma bisa diperbaiki
dengan generate ulang berbayar. Kalau ada, laporkan dan berhenti; itu bukan
sesuatu yang perlu dinilai, cuma perlu diperbaiki.

Tingkat B adalah **daftar tempat untuk dilihat**, bukan daftar cacat. Bawa ke
langkah 3.

### 2 · Baca berurutan

```powershell
npm run sisa
```

mencetak baris pembuka tiap scene dan tiap sambungan berpasangan. Baca
**berurutan tayang** — itu satu-satunya cara melihat hal yang tidak pernah
kelihatan dari dalam satu berkas.

Lalu buka berkas `-vo.md` dan `-direction.md` pasangannya untuk scene yang
ditandai tingkat B atau yang terasa janggal saat dibaca berurutan.

### 3 · Nilai — enam hal yang tidak bisa dimekaniskan

**a · Undangan (HARD RULE 6).** Scene yang membuka gambaran baru wajib
mengundang penonton masuk sebelum adegannya jalan; scene lanjutan **tidak boleh**
mengundang ulang. Undangan baru = gambaran baru, bukan sekadar scene baru.
Frasanya harus bervariasi — dua puluh "Bayangkan" berhenti jadi undangan.

**b · Nama menyusul, tidak mendahului.** `[what]` episode dinamai **tepat sekali**,
di bagian 4 [answer], setelah bendanya berdiri dan menyelesaikan masalah bagian 3.
Istilah teknis lain punya satu kalimat L1 di kemunculan pertamanya, **ditulis di
blok `## VO`** — bukan cuma dijanjikan di `## Catatan`, bukan cuma digambar di
layar. Yang di layar tidak terbaca penonton yang sedang mendengarkan.

**c · Kosakata L1.** *data, proses, memori, server, request, thread, buffer,
node, query* dan akronim apa pun. Ini yang **lolos** lapis mekanis: semuanya kata
yang terdengar sehari-hari karena kita mengucapkannya tiap hari, padahal orang
yang tidak menulis kode tidak bisa menggambar satu pun. → docs/09.

**d · Sambungan (HARD RULE 7).** Uji tiap pasangan: **tutup scene sebelumnya,
baca baris pertama scene berikutnya.** Kalau masih masuk akal utuh, ia bukan
jembatan — ia pembukaan bab baru. Dan tolak jembatan yang membicarakan
*videonya*: "Nah, sekarang kita bahas…", "Oke, lanjut ke…", "Di scene ini…".

**e · VO vs direction.** Buka `-direction.md` scene itu. Apakah yang dikatakan
dan yang terjadi di layar mengerjakan **bagian berbeda** dari pekerjaan yang
sama? Kalau VO menarasikan apa yang sudah terlihat, salah satunya nganggur.

**f · Temuan tingkat B, satu per satu.** Untuk tiap temuan, putuskan: cacat atau
disengaja?

- *Ritme datar* — scene yang semua barisnya sepanjang itu terbaca telinga
  sebagai metronom. Obatnya biasanya satu baris pendek, bukan menulis ulang
  semuanya.
- *Dua kalimat dalam satu beat* — sering justru benar (jembatan cepat, anafora
  klaim-lalu-koreksi). Tapi kalau keduanya butuh momen animasi sendiri, itu satu
  baris yang seharusnya dua.
- *Tidak ada baris pendek* — biasanya berpasangan dengan ritme datar dan sembuh
  oleh perbaikan yang sama.

## Keluaran

Laporkan ke chat, dikelompokkan per scene, dan untuk tiap temuan sebutkan:
**apa**, **kenapa itu masalah**, dan **usulan perbaikan konkret berupa kalimat
pengganti**. Bukan "ritmenya datar" saja — tunjukkan baris mana yang dipendekkan
jadi apa.

Tutup dengan tiga hal:

1. Berapa temuan tingkat A (harus nol untuk lanjut).
2. Temuan tingkat B yang menurutmu **disengaja** — dan usulkan menulis alasannya
   di `## Catatan` supaya sesi berikutnya tidak "memperbaikinya".
3. Apakah topik ini siap untuk `naskah_beku`.

**Jangan menyunting apa pun.** Kalau perbaikannya disetujui, itu pekerjaan
`vo-script-refactor` — dan ia punya dua gerbang yang skill ini tidak punya.
