/* T16 · scene 4 · kotak-digembok — bagian 3 [problem], 14,96 dtk
   VO:        04-kotak-digembok-vo.md
   Direction: 04-kotak-digembok-direction.md

   Scene yang MEMBERI PENONTON JAWABAN YANG SALAH, utuh dan meyakinkan. Tidak
   ada satu pun tanda bahwa ada yang keliru; keliruannya milik scene 5.

   TAHAP 4 WAJIB ADA: satu tangan menahan kotaknya lama, membolak-balik,
   menarik gemboknya. Kalau tangan cuma lewat, penonton mengira gemboknya belum
   pernah diuji — dan kegagalan di scene 5 terasa seperti tuduhan, bukan bukti.

   TIDAK ADA KUNCI DI LAYAR SAMA SEKALI. Kunci baru muncul di scene 5, dan
   kemunculannya di sana yang jadi kejutannya.
*/
import type React from "react";

import { E, getar, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Jalan,
  Kotak,
  Meja,
  N_TANGAN,
  Surat,
  Tangan,
  X_KIRIM,
  Y_JALAN,
  kamera,
  posTangan,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "kotak-digembok";

const B_SATU = beat(ID, 0); // "Yang paling masuk akal cuma satu."
const B_KUNCI = beat(ID, 1); // "Suratnya ditaruh di dalam kotak…"
const B_KURIR = beat(ID, 2); // "Kurirnya tetap membawa…"
const B_TAHAN = beat(ID, 3); // "Dia bisa memegang kotak itu seharian…"
const B_SELESAI = beat(ID, 4); // "Kelihatannya selesai."

const X_MULAI = 960;
/** Tangan yang menahan kotaknya — tangan terakhir di jalan. */
const X_TAHAN = posTangan(N_TANGAN - 1);

export const KotakDigembok: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: tutup terangkat, isinya terlihat lagi --- */
  const buka = t(d, { mulai: B_SATU + 0.2, durasi: 0.6, dari: 0, ke: 1, ease: E.power2out });
  const tutup = t(d, { mulai: B_KUNCI + 0.45, durasi: 0.4, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 2: surat masuk, lalu gembok menjepit --- */
  const suratMasuk = t(d, { mulai: B_KUNCI, durasi: 0.45, dari: 0, ke: 1, ease: E.power2in });
  const gembok = t(d, { mulai: B_KUNCI + 0.85, durasi: 0.35, dari: 0, ke: 1, ease: E.backOut(2) });
  const klik = getar(d, { mulai: B_KUNCI + 1.15, durasi: 0.35, jauh: 4, putaran: 3 });

  /* --- tahap 3: jalan menyala lagi, kotak berangkat --- */
  const terang = t(d, { mulai: B_KURIR, durasi: 0.6, dari: 0.22, ke: 1 });
  const maju = t(d, {
    mulai: B_KURIR,
    durasi: B_TAHAN - B_KURIR,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const xKotak = X_MULAI + (X_TAHAN - X_MULAI) * maju;
  const lompat = 18 * Math.abs(Math.sin(((xKotak - X_KIRIM) / 220) * Math.PI)) * (1 - maju);

  /* --- tahap 4: ditahan, dibolak-balik, tetap tidak terbuka --- */
  const goyang = tPP(d, { mulai: B_TAHAN + 0.3, durasi: 1.8, dari: 0, ke: 7 });
  const tarik = getar(d, { mulai: B_TAHAN + 2.2, durasi: 0.7, jauh: 7, putaran: 4 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({})}>
            <g opacity={terang}>
              <Jalan />
              <Meja x={X_KIRIM} />
              {Array.from({ length: N_TANGAN }, (_, i) => (
                <Tangan
                  key={i}
                  x={posTangan(i)}
                  nyala={Math.abs(xKotak - posTangan(i)) < 110 ? 1 : 0}
                />
              ))}
            </g>

            {/* surat yang turun masuk ke kotak — terlihat PENONTON, tidak pernah
                terlihat oleh yang di jalan */}
            <g opacity={(1 - suratMasuk) * buka}>
              <Surat x={X_MULAI} y={Y_JALAN - 190 + 110 * suratMasuk} skala={0.7} />
            </g>

            <Kotak
              x={xKotak + tarik}
              y={Y_JALAN - lompat}
              rot={goyang * (d > B_TAHAN ? 1 : 0)}
              buka={Math.max(0, buka - tutup)}
              gembok={gembok}
              label={0}
            />
            {/* klik gembok: getaran kecil sekali, tanpa perpindahan permanen */}
            <g transform={`translate(${klik} 0)`} />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
