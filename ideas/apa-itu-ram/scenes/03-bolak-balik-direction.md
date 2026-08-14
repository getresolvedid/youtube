Anggaran: mulai 13,4 dtk · durasi 17,55 dtk (estimasi, VO belum jadi).
Lima kalimat VO = lima tahap.

Panggungnya dipakai bersama dengan scene berikutnya lewat
`ideas/apa-itu-ram/panggung-analogi.tsx` — koordinat lemari, prosesor, dan kotak
meja ditulis satu kali di sana. Itu bukan kerapian, itu syarat: siluet meja yang
digambar di tahap 3 harus jatuh di piksel yang sama dengan meja nyata di scene 4.

1. lemari arsip masuk di TENGAH frame, besar, sendirian.
   lacinya terisi berkas satu per satu, kiri ke kanan lalu ke bawah,
   sampai keempat lacinya penuh — tiga berkas per laci.
   penuh itu yang jadi tontonannya, bukan lemarinya.
   (VO: "Bayangkan sebuah gudang, penuh lemari arsip berisi ribuan berkas.")

2. lemari menepi ke kiri sambil mengecil; prosesor masuk dari luar frame kanan.
   keduanya berhenti di ujungnya masing-masing dan ruang di antaranya
   dibiarkan MENGANGA — itu bukan sisa tata letak, itu subjeknya.
   labelnya baru muncul SETELAH figurnya berhenti, bukan bersamaan: VO
   menggambarkan dulu ("ada yang mengerjakan berkas itu"), namanya menyusul
   di kalimat berikutnya, dan label di layar jatuh bersama namanya.
   (VO: "Di seberangnya ada yang mengerjakan berkas itu, namanya prosesor.
    Ia butuh berkasnya berkali-kali.")

3. animation:
   - di ruang kosong itu tergambar siluet meja, putus-putus, abu-abu
   - digambar sekali jalan: papan dulu, lalu turun ke dua kaki
   - dan berhenti di situ. TIDAK diisi apa-apa sampai scene ini habis.
     lubangnya yang harus terasa, bukan bendanya
   (VO: "Tapi di antara keduanya tidak ada tempat menaruh apa pun.")

4. animation — antar-jemput, berulang:
   - satu berkas keluar dari laci, menyeberang ke prosesor
   - LEWAT DI ATAS siluet meja tanpa berhenti — tidak ada tempat menaruhnya
   - sampai di prosesor sebentar, lalu diantar balik ke laci
   - dan diulang lagi. empat putaran sampai scene habis, tanpa jeda di antaranya
   - jalur perjalanannya TIDAK ditinggalkan di layar (beda dengan scene 4):
     yang berulang jangan meninggalkan jejak, nanti terbaca sebagai satu jalur
     yang makin ramai, bukan satu perjalanan yang diulang-ulang
   (VO: "Jadi tiap kali dipakai, berkasnya dijemput lagi dari gudang.")

5. prosesor GELAP sepanjang perjalanan, dan cuma menyala sekejap saat berkasnya
   sampai — kira-kira sepersepuluh putaran.
   ikon jam kecil muncul di atasnya, berdenyut pelan.
   (VO: "Selama dijemput, prosesor cuma menunggu.")

motion:
   - lemari masuk: opacity + `scale 0,9→1`, `expo.out`
   - tiap berkas laci: fade + `scale 0,6→1`, `back.out(1,8)`, stagger 0,2 dtk
   - lemari menepi: `x` + `scale 1→0,86`, `power3.out`; prosesor `expo.out`
   - siluet meja: `stroke-dashoffset` tergambar, `power2.out`, 1,8 dtk
   - antar-jemput: berangkat & pulang `power2.out`, lintasan melengkung
     supaya terbaca dibawa, bukan digeser
   - jam: fade + denyut skala, sinus periode tetap
   - semua nilai fungsi murni dari frame — `useDetik()` + helper `shared/anim.ts`,
     dilarang random/state (HARD RULE deterministik di CLAUDE.md)

catatan:
   - tidak ada meja, tempat kerja, atau kata RAM di scene ini. namanya milik
     scene 4; di sini ia baru boleh berupa lubang.
   - tidak ada angka latensi. baris ⚠ di `naskah.md § Sumber` belum ditutup, dan
     scene ini tetap utuh tanpanya — yang dijual pengulangannya, bukan angkanya.
   - keadaan akhir scene ini ADALAH keadaan awal scene 4: lemari di kiri (0,86),
     prosesor di kanan, siluet meja tergambar penuh. Kalau salah satunya diubah
     di sini, scene 4 ikut berubah.
