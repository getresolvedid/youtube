/* T14-S2 · scene 6 · dijawab-salah — bukti 3 dari 3, 6,58 dtk
   Direction: 06-dijawab-salah-direction.md
   VO:        06-dijawab-salah-vo.md

   Yang ditukar bukan cuma bantahan, melainkan HADIAHNYA: penonton datang mencari
   kecepatan dan pulang membawa sesuatu yang lebih berguna. Ini yang dijanjikan
   scene 2.

   DUA KARTU BERDIRI BERSAMAAN, tanpa stagger. Kalimatnya perbandingan;
   menampilkannya berurutan mengubahnya jadi dua pernyataan, dan yang kedua akan
   terbaca sebagai satu-satunya yang benar.

   Keduanya memakai <Kartu> yang SAMA — bedanya cuma isinya. Dua komponen
   berbeda cepat atau lambat jadi dua gambar berbeda, dan perbandingannya
   berhenti berlaku.

   Pemblokiran tidak disebut dengan namanya dan tidak disebut siapa pelakunya.
   Yang digambar cuma mekanismenya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Bangunan,
  Kartu,
  LOKET,
  Loket,
  NOMOR_LAMA,
  POTONGAN,
  Sosok,
} from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  BILAH,
  BilahWaktu,
  Label,
  SKALA_LOKET_S2,
  SKALA_SOSOK_S2,
  SKALA_TUJUAN_S2,
  Tanda,
  VIEWBOX_S2,
  X_LOKET_S2,
  X_SOSOK_AKHIR_S2,
  X_TUJUAN_S2,
  Y_LANTAI_S2,
} from "../jalur-tanya";
import { beat } from "./timing.gen";

const ID = "dijawab-salah";

const B_LAIN = beat(ID, 0); // "Yang benar-benar berubah biasanya hal lain."
const B_BENAR = beat(ID, 1); // "Nama yang tadinya dijawab salah, sekarang dijawab benar."

const Y_JENDELA =
  Y_LANTAI_S2 + (LOKET.jendela.y + LOKET.jendela.h / 2) * SKALA_LOKET_S2;

/** Dua kartu hasil, berdampingan di tengah layar — di bawah tempat bilah waktu
 *  berdiri, supaya keduanya tidak pernah berebut baris yang sama walaupun
 *  bilahnya masih memudar. */
const Y_HASIL = 980;
const X_LAMA = 340;
const X_BARU = 740;

export const DijawabSalah: React.FC = () => {
  const d = useDetik();

  const padam = t(d, { mulai: B_LAIN, durasi: 0.45, dari: 1, ke: 0 });
  const kirim = t(d, {
    mulai: B_LAIN + 0.5,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.sineInOut,
  });
  const tanda = t(d, { mulai: B_BENAR + 0.5, durasi: 0.3, dari: 0, ke: 1 });

  /* Satu gerakan masuk untuk KEDUA kartu — bukan dua pemanggilan dengan angka
     yang kebetulan sama. */
  const naikHasil = masuk(d, {
    mulai: B_BENAR + 0.15,
    durasi: 0.55,
    geser: 36,
  });

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_BENAR ? "Yang berubah hal lain." : "Dijawab salah → dijawab benar."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX_S2}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <g opacity={padam}>
          <BilahWaktu sorotTanya={1} nyalaSisa={1} />
          <Label x={BILAH.x0} y={BILAH.y + 96} anchor="start" warna="var(--accent-ink)">
            bertanya
          </Label>
          <Label x={BILAH.x1} y={BILAH.y + 96} anchor="end">
            sisa perjalanannya
          </Label>
        </g>

        {/* dua jawaban untuk nama yang sama, berdiri BERSAMAAN */}
        {d >= B_BENAR && (
          <g style={naikHasil}>
            <Kartu x={X_LAMA} y={Y_HASIL} teks="" skala={0.62} warna="var(--ink-2)" />
            <Tanda x={X_LAMA} y={Y_HASIL} jenis="bad" skala={1.3} opacity={tanda} />
            <Label x={X_LAMA} y={Y_HASIL + 118} opacity={tanda}>
              loket lama
            </Label>

            <Kartu x={X_BARU} y={Y_HASIL} teks={NOMOR_LAMA} skala={0.62} />
            <Label
              x={X_BARU}
              y={Y_HASIL + 118}
              opacity={tanda}
              warna="var(--accent-ink)"
            >
              loket baru
            </Label>
          </g>
        )}

        <path
          d={`M90 ${Y_LANTAI_S2}H990`}
          stroke="var(--line)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <Loket
          x={X_LOKET_S2}
          y={Y_LANTAI_S2}
          skala={SKALA_LOKET_S2}
          nyala={1}
          aksen
        />
        <Sosok x={X_SOSOK_AKHIR_S2} y={Y_LANTAI_S2} skala={SKALA_SOSOK_S2} />
        <Bangunan
          x={X_TUJUAN_S2}
          y={Y_LANTAI_S2}
          skala={SKALA_TUJUAN_S2}
          papan={0}
        />

        {/* satu nama dikirim ke loket — yang ditanyakan sama, jawabannya yang beda */}
        {kirim > 0 && kirim < 1 && (
          <Kartu
            x={X_SOSOK_AKHIR_S2 + (X_LOKET_S2 - X_SOSOK_AKHIR_S2) * kirim}
            y={Y_JENDELA}
            teks={POTONGAN.join(".")}
            skala={0.45}
            opacity={1 - Math.max(0, (kirim - 0.78) / 0.22)}
          />
        )}
      </svg>
    </Scene>
  );
};
