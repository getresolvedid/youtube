/* T18 · scene 10 · bukan-hanya — kumpulan protokol
   VO:        10-bukan-hanya-vo.md
   Direction: 10-bukan-hanya-direction.md

   Scene paling berat di episode ini: empat nama baru di menit ketiga. Yang
   menahannya cuma satu hal — tiap simpul punya gambaran kecil yang BERGERAK,
   bukan kotak berisi huruf.

   DUA KEPUTUSAN:

   1. UDP digambar sebagai KEBALIKAN scene 7: satu potongan hilang, dan tidak
      ada yang berjalan balik ke kiri. Itu satu-satunya pembeda yang bisa
      ditunjukkan tanpa kalimat tambahan, dan ia gratis karena penonton baru
      saja melihat versi yang sebaliknya.

   2. Buku dari scene 3 TIDAK dipakai lagi sebagai gambaran "kumpulan". Buku itu
      benda scene 3 saja; memakainya lagi akan membuat penonton mengira ada yang
      berulang.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Label, PAKET, kamera } from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "bukan-hanya";

const B_BUKAN = beat(ID, 0); // "Namun, TCP/IP sebenarnya bukan hanya TCP dan IP."
const B_KUMPULAN = beat(ID, 1); // "TCP/IP adalah kumpulan berbagai protokol…"
const B_HTTP = beat(ID, 2); // "Ada HTTP dan HTTPS…"
const B_DNS = beat(ID, 3); // "Ada DNS yang membantu menerjemahkan nama…"
const B_UDP = beat(ID, 4); // "Ada juga UDP…"

/** TIGA tempat yang disediakan lebih dulu di tahap 2, lalu terisi satu per satu.
 *  Simpul yang muncul di tempat yang belum ditandai akan terbaca sebagai benda
 *  yang menyerobot, bukan yang mendarat.
 *
 *  Jumlahnya wajib SAMA dengan jumlah nama yang benar-benar disebut VO. Versi
 *  pertama menyediakan empat untuk tiga nama, dan lingkaran keempat tinggal
 *  menganga kosong sampai scene habis — terbaca sebagai sesuatu yang gagal
 *  muncul, bukan sebagai ruang. */
const SIMPUL = [
  { x: 500, y: 320 },
  { x: 1420, y: 320 },
  { x: 960, y: 830 },
] as const;

export const BukanHanya: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: kamera mundur, tulisan warisan scene 9 tetap di tempatnya --- */
  const mundur = t(d, { mulai: B_BUKAN, durasi: 1.6, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 2: tempat yang disediakan --- */
  const tempat = masuk(d, { mulai: B_KUMPULAN + 0.2, durasi: 0.6, geser: 0 });

  /* --- tahap 3, 4, 5: tiap simpul mendarat di tempatnya --- */
  const isi = (mulai: number) => ({
    m: masuk(d, { mulai, durasi: 0.5, geser: 16 }),
    s: t(d, { mulai, durasi: 0.5, dari: 0.8, ke: 1, ease: E.backOut(1.4) }),
  });
  const http = isi(B_HTTP + 0.15);
  const dns = isi(B_DNS + 0.15);
  const udp = isi(B_UDP + 0.15);

  const denyut = tPP(d, { mulai: B_HTTP + 0.8, durasi: 2.0, dari: 0.35, ke: 1 });
  const tukar = t(d, { mulai: B_DNS + 1.4, durasi: 0.7, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={kamera({ skala: 1 - 0.2 * mundur })}>
            {/* Garis dari pusat ke tiap tempat — jaring kecilnya sendiri. */}
            {SIMPUL.map((s, i) => (
              <line
                key={i}
                x1={960}
                y1={560}
                x2={s.x}
                y2={s.y}
                stroke="var(--line)"
                strokeWidth={2}
                opacity={0.45 * tempat.opacity}
              />
            ))}

            {/* Tempat yang disediakan lebih dulu. */}
            {SIMPUL.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={116}
                fill="none"
                stroke="var(--line)"
                strokeWidth={2}
                strokeDasharray="10 10"
                opacity={0.5 * tempat.opacity}
              />
            ))}

            {/* Pusat — tulisan yang diwarisi scene 9, di tempat yang sama. */}
            <Label x={960} y={560} teks="TCP/IP" besar />

            {/* ---------- HTTP / HTTPS ---------- */}
            <g
              style={{ opacity: http.m.opacity, transform: http.m.transform }}
              transform={`translate(${SIMPUL[0].x} ${SIMPUL[0].y}) scale(${http.s}) translate(${-SIMPUL[0].x} ${-SIMPUL[0].y})`}
            >
              <rect x={SIMPUL[0].x - 106} y={SIMPUL[0].y - 66} width={86} height={64} rx={6}
                fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={3} />
              <rect x={SIMPUL[0].x + 22} y={SIMPUL[0].y - 66} width={86} height={64} rx={6}
                fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={3} />
              <path
                d={`M${SIMPUL[0].x - 14} ${SIMPUL[0].y - 44} h30 m-30 20 h30`}
                stroke="var(--accent)"
                strokeWidth={4}
                strokeLinecap="round"
                opacity={denyut}
              />
              <Label x={SIMPUL[0].x} y={SIMPUL[0].y + 62} teks="HTTP / HTTPS" />
            </g>

            {/* ---------- DNS: nama BERUBAH jadi angka, di titik yang sama ---------- */}
            <g
              style={{ opacity: dns.m.opacity, transform: dns.m.transform }}
              transform={`translate(${SIMPUL[1].x} ${SIMPUL[1].y}) scale(${dns.s}) translate(${-SIMPUL[1].x} ${-SIMPUL[1].y})`}
            >
              <text
                x={SIMPUL[1].x}
                y={SIMPUL[1].y - 26}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={30}
                fill="var(--ink-0)"
                opacity={1 - tukar}
              >
                contoh.com
              </text>
              <text
                x={SIMPUL[1].x}
                y={SIMPUL[1].y - 26}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={30}
                fill="var(--accent)"
                opacity={tukar}
              >
                93.184.0.10
              </text>
              <Label x={SIMPUL[1].x} y={SIMPUL[1].y + 62} teks="DNS" />
            </g>

            {/* ---------- UDP: kebalikan scene 7 — hilang, dan tidak ada yang balik ---------- */}
            <g
              style={{ opacity: udp.m.opacity, transform: udp.m.transform }}
              transform={`translate(${SIMPUL[2].x} ${SIMPUL[2].y}) scale(${udp.s}) translate(${-SIMPUL[2].x} ${-SIMPUL[2].y})`}
            >
              {[0, 1, 2, 3, 4].map((i) => {
                const u = t(d, {
                  mulai: B_UDP + 0.7 + i * 0.1,
                  durasi: 1.4,
                  dari: 0,
                  ke: 1,
                  ease: E.linear,
                });
                /* Yang ketiga lenyap di tengah — dan TIDAK ada yang menjemputnya. */
                const lenyap = i === 2 ? Math.max(0, 1 - Math.max(0, (u - 0.45) * 4)) : 1;
                if (u <= 0 || u >= 1) return null;
                return (
                  <rect
                    key={i}
                    x={SIMPUL[2].x - 150 + u * 300}
                    y={SIMPUL[2].y - 46}
                    width={PAKET.w * 0.34}
                    height={PAKET.h * 0.34}
                    rx={4}
                    fill="var(--bg-elev)"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    opacity={lenyap}
                  />
                );
              })}
              <Label x={SIMPUL[2].x} y={SIMPUL[2].y + 62} teks="UDP" />
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
