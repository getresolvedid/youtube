/* T16 · scene 8 · kunci-tidak-pernah-lewat — bagian 5 [why], 26,87 dtk
   VO:        08-kunci-tidak-pernah-lewat-vo.md
   Direction: 08-kunci-tidak-pernah-lewat-direction.md

   Sebab pertama. Yang harus terbukti di layar: yang berbahaya di scene 5 bukan
   kuncinya, melainkan PERJALANANNYA. Karena itu scene ini hampir tidak punya
   gerakan — bendanya justru dibuktikan dengan DIAM.

   KUNCINYA TIDAK DIANIMASIKAN SAMA SEKALI. Diamnya adalah isi scene ini; satu
   gerakan kecil saja membuat lingkaran di tahap 3 kehilangan arti.

   Dua label di tahap 6 dan 7 sengaja jatuh TERPISAH — digabung, label kedua
   mendarat sebelum penonton selesai membaca yang pertama.
*/
import type React from "react";

import { E, gambarGaris, getar, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  AKSEN,
  Gembok,
  I_GEMBOK_DIAMBIL,
  Jalan,
  Kotak,
  Kunci,
  Meja,
  N_TANGAN,
  P_KUNCI_MEJA,
  Sosok,
  Tangan,
  X_GEMBOK,
  X_KIRIM,
  X_TERIMA,
  Y_GEMBOK,
  Y_JALAN,
  Y_LANTAI,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "kunci-tidak-pernah-lewat";

const B_BUKAN = beat(ID, 0); // "Yang membuatnya bekerja bukan gemboknya."
const B_DIAM = beat(ID, 1); // "…kuncinya tidak ikut ke mana-mana."
const B_MEJA = beat(ID, 2); // "Dia tinggal di meja pemiliknya…"
const B_DUA = beat(ID, 3); // "Yang lewat jalan cuma dua."
const B_TERKUNCI = beat(ID, 4); // "Bahkan kamu… ikut terkunci di luar."
const B_PUBLIK = beat(ID, 5); // "…namanya kunci publik."
const B_PRIBADI = beat(ID, 6); // "Yang tinggal di mejanya, kunci pribadi."

/** Lingkaran yang mengurung meja kanan — kelilingnya dipakai `gambarGaris()`. */
const R_KURUNG = 210;

export const KunciTidakPernahLewat: React.FC = () => {
  const d = useDetik();

  const namaPudar = 1 - t(d, { mulai: B_BUKAN, durasi: 0.5, dari: 0, ke: 1 });
  const gembokRedup = t(d, { mulai: B_BUKAN + 0.2, durasi: 0.6, dari: 1, ke: 0.35 });

  const dekat = t(d, { mulai: B_DIAM, durasi: 1.0, dari: 1, ke: 1.3, ease: E.power2out });
  const kembali = t(d, { mulai: B_DUA, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });
  const skala = dekat - 0.3 * kembali;

  const kurung = gambarGaris(d, 2 * Math.PI * R_KURUNG, { mulai: B_MEJA + 0.2, durasi: 0.9 });

  /* --- tahap 4: dua benda contoh, bolak-balik pelan supaya layar tidak diam --- */
  const contoh = t(d, { mulai: B_DUA, durasi: 0.5, dari: 0, ke: 1 });
  const ayun = tPP(d, { mulai: B_DUA + 0.4, durasi: 3.4, dari: 0, ke: 260 });

  /* --- tahap 5: pengirim mencoba membuka kotaknya sendiri, gagal --- */
  const coba1 = getar(d, { mulai: B_TERKUNCI + 0.3, durasi: 0.6, jauh: 6, putaran: 3 });
  const coba2 = getar(d, { mulai: B_TERKUNCI + 1.4, durasi: 0.6, jauh: 6, putaran: 3 });

  const labelPublik = masuk(d, { mulai: B_PUBLIK + 0.15, durasi: 0.45, geser: 18 });
  const labelPribadi = masuk(d, { mulai: B_PRIBADI + 0.15, durasi: 0.45, geser: 18 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: X_TERIMA, y: Y_JALAN - 60, skala })}>
            <Jalan />
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} />
            ))}
            <Sosok x={X_TERIMA + 260} y={Y_LANTAI} skala={0.86} />

            {/* kotak terkunci di meja kiri — tutupnya digoyang, tidak terbuka */}
            <g transform={`translate(${coba1 + coba2} 0)`}>
              <Kotak x={X_KIRIM} y={Y_JALAN} gembok={gembokRedup} />
            </g>

            {/* nama dari scene lalu, memudar */}
            <text
              x={X_KIRIM}
              y={930}
              fontSize={66}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill={AKSEN}
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={namaPudar}
            >
              enkripsi
            </text>

            {/* gembok terbuka yang tersisa di tepi jalan */}
            {X_GEMBOK.map((x, i) =>
              i === I_GEMBOK_DIAMBIL ? null : (
                <Gembok key={x} x={x} y={Y_GEMBOK} skala={1.05} terbuka={1} />
              ),
            )}

            {/* kunci — TIDAK bergerak sedetik pun di scene ini */}
            <Kunci x={P_KUNCI_MEJA.x} y={P_KUNCI_MEJA.y} skala={1.1} />

            <circle
              cx={X_TERIMA}
              cy={Y_JALAN - 60}
              r={R_KURUNG}
              fill="none"
              stroke={AKSEN}
              strokeWidth={4}
              strokeDasharray={kurung.strokeDasharray}
              strokeDashoffset={kurung.strokeDashoffset}
              opacity={0.6}
            />

            {/* tahap 4: cuma dua benda yang pernah melintas */}
            <g opacity={contoh * 0.9}>
              <Gembok x={880 - ayun} y={Y_JALAN - 250} skala={1.1} terbuka={1} warna={AKSEN} />
              <Kotak x={1040 + ayun} y={Y_JALAN - 190} skala={0.5} gembok={1} />
            </g>

            <g style={{ opacity: labelPublik.opacity, transform: labelPublik.transform }}>
              <text
                x={X_GEMBOK[0] + 120}
                y={Y_GEMBOK + 110}
                fontSize={42}
                fontFamily="var(--font-display)"
                fontWeight={700}
                fill={AKSEN}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                kunci publik
              </text>
            </g>

            <g style={{ opacity: labelPribadi.opacity, transform: labelPribadi.transform }}>
              <text
                x={X_TERIMA}
                y={Y_LANTAI + 60}
                fontSize={42}
                fontFamily="var(--font-display)"
                fontWeight={700}
                fill={AKSEN}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                kunci pribadi
              </text>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
