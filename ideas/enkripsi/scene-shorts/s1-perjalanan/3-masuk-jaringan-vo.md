# 3-masuk-jaringan · rencana VO

Panggung yang dibangun di sini **dipakai ulang apa adanya di Short 2, 3, dan 4**
(arahan user § Network Continuity). Itu sebabnya koordinatnya milik
`../panggung-short.tsx`, bukan berkas scene.

## VO

Pesan tersebut diubah menjadi data, lalu dikirim melalui jaringan internet.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Jaringannya tersingkap: mula-mula beberapa simpul di jalur, lalu sisanya, lalu simpul-simpul jauh di latar. Paket masuk dan simpul pertama menyala saat dilewati. |

## Catatan

- **Kata "data" ada di daftar larangan kosakata L1** ([docs/09](../../../../docs/09-tangga-abstraksi.md))
  — kata teknis yang menyamar jadi kata sehari-hari. Usulan: *"Pesannya dipecah
  jadi kiriman kecil, lalu berangkat lewat internet."* **Belum diubah** —
  kalimatnya keputusanmu, dan kata itu muncul di keempat Short, jadi
  mengubahnya di satu tempat saja justru bikin tidak konsisten.
- **Jaringannya tersingkap bertahap, bukan sekaligus** — arahan user. Jaringan
  yang muncul utuh di frame pertama terbaca sebagai latar; yang tersingkap
  terbaca sebagai sesuatu yang baru saja dimasuki.
- **Tidak ada satu huruf pun di jaringannya** — tanpa "server", tanpa alamat,
  tanpa nama. Arahan user: *"Do not try to create a technically accurate
  representation. The goal is visual understanding."*
