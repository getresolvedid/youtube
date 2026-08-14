/* T16 · scene 11 · gembok-siapa — bagian 6 [explaining], 28,19 dtk
   VO:        11-gembok-siapa-vo.md
   Direction: 11-gembok-siapa-direction.md

   TITIK PUTUS ANALOGI NOMOR SATU — yang terbesar. Sampai scene 10 penonton punya
   gambaran yang rapi dan salah di satu tempat: ia mengira gembok terbuka
   membuktikan pemiliknya.

   TAHAP 5 HARUS TERASA TENANG, bukan seperti perampokan. Tidak ada yang
   dipatahkan, tidak ada yang gagal: kotaknya terkunci dengan benar dan terbuka
   dengan benar, cuma di meja yang salah. Digambar sebagai serangan, penonton
   menyimpulkan gemboknya jebol — kebalikan dari isi scene ini. Karena itu
   `getar()` TIDAK dipakai di sini sama sekali.

   Sosok kedua tidak diberi tanda jahat: tanpa tudung, tanpa warna bahaya,
   ukurannya sama dengan penerima asli. Justru kemiripannya yang jadi soal.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Gembok,
  I_GEMBOK_DIAMBIL,
  Jalan,
  Kotak,
  Kunci,
  Meja,
  N_TANGAN,
  P_KUNCI_MEJA,
  Sosok,
  SuratPengenal,
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

const ID = "gembok-siapa";

const B_TANYA = beat(ID, 0); // "Tapi ada satu pertanyaan yang belum pernah ditanyakan."
const B_DARIMANA = beat(ID, 1); // "Gembok terbuka tadi, kamu ambil dari mana?"
const B_POLOS = beat(ID, 2); // "…tidak ada nama di badannya."
const B_SIAPAPUN = beat(ID, 3); // "Siapa pun bisa menaruh gemboknya sendiri…"
const B_RAPAT = beat(ID, 4); // "Kotakmu akan terkunci rapat. Rapat untuk dia."
const B_SENDIRI = beat(ID, 5); // "Makanya gembok tidak pernah datang sendirian."
const B_PENGENAL = beat(ID, 6); // "Dia datang bersama surat pengenal…"

/** Meja sosok kedua — di sisi jalan, bukan di ujungnya. Ia tidak pernah jadi
 *  tujuan; kotaknya yang belok ke sana. */
const X_PALSU = 760;
const Y_PALSU = Y_LANTAI - 10;

export const GembokSiapa: React.FC = () => {
  const d = useDetik();

  const arusPadam = 1 - t(d, { mulai: B_TANYA, durasi: 0.6, dari: 0, ke: 1 });

  /* --- tahap 1: gembok kembali ke tengah, sendirian, besar --- */
  const tengah = t(d, { mulai: B_TANYA + 0.2, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const xGembok = X_GEMBOK[0] + (960 - X_GEMBOK[0]) * tengah;
  const yGembok = Y_GEMBOK - 260 * tengah;

  /* --- tahap 2: jejaknya ditelusuri mundur ke tumpukan --- */
  const telusur = gambarGaris(d, 700, { mulai: B_DARIMANA + 0.2, durasi: 0.8 });

  /* --- tahap 3: kamera masuk ke badan gembok yang polos --- */
  const dekat = t(d, { mulai: B_POLOS, durasi: 1.0, dari: 1, ke: 2.4, ease: E.power2out });
  const jauh = t(d, { mulai: B_SIAPAPUN, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });
  const kembali = t(d, { mulai: B_SENDIRI, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });
  const skala = dekat - 1.4 * jauh;

  /* --- tahap 4: sosok kedua menaruh gemboknya sendiri, identik --- */
  const palsu = masuk(d, { mulai: B_SIAPAPUN + 0.2, durasi: 0.5, geser: 22 });
  const taruh = t(d, { mulai: B_SIAPAPUN + 0.8, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 5: kotak berjalan, lalu BELOK ke meja yang salah --- */
  const jalanKotak = t(d, { mulai: B_RAPAT, durasi: 1.2, dari: 0, ke: 1, ease: E.linear });
  const belok = t(d, { mulai: B_RAPAT + 1.2, durasi: 0.6, dari: 0, ke: 1, ease: E.power2in });
  const bukaSalah = t(d, { mulai: B_RAPAT + 1.9, durasi: 0.7, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 7: surat pengenal menempel, tanda tangannya menyala terakhir --- */
  const pengenal = masuk(d, { mulai: B_PENGENAL + 0.15, durasi: 0.5, geser: 20 });
  const tanda = t(d, { mulai: B_PENGENAL + 0.9, durasi: 0.6, dari: 0, ke: 1 });

  const xKotak = X_KIRIM + (X_PALSU - X_KIRIM) * jalanKotak;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ x: 960, y: Y_JALAN - 240, skala: Math.max(1, skala) })}>
            <Jalan />
            <Meja x={X_KIRIM} />
            <Meja x={X_TERIMA} />
            {Array.from({ length: N_TANGAN }, (_, i) => (
              <Tangan key={i} x={posTangan(i)} />
            ))}
            <Sosok x={X_TERIMA + 260} y={Y_LANTAI} skala={0.86} opacity={arusPadam * 0.6 + 0.4} />
            <Kunci x={P_KUNCI_MEJA.x} y={P_KUNCI_MEJA.y} skala={1.1} opacity={0.5} />

            {/* tumpukan gembok — yang ITU JUGA, dari scene 7 */}
            {X_GEMBOK.map((x, i) =>
              i === I_GEMBOK_DIAMBIL || i === 0 ? null : (
                <Gembok key={x} x={x} y={Y_GEMBOK} skala={1.05} terbuka={1} opacity={0.7} />
              ),
            )}

            {/* jejak: dari gembok di tengah, mundur ke tumpukan tempat ia diambil */}
            <path
              d={`M${xGembok} ${yGembok + 40}L${X_GEMBOK[0]} ${Y_GEMBOK}`}
              stroke="var(--ink-1)"
              strokeWidth={4}
              strokeDasharray={telusur.strokeDasharray}
              strokeDashoffset={telusur.strokeDashoffset}
              opacity={0.7 * (1 - kembali)}
            />

            {/* gembok yang dibicarakan — badannya polos, tidak ada nama di sana */}
            <g transform={`translate(${xGembok} ${yGembok}) scale(${1 + 1.6 * tengah})`}>
              <Gembok x={0} y={0} terbuka={1} />
            </g>

            {/* surat pengenal yang akhirnya menempel di sisinya */}
            <g style={{ opacity: pengenal.opacity, transform: pengenal.transform }}>
              <SuratPengenal x={xGembok + 210} y={yGembok} skala={0.9} tanda={tanda} />
            </g>

            {/* sosok kedua menaruh gembok yang bentuknya identik */}
            <g style={{ opacity: palsu.opacity, transform: palsu.transform }}>
              <Sosok x={X_PALSU} y={Y_PALSU} skala={0.8} hadap={-1} />
              <Gembok
                x={X_PALSU + (X_GEMBOK[4] - X_PALSU) * taruh}
                y={Y_PALSU - 150 + (Y_GEMBOK - (Y_PALSU - 150)) * taruh}
                skala={1.05}
                terbuka={1}
              />
            </g>

            {/* kotakmu: terkunci dengan benar, terbuka dengan benar, di meja yang salah */}
            {jalanKotak > 0 && (
              <Kotak
                x={xKotak}
                y={Y_JALAN + (Y_PALSU - 120 - Y_JALAN) * belok}
                skala={0.62}
                gembok={1 - bukaSalah}
                buka={bukaSalah}
              />
            )}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
