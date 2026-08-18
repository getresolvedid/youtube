/* T17-S3 · scene 6 · gimana-bacanya — penutup + jembatan ke Short 4
   VO:        6-gimana-bacanya-vo.md
   Direction: 6-gimana-bacanya-direction.md

   ISINYA MASIH LAMBANG SAAT SAMPAI, dan itu seluruh isi scene ini. Kalau ia
   sudah terbaca begitu mendarat, Short 4 kehilangan alasannya ada.

   Tidak ada kunci di frame ini — kunci milik Short 4 sepenuhnya. Bocorannya di
   sini membuat pertanyaan penutupnya terasa retoris.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import { Hp, Paket, SANDI_PANJANG, layarHp } from "../../panggung-kiriman";
import {
  HP_PENERIMA,
  JALUR,
  JaringanTegak,
  TeksLayar,
  W,
  nyalaSimpul,
} from "../panggung-short";
import { beat } from "./timing.gen";

const ID = "gimana-bacanya";
const B_TANYA = beat(ID, 0);

const L = layarHp(HP_PENERIMA.x, HP_PENERIMA.y, HP_PENERIMA.w, HP_PENERIMA.h);

export const GimanaBacanya: React.FC = () => {
  const d = useDetik();

  const maju = t(d, { mulai: 0, durasi: 1.4, dari: 0, ke: 1, ease: E.power1out });
  const yPaket = JALUR.bawah + (HP_PENERIMA.y + 60 - JALUR.bawah) * maju;

  const masukHp = t(d, {
    mulai: 1.1,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const lambang = t(d, { mulai: 1.7, durasi: 0.5, dari: 0, ke: 1 });

  /* Gambarnya yang menahan napas, bukan tanda baca di naskah. */
  const tanya = masuk(d, { mulai: B_TANYA + 2.4, durasi: 0.6, geser: 26 });
  const cta = t(d, { mulai: B_TANYA + 3.1, durasi: 0.5, dari: 0, ke: 0.75 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox={`0 0 ${W} 1920`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringanTegak luas={1} nyala={nyalaSimpul(yPaket)} />

          <Hp {...HP_PENERIMA} nyala={0.4 + 0.6 * masukHp}>
            <text
              x={L.x + L.w / 2}
              y={L.y + 190}
              fontSize={30}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--accent-ink)"
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing={2}
              opacity={lambang}
            >
              {SANDI_PANJANG}
            </text>
          </Hp>

          <Paket x={JALUR.x} y={yPaket} terkunci={1} skala={1.4} opacity={1 - masukHp} />

          <TeksLayar
            baris={["BAGAIMANA CARA", "MEMBACANYA?"]}
            y={230}
            opacity={tanya.opacity}
            transform={tanya.transform}
          />

          <text
            x={W / 2}
            y={1745}
            fontSize={34}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill="var(--ink-1)"
            textAnchor="middle"
            letterSpacing={2}
            opacity={cta}
          >
            Lanjut ke Short 4
          </text>
        </svg>
      </div>
    </Scene>
  );
};
