Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap.

Frame pertama Short 2. Satu benda besar dan satu lubang yang jelas lebih kecil —
seluruh hook-nya terbaca tanpa satu kata pun.

1. bidang besar berlabel `FILE` sudah bergerak turun sejak frame nol, menuju
   mulut jalur di bawahnya. mulut jalur digambar sebagai dua tiang berjarak
   sempit, jelas lebih sempit daripada bidangnya. teks layar: "Satu file besar."
   (VO: "Ketika kamu mengirim sebuah file melalui internet…")

2. bidangnya MEMBENTUR mulut jalur dan berhenti. bergetar sekali, lalu diam.
   teks layar berganti jadi satu kata: "Tidak."
   (VO: "Tidak.")

motion:
   - turun: `t()` pada y, `E.power2in` — makin cepat, supaya benturannya terasa
   - bentur: `getar()` pada y, `jauh` 18, `putaran` 2 — sekali, lalu berhenti
     sendiri di posisi semula
   - "Tidak.": `masuk()` dengan `geser` 0 dan durasi pendek (0,25) — ia jatuh,
     bukan meluncur

catatan:
   - **jangan memecahnya di sini.** pecah di scene 1 mendahului scene 2, yang
     seluruh isinya justru pembelahan itu. yang boleh terjadi di sini cuma:
     tidak muat.
   - **mulut jalurnya wajib jelas lebih sempit** — kalau bedanya tipis, penonton
     membaca benturan sebagai kesalahan animasi, bukan sebagai ukuran.
   - frame terakhir: bidang besar diam di mulut jalur. frame pertama `2-dipecah`
     memakai bidang itu di posisi yang sama persis.
