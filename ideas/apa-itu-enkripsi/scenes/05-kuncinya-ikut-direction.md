Anggaran: mulai 61,49 dtk · durasi 19,38 dtk (estimasi, VO belum jadi).
Enam baris VO = enam tahap.

Frame pertamanya = frame terakhir `04-kotak-digembok`: kotak tergembok diam di
tengah jalan, terang, jalan menyala.

**Scene yang merobohkan jawaban scene 4**, dan seluruh episode bertumpu pada satu
gambar di tahap 4: kunci berjalan berdampingan dengan kotaknya, melewati tangan
yang sama.

1. kamera geser ke KANAN mengikuti jalan sampai ujungnya. di sana ada meja
   penerima — bidang yang sama ukurannya dengan meja kiri, dan permukaannya
   KOSONG.
   (VO: "Sampai kamu ingat siapa yang harus membukanya.")

2. kotak tergembok tiba di meja itu. berhenti. tidak ada yang bisa dilakukan
   padanya. diam sedetik penuh — jeda ini bagian dari pesannya.
   (VO: "Yang di ujung sana tidak punya kuncinya.")

3. kunci muncul di meja KIRI, lalu turun ke jalan yang sama. bentuknya sengaja
   jelas dan tidak mirip apa pun yang sudah ada di layar.
   (VO: "Jadi kuncinya harus ikut berangkat.")

4. kunci menyusuri jalan dan berpindah dari tangan ke tangan — lintasan yang sama
   persis dengan kotak, tangan yang sama, tempo yang sama.
   (VO: "Lewat jalan yang sama. Lewat tangan yang sama.")

5. kamera mundur sedikit sehingga kotak dan kunci terlihat berdampingan di jalan,
   sejajar, sebagai satu gambar.
   (VO: "Kotaknya memang terkunci, tapi kuncinya menempel di sebelahnya.")

6. kotak besar MENYUSUT sampai seukuran kunci di sebelahnya. dua benda kecil yang
   sama-sama di jalan yang sama. tidak ada yang hilang dari layar.
   (VO: "Masalahnya tidak hilang. Ia cuma jadi lebih kecil.")

motion:
   - kamera geser: `kamera({dx})` dari 0 ke -520, `E.power2out`, 1,2 dtk. titik
     tumpunya sama dengan scene 1 — jangan bikin kamera baru per scene
   - kunci turun ke jalan: `t()` pada y + `E.power1out`, lalu x mengikuti
     `posTangan()` yang sama dengan kotak
   - berdampingan: kunci mengejar sampai selisih x tetap 150 px, lalu keduanya
     berhenti bersamaan
   - menyusut: `t()` pada skala kotak 1 -> 0,42, `E.power2out`, 0,8 dtk

catatan:
   - **tahap 4 adalah gambar yang wajib ada di episode ini.** kalau penonton cuma
     mendengar "kuncinya juga harus dikirim" tanpa melihat kunci melewati tangan
     yang sama dengan kotaknya, seluruh bagian 4 nanti menjawab pertanyaan yang
     tidak pernah terasa.
   - **kuncinya jangan digambar mencurigakan.** tidak ada warna bahaya, tidak ada
     getar. yang salah bukan kuncinya, tapi bahwa jalannya cuma satu.
   - **meja kanan harus sama ukurannya dengan meja kiri** (`panggung-kiriman.tsx`)
     — ia dipakai lagi di scene 6, 7, 8, 9, 11 dan 16, dan tiap kali harus
     menempati piksel yang sama.
   - **jangan menaruh sosok penerima di meja itu.** mejanya dulu, orangnya baru
     di scene 6 — dan kemunculan orangnya di sana yang membuka bagian tersulit.
   - frame terakhir (kotak kecil + kunci berdampingan di jalan, meja kanan di
     kanan frame) adalah frame pertama scene 6.
