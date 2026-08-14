/* T14-S1 · scene 7 · tidak-ada-yang-tahu — tutup 1 dari 3, 6,58 dtk
   Direction: 07-tidak-ada-yang-tahu-direction.md
   VO:        07-tidak-ada-yang-tahu-vo.md

   Bagian yang membuat Short ini BERDIRI SENDIRI: bukan bagaimana tangganya
   jalan, tapi apa yang dibeli dengan membacanya terbalik. Tanpa scene ini,
   Short ini cuma demo animasi.

   LOKET LAIN YANG DIAM TOTAL ADALAH BAGIAN DARI PERNYATAANNYA. Jangan
   menyalakan apa pun di sana "supaya tidak sepi" — kalau ada yang berkedip saat
   kartunya ditukar, kalimatnya terbantah di layar oleh gambarnya sendiri.

   Kamera mundurnya HANYA menyentuh grup tangga. Nama dan bilah alamat tidak
   pernah diskalakan di Short ini; itu yang menjamin frame terakhir scene 9
   identik dengan frame pertama scene 1.
*/
import type React from "react";

import { E, gambarGaris, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Kartu,
  Komputer,
  LOKET,
  Loket,
  NOMOR_BARU,
  NOMOR_LAMA,
  Sosok,
} from "../../panggung-loket";
import { TeksAtas } from "../teks-atas";
import {
  GARIS_S,
  I_PEMILIK_S,
  iPotonganUntukLoketS,
  jendelaLoketS,
  KARTU_NOMOR,
  laciLoketS,
  mundurKamera,
  SOSOK_PEMILIK,
  NamaSitusS,
  PenandaS,
  posLoketS,
  VIEWBOX,
  xPotonganS,
  Y_NAMA_BAWAH,
} from "../tangga-tegak";
import { beat } from "./timing.gen";

const ID = "tidak-ada-yang-tahu";

const B_SEMUANYA = beat(ID, 0); // "Makanya tidak ada yang harus tahu semuanya."
const B_DAFTAR = beat(ID, 1); // "Dan tidak ada daftar yang harus diperbarui."

const P0 = posLoketS(0);
const P3 = posLoketS(I_PEMILIK_S);

/** Petak putus-putus mengelilingi satu loket — satu-satunya cara menggambar
 *  "tidak terpusat" tanpa memakai kata "pusat", yang termasuk kosakata terlarang
 *  (docs/09 § Kosakata L1). */
const petak = (i: number) => {
  const p = posLoketS(i);
  const w = (LOKET.atap.w + 36) * p.skala;
  const h = (LOKET.h + LOKET.atap.tinggi + 46) * p.skala;
  return { x: p.x - w / 2, y: p.y - h + 24 * p.skala, w, h };
};

export const TidakAdaYangTahu: React.FC = () => {
  const d = useDetik();

  const padam = t(d, { mulai: B_SEMUANYA, durasi: 0.45, dari: 1, ke: 0 });
  const mundur = t(d, {
    mulai: B_SEMUANYA + 0.1,
    durasi: 0.8,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  const keluarKartu = t(d, {
    mulai: B_DAFTAR + 0.25,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.power2in,
  });
  const masukKartu = t(d, {
    mulai: B_DAFTAR + 0.4,
    durasi: 0.55,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const sedangTukar = keluarKartu > 0 && masukKartu < 1;

  const pLaci = laciLoketS(I_PEMILIK_S);
  const xKartu = KARTU_NOMOR.x;

  return (
    <Scene tengah={false}>
      <TeksAtas>
        {d < B_DAFTAR
          ? "Tidak ada yang tahu semuanya."
          : "Tidak ada daftar yang diperbarui."}
      </TeksAtas>

      <svg
        viewBox={VIEWBOX}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        {/* Frame pertama scene ini = frame terakhir scene 6, lalu memudar:
            nama, penanda, dan ketiga garisnya. Setelah ini yang dibahas
            susunannya, bukan bentuk namanya lagi. */}
        <g opacity={padam}>
          <NamaSitusS pecah={1} sorot={0} />
          <PenandaS x={xPotonganS(0)} />
          {[1, 2, 3].map((i) => {
            const j = jendelaLoketS(i);
            const xp = xPotonganS(iPotonganUntukLoketS(i));
            return (
              <path
                key={i}
                d={`M${xp} ${Y_NAMA_BAWAH}L${j.x} ${j.y}`}
                stroke={GARIS_S.warna}
                strokeWidth={GARIS_S.tebal}
                strokeLinecap="round"
                opacity={GARIS_S.opasitas}
              />
            );
          })}
        </g>

        <g transform={mundurKamera(mundur)}>
          {/* petak: tiap loket punya bagiannya sendiri, dan tidak ada satu garis
              pun yang bertemu di titik yang sama */}
          {[0, 1, 2, 3].map((i) => {
            const k = petak(i);
            const keliling = 2 * (k.w + k.h);
            return (
              <rect
                key={i}
                x={k.x}
                y={k.y}
                width={k.w}
                height={k.h}
                rx={12}
                fill="none"
                stroke="var(--ink-2)"
                strokeWidth={3}
                opacity={0.65}
                /* TIDAK putus-putus, dan itu bukan kelalaian: `gambarGaris()`
                   BEKERJA lewat strokeDasharray, jadi pola putus-putus dan
                   gerak menggambar tidak bisa hidup di satu elemen — yang
                   ditulis belakangan menimpa yang lain, diam-diam. Yang
                   dipilih gerak menggambarnya, karena "satu per satu" itulah
                   yang menunjukkan tiap loket punya bagiannya sendiri;
                   putus-putusnya cuma tekstur. Lihat -direction.md. */
                {...gambarGaris(d, keliling, {
                  mulai: B_SEMUANYA + 0.25 + i * 0.1,
                  durasi: 0.35,
                })}
              />
            );
          })}

          <Komputer x={P0.x} y={P0.y} skala={P0.skala} />

          {[1, 2, 3].map((i) => {
            const p = posLoketS(i);
            const pemilik = i === I_PEMILIK_S;
            return (
              <Loket
                key={i}
                x={p.x}
                y={p.y}
                skala={p.skala}
                nyala={1}
                laci={1}
                isi={pemilik && !sedangTukar ? 1 : 0}
                aksen={pemilik}
              />
            );
          })}

          {/* pemiliknya tetap berdiri — dialah yang menukar kartunya di beat 1 */}
          <Sosok x={SOSOK_PEMILIK.x} y={P3.y} skala={SOSOK_PEMILIK.skala} />

          {/* kartunya ditukar DI LUAR laci: di dalam laci ukurannya terlalu kecil
              untuk terbaca, dan yang harus terlihat justru bahwa nomornya
              BERGANTI. */}
          <path
            d={`M${pLaci.x + 90 * P3.skala} ${pLaci.y}H${xKartu - 100}`}
            stroke="var(--accent-ink)"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.5}
          />
          <Kartu
            x={xKartu}
            y={pLaci.y - 90 * keluarKartu}
            teks={NOMOR_LAMA}
            skala={KARTU_NOMOR.skala}
            opacity={keluarKartu > 0 ? 1 - keluarKartu : 1}
          />
          <Kartu
            x={xKartu}
            y={pLaci.y + 90 * (1 - masukKartu)}
            teks={NOMOR_BARU}
            skala={KARTU_NOMOR.skala}
            opacity={masukKartu}
          />
        </g>
      </svg>
    </Scene>
  );
};
