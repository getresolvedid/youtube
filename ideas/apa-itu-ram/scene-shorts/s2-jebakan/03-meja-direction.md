Anggaran: mulai 6,8 dtk · durasi 5,11 dtk (estimasi, VO belum jadi).
Dua beat. Scene yang membangun panggung; enam scene sesudahnya cuma mengubah
apa yang ada di atasnya.

1. mitos keluar, meja masuk:
   - kalimat tercoret + batang ram keluar ke atas
   - meja masuk dari bawah dan berhenti di tengah layar (Y_MEJA), kosong
   - lemari arsip terlihat SEBAGIAN di tepi bawah layar — cuma pucuknya,
     supaya penonton tahu ada tempat lain di bawah sana tanpa membicarakannya
   (VO: "Bayangkan meja kerja.")

2. berkas mendarat:
   - empat berkas mendarat satu per satu di atas meja, berjarak longgar
   - kelonggarannya harus jelas: sisa ruang kosong di kanan kira-kira selebar
     satu berkas lagi
   (VO: "Semua yang sedang kamu buka, terhampar di atasnya.")

teks di layar:
   "yang sedang kamu buka" — di dekat berkas, kecil, `--ink-1`.
   Tidak ada label "RAM" di mejanya. Nama itu baru dirapatkan di scene 8.

catatan komposisi:
   - meja masuk KOSONG dulu, baru diisi. Meja yang datang lengkap dengan
     berkasnya membuat undangan VO ("Bayangkan meja kerja") jatuh di layar yang
     sudah selesai — penonton tidak sempat membayangkan apa pun.
   - pucuk lemari di tepi bawah adalah satu-satunya persiapan untuk scene 7.
     Tanpanya, gudang di scene 7 datang entah dari mana; dengan pucuk itu,
     ia sudah ada sejak awal dan cuma belum dipakai.

motion:
   - mitos keluar: geser ke atas 120px + fade, `power1in`, 0,35 dtk
   - meja masuk: geser 80px dari bawah, `expoOut`, 0,5 dtk
   - berkas: `backOut(1.4)`, stagger 0,16 dtk, sedikit miring berbeda-beda
     (sudutnya konstanta per berkas, bukan acak — `Math.random()` dilarang)
