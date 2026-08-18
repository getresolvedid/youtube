/* T18 · scene 7 · peran-tcp — kelengkapan & kirim ulang
   VO:        07-peran-tcp-vo.md
   Direction: 07-peran-tcp-direction.md

   Scene inti kedua, dan puncak episode. Semua yang ditanam scene 6 dipakai di
   sini: nomornya, dan jalurnya yang tidak sama.

   TIGA KEPUTUSAN:

   1. Potongan 02 MEMUDAR — tidak meledak, tidak pecah, tidak bergetar. Ledakan
      terbaca sebagai kerusakan luar biasa; hilangnya potongan itu peristiwa
      biasa, dan seluruh scene ini soal betapa biasanya ia sampai-sampai ada
      mekanisme tetap untuk itu.

   2. Yang bekerja adalah LUBANGNYA, bukan tanda tanyanya. Baris 02 sengaja
      renggang dari tetangganya supaya mata menemukan lubangnya sendiri sebelum
      VO menyebutkannya. Kalau keempat baris rapat, "?" cuma jadi hiasan.

   3. Permintaan balik adalah satu-satunya gerakan KANAN → KIRI di episode ini
      selain jawaban server di scene 11. Arah itu miliknya.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Centang,
  JALUR_Y,
  Jalur,
  Paket,
  Server,
  Simpul,
  Tanya,
  X_KANAN,
  X_KIRI,
  X_SIMPUL,
  Y_LANTAI,
} from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "peran-tcp";

const B_PERAN = beat(ID, 0); // "Di sinilah TCP berperan."
const B_ANDAL = beat(ID, 1); // "TCP, atau Transmission Control Protocol…"
const B_LENGKAP = beat(ID, 2); // "TCP dapat memastikan data diterima dengan lengkap…"
const B_ULANG = beat(ID, 3); // "Jika ada bagian data yang hilang…"

/** Jalur tiap potongan — MENGIKAT ke scene 6. 02 sendirian di jalur atas. */
const POTONGAN = [
  { nomor: 1, jalur: 1, tiba: 0.0 },
  { nomor: 2, jalur: 0, tiba: 0.5 },
  { nomor: 3, jalur: 2, tiba: 0.9 },
  { nomor: 4, jalur: 1, tiba: 1.4 },
] as const;

const X_PAPAN = 1500;
const Y_PAPAN = 300;
/** Jarak antar-baris papan, dan tambahan renggang untuk baris yang berlubang. */
const BARIS_H = 78;
const RENGGANG = 30;

/** Tempat potongan yang sudah tiba BERLABUH — tepat di sebelah kiri barisnya di
 *  papan. Potongan yang lenyap begitu sampai meninggalkan dua pertiga layar
 *  kosong selama sisa scene, dan memasangkan tiap potongan dengan barisnya
 *  justru yang membuat papan itu terbaca sebagai catatan tentang benda yang
 *  barusan lewat — bukan sebagai tabel yang berdiri sendiri. */
const X_LABUH = 1230;

export const PeranTcp: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: potongan tiba; 02 memudar di tengah jalan --- */
  const jalan = (i: number) =>
    t(d, {
      mulai: B_PERAN + (POTONGAN[i]?.tiba ?? 0),
      durasi: 2.2,
      dari: 0,
      ke: 1,
      ease: E.power1out,
    });

  /* 02 tidak pernah sampai. Memudar saja — tanpa getar, tanpa skala. */
  const hilang = t(d, { mulai: B_ANDAL + 0.3, durasi: 0.9, dari: 1, ke: 0, ease: E.power1in });
  const jalurRedup = t(d, { mulai: B_ANDAL + 0.5, durasi: 0.7, dari: 0.6, ke: 0.15 });

  /* --- tahap 3: papan penerima, lubangnya terlihat sebagai JARAK --- */
  const papan = (i: number) => masuk(d, { mulai: B_LENGKAP + 0.2, urutan: i, jeda: 0.1, geser: 14 });

  /* --- tahap 4: permintaan balik, kirim ulang, lalu merapat --- */
  const minta = t(d, { mulai: B_ULANG + 0.4, durasi: 1.3, dari: 0, ke: 1, ease: E.power1out });
  const ulang = t(d, { mulai: B_ULANG + 1.8, durasi: 1.9, dari: 0, ke: 1, ease: E.power1out });
  const lengkap = t(d, { mulai: B_ULANG + 3.6, durasi: 0.5, dari: 0, ke: 1 });
  const rapat = t(d, { mulai: B_ULANG + 4.1, durasi: 0.6, dari: 0, ke: 1 });

  /** y baris papan ke-i. Baris 02 ke bawah digeser RENGGANG sampai ia lengkap. */
  const yBaris = (i: number) =>
    Y_PAPAN + i * BARIS_H + (i >= 1 ? RENGGANG * (1 - rapat) : 0);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {JALUR_Y.map((y, i) => (
            <Jalur key={y} y={y} ke={X_LABUH - 90} nyala={i === 0 ? jalurRedup : 0.6} />
          ))}
          {/* Simpul hanya sepanjang jalur yang benar-benar digambar. Simpul di
              luar ujung jalur akan melayang, dan yang paling kanan menabrak
              potongan yang sudah berlabuh. */}
          {JALUR_Y.map((y) =>
            X_SIMPUL.filter((x) => x < X_LABUH - 120).map((x) => (
              <Simpul key={`${x}-${y}`} x={x} y={y} nyala={0.25} />
            )),
          )}

          {/* Tempat 02 lenyap — penanda tipis yang tinggal di jalur atas sampai
              ia dikirim ulang. Tanpa ini, kehilangannya cuma peristiwa sesaat
              yang lewat begitu saja. */}
          <g opacity={hilang < 0.5 && ulang < 0.9 ? 1 - hilang * 2 : 0}>
            <circle
              cx={960}
              cy={JALUR_Y[0]}
              r={26}
              fill="none"
              stroke="var(--bad)"
              strokeWidth={3}
              strokeDasharray="7 7"
            />
          </g>

          {/* Panggungnya identik dengan scene 6 — tujuan di kanan TIDAK
              bergeser satu piksel pun. */}
          <Server x={X_KANAN} y={Y_LANTAI} skala={0.7} nyala={lengkap} />

          {/* --- potongan yang berjalan, lalu BERLABUH di sebelah barisnya --- */}
          {POTONGAN.map((p, i) => {
            const u = jalan(i);
            const yJalur = JALUR_Y[p.jalur] ?? JALUR_Y[1] ?? 560;
            /* Seperempat terakhir perjalanan dipakai untuk berbelok ke barisnya
               di papan — bukan untuk terus lurus lalu lenyap. */
            const belok = Math.min(1, Math.max(0, (u - 0.75) * 4));
            const x = X_KIRI + (X_LABUH - X_KIRI) * u;
            const y = yJalur + (yBaris(i) - yJalur) * belok;

            if (p.nomor === 2) {
              /* 02 tidak pernah sampai: ia berhenti di tengah dan memudar. */
              return (
                <Paket
                  key={p.nomor}
                  x={X_KIRI + (960 - X_KIRI) * Math.min(u, 1)}
                  y={yJalur}
                  nomor={2}
                  skala={0.92}
                  opacity={hilang}
                />
              );
            }
            return (
              <Paket key={p.nomor} x={x} y={y} nomor={p.nomor} skala={0.92} warna={belok > 0.9 ? "ok" : "biasa"} />
            );
          })}

          {/* --- tahap 4: permintaan BALIK ke kiri. Arah ini miliknya. --- */}
          {minta > 0 && minta < 1 && (
            <g>
              <circle
                cx={X_PAPAN - 60 - (X_PAPAN - 60 - X_KIRI) * minta}
                cy={JALUR_Y[0]}
                r={14}
                fill="var(--accent)"
              />
              <text
                x={X_PAPAN - 60 - (X_PAPAN - 60 - X_KIRI) * minta}
                y={JALUR_Y[0] - 34}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={20}
                fill="var(--accent)"
              >
                REQUEST 02
              </text>
            </g>
          )}

          {/* --- kirim ulang: 02 lewat jalur atas yang sama, lalu berlabuh --- */}
          {ulang > 0 && (
            <Paket
              x={X_KIRI + (X_LABUH - X_KIRI) * ulang}
              y={
                (JALUR_Y[0] ?? 430) +
                (yBaris(1) - (JALUR_Y[0] ?? 430)) * Math.min(1, Math.max(0, (ulang - 0.75) * 4))
              }
              nomor={2}
              warna={ulang > 0.95 ? "ok" : "ulang"}
              skala={0.92}
            />
          )}

          {/* --- papan penerima --- */}
          <g>
            {POTONGAN.map((p, i) => {
              const m = papan(i);
              const y = yBaris(i);
              const sudah = p.nomor === 2 ? lengkap > 0.5 : true;
              return (
                <g key={p.nomor} style={{ opacity: m.opacity, transform: m.transform }}>
                  <rect
                    x={X_PAPAN - 20}
                    y={y - 30}
                    width={210}
                    height={60}
                    rx={10}
                    fill="var(--bg-elev)"
                    stroke={sudah ? "var(--ok)" : "var(--bad)"}
                    strokeWidth={3}
                  />
                  <text
                    x={X_PAPAN + 30}
                    y={y + 12}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={32}
                    fontWeight={700}
                    fill="var(--ink-0)"
                  >
                    {String(p.nomor).padStart(2, "0")}
                  </text>
                  {sudah ? (
                    <Centang x={X_PAPAN + 130} y={y} skala={1.1} />
                  ) : (
                    <Tanya x={X_PAPAN + 130} y={y} />
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </Scene>
  );
};
