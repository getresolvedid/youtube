/* T18 · scene 4 · analogi-paket — analogi kurir
   VO:        04-analogi-paket-vo.md
   Direction: 04-analogi-paket-direction.md

   Scene yang memindahkan episode dari abstrak ke benda. Puncaknya tahap 4:
   match cut dari dunia fisik ke jaringan.

   DUA KEPUTUSAN:

   1. Kotak fisik dan potongan data menempati X dan Y yang SAMA PERSIS. Dua titik
      berdekatan masih terbaca sebagai dua benda; satu titik yang isinya berubah
      terbaca sebagai satu benda yang berubah.

   2. Persimpangan menyala menurut POSISI kendaraan, bukan menurut detik
      terpisah. Kalau durasi VO berubah, nyalanya ikut sendiri — detik yang
      diketik tangan akan meleset tanpa satu pun error.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  JALUR_UTAMA,
  Jalur,
  Kendaraan,
  Kotak,
  Label,
  Paket,
  Simpul,
  X_KANAN,
  X_KIRI,
  X_SIMPUL,
  Y_LANTAI,
} from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "analogi-paket";

const B_KIRIM = beat(ID, 0); // "Bayangkan kamu ingin mengirim sebuah paket…"
const B_ALAMAT = beat(ID, 1); // "Kamu membutuhkan alamat tujuan…"
const B_SISTEM = beat(ID, 2); // "Setelah itu, kamu membutuhkan sistem pengiriman…"
const B_JARINGAN = beat(ID, 3); // "Dalam jaringan komputer, konsepnya…"
const B_BAGI = beat(ID, 4); // "IP menentukan ke mana data harus pergi…"

/** Titik yang dipakai BERSAMA oleh kotak fisik dan potongan data. Satu
 *  konstanta, bukan dua angka yang kebetulan sama. */
const X_KOTAK = 960;

export const AnalogiPaket: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: buku menyusut jadi kotak. BERUBAH, bukan datang baru. --- */
  const jadiKotak = t(d, { mulai: B_KIRIM, durasi: 0.8, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 2: label ditempel, dua tahap --- */
  const labelDari = masuk(d, { mulai: B_ALAMAT + 0.15, durasi: 0.4, geser: 10 });
  const labelKe = masuk(d, { mulai: B_ALAMAT + 0.75, durasi: 0.4, geser: 10 });

  /* --- tahap 3: kendaraan masuk, memuat, lalu berangkat --- */
  const datang = t(d, { mulai: B_SISTEM, durasi: 1.0, dari: 0, ke: 1, ease: E.power1out });
  const muat = t(d, { mulai: B_SISTEM + 1.0, durasi: 0.5, dari: 0, ke: 1 });
  const berangkat = t(d, { mulai: B_SISTEM + 1.6, durasi: 2.2, dari: 0, ke: 1, ease: E.power2in });

  const xKendaraan = X_KIRI - 320 + (X_KOTAK - 220 - (X_KIRI - 320)) * datang
    + (X_KANAN + 300 - (X_KOTAK - 220)) * berangkat;

  /* --- tahap 4: match cut. Opacity silang di titik yang sama, tanpa geser. --- */
  const digital = t(d, { mulai: B_JARINGAN, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 5: dua label pembagi tugas --- */
  const kiri = masuk(d, { mulai: B_BAGI + 0.2, durasi: 0.45, geser: 16 });
  const kanan = masuk(d, { mulai: B_BAGI + 1.6, durasi: 0.45, geser: 16 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* Jalan = jalur jaringan. Yang berubah di tahap 4 cuma warnanya —
              garisnya tidak pernah digambar ulang. */}
          <Jalur y={JALUR_UTAMA + 120} dari={X_KIRI - 200} ke={X_KANAN + 200} nyala={digital} />

          {/* Persimpangan menyala menurut POSISI kendaraan. */}
          {X_SIMPUL.map((x) => (
            <Simpul
              key={x}
              x={x}
              y={JALUR_UTAMA + 120}
              nyala={Math.max(
                digital * 0.5,
                xKendaraan > x - 60 && xKendaraan < x + 200 ? 1 : 0,
              )}
            />
          ))}

          {/* --- kotak fisik, sampai match cut --- */}
          <g opacity={1 - digital}>
            <Kotak
              x={muat > 0 ? X_KOTAK - 220 * muat + (xKendaraan - (X_KOTAK - 220)) * muat : X_KOTAK}
              y={JALUR_UTAMA}
              skala={0.55 + 0.45 * jadiKotak - 0.1 * muat}
              opacity={jadiKotak}
              dari={labelDari.opacity > 0.1 ? "FROM: A" : undefined}
              ke={labelKe.opacity > 0.1 ? "TO: B" : undefined}
            />
          </g>

          {/* --- kendaraan --- */}
          <g opacity={datang * (1 - digital)}>
            <Kendaraan x={xKendaraan} y={Y_LANTAI} skala={0.72} />
          </g>

          {/* --- tahap 4: potongan data, TITIK YANG SAMA PERSIS --- */}
          <Paket x={X_KOTAK} y={JALUR_UTAMA} opacity={digital} label="TO: B" />

          {/* --- tahap 5 --- */}
          <g style={{ opacity: kiri.opacity, transform: kiri.transform }}>
            <Label x={560} y={250} teks="IP" sub="WHERE SHOULD IT GO?" />
          </g>
          <g style={{ opacity: kanan.opacity, transform: kanan.transform }}>
            <Label x={1360} y={250} teks="TCP" sub="DID IT ARRIVE CORRECTLY?" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
