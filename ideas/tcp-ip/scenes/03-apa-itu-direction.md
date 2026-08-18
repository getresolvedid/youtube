Anggaran: dihitung `npm run gen` — lihat `timing.gen.ts`.
Dua baris VO = dua tahap, masing-masing bertingkat di dalamnya.

Scene definisi. Karena VO-nya abstrak sepanjang scene, **seluruh beban ada di
layar**: tiap benda yang disebut harus berdiri sebagai benda, bukan sebagai kata.

1. potongan dari scene 1 mengecil di tengah dan larut. dari bawahnya naik empat
   perangkat berbeda — laptop, ponsel, desktop, server — berjajar di garis
   lantai, tersambung garis jaringan yang menyala satu per satu.
   (VO: "TCP/IP adalah sekumpulan protokol…")

2. tiga label muncul BERURUTAN mengikuti tiga hal yang disebut VO:
   `SEND` saat "data dikirim", `ADDRESS` saat "alamat tujuan ditentukan",
   `DELIVER` saat "data diterima". ketiganya lalu bergerak ke tengah dan melebur
   jadi satu tulisan. tulisan itu berubah jadi buku yang terbuka, berjudul
   `NETWORK RULES`.
   (VO: "Sederhananya, TCP/IP adalah seperti aturan yang mengatur…")

motion:
   - perangkat naik: `masuk()` dengan `urutan` 0..3 dan `jeda` 0,12
   - garis jaringan antar-perangkat: `gambarGaris()`, menyala dari kiri ke kanan
   - tiga label: masing-masing `masuk()` sendiri, dijatuhkan pada sepertiga,
     dua-pertiga, dan akhir beat 1 — dihitung dari `beat()` + offset, bukan
     detik ketikan tangan
   - lebur: `t()` pada x ketiganya menuju 960 sambil opacity turun; tulisan
     gabungan `masuk()` tepat saat ketiganya sampai
   - buku: `t()` pada `buka` 0 → 1

catatan:
   - **urutan tiga label WAJIB sama dengan urutan yang disebut VO.** kalau tidak,
     penonton membaca yang satu sambil mendengar yang lain dan kehilangan
     keduanya. ini satu-satunya hal di scene ini yang tidak boleh digeser.
   - **empat perangkat, bukan satu.** VO bilang "perangkat", jamak, dan gambar
     satu laptop akan membuat sisa episode terbaca sebagai cerita tentang satu
     komputer.
   - buku muncul sekali di seluruh episode dan tidak pernah kembali — ia benda
     scene ini saja, jadi jangan dipakai lagi di scene 10 sebagai "kumpulan
     protokol".
   - frame terakhir: buku terbuka di tengah. frame pertama `04-analogi-paket`
     memakai kotak fisik di posisi yang sama persis, supaya bukunya terbaca
     BERUBAH jadi kotak dan bukan berganti gambar.
