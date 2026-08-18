/* T15 · scene 1 · hook-mengetuk — bagian 1 [question], 20,70 dtk
   VO:        01-hook-mengetuk-vo.md
   Direction: 01-hook-mengetuk-direction.md

   Frame pertama episode.

   TIGA KEPUTUSAN:

   1. Layar laptop dan dinding gedung SEUKURAN dan SETITIK. `Layar` menggambar
      bidang `GEDUNG.w x GEDUNG.h` di koordinat yang sama persis dengan dinding,
      jadi laptopnya tidak digantikan gedung — ia JADI gedung, tanpa satu benda
      pun berpindah tempat. Yang berubah cuma dua opasitas berlawanan dan satu
      skala kamera. Sejak 2026-08-14 perubahan itu juga DIKATAKAN, bukan cuma
      digambar: beat 1 menamai analoginya dan beat 2 memetakannya. Gambar yang
      kuat tidak sama dengan gambar yang dimengerti.

   2. Ketukan MEMBEKU di tahap 6, dan pembekuannya tidak menyimpan state apa pun:
      posisinya dihitung dari `dBeku`, waktu yang berhenti maju di `B_TIDAK2`.
      Fungsi murni dari frame, jadi seek ke detik mana pun tetap benar.

   3. Tidak ada penjaga di layar, sama sekali. Satu siluet saja di sini akan
      menjawab pertanyaan hook sebelum bagian 3 sempat membuat masalahnya terasa.

   4. MAKSUD mereka disebut di VO (beat 3 dan 4), jadi gambarnya TIDAK ikut
      menaikkan nada: ketukan tetap abu-abu, tanpa wajah, tanpa warna bahaya.
      Yang ditambahkan cuma getar daun pintu — kering, pendek, dan selalu
      berhenti di tempat semula. Kalau kata dan gambar sama-sama naik, hook-nya
      berubah jadi iklan antivirus.
*/
import type React from "react";

import { E, getar, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  GEDUNG,
  Gedung,
  Ketukan,
  Lantai,
  Layar,
  N_PINTU,
  Peretas,
  X_GEDUNG,
  X_LUAR,
  X_PERETAS,
  Y_LANTAI,
  kamera,
} from "../panggung-gedung";
import { beat } from "../timing.gen";

const ID = "hook-mengetuk";

/* Scene ini sudah DUA KALI ditambahi baris atas arahan user (2026-08-14), dan
   tiap penambahan menggeser seluruh indeks sesudahnya — `B_TIDAK` mulanya 4,
   lalu 6, sekarang 8:

     1. "Bukan mau menyapa." + "Mereka lagi cari pintu yang lupa dikunci."
        tanpa keduanya, ketukan terbaca sebagai bunyi di luar, bukan sebagai
        percobaan masuk.
     2. "Sekarang anggap saja laptop itu sebuah gedung." + "Semua yang kamu pakai
        ada di dalamnya." tanpa keduanya, laptop berubah jadi gedung di layar
        tanpa satu kata pun yang bilang kenapa.

   Kalau salah satu pasangan digabung atau dihapus lagi, remap di bawah ini harus
   ikut dibalik di suntingan yang sama (docs/11 § gerbang indeks beat). */
const B_TENANG = beat(ID, 0); // "Laptopmu lagi nyala, halamannya terbuka…"
const B_GEDUNG = beat(ID, 1); // "Sekarang anggap saja laptop itu sebuah gedung."
const B_DALAM = beat(ID, 2); // "Semua yang kamu pakai ada di dalamnya."
const B_TENGOK = beat(ID, 3); // "Coba tengok dinding luarnya sebentar."
const B_ADA = beat(ID, 4); // "Ada yang mengetuk di luar sana."
const B_MENYAPA = beat(ID, 5); // "Bukan mau menyapa."
const B_CARI = beat(ID, 6); // "Mereka lagi cari pintu yang lupa dikunci."
const B_TERUS = beat(ID, 7); // "Terus-menerus, sejak tadi…"
const B_TIDAK = beat(ID, 8); // "Tidak satu pun dari mereka sampai ke layarmu."
const B_BEKU = beat(ID, 9); // "Tidak satu pun."
const B_TANYA = beat(ID, 10); // "Jadi siapa yang menahan mereka di luar?"

/** Bilah "isi yang kamu pakai", di ruang kosong DI ATAS deretan pintu. Lebarnya
 *  berbeda-beda supaya terbaca sebagai isi halaman, bukan sebagai rak. */
const BILAH_ISI = [
  { y: 372, w: 0.72 },
  { y: 416, w: 0.5 },
  { y: 460, w: 0.62 },
] as const;

/** Tepi kiri dinding — tempat tiap ketukan berhenti. */
const X_DINDING = X_GEDUNG - GEDUNG.w / 2;

/** Ketukan: tundaan dan ketinggiannya DITULIS, tidak diacak. `Math.random()`
 *  akan menghasilkan gambar berbeda tiap frame saat render paralel.
 *
 *  Tundaannya sengaja MELEBAR sampai hampir menyentuh titik beku, dan
 *  perjalanannya sengaja lambat (`LAJU_KETUK`). Di versi pertama semuanya sudah
 *  sampai di dinding sebelum tahap 6, jadi frame bekunya berisi satu kolom
 *  ketukan yang rapi menempel di tembok — terbaca sebagai tumpukan ikon, bukan
 *  sebagai ketukan yang sedang berdatangan. Ketahuan di render still, bukan dari
 *  pemeriksaan mana pun. */
const LAJU_KETUK = 4.0;

const KETUK = [
  { tunda: 0.0, y: 700 },
  { tunda: 1.0, y: 520 },
  { tunda: 1.9, y: 790 },
  { tunda: 2.8, y: 610 },
  { tunda: 3.7, y: 455 },
  { tunda: 4.6, y: 735 },
  { tunda: 5.5, y: 565 },
  { tunda: 6.4, y: 660 },
] as const;

export const HookMengetuk: React.FC = () => {
  const d = useDetik();

  /* --- tahap 5: daun pintu digetarkan satu per satu, kiri ke kanan ---
     Inilah satu-satunya gambar di scene ini yang menyatakan MAKSUD: ada yang
     menarik gagangnya dari luar. `getar()` meluruh sendiri ke nol, jadi tiap
     pintu berhenti persis di tempat semula — tidak ada satu pun yang terbuka,
     dan tidak ada pergeseran sisa yang terbaca sebagai tata letak meleset. */
  const pintu = Array.from({ length: N_PINTU }, (_, i) => ({
    /* Cukup terang untuk terbaca sebagai pintu, jauh dari terang penuh yang
       baru datang di scene 3. Di nol, getar tahap 5 terjadi pada bentuk yang
       nyaris tidak terlihat — dan beat "cari pintu yang lupa dikunci" mendarat
       di layar yang penonton baca sebagai dinding polos. */
    /* Tepat di atas ambang 0,5 yang membuat `Pintu` memakai garis ABU dan bukan
       garis gelap. Di bawah ambang itu pintunya digambar dengan warna yang nyaris
       sama dengan dinding, dan yang terbaca penonton cuma bidang polos. */
    nyala: 0.55,
    geser: getar(d, {
      mulai: B_CARI + 0.15 + i * 0.16,
      durasi: 0.55,
      jauh: 7,
      putaran: 3,
    }),
  }));

  /* --- tahap 2: kamera mundur, layar jadi dinding ---
     Keduanya jatuh di beat yang MENAMAI analoginya, bukan sesudahnya: kalimat
     dan perubahan gambarnya harus mendarat bersamaan, kalau tidak yang satu
     terbaca sebagai keterangan atas yang lain. */
  const mundur = t(d, {
    mulai: B_GEDUNG,
    durasi: 1.3,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const tukar = t(d, { mulai: B_GEDUNG + 0.15, durasi: 0.85, dari: 0, ke: 1 });

  /* --- tahap 3 & 4: isi halaman menyusut ke dalam gedung, lalu memudar ---
     Warnanya sama dengan isi layar di tahap 1, dan itu wajib: ia harus terbaca
     sebagai benda yang SAMA yang berpindah ke dalam, bukan sebagai isi baru. */
  const isiMasuk = t(d, { mulai: B_DALAM, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const isiPudar = t(d, { mulai: B_TENGOK, durasi: 0.7, dari: 1, ke: 0 });

  /* Isi halaman sudah terisi sejak frame pertama: penonton sedang melihat
     layarnya sendiri, bukan layar yang sedang memuat. */
  const isiLayar = t(d, { mulai: B_TENANG, durasi: 0.9, dari: 0.75, ke: 1 });

  /* --- tahap 3 sampai 6: ketukan, lalu beku ---
     Waktu yang dipakai ketukan BERHENTI di B_BEKU. Tidak ada state: `dBeku`
     dihitung ulang dari `d` tiap frame. */
  const dBeku = Math.min(d, B_BEKU);

  /* --- tahap 4: ketukan pertama TIDAK berbalik pergi ---
     Ia sudah berhenti sendiri karena tween-nya menjepit di ujung; yang
     ditambahkan cuma satu denyut pelan supaya "ia masih di situ" terbaca sebagai
     kejanggalan, bukan sebagai gambar yang kebetulan diam. */
  const tahan = tPP(d, { mulai: B_MENYAPA, durasi: 1.0, dari: 1, ke: 1.18 });

  /* --- tahap 7: pertanyaannya mendarat --- */
  const tanya = masuk(d, { mulai: B_TANYA + 0.1, durasi: 0.55, geser: 26 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: 1 + 0.55 * (1 - mundur) })}>
            <g opacity={mundur}>
              <Lantai opacity={mundur} />
            </g>

            <Layar opacity={1 - tukar} isi={isiLayar} />
            {/* Nomor pintu SENGAJA nol di sini. Pintunya boleh terlihat sebagai
                pintu, tapi "tiap pintu punya nomor" adalah temuan scene 3 —
                nomor yang sudah terbaca samar di scene 1 membuat scene 3 tinggal
                mengulang. */}
            <Gedung opacity={tukar} pintu={pintu} nomorTampil={0} />

            {/* --- tahap 3: isinya, sekarang di dalam --- */}
            <g opacity={isiMasuk * isiPudar}>
              {BILAH_ISI.map((b, i) => {
                const p = t(d, {
                  mulai: B_DALAM + i * 0.09,
                  durasi: 0.5,
                  dari: 0,
                  ke: 1,
                  ease: E.expoOut,
                });
                const lebar = (GEDUNG.w - 200) * b.w * p;
                return (
                  <rect
                    key={b.y}
                    x={X_GEDUNG - lebar / 2}
                    y={b.y}
                    width={lebar}
                    height={22}
                    rx={7}
                    fill="var(--ink-2)"
                    opacity={0.6}
                  />
                );
              })}
            </g>

            {/* Yang mengetuk, muncul bersama ketukan pertama — dan ini kali
                pertama penonton melihatnya di seluruh episode. Ia memakai
                `dBeku` yang sama dengan ketukannya, jadi waktu yang berhenti di
                B_TIDAK2 membekukannya juga: pertanyaan penutup hook jatuh di
                atas gambar yang benar-benar diam, bukan yang masih bergerak. */}
            <g data-tumpang="sengaja" opacity={mundur}>
              <Peretas
                x={X_PERETAS}
                y={Y_LANTAI}
                skala={0.92}
                opacity={t(dBeku, { mulai: B_ADA - 0.35, durasi: 0.7, dari: 0, ke: 1 })}
              />
            </g>

            {KETUK.map((k, i) => {
              /* Ketukan pertama datang sendirian di beat "ada yang mengetuk" dan
                 TIDAK berbalik — ia yang ditunjuk beat "bukan mau menyapa".
                 Sisanya baru menyusul setelah maksudnya disebut. */
              const mulai = (i === 0 ? B_ADA : B_TERUS) + k.tunda;
              const maju = t(dBeku, {
                mulai,
                durasi: LAJU_KETUK,
                dari: 0,
                ke: 1,
                ease: E.power1out,
              });
              /* Ketukan berhenti tepat di dinding: tidak ada satu pun yang
                 menembus, dan itu isi tahap 5. Titik berhentinya digeser sedikit
                 per ketukan supaya yang sudah sampai tidak berbaris di satu
                 garis tegak yang sama. */
              const xHenti = X_DINDING - (i % 3) * 34;
              return (
                <Ketukan
                  key={i}
                  x={X_LUAR + (xHenti - X_LUAR) * maju}
                  y={k.y}
                  skala={0.9 * (i === 0 ? tahan : 1)}
                  opacity={maju > 0 ? 1 : 0}
                />
              );
            })}

            {/* Tahap 7 tidak menggambar apa pun yang baru — yang terjadi justru
                bahwa dinding TIDAK berubah dan tidak ada pintu yang terbuka.
                `B_TIDAK` sengaja tidak dipakai sebagai pemicu animasi; ia
                dibayar oleh ketukan yang menumpuk dan pintu yang berhenti
                bergetar. */}
          </g>

          <g style={{ opacity: tanya.opacity, transform: tanya.transform }}>
            <text
              x={960}
              y={170}
              fontSize={62}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              Siapa yang menahan mereka di luar?
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
