/* T17 (provisional) · scene 7 · terkunci-di-jalan — bagian 5 [why]
   VO:        07-terkunci-di-jalan-vo.md
   Direction: 07-terkunci-di-jalan-direction.md

   SCENE TERPENTING DI EPISODE INI, dan ia bekerja tanpa menjelaskan apa pun.
   Yang mengajarkan bukan kalimat VO-nya, melainkan fakta bahwa penonton sudah
   pernah melihat frame ini — dengan isi yang berbeda.

   TIDAK ADA SATU KOORDINAT PUN YANG DITULIS DI BERKAS INI. Jaringan, letak
   simpul, tempat berdiri yang mengamati, ukuran layarnya, dan skala push-in-nya
   semuanya diambil dari ../panggung-kiriman.tsx dan 05-bisa-dilihat.tsx.
   Perbedaan kecil yang tidak disengaja akan terbaca penonton sebagai perubahan
   yang berarti — dan yang mereka bandingkan bukan lagi bentuk paketnya.

   `terkunci` DIPATOK 1 sepanjang scene, tanpa tween: paketnya sudah terkunci
   sebelum scene ini mulai, dan menganimasikannya lagi di sini mengulang temuan
   scene 6.

   DIA TIDAK PERGI DARI FRAME. Dia tetap di sana, tetap bisa melihat paketnya
   lewat. Enkripsi tidak mengusirnya — itu titik yang paling sering salah
   dipahami, dan gambar yang mengusirnya akan mengajarkannya.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  HP_KANAN,
  HP_KIRI,
  JALUR,
  Hp,
  Jaringan,
  MONITOR,
  Monitor,
  PENGAMAT,
  Paket,
  RAPAT_MONITOR,
  SANDI_PANJANG,
  Sosok,
  TUMPU_MONITOR,
  kameraKe,
  nyalaSimpul,
} from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "terkunci-di-jalan";

const B_KIRIM = beat(ID, 0); // "Sekarang, data tersebut dikirim… sudah terenkripsi."
const B_LIHAT = beat(ID, 1); // "Jika ada pihak lain yang melihatnya…"
const B_SAMPAI = beat(ID, 2); // "Data kemudian sampai ke perangkat penerima."

export const TerkunciDiJalan: React.FC = () => {
  const d = useDetik();

  /* Paket menyusuri jalur, lalu MASUK ke HP penerima di tahap 3. */
  const maju = t(d, {
    mulai: 0.3,
    durasi: B_SAMPAI + 2.2,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });
  const xPaket = HP_KIRI.x + HP_KIRI.w + (HP_KANAN.x - (HP_KIRI.x + HP_KIRI.w)) * maju;

  /* Push-in ke layar yang mengamati — nilai dan ease-nya sama persis dengan
     scene 5. Yang berbeda cuma kapan ia mulai, karena baris VO-nya berbeda
     panjang. */
  const rapat = t(d, {
    mulai: B_LIHAT,
    durasi: 1.6,
    dari: 1,
    ke: RAPAT_MONITOR,
    ease: E.expoOut,
  });
  const mundur = t(d, {
    mulai: B_SAMPAI,
    durasi: 1.4,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const skala = rapat + (1 - rapat) * mundur;

  /* Reaksinya ditahan kecil: bahu turun sedikit, badannya berputar sedikit.
     Tidak ada getar, tanda seru, atau perubahan warna. */
  const bingung = t(d, { mulai: B_LIHAT + 1.6, durasi: 0.9, dari: 0, ke: 1 });

  /* Paket MASUK ke HP: opasitasnya turun sementara layar HP menyala, di rentang
     yang sama — ia masuk, bukan menghilang lalu HP-nya menyala. */
  const masukHp = t(d, {
    mulai: B_SAMPAI + 1.4,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kameraKe(skala, TUMPU_MONITOR.cx, TUMPU_MONITOR.cy, RAPAT_MONITOR)}>
            <Jaringan luas={1} nyala={nyalaSimpul(xPaket)} />

            <Hp {...HP_KIRI} nyala={0.6} />
            <Hp {...HP_KANAN} nyala={0.6 + 0.4 * masukHp} />

            <Paket x={xPaket} y={JALUR.y} terkunci={1} opacity={1 - masukHp} />

            <g>
              <g
                transform={`rotate(${8 - 5 * bingung} ${PENGAMAT.x} ${
                  PENGAMAT.alas - 120
                })`}
              >
                <Sosok x={PENGAMAT.x} y={PENGAMAT.alas + 5 * bingung} skala={0.62} />
              </g>

              <Monitor {...MONITOR} nyala={0.8}>
                <text
                  x={MONITOR.x + MONITOR.w / 2}
                  y={MONITOR.y + MONITOR.h / 2}
                  fontSize={22}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill="var(--accent-ink)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  letterSpacing={2}
                >
                  {SANDI_PANJANG}
                </text>
              </Monitor>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
