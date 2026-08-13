/* T01 · scene 1 · hook-question — bagian 1 [question], 9,4 dtk
   Naskah: ideas/apa-itu-ram/naskah.md, baris `hook-question`

   Frame pertama video. Tidak ada sapaan, tidak ada logo — brand sting baru
   datang setelah ini (docs/10). Yang harus terjadi di sini cuma satu:
   penonton punya pertanyaan yang belum bisa dijawabnya sendiri.

   Satu scene, tiga tahap. Menggabungkan apa yang dulu jadi scene 001–003:
   ketiganya membawa pertanyaan yang sama, dan memotongnya jadi tiga scene
   membuat masing-masing saling menunggu (HARD RULE 1 di CLAUDE.md).

   Titik waktunya dipatok ke VO, dihitung pada 140 wpm:
     0,00–1,71  "Kamu buka sebuah aplikasi."      -> ikon aplikasi
     1,71–3,86  "Di mana datanya saat itu?"       -> pertanyaan
     3,86–4,71  "Kelihatannya sepele."            -> mengecil + kicker
     4,71–9,00  "Tapi di mana persisnya ia        -> dua kartu
                 ditaruh, dan di mana diproses?"

   Dua kartu terakhir TIDAK masuk sebagai pasangan. VO menyebutnya berurutan
   dengan jeda 1,7 dtk, jadi masing-masing mendarat di katanya sendiri —
   "ditaruh" di 7,29 dan "diproses" di 9,00. Kartu yang muncul berbarengan
   akan membuat separuh kalimat terakhir bicara tentang sesuatu yang sudah
   lama ada di layar.

   Tata letaknya SELURUHNYA absolut. Kalau tiga tahap ini dibuat sebagai
   elemen dalam alur normal, munculnya kartu di tahap 3 akan mendorong
   pertanyaan ke atas — pergeseran satu frame yang terbaca sebagai glitch,
   bukan sebagai koreografi.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic, type NamaIkon } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";

/* Pusat vertikal tiap lapis, dalam px pada frame 1080.
   Grup pertanyaan sengaja sedikit di atas tengah: ruang di bawahnya nanti
   ditempati kartu, dan menempatkannya persis di tengah membuat tahap 3
   terasa berat sebelah. */
const Y_GRUP = 500;
const Y_KICKER = 600;
const Y_KARTU = 760;

/** Seberapa jauh grup pertanyaan naik saat tahap 2. */
const NAIK = -170;

const T2 = 3.7; // mengecil — sedikit mendahului "Kelihatannya sepele." (3,86)
const T_TARUH = 6.55; // mendarat sebelum kata "ditaruh" selesai (7,29)
const T_PROSES = 7.95; // mendarat sebelum kata "diproses" selesai (9,00)

const lapis = (top: number): React.CSSProperties => ({
  position: "absolute",
  left: 0,
  right: 0,
  top,
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Kartu: React.FC<{
  ikon: NamaIkon;
  warna: string;
  teks: string;
  /** Sisi asal: -1 masuk dari kiri, 1 dari kanan. */
  dari: -1 | 1;
  mulai: number;
}> = ({ ikon, warna, teks, dari, mulai }) => {
  const d = useDetik();
  return (
    <div
      className="panel"
      style={{
        width: 540,
        opacity: t(d, { mulai, durasi: 0.42, dari: 0, ke: 1, ease: E.power2out }),
        transform: `translateX(${t(d, {
          mulai,
          durasi: 0.62,
          dari: dari * 110,
          ke: 0,
          ease: E.expoOut,
        })}px)`,
      }}
    >
      <Ic n={ikon} warna={warna} />
      <p className="t-sub">{teks}</p>
    </div>
  );
};

export const HookQuestion: React.FC = () => {
  const d = useDetik();

  /* Tahap 2: naik & mengecil. Satu transform untuk seluruh grup — ikon ikut
     mengecil bersama pertanyaannya, supaya keduanya tetap terbaca sebagai
     satu benda yang mundur, bukan dua elemen yang kebetulan bergerak.
     Pada 0,62 pertanyaan jadi 59px — masih di atas ambang sub-judul 44px
     (docs/03 § Skala minimum), jadi tetap sah dibaca sampai akhir scene. */
  const skala = t(d, { mulai: T2, durasi: 0.72, dari: 1, ke: 0.62, ease: E.power3out });
  const naik = t(d, { mulai: T2, durasi: 0.72, dari: 0, ke: NAIK, ease: E.power3out });

  return (
    <Scene>
      {/* --- tahap 1: ikon + pertanyaan --- */}
      <div style={lapis(Y_GRUP)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            transform: `translateY(${naik}px) scale(${skala})`,
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              /* Opacity ditulis sendiri, bukan lewat masuk(), karena masuk()
                 juga mengembalikan `transform` — dan spread-nya akan menimpa
                 gerak napas di bawah tanpa error apa pun kalau tidak sengaja
                 dipisah begini. */
              opacity: t(d, {
                mulai: 0.1,
                durasi: 0.52,
                dari: 0,
                ke: 1,
                ease: E.expoOut,
              }),
              /* Aktivitas tengah-scene (docs/03 § Gerak): y ±5px, sine.inOut.
                 Menutup 2,5 dtk antara kicker dan kartu pertama — jeda yang
                 memang disengaja, tapi jeda yang tidak boleh mati. */
              transform: `translateY(${tPP(d, {
                mulai: 4.3,
                durasi: 3.0,
                dari: 0,
                ke: -5,
              })}px)`,
            }}
          >
            <div
              style={{
                transform: `scale(${t(d, {
                  mulai: 0.1,
                  durasi: 0.52,
                  dari: 0.4,
                  ke: 1,
                  ease: E.backOut(2.0),
                })})`,
                transformOrigin: "center",
              }}
            >
              <Ic n="app" ukuran="xl" />
            </div>
          </div>

          <h1
            className="t-display"
            style={{ lineHeight: 1.08, ...masuk(d, { mulai: 1.55, durasi: 0.55, geser: 26 }) }}
          >
            Di mana datanya saat itu?
          </h1>
        </div>
      </div>

      {/* --- tahap 2: kicker --- */}
      <div style={lapis(Y_KICKER)}>
        <p className="kicker" style={masuk(d, { mulai: T2 + 0.35, geser: 10 })}>
          Kelihatannya sepele.
        </p>
      </div>

      {/* --- tahap 3: dua tempat, dinamai tapi belum dijawab ---
          Lemari arsip = penyimpanan, keping = prosesor. Pasangan c-mute /
          c-accent ini dipakai lagi di s022 (gudang vs meja) — grammar warnanya
          sengaja ditanam di sini supaya penonton sudah mengenalinya nanti. */}
      <div style={{ ...lapis(Y_KARTU), flexDirection: "row", justifyContent: "center", gap: 48 }}>
        <Kartu ikon="cabinet" warna="c-mute" teks="ditaruh" dari={-1} mulai={T_TARUH} />
        <Kartu ikon="chip" warna="c-accent" teks="diproses" dari={1} mulai={T_PROSES} />
      </div>
    </Scene>
  );
};
