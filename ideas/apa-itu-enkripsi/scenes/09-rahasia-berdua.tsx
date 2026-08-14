/* T16 · scene 9 · rahasia-berdua — bagian 5 [why], 28,20 dtk
   VO:        09-rahasia-berdua-vo.md
   Direction: 09-rahasia-berdua-direction.md

   Sebab kedua, dan TITIK PUTUS ANALOGI NOMOR TIGA: gembok menjelaskan
   gagasannya dengan benar, tapi bukan itu yang sebenarnya dipakai untuk
   menyepakati kunci sekarang.

   DUA POTONGAN SENGAJA BERBEDA BENTUK, DUA KUNCI HASILNYA SENGAJA SAMA. Itu
   seluruh isi scene ini dalam satu gambar, dan satu-satunya hal yang harus
   terbaca tanpa VO.

   Gemboknya DIPINGGIRKAN, bukan dihapus — ia dipanggil lagi di scene 11 untuk
   pekerjaan yang berbeda, dan kalau di sini hilang, kemunculannya nanti terbaca
   sebagai benda baru.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Gembok,
  I_GEMBOK_DIAMBIL,
  Jalan,
  Kunci,
  Meja,
  N_TANGAN,
  P_KUNCI_MEJA,
  Potongan,
  SetengahJadi,
  Tangan,
  X_GEMBOK,
  X_KIRIM,
  X_TERIMA,
  Y_GEMBOK,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "rahasia-berdua";

const B_BUKAN = beat(ID, 0); // "Tapi gembok bukan satu-satunya jalan keluar."
const B_CARA = beat(ID, 1); // "Ada cara lain…"
const B_TAHAN = beat(ID, 2); // "Dua meja sama-sama menahan satu potongan…"
const B_BOLAK = beat(ID, 3); // "Yang bolak-balik di jalan cuma barang setengah jadi."
const B_PASANG = beat(ID, 4); // "Lalu di masing-masing meja…"
const B_SAMA = beat(ID, 5); // "Hasilnya sama persis."

const Y_POTONGAN = Y_JALAN - 150;
const R_KURUNG = 96;

export const RahasiaBerdua: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: gembok DIREDUPKAN di tempatnya, TIDAK dipindah dan tidak
     hilang: memindahkannya ke atas membuatnya bertumpuk dengan tangan, dan
     yang perlu terbaca cuma bahwa ia tidak lagi jadi bahan pembicaraan --- */
  const pinggir = t(d, { mulai: B_BUKAN, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const labelPudar = 1 - t(d, { mulai: B_BUKAN, durasi: 0.5, dari: 0, ke: 1 });

  const sorot = t(d, { mulai: B_CARA + 0.2, durasi: 0.6, dari: 0, ke: 0.7 });

  /* --- tahap 3: potongan muncul dan langsung dikurung --- */
  const potongan = masuk(d, { mulai: B_TAHAN + 0.1, durasi: 0.5, geser: 20 });
  const kurung = gambarGaris(d, 2 * Math.PI * R_KURUNG, { mulai: B_TAHAN + 0.6, durasi: 0.7 });

  /* --- tahap 4: barang setengah jadi berpapasan tepat di tengah jalan --- */
  const kirim = t(d, {
    mulai: B_BOLAK,
    durasi: B_PASANG - B_BOLAK,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });
  const xKiri = X_KIRIM + (X_TERIMA - X_KIRIM) * kirim;
  const xKanan = X_TERIMA - (X_TERIMA - X_KIRIM) * kirim;

  /* --- tahap 5: potongan yang ditahan dipasangkan ke barang yang datang --- */
  const pasang = t(d, { mulai: B_PASANG + 0.2, durasi: 0.7, dari: 0, ke: 1, ease: E.power2in });
  const jadi = t(d, { mulai: B_SAMA, durasi: 0.5, dari: 0, ke: 1, ease: E.backOut(1.3) });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({})}>
            <Jalan />
            <Meja x={X_KIRIM} sorot={sorot} />
            <Meja x={X_TERIMA} sorot={sorot} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan
                key={i}
                x={posTangan(i)}
                nyala={Math.abs(xKiri - posTangan(i)) < 110 || Math.abs(xKanan - posTangan(i)) < 110 ? 1 : 0}
              />
            ))}

            {/* gembok dipinggirkan ke atas, tetap terlihat */}
            <g opacity={1 - 0.75 * pinggir}>
              {X_GEMBOK.map((x, i) =>
                i === I_GEMBOK_DIAMBIL ? null : (
                  <Gembok key={x} x={x} y={Y_GEMBOK} skala={1.05} terbuka={1} />
                ),
              )}
            </g>

            {/* label kunci pribadi dari scene lalu, memudar */}
            <text
              x={X_TERIMA}
              y={940}
              fontSize={42}
              fontFamily="var(--font-display)"
              fontWeight={700}
              fill={AKSEN}
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={labelPudar}
            >
              kunci pribadi
            </text>

            {/* potongan yang ditahan — bentuknya BERBEDA di dua meja */}
            {[X_KIRIM, X_TERIMA].map((x, i) => (
              <g key={x} style={{ opacity: potongan.opacity, transform: potongan.transform }}>
                <g opacity={1 - jadi}>
                  <Potongan
                    x={x + (i === 0 ? 1 : -1) * 120 * pasang}
                    y={Y_POTONGAN}
                    bentuk={i === 0 ? 0 : 1}
                    skala={0.9}
                  />
                </g>
                <circle
                  cx={x}
                  cy={Y_POTONGAN}
                  r={R_KURUNG}
                  fill="none"
                  stroke={AKSEN}
                  strokeWidth={4}
                  strokeDasharray={kurung.strokeDasharray}
                  strokeDashoffset={kurung.strokeDashoffset}
                  opacity={0.55 * (1 - jadi)}
                />
              </g>
            ))}

            {/* barang setengah jadi — berpapasan tepat di tengah */}
            {kirim > 0 && (
              <g opacity={1 - jadi}>
                <SetengahJadi x={xKiri} y={Y_JALAN - 60} skala={0.95} />
                <SetengahJadi x={xKanan} y={Y_JALAN - 150} skala={0.95} />
              </g>
            )}

            {/* dua kunci utuh, bentuknya sama persis, muncul BERSAMAAN */}
            <g opacity={jadi}>
              <Kunci x={X_KIRIM} y={Y_POTONGAN} skala={1.3} />
              <Kunci x={X_TERIMA} y={Y_POTONGAN} skala={1.3} />
            </g>

            {/* kunci pribadi yang sejak scene 7 tidak pernah bergerak */}
            <Kunci x={P_KUNCI_MEJA.x} y={P_KUNCI_MEJA.y} skala={1.1} opacity={1 - 0.6 * pinggir} />

            {/* satu tangan tetap memegang barang setengah jadi, dan tidak bisa apa-apa */}
            <g opacity={jadi}>
              <SetengahJadi x={posTangan(2)} y={Y_JALAN - 60} skala={0.8} />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
