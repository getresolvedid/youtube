/* T18 · scene 9 · tcp-plus-ip — pembagian tugas
   VO:        09-tcp-plus-ip-vo.md
   Direction: 09-tcp-plus-ip-direction.md

   Scene rangkuman, dan SATU-SATUNYA yang simetris. Sisa episode selalu punya
   arah kiri → kanan; di sini arah itu sengaja dibekukan supaya dua tugasnya
   terbaca sejajar, bukan berurutan.

   DUA KEPUTUSAN:

   1. Gerakan di kedua sisi WAJIB daur ulang — memilih arah dari scene 5,
      mengurutkan dari scene 7 dan 8. Rangkuman yang memperkenalkan gerakan baru
      bukan rangkuman: penonton menonton yang baru alih-alih mengingat yang lama.

   2. Cabang yang TIDAK dipilih tetap terlihat, cuma redup. Kalau ia hilang,
      yang terbaca "cuma ada satu jalan" — dan itu membatalkan scene 6.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Centang, JaringLatar, Label, Paket, Simpul } from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "tcp-plus-ip";

const B_BEDA = beat(ID, 0); // "Jadi, TCP dan IP memiliki tugas yang berbeda."
const B_IP = beat(ID, 1); // "IP berfokus pada alamat…"
const B_TCP = beat(ID, 2); // "Sedangkan TCP berfokus…"
const B_BERSAMA = beat(ID, 3); // "Keduanya bekerja bersama…"

const X_KI = 500;
const X_KA = 1420;

/** Tiga cabang di sisi kiri. Indeks 1 yang dipilih; dua lainnya tetap terlihat. */
const CABANG = [-150, 0, 150] as const;
const DIPILIH = 1;

/** Empat potongan sisi kanan, berbaris TIDAK urut lalu diurutkan. */
const ACAK = [3, 1, 4, 2] as const;

export const TcpPlusIp: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: garis belah --- */
  const garis = gambarGaris(d, 620, { mulai: B_BEDA + 0.1, durasi: 0.8 });

  /* --- tahap 2: sisi kiri --- */
  const kiri = masuk(d, { mulai: B_IP, durasi: 0.5, geser: 18 });
  const pilih = t(d, { mulai: B_IP + 1.0, durasi: 0.6, dari: 0, ke: 1 });
  const jalanKiri = t(d, { mulai: B_IP + 1.4, durasi: 1.2, dari: 0, ke: 1, ease: E.power1out });

  /* --- tahap 3: sisi kanan --- */
  const kanan = masuk(d, { mulai: B_TCP, durasi: 0.5, geser: 18 });
  const urut = t(d, { mulai: B_TCP + 1.2, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });
  const centang = t(d, { mulai: B_TCP + 2.1, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 4: menyatu --- */
  const satu = t(d, { mulai: B_BERSAMA + 0.3, durasi: 1.0, dari: 0, ke: 1, ease: E.power2out });
  const gabung = masuk(d, { mulai: B_BERSAMA + 1.2, durasi: 0.6, geser: 18 });
  const jaring = t(d, { mulai: B_BERSAMA + 1.2, durasi: 1.6, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringLatar maju={jaring} opacity={0.5 * jaring} />

          {/* --- garis pemisah, hilang di tahap 4 --- */}
          <line
            x1={960}
            y1={230}
            x2={960}
            y2={850}
            stroke="var(--line)"
            strokeWidth={3}
            opacity={1 - satu}
            {...garis}
          />

          {/* ================= sisi kiri: alamat & jalur ================= */}
          <g style={{ opacity: kiri.opacity * (1 - satu * 0.35), transform: kiri.transform }}>
            <g opacity={1 - satu}>
              {/* tiga cabang; yang tidak dipilih TETAP terlihat */}
              {CABANG.map((dy, i) => (
                <line
                  key={dy}
                  x1={X_KI - 220}
                  y1={620}
                  x2={X_KI + 220}
                  y2={620 + dy}
                  stroke={i === DIPILIH ? "var(--accent)" : "var(--line)"}
                  strokeWidth={4}
                  opacity={i === DIPILIH ? 0.35 + 0.65 * pilih : 0.4}
                />
              ))}
              {/* Simpul di titik cabang — tanpa ini "memilih arah" tidak
                  terbaca sebagai memilih, cuma sebagai garis yang menyala. */}
              <Simpul x={X_KI - 220} y={620} nyala={pilih} />
              {CABANG.map((dy, i) => (
                <circle
                  key={`ujung-${dy}`}
                  cx={X_KI + 220}
                  cy={620 + dy}
                  r={10}
                  fill={i === DIPILIH ? "var(--accent)" : "var(--ink-2)"}
                  opacity={i === DIPILIH ? 0.4 + 0.6 * pilih : 0.5}
                />
              ))}
              <Paket
                x={X_KI - 220 + 440 * jalanKiri}
                y={620 + CABANG[DIPILIH] * jalanKiri}
                skala={0.66}
                warna={jalanKiri > 0.9 ? "ok" : "biasa"}
              />
            </g>
          </g>

          {/* ================= sisi kanan: kelengkapan & urutan ================= */}
          <g style={{ opacity: kanan.opacity * (1 - satu * 0.35), transform: kanan.transform }}>
            <g opacity={1 - satu}>
              {ACAK.map((nomor, i) => {
                const xAcak = X_KA - 210 + i * 140;
                const xUrut = X_KA - 210 + (nomor - 1) * 140;
                return (
                  <g key={nomor}>
                    <Paket
                      x={xAcak + (xUrut - xAcak) * urut}
                      y={620}
                      nomor={nomor}
                      skala={0.6}
                      warna={centang > 0.5 ? "ok" : "biasa"}
                    />
                    <Centang
                      x={xAcak + (xUrut - xAcak) * urut}
                      y={676}
                      skala={0.9}
                      opacity={centang}
                    />
                  </g>
                );
              })}
            </g>
          </g>

          {/* --- judul kedua sisi, lalu menyatu di tengah ---

              Keduanya MEMUDAR seiring mendekat (`1 - satu`), bukan setelah
              sampai. Dua subjudul yang masih penuh saat berimpit di tengah
              saling menimpa dan terbaca sebagai satu baris yang kacau — bukan
              sebagai dua benda yang jadi satu. */}
          <g style={{ opacity: kiri.opacity * (1 - satu) }}>
            <Label
              x={X_KI + (960 - X_KI) * satu}
              y={380}
              teks="IP"
              sub="ADDRESS & ROUTING"
            />
          </g>
          <g style={{ opacity: kanan.opacity * (1 - satu) }}>
            <Label
              x={X_KA + (960 - X_KA) * satu}
              y={380}
              teks="TCP"
              sub="RELIABLE DELIVERY"
            />
          </g>

          {/* --- tahap 4: alasan judul episodenya --- */}
          <g style={{ opacity: gabung.opacity, transform: gabung.transform }}>
            <Label x={960} y={560} teks="TCP/IP" besar />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
