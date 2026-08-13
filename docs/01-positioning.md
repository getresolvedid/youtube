# 01 · Positioning

Dokumen ini menjawab satu pertanyaan: **kenapa orang harus menonton channel ini
dan bukan sepuluh channel tech lain?** Semua keputusan naskah dan visual di
dokumen berikutnya turun dari sini.

---

## Janji channel

> Konsep teknologi yang biasanya butuh dua jam baca dokumentasi — dijelaskan
> dalam delapan menit, dengan animasi yang **menunjukkan mekanismenya**, bukan
> sekadar menyebut istilahnya.

Tiga kata kunci: **mekanisme**, **presisi**, **Bahasa Indonesia**.

**Syarat yang mengikat semuanya:** setiap topik harus bisa dijelaskan dengan
bahasa anak 5 tahun sebelum boleh masuk produksi. Bukan karena penontonnya
anak-anak, tapi karena kemampuan menjelaskan tanpa jargon adalah bukti bahwa
kita benar-benar paham. Metodenya — tangga L1 → L2 → L3 — ada di
[09 · Tangga abstraksi](09-tangga-abstraksi.md), dan itu dokumen yang paling
sering dipakai sehari-hari setelah template naskah.

## Untuk siapa

| | Siapa | Yang mereka cari |
|---|---|---|
| **Primer** | Developer Indonesia 1–5 tahun pengalaman | Naik dari "bisa pakai" ke "paham kenapa". Sudah bisa ngoding, tapi bolong di fundamental. |
| **Sekunder** | Mahasiswa IT & career switcher | Peta materi yang jujur: mana yang penting, mana yang hype. |
| **Tersier** | Tech lead / founder teknis | Materi siap-pakai untuk menjelaskan ke tim atau ke non-teknis. |

**Bukan** untuk: pemula total yang belum pernah menulis kode, dan bukan untuk
peneliti/spesialis yang mencari kedalaman paper.

## Kenapa berbeda

Lanskap konten tech berbahasa Indonesia mayoritas berisi **screencast** ("ikuti
saya mengetik") dan **talking head**. Celah yang kita isi:

1. **Visual mekanis.** Request mengalir lewat diagram, memori berubah di layar,
   paket TCP jatuh dan dikirim ulang — animasi menjelaskan, bukan menghias.
   Ini persis yang dikuasai HyperFrames (motion graphic + data + kode).
2. **Padat, tanpa lemak.** Tidak ada intro 20 detik, tidak ada "halo teman-teman
   balik lagi", tidak ada basa-basi sponsor di menit pertama.
3. **Akurat dan berani menyebut batas.** Kalau jawabannya "tergantung", kita
   sebut variabelnya. Kalau kita tidak yakin, kita bilang tidak yakin.
4. **Bahasa Indonesia dengan istilah asing yang dipertahankan.** Kita bilang
   *cache*, *thread*, *deadlock* — bukan "singgahan" atau "utas". Terjemahan
   paksa justru bikin penonton kehilangan kaitan ke dokumentasi asli.

## Lima pilar konten

Setiap topik wajib masuk salah satu pilar. Pilar juga jadi **playlist** di channel.

| Kode | Pilar | Cakupan | Porsi |
|---|---|---|---|
| **P1** | **Cara Kerja** | Fundamental yang dipakai tiap hari tapi jarang dibedah: HTTP, TCP, DNS, hash map, garbage collector, index database, TLS. | 35% |
| **P2** | **Bahasa & Tooling** | Model konkurensi Go, async JS, borrow checker Rust, Git internals, Docker layer, build tool. | 25% |
| **P3** | **Arsitektur & Sistem** | Caching, queue, konsistensi data, rate limiting, observability, desain skema. | 20% |
| **P4** | **Praktik Engineering** | Debugging sistematis, membaca kode orang lain, code review, teknical debt, estimasi. | 10% |
| **P5** | **AI & Agentic** | Cara kerja LLM, embedding, RAG, tool calling, agent — dengan disiplin akurasi yang sama. | 10% |

Aturan porsi ini menjaga channel tidak berubah jadi channel AI-hype. P5 boleh
naik kalau performanya jelas lebih baik, tapi P1 tetap identitas channel.

## Nada bicara

**Seperti senior engineer yang menjelaskan di whiteboard ke rekan kerja** —
santai tapi tidak cerewet, percaya diri tapi tidak menggurui.

Lakukan:

- Kalimat pendek. Satu ide per kalimat.
- **Mulai selalu dari bahasa paling sederhana**, baru naik ke istilah teknis —
  tidak pernah sebaliknya. Aturannya di [09](09-tangga-abstraksi.md).
- Analogi konkret dan sekali pakai — lalu **kembali ke mekanisme sebenarnya**,
  dan sebutkan di mana analoginya berhenti berlaku. Analogi menjelaskan, tapi
  tidak boleh menggantikan penjelasan.
- Angka eksplisit: "sekitar 100 nanodetik" lebih baik daripada "sangat cepat".
- Akui trade-off. Setiap solusi punya harga; sebutkan harganya.
- Sapa penonton dengan "kamu", bukan "kalian" atau "teman-teman".

Hindari:

- Clickbait yang tidak ditepati isi video ("RAHASIA yang disembunyikan…").
- Hype dan superlatif: "mengubah segalanya", "game changer", "wajib tahu!!".
- Merendahkan penonton: "gampang banget kok", "masa gini aja nggak paham".
- Perang bahasa/framework. Kita membahas trade-off, bukan memihak.
- Humor yang mengganggu alur. Konten padat sudah cukup jadi daya tarik.

## Yang tidak kita buat

- Berita harian / drama X-Twitter tech.
- Review gadget, laptop, atau keyboard.
- Tutorial "ikuti saya ketik baris per baris" — tanpa itu pun penonton bisa
  membaca dokumentasi; nilai kita ada di *mental model*.
- Konten "10 VS Code extension terbaik" dan sejenisnya.
- Kursus berbayar terselubung di dalam video gratis.

## Hubungan dengan getresolved.id

Channel ini memakai **tema visual** brand getresolved (lihat [03](03-tema-visual.md))
supaya satu keluarga secara visual, tapi **bukan channel produk**. Video edukasi
tidak menjual apa pun. Penyebutan produk hanya boleh:

- Di deskripsi video, sebagai satu baris.
- Di end card, sebagai identitas pembuat — bukan sebagai penawaran.

Kalau suatu saat ada video yang memang tentang produk, tandai jelas sebagai
konten produk dan taruh di playlist terpisah.

## Ukuran keberhasilan

Bukan subscriber. Yang kita pantau, berurutan prioritas:

1. **Average view duration ≥ 50%** untuk video panjang — bukti materinya memang menahan.
2. **Rasio komentar substantif** (pertanyaan/koreksi teknis) dibanding komentar kosong.
3. Klik dari Shorts ke video panjang.
4. Subscriber — indikator yang paling lambat dan paling tidak informatif.
