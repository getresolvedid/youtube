/* T01-S1 · scene 6 · gudang — beat payoff 3 dari 3, 3,4 dtk
   Direction: 06-gudang-direction.md
   VO:        06-gudang-vo.md

   Puncak Short ini. Satu keputusan memikul seluruh scene: JAM DIGANTI KALENDER,
   bukan diputar lebih banyak. Tiga bulan di muka jam sama saja dengan satu
   putaran lagi — dan seluruh isi Short ini adalah selisih itu.

   Jamnya tidak dihapus, cuma mengecil ke sudut: "satu menit" tadi harus tetap
   terlihat, kalau tidak, pembandingnya ikut hilang dari ingatan penonton.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Chip,
  Jam,
  Kalender,
  KolomAngka,
  TeksAtas,
  TigaTempat,
} from "../tiga-tempat";
import { beat } from "./timing.gen";

const ID = "gudang";

const T_GANTI = beat(ID, 0) + 0.1;
/** Tiga balikan — sebanyak bulan yang diucapkan VO. Lembar keempat terbaca
 *  sebagai "berbulan-bulan, entah berapa" dan justru menghapus angkanya. */
const T_LEMBAR_1 = T_GANTI + 0.4;
const T_LEMBAR_2 = T_LEMBAR_1 + 0.34;
const T_LEMBAR_3 = T_LEMBAR_2 + 0.42;

export const Gudang: React.FC = () => {
  const d = useDetik();

  const susut = t(d, { mulai: T_GANTI, durasi: 0.5, dari: 0, ke: 1, ease: E.power2out });

  /* Lembar pecahan, dijumlahkan bukan dicabangkan — supaya tetap fungsi murni
     dari frame walau kedua balikan saling berdekatan. Balikan kedua sengaja
     lebih lambat: berhentinya harus terasa mendarat, bukan terpotong. */
  const lembar =
    t(d, { mulai: T_LEMBAR_1, durasi: 0.3, dari: 0, ke: 1, ease: E.power3out }) +
    t(d, { mulai: T_LEMBAR_2, durasi: 0.3, dari: 0, ke: 1, ease: E.power3out }) +
    t(d, { mulai: T_LEMBAR_3, durasi: 0.46, dari: 0, ke: 1, ease: E.power3out });

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        sampai ke <span style={{ color: "var(--accent-ink)" }}>gudang</span>
      </TeksAtas>

      <Chip redup />
      <TigaTempat terang={(x) => x === "lemari"} />

      {/* jam menyingkir ke kanan titik alat ukur, tidak dihapus */}
      <Jam
        sudut={366}
        skala={1 - 0.4 * susut}
        opacity={1 - 0.2 * susut}
        dx={200 * susut}
        dy={40 * susut}
      />

      <Kalender lembar={lembar} opacity={susut} />

      <KolomAngka d={d} mulai={[-1, -1, T_LEMBAR_3 + 0.32]} />
    </Scene>
  );
};
