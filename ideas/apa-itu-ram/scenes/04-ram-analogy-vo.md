# 04-ram-analogy · rencana VO

Bagian 4 [answer] → [what] — scene yang menamai subjek episode. Scene sebelumnya
([`03-bolak-balik`](03-bolak-balik-vo.md)) sudah membuat masalahnya terasa:
gudang jauh, prosesor bolak-balik, dan ruang kosong berbentuk meja menganga di
antaranya. Di sini ruang itu diisi, dan isinya punya nama.

**Beat "Dari lemari arsip di gudang," sudah PINDAH** ke `03-bolak-balik` waktu
scene ini dipecah dua (HARD RULE 5). Gudangnya tidak diperkenalkan lagi di sini —
penonton sudah kenal, dan mengulanginya membuat scene ini terasa memulai dari nol.

**Scene ini sengaja TIDAK mengundang membayangkan** (HARD RULE 6). Gambarannya
sama persis dengan scene sebelumnya — gudang yang sama, prosesor yang sama,
siluet meja yang sama, sampai ke koordinat pikselnya lewat `panggung-analogi.tsx`.
Undangan baru berarti gambaran baru; di sini yang terjadi cuma lubangnya terisi.
Baris pertamanya justru dibuka "Jadi" supaya terbaca sebagai kelanjutan langsung.

Satu baris di blok `## VO` = satu **beat**. Detiknya dihitung
[`tools/baca-episode.mjs`](../../../tools/baca-episode.mjs) dari jumlah kata —
jangan pernah mengetik detik di berkas ini. Formatnya: [docs/11](../../../docs/11-rencana-vo.md).

## VO

Jadi berkasnya disalin dulu.
Ke meja kerja yang jauh lebih dekat.
Aslinya tetap di gudang, tidak ke mana-mana.
Sekarang prosesor tinggal meraih, tanpa bolak-balik lagi.
Ya, meja kerja itu ram.

## Sinkron

Urutannya sama dengan blok di atas; koreografinya di
[`04-ram-analogy-direction.md`](04-ram-analogy-direction.md).

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Berkas di laci menyala; salinannya lepas dan berangkat. |
| 1 | Meja nyata tumbuh **mengisi siluet putus-putus** dari scene sebelumnya; salinan mendarat di atasnya. |
| 2 | Perhatian balik ke lemari: berkas aslinya masih di lacinya, berdenyut sekali. |
| 3 | Tautan pendek meja ke prosesor tergambar; prosesor menyala terus, tidak lagi gelap seperti di scene sebelumnya. |
| 4 | Kata RAM mendarat di bawah meja. |

## Catatan

- **Beat 4 adalah satu-satunya penamaan `[what]` di seluruh episode.** Kata "ram"
  tidak boleh diucapkan sebelum baris ini, dan sesudahnya dipakai konsisten
  sampai akhir (HARD RULE 6 · [docs/02 § Aturan flow](../../../docs/02-format-video.md)).
  Ia jatuh paling akhir bukan karena malu-malu, tapi karena sebelum beat 3 mejanya
  belum terbukti menyelesaikan apa pun — dan nama untuk sesuatu yang belum
  terbukti cuma jadi kosakata baru yang harus dihafal.
- **"berkasnya", bukan "datanya".** "Data" ada di daftar larangan kosakata L1
  ([docs/09](../../../docs/09-tangga-abstraksi.md)), dan di sini ada alasan kedua
  yang lebih kuat: yang berangkat di layar adalah salinan **berkas** dari laci
  yang sama yang penonton lihat terisi di scene 3. Menyebutnya "data" memutus
  benda di layar dari kata yang mewakilinya, tepat di scene yang seluruh isinya
  adalah perjalanan benda itu.
- **"disalin", bukan "dipindah"**, dan beat 2 dipakai khusus untuk menegaskannya.
  Aslinya tetap di gudang sampai frame terakhir — kalau VO bilang "pindah", model
  penonton pecah jauh di belakang, di scene "RAM lupa saat listrik mati":
  mematikan listrik jadi berarti kehilangan berkasnya.
- Beat 0 dan 1 sengaja memotong satu kalimat jadi dua baris. Perjalanan berkasnya
  makan waktu lebih lama daripada satu tarikan napas, dan kalimat yang utuh akan
  menaruh keberangkatan dan pendaratan di beat yang sama.
- **"jauh lebih dekat", bukan "menempel"**. Yang menempel di prosesor itu cache,
  dan cache baru datang di bagian 6 (`naskah.md § Titik putus analogi`). Kata
  "cache" belum boleh muncul di sini sama sekali.
- Beat 3 adalah jawaban langsung atas beat 3–4 scene sebelumnya: kalimatnya
  memakai kata yang sama, "bolak-balik", supaya pasangannya terdengar.
- "ram" ditulis huruf kecil supaya TTS membacanya sebagai kata, bukan mengeja
  R-A-M (kamus pengucapan di `naskah.md`).
