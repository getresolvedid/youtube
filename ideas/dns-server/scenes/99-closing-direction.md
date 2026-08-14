Anggaran: mulai 322,32 dtk · durasi 5,0 dtk (`CLOSING_LONG_SECONDS` di `.env`).

Scene standar. Komponennya milik `shared/StandarScenes.tsx` (`<TandaBrand>`) dan
**tidak dibuat ulang** di episode ini — [docs/10](../../../docs/10-scene-standar.md).
Episode ini tidak mengirim apa pun ke dalamnya; `Episode.tsx` cuma memanggilnya.

**Kenapa berkas ini tetap ada** walaupun tidak ada yang bisa disetel dari sini:
kalau koreografi penutup berubah, **semua** episode ikut berubah — dan keputusan
sebesar itu tidak boleh cuma hidup di riwayat chat (HARD RULE 3).

Yang berlaku di sini, diwarisi dari `shared/`:

- konten di **paruh kiri**; paruh kanan dikosongkan untuk end screen YouTube
  (video terkait + tombol subscribe), yang butuh minimal 5 detik tayang supaya
  bisa diklik. itu sebabnya durasinya 5,0 dtk dan bukan lebih pendek.
- **tanpa judul.** judul milik kartu pembuka.
- garis aksen yang menggambar diri sebagai penanda tutup, sama di tiap episode.
- ajakan subscribe hanya di sini, tidak pernah di tengah video
  ([docs/02](../../../docs/02-format-video.md)).

catatan khusus episode ini:
   - **potongan dari `12-ganti-loket` keras, tanpa fade.** scene sebelumnya
     ditutup kalimat bawa-pulang yang tenang; jeda tambahan atau transisi lembut
     akan membuat kalimat itu terasa menggantung, bukan mendarat.
   - **tidak ada loket yang terbawa ke sini.** panggung analogi berhenti di frame
     terakhir scene 12. tanda brand adalah brand, bukan kelanjutan gambarnya.
   - **episode berikutnya yang diumpankan lewat end screen sebaiknya T05**
     ("perjalanan satu alamat web") — bertanya nama adalah perjalanan bolak-balik
     pertama dari tiga, dan penonton episode ini baru saja punya yang pertama.
     Batas kedua topik ada di [docs/07](../../../docs/07-backlog-topik.md#t05--perjalanan-satu-alamat-web).
