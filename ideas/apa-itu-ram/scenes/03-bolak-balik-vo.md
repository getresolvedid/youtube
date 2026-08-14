# 03-bolak-balik · rencana VO

Bagian 3 [problem] — scene yang membuat masalahnya **terasa**, bukan disebut.
Hook meninggalkan lubang; scene ini belum mengisinya. Yang harus berubah di
kepala penonton setelah menontonnya cuma satu: *ini melelahkan, pasti ada cara
lain.* Kalau penonton belum merasa itu, jawaban di scene berikutnya akan terdengar
seperti definisi kamus — dan itu titik penonton berhenti menonton
([docs/02 § Aturan flow](../../../docs/02-format-video.md)).

**Di sinilah analogi utama episode ini berdiri**, jadi baris pertamanya mengundang
(HARD RULE 6). Undangannya cuma sekali, di beat 0 — scene 4, 5, dan 6 meneruskan
gambaran yang sama dan tidak mengundang lagi.

Scene ini **tidak boleh** menyebut meja, tempat kerja, apalagi ram. Ia cuma
menunjukkan gudang yang jauh, prosesor yang butuh berkali-kali, dan tidak ada
apa-apa di antara keduanya.

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Bayangkan sebuah gudang, penuh lemari arsip berisi ribuan berkas.
Di seberangnya ada yang mengerjakan berkas itu, namanya prosesor. Ia butuh berkasnya berkali-kali.
Tapi di antara keduanya tidak ada tempat menaruh apa pun.
Jadi tiap kali dipakai, berkasnya dijemput lagi dari gudang.
Selama dijemput, prosesor cuma menunggu.

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`03-bolak-balik-direction.md`](03-bolak-balik-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Lemari arsip berdiri sendirian di tengah, lacinya terisi berkas satu per satu sampai penuh. |
| 1 | Lemari menepi ke kiri; prosesor masuk di kanan — nama itu jatuh tepat saat figurnya berhenti. Jarak keduanya sengaja dibiarkan menganga. |
| 2 | Siluet meja putus-putus muncul di ruang kosong itu — **kosong**, tidak diisi apa-apa. |
| 3 | Berkas mulai bolak-balik gudang ke prosesor, pulang pergi, berulang. |
| 4 | Prosesor gelap sepanjang perjalanan, cuma menyala sekejap saat berkasnya sampai. |

## Catatan

- **Beat 0 adalah satu-satunya undangan di seluruh analogi ini.** Scene 4
  (`ram-analogy`), scene 5 (`kenapa-cepat`), dan scene 6 (`ram-size`) berdiri di
  gudang yang sama dan
  meneruskannya; kalau salah satunya dibuka dengan "Bayangkan" lagi, penonton
  dikeluarkan dari gambaran yang sudah ia bangun, dan scene itu terbaca sebagai
  video lain (HARD RULE 6).
- **"namanya prosesor" datang SETELAH "ada yang mengerjakan berkas itu"**, di
  baris yang sama. Itu bentuk minimum aturan L1 di HARD RULE 6: bendanya
  digambarkan dulu dengan kata sehari-hari, namanya menyusul di kalimat
  berikutnya. Membalik urutannya — "Prosesor cuma butuh beberapa" seperti versi
  sebelumnya — menjatuhkan nama asing sebelum penonton punya tempat
  menggantungkannya.
- Beat 1 sengaja dua kalimat dalam satu baris. Perkenalan dan namanya adalah satu
  gerakan di layar (prosesor masuk lalu berhenti); memecahnya jadi dua beat
  membuat prosesor berhenti setengah jalan sambil menunggu kalimatnya selesai.
- **Aktor VO-nya prosesor, bukan "kamu".** Hook sudah menampilkan figurnya
  sebagai salah satu dari tiga kandidat, jadi ia sudah punya wajah di layar.
  "Kamu" akan memaksa penonton memetakan dirinya ke figur yang tidak ada di frame.
- Beat 3 dan 4 sengaja dipisah walau satu gagasan. Bolak-baliknya perlu berjalan
  beberapa putaran sebelum kalimat "cuma menunggu" jatuh — kalau keduanya satu
  baris, kalimat itu diucapkan sebelum penonton sempat bosan melihatnya, dan
  bosan itulah isi scene ini.
- **"tempat menaruh", bukan "tempat kerja" apalagi "meja".** Nama bendanya milik
  scene berikutnya (bagian 4). Di sini ia baru boleh jadi lubang berbentuk meja.
- "ribuan" adalah bilangan analogi, bukan klaim teknis — tidak butuh baris
  `sumber:` di `naskah.md`.
- Tidak ada angka latensi di sini. Baris ⚠ di `naskah.md § Sumber` belum ditutup,
  dan scene ini tetap utuh tanpanya: yang dijual bukan angkanya, tapi
  pengulangannya.
