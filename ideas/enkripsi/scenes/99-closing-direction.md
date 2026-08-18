Anggaran: scene terakhir · durasi `CLOSING_LONG_SECONDS` (dari .env).
Tanpa VO — tanda brand tidak bicara ([docs/10](../../../docs/10-scene-standar.md)).

**Seluruhnya milik `shared/StandarScenes.tsx` (`<TandaBrand/>`), dan episode ini
tidak menyetel apa pun.** Tidak ada judul di sini — itu tugas kartu pembuka.
Yang tinggal cuma dua hal: siapa yang barusan bicara, dan apa yang penonton
lakukan berikutnya.

Nomornya **dipatok 99 dan tidak pernah ikut bergeser**, satu-satunya scene yang
begitu. Alasannya di `tools/baca-episode.mjs`: closing selalu scene terakhir,
jadi nomor urut sebenarnya akan berubah tiap kali satu scene disisipkan di mana
pun — dan tiap pergeseran itu mengganti nama berkas ini tanpa ada yang berubah
pada closing-nya sendiri.

catatan:
   - **Ini yang paling perlu punya direction justru karena komponennya milik
     bersama** (HARD RULE 3). Kalau koreografinya berubah, SEMUA episode ikut
     berubah — jadi perubahannya ditulis di `shared/`, bukan disalin lalu
     disetel ulang di sini.
   - **Paruh kanan dikosongkan untuk end screen YouTube**, dan durasi 5 detik
     itu syarat minimum supaya end screen-nya sempat bisa diklik. Jangan
     dipendekkan untuk menghemat durasi episode.
   - **Ini satu-satunya tempat channel ini boleh meminta subscribe** — tidak ada
     CTA di tengah video (docs/02). Jadi jatah baris terakhirnya jangan dipakai
     untuk memperkenalkan diri.
   - **Baris `sub`-nya belum ditimpa, dan sebaiknya tetap begitu** sampai
     kalimat bawa-pulang episode ini ada. Kalimat bawa-pulang tinggal di scene
     `[case]` terakhir, bukan di kartu ini — dan scene itu belum ditulis karena
     sudut episodenya belum diputuskan ([naskah.md](../naskah.md#-dua-sudut-yang-sedang-bertabrakan--belum-diputuskan)).
