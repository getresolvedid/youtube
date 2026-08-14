/* T16 · scene 7 · gembok-terbuka — bagian 4 [answer] → [what], 16,73 dtk
   VO:        07-gembok-terbuka-vo.md
   Direction: 07-gembok-terbuka-direction.md

   Scene yang MENAMAI subjek episode. Perpindahannya bukan dari "tidak bisa" ke
   "bisa", melainkan dari MENGIRIM KUNCI ke MEMBAGIKAN GEMBOK — dan itu terjadi
   di tahap 1, saat kuncinya berjalan MUNDUR pulang ke meja kanan.

   TIGA KEPUTUSAN:

   1. Kunci mendarat di `P_KUNCI_MEJA` dan tidak bergerak lagi — di scene ini,
      dan di scene 8, 9, 11, 16. Titiknya milik `../panggung-kiriman.tsx`.

   2. Gembok yang tersisa di tepi jalan TIDAK ikut hilang saat satu diambil.
      Justru itu isinya: mengambil satu tidak mengurangi apa pun.

   3. Tulisan teracak muncul TEPAT SEKALI di seluruh episode, di tahap 5. Ia
      diperlihatkan, tidak dijelaskan (naskah.md § Analogi utama).
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
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
  Surat,
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

const ID = "gembok-terbuka";

const B_TERNYATA = beat(ID, 0); // "Kedengarannya mustahil. Ternyata tidak."
const B_BUKAN = beat(ID, 1); // "Yang dibagikan memang bukan kuncinya."
const B_BAGI = beat(ID, 2); // "Yang dibagikan gemboknya…"
const B_AMBIL = beat(ID, 3); // "Siapa pun boleh mengambil satu."
const B_JEPIT = beat(ID, 4); // "Suratmu masuk, gemboknya dijepit…"
const B_NAMA = beat(ID, 5); // "…namanya enkripsi."

const X_KUNCI_AWAL = X_TERIMA - 150;

export const GembokTerbuka: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: kunci pulang ke meja, lalu diam untuk selamanya --- */
  const pulang = t(d, { mulai: B_TERNYATA + 0.2, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });
  const xKunci = X_KUNCI_AWAL + (P_KUNCI_MEJA.x - X_KUNCI_AWAL) * pulang;

  /* kotak kecil dari scene lalu masih di tempatnya, lalu memudar */
  const kotakLama = 1 - t(d, { mulai: B_BAGI, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 3: gembok terbuka menyebar dari meja ke tepi jalan --- */
  const sebar = (i: number) =>
    t(d, { mulai: B_BAGI + 0.1 + i * 0.06, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 4: satu diambil, melengkung ke meja kiri --- */
  const ambil = t(d, { mulai: B_AMBIL + 0.1, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 5: surat masuk, tutup menutup, gembok menjepit, tulisan teracak --- */
  const kotakBaru = t(d, { mulai: B_AMBIL, durasi: 0.5, dari: 0, ke: 1, ease: E.backOut(1.3) });
  const suratMasuk = t(d, { mulai: B_JEPIT, durasi: 0.4, dari: 0, ke: 1, ease: E.power2in });
  const tutup = t(d, { mulai: B_JEPIT + 0.4, durasi: 0.35, dari: 1, ke: 0, ease: E.power2in });
  const acak = t(d, { mulai: B_JEPIT + 0.8, durasi: 0.8, dari: 0, ke: 1 });

  /* --- tahap 6: namanya mendarat, sendirian --- */
  const nama = masuk(d, { mulai: B_NAMA + 0.12, durasi: 0.5, geser: 24 });

  const xAmbil = X_GEMBOK[I_GEMBOK_DIAMBIL];

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
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} />
            ))}
            <Sosok x={X_TERIMA + 260} y={Y_LANTAI} skala={0.86} />

            <g opacity={kotakLama}>
              <Kotak x={X_TERIMA} y={Y_JALAN} gembok={1} skala={0.42} />
            </g>

            <Kunci x={xKunci} y={P_KUNCI_MEJA.y} skala={1.1} />

            {/* gembok terbuka, tergeletak di tepi jalan — siapa pun boleh ambil */}
            {X_GEMBOK.map((x, i) => {
              const p = sebar(i);
              const diambil = i === I_GEMBOK_DIAMBIL;
              if (diambil && ambil > 0) return null;
              return (
                <g key={x} opacity={p}>
                  <Gembok
                    x={X_TERIMA + (x - X_TERIMA) * p}
                    y={Y_JALAN + (Y_GEMBOK - Y_JALAN) * p}
                    skala={1.05}
                    terbuka={1}
                  />
                </g>
              );
            })}

            {/* yang diambil: melengkung ke meja kiri lewat titik kontrol lebih tinggi */}
            {ambil > 0 && ambil < 1 && (
              <Gembok
                x={xAmbil + (X_KIRIM - xAmbil) * ambil}
                y={Y_GEMBOK + (Y_JALAN - 150 - Y_GEMBOK) * ambil - 120 * Math.sin(Math.PI * ambil)}
                skala={1.05}
                terbuka={1}
              />
            )}

            {/* kotak baru di meja kiri */}
            <g opacity={kotakBaru}>
              <g opacity={1 - suratMasuk}>
                <Surat x={X_KIRIM} y={Y_JALAN - 200 + 120 * suratMasuk} skala={0.7} />
              </g>
              <Kotak
                x={X_KIRIM}
                y={Y_JALAN}
                buka={tutup}
                gembok={ambil >= 1 ? t(d, { mulai: B_JEPIT + 0.75, durasi: 0.3, dari: 0, ke: 1, ease: E.backOut(2) }) : 0}
                acak={acak}
                bayang={acak}
              />
            </g>

            <g style={{ opacity: nama.opacity, transform: nama.transform }}>
              <text
                x={X_KIRIM}
                y={930}
                fontSize={66}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill={AKSEN}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                enkripsi
              </text>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
