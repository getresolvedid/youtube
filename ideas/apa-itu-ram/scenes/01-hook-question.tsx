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

/* --- tahap 1: layar desktop, kursor mengklik pintasan, aplikasi terbuka -----

   VO tahap ini cuma satu kalimat — "Kamu buka sebuah aplikasi." — dan
   memperlihatkannya jauh lebih kuat daripada menaruh ikon aplikasi diam
   (HARD RULE 2). Ini juga yang bikin pertanyaan sesudahnya punya rujukan
   konkret: "datanya" adalah data aplikasi yang barusan penonton lihat dibuka.

   Semua koordinat di bawah relatif terhadap kotak layar 560x340, jadi
   `transformOrigin` jendela bisa dipatok tepat di pintasan — jendelanya
   tumbuh DARI ikon yang diklik, bukan dari tengah layar. */

const LAYAR = { w: 560, h: 340 };
const PINTASAN = { x: 56, y: 44, w: 92 };
/** Titik yang diklik kursor, sekaligus titik tumbuh jendela. */
const KLIK = { x: PINTASAN.x + PINTASAN.w / 2, y: PINTASAN.y + PINTASAN.w / 2 };

const T_KURSOR = 0.32; // kursor mulai bergerak
const T_KLIK = 1.02; // kursor menekan
const T_BUKA = 1.14; // jendela mulai terbuka

const Kursor: React.FC<{ d: number }> = ({ d }) => {
  /* Melambat saat mendekat (power2.out), bukan linear — kursor yang bergerak
     rata terbaca sebagai animasi, kursor yang melambat terbaca sebagai tangan. */
  const maju = (dari: number, ke: number) =>
    t(d, { mulai: T_KURSOR, durasi: 0.7, dari, ke, ease: E.power2out });

  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        position: "absolute",
        left: maju(470, KLIK.x - 4),
        top: maju(292, KLIK.y - 2),
        width: 34,
        height: 34,
        /* Muncul saat mulai bergerak, hilang setelah jendelanya terbuka.
           Tugasnya sudah selesai di situ; kursor yang menetap sampai detik 9
           menarik mata ke titik yang tidak terjadi apa-apa. */
        opacity:
          t(d, { mulai: T_KURSOR, durasi: 0.18, dari: 0, ke: 1 }) *
          t(d, { mulai: T_BUKA + 0.7, durasi: 0.3, dari: 1, ke: 0 }),
        /* Tekanan klik: turun cepat, balik cepat. */
        transform: `scale(${tPP(d, {
          mulai: T_KLIK,
          durasi: 0.18,
          dari: 1,
          ke: 0.78,
          ease: E.power2out,
        })})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,.55))",
      }}
    >
      <path
        d="M4 2 L4 19 L8.6 14.6 L11.4 21 L14.2 19.8 L11.5 13.6 L18 13.6 Z"
        fill="#F6F8FB"
        stroke="#0B1020"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Desktop: React.FC = () => {
  const d = useDetik();

  const bukaSkala = t(d, {
    mulai: T_BUKA,
    durasi: 0.5,
    dari: 0.06,
    ke: 1,
    ease: E.backOut(1.2),
  });

  return (
    <div
      style={{
        position: "relative",
        width: LAYAR.w,
        height: LAYAR.h,
        borderRadius: 18,
        background: "var(--bg-elev)",
        border: "3px solid var(--line)",
        /* Jendela tumbuh dengan sedikit lonjakan; tanpa ini ia bisa menyembul
           keluar bingkai layar untuk satu-dua frame. */
        overflow: "hidden",
        opacity: t(d, { mulai: 0.05, durasi: 0.35, dari: 0, ke: 1 }),
        transform: `scale(${t(d, {
          mulai: 0.05,
          durasi: 0.45,
          dari: 0.92,
          ke: 1,
          ease: E.expoOut,
        })})`,
      }}
    >
      {/* pintasan di desktop */}
      <div
        style={{
          position: "absolute",
          left: PINTASAN.x,
          top: PINTASAN.y,
          width: PINTASAN.w,
          textAlign: "center",
          opacity: t(d, { mulai: 0.2, durasi: 0.3, dari: 0, ke: 1 }),
        }}
      >
        <Ic n="app" style={{ width: PINTASAN.w, height: PINTASAN.w }} />
        <p
          className="t-label"
          style={{ fontSize: 17, marginTop: 6, color: "var(--ink-1)" }}
        >
          aplikasi
        </p>
      </div>

      {/* riak klik — menegaskan bahwa yang barusan terjadi adalah klik,
          bukan jendela yang muncul sendiri */}
      <div
        style={{
          position: "absolute",
          left: KLIK.x,
          top: KLIK.y,
          width: 0,
          height: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -60,
            top: -60,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "3px solid var(--accent-ink)",
            opacity: t(d, {
              mulai: T_KLIK,
              durasi: 0.42,
              dari: 0.9,
              ke: 0,
              ease: E.power2out,
            }),
            transform: `scale(${t(d, {
              mulai: T_KLIK,
              durasi: 0.42,
              dari: 0.25,
              ke: 1,
              ease: E.expoOut,
            })})`,
          }}
        />
      </div>

      {/* jendela aplikasi — tumbuh dari pintasan yang diklik */}
      <div
        style={{
          position: "absolute",
          left: 38,
          top: 30,
          right: 38,
          bottom: 30,
          borderRadius: 12,
          background: "var(--bg)",
          border: "2px solid var(--accent)",
          overflow: "hidden",
          opacity: t(d, { mulai: T_BUKA, durasi: 0.16, dari: 0, ke: 1 }),
          transform: `scale(${bukaSkala})`,
          transformOrigin: `${KLIK.x - 38}px ${KLIK.y - 30}px`,
        }}
      >
        {/* bilah judul — dua titik, mengikuti gaya ikon `app` di shared/Icons.tsx.
            BUKAN tiga titik warna ala macOS (docs/03). */}
        <div
          style={{
            height: 34,
            borderBottom: "2px solid var(--line)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: 14,
          }}
        >
          <i
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--ink-2)",
            }}
          />
          <i
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--ink-2)",
            }}
          />
        </div>

        {/* isi jendela — baris konten yang mengisi diri satu per satu.
            Inilah "data aplikasi" yang ditanyakan pertanyaan sesudahnya. */}
        <div
          style={{
            padding: "22px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {[0.78, 0.94, 0.6, 0.86].map((lebar, i) => (
            <div
              key={lebar}
              style={{
                height: 16,
                borderRadius: 8,
                background: i === 0 ? "var(--accent)" : "var(--line)",
                width: `${
                  lebar *
                  100 *
                  t(d, {
                    mulai: T_BUKA + 0.34 + i * 0.09,
                    durasi: 0.34,
                    dari: 0,
                    ke: 1,
                    ease: E.expoOut,
                  })
                }%`,
              }}
            />
          ))}
        </div>
      </div>

      <Kursor d={d} />
    </div>
  );
};

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
              /* Aktivitas tengah-scene (docs/03 § Gerak): y ±5px, sine.inOut.
                 Menutup 2,5 dtk antara kicker dan kartu pertama — jeda yang
                 memang disengaja, tapi jeda yang tidak boleh mati.
                 Opacity layar diatur di dalam <Desktop>, jangan ditumpuk di
                 sini: masuk() mengembalikan `transform` juga dan akan menimpa
                 gerak ini tanpa error apa pun. */
              transform: `translateY(${tPP(d, {
                mulai: 4.3,
                durasi: 3.0,
                dari: 0,
                ke: -5,
              })}px)`,
            }}
          >
            <Desktop />
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
