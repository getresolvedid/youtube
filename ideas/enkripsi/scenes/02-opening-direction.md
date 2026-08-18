Anggaran: mulai setelah `pesan-dikirim` · durasi `OPENING_SECONDS` (dari .env).
Tanpa VO — kartu judul tidak bicara ([docs/10](../../../docs/10-scene-standar.md)).

**Koreografinya milik `shared/StandarScenes.tsx` dan tidak dibuat ulang di sini.**
Yang ditetapkan berkas ini cuma dua hal yang memang milik episode ini: teks
judulnya, dan figur yang dikirim lewat prop `figur`.

judul:
   - JUDUL    : "Enkripsi"
   - SUBJUDUL : **BELUM DITETAPKAN** — menunggu sudut episode diputuskan
   - keduanya diatur di `Episode.tsx`, bukan di naskah.

figur (`scenes/02-opening.tsx`):
   **BELUM DIGAMBAR, dan tidak boleh ditebak.** Figur kartu judul wajib komponen
   yang sama persis dengan yang dipakai scene-nya ([docs/06](../../../docs/06-publishing.md)),
   dan scene yang melahirkannya belum ada — scene 3 dan seterusnya belum
   ditulis. Sementara ini `02-opening.tsx` mengirim `figur={null}`, jadi
   kartunya tampil dengan judul saja dan tetap bisa dirender.

catatan:
   - **SUBJUDULNYA BERGANTUNG PADA SUDUT YANG BELUM DIPUTUSKAN.** Baris kedua
     kartu judul dipakai menaruh gambaran L1-nya lebih dulu, dan gambaran itu
     berbeda tergantung sudut mana yang menang:
       - sudut [ide.md](../ide.md) → "Kuncinya menginap di mana?"
       - sudut arahan scene 1 → "Yang lewat jalan, dan yang membacanya"
     Menuliskan salah satunya sekarang berarti memutuskan sudut episode lewat
     pintu belakang. Dikosongkan sampai [`naskah.md`](../naskah.md#-dua-sudut-yang-sedang-bertabrakan--belum-diputuskan)
     dijawab.
   - **"Enkripsi" tidak punya kepanjangan**, tidak seperti "DNS" di T14 yang
     kartunya bisa mengeja "Domain Name System". Jadi baris kedua memang harus
     dipakai untuk gambaran, bukan untuk singkatan.
   - **Kartu ini menulis "Enkripsi" di sekitar detik 15**, sementara VO baru
     boleh menamainya di bagian 4. Itu bukan pelanggaran HARD RULE 6: yang
     dilarang **VO** yang menyebut nama sebelum bendanya berdiri, bukan kartu
     judulnya. Konsekuensinya mengikat ke scene bagian 4 — penamaan di sana
     ditulis sebagai **penegasan** atas benda yang sudah berdiri, bukan sebagai
     perkenalan.
   - **Figurnya jangan diisi kotak-dan-gembok sebagai tambalan.** Gembok adalah
     `[what]`-nya episode ini dalam salah satu sudut; menaruhnya di kartu judul
     sebelum bagian 4 membocorkan jawaban di bagian 2 — kesalahan yang persis
     dihindari `02-opening-direction.md` T15 dengan menggambar penjaganya tanpa
     daftar dan tanpa buku.
   - Kalau koreografi masuknya perlu berubah, ubah di `shared/` untuk SEMUA
     episode — jangan menganimasikan apa pun di berkas figur ini.
