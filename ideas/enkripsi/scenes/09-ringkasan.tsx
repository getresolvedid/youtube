/* T17 (provisional) · scene 9 · ringkasan — bagian 6 [explaining]
   VO:        09-ringkasan-vo.md
   Direction: 09-ringkasan-direction.md

   Scene ini tidak mengajarkan apa pun yang belum ditunjukkan; ia menyusun ulang
   yang sudah ditonton supaya bisa diingat sebagai SATU BENTUK, bukan sebagai
   lima adegan.

   ENAM POTONG DI DALAM SATU BEAT. `mulai` tiap potong diturunkan dari
   `beat("ringkasan", 0)` ditambah pecahan dari DURASI baris itu — bukan dari
   detik yang diketik. Begitu kalimatnya berubah panjang, keenamnya ikut merapat
   atau merenggang sendiri.

   HALO MUNCUL DUA KALI, di kedua ujung rantai, dan itu intinya: bentuk yang sama
   persis di awal dan akhir, dan yang berbeda cuma apa yang terjadi di tengah.

   TAHAP 2 ADALAH FRAME TERPENTING DI SELURUH EPISODE (arahan user). Tidak ada
   gerakan apa pun selama ia ditahan — napas kecil pun tidak.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Hp,
  MONITOR,
  Monitor,
  PESAN,
  SANDI,
  SANDI_PANJANG,
  munculSkala,
} from "../panggung-kiriman";
import { TIMING, beat, cari } from "../timing.gen";

const ID = "ringkasan";

const B_RANTAI = beat(ID, 0); // "Singkatnya, pesan diubah menjadi data terenkripsi…"
const B_BANDING = beat(ID, 1); // "Jadi, enkripsi membantu menjaga…"

/** Durasi baris pertama — dipakai membagi enam potong rantai di dalamnya. */
const DUR_RANTAI = cari(ID).beat[0]?.durasi ?? 1;

/** Enam potong, dibaca kiri ke kanan. Arahnya sama dengan seluruh episode. */
const RANTAI = [
  { x: 190, jenis: "teks", isi: "HALO" },
  { x: 490, jenis: "kotak", isi: "ENKRIPSI" },
  { x: 790, jenis: "sandi", isi: SANDI },
  { x: 1090, jenis: "jaringan", isi: "" },
  { x: 1390, jenis: "kotak", isi: "DEKRIPSI" },
  { x: 1700, jenis: "teks", isi: "HALO" },
] as const;

const Y = 420;

export const Ringkasan: React.FC = () => {
  const d = useDetik();

  /* Rantainya memudar saat perbandingannya masuk — tapi TIDAK sebelum itu:
     yang sudah muncul tinggal di layar sampai seluruh rantainya berdiri utuh. */
  const rantaiPudar = t(d, { mulai: B_BANDING, durasi: 0.5, dari: 1, ke: 0 });

  const belah = t(d, {
    mulai: B_BANDING + 0.4,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const kiri = masuk(d, { mulai: B_BANDING + 0.5, durasi: 0.6, geser: 22 });
  const kanan = masuk(d, { mulai: B_BANDING + 0.5, durasi: 0.6, geser: 22 });

  /* Sisa waktu scene, dipakai memastikan perbandingannya benar-benar DITAHAN —
     dibaca dari timing, bukan diketik. */
  const durasiScene = TIMING.find((x) => x.id === ID)?.durasi ?? 0;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ================= tahap 1 — rantainya dibangun ================= */}
          <g opacity={rantaiPudar}>
            {RANTAI.map((p, i) => {
              /* Enam potong dibagi rata di dalam durasi baris VO-nya. */
              const mulai = B_RANTAI + 0.2 + (i * DUR_RANTAI) / 7;
              const m = masuk(d, { mulai, durasi: 0.45, geser: 16 });
              const s = munculSkala(d, mulai);
              const sebelum = RANTAI[i - 1];
              const panah = sebelum
                ? gambarGaris(d, 92, { mulai: mulai - 0.22, durasi: 0.3 })
                : null;

              return (
                <g key={p.x}>
                  {panah && sebelum && (
                    <path
                      d={`M ${sebelum.x + 104} ${Y} h 92`}
                      stroke="var(--ink-2)"
                      strokeWidth={5}
                      strokeLinecap="round"
                      fill="none"
                      {...panah}
                    />
                  )}

                  <g
                    style={{ opacity: m.opacity, transform: m.transform }}
                    transform={`translate(${p.x} ${Y}) scale(${s}) translate(${-p.x} ${-Y})`}
                  >
                    {p.jenis === "teks" && (
                      <text
                        x={p.x}
                        y={Y}
                        fontSize={54}
                        fontFamily="var(--font-display)"
                        fontWeight={800}
                        fill="var(--ink-0)"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {p.isi}
                      </text>
                    )}

                    {p.jenis === "sandi" && (
                      <text
                        x={p.x}
                        y={Y}
                        fontSize={40}
                        fontFamily="var(--font-mono)"
                        fontWeight={700}
                        fill="var(--accent-ink)"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        letterSpacing={2}
                      >
                        {p.isi}
                      </text>
                    )}

                    {p.jenis === "kotak" && (
                      <>
                        <rect
                          x={p.x - 96}
                          y={Y - 46}
                          width={192}
                          height={92}
                          rx={14}
                          fill="var(--bg-elev)"
                          stroke="var(--accent-ink)"
                          strokeWidth={3}
                        />
                        <text
                          x={p.x}
                          y={Y + 2}
                          fontSize={24}
                          fontFamily="var(--font-mono)"
                          fontWeight={700}
                          fill="var(--accent-ink)"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          letterSpacing={2}
                        >
                          {p.isi}
                        </text>
                      </>
                    )}

                    {p.jenis === "jaringan" && (
                      <>
                        <line
                          x1={p.x - 96}
                          y1={Y}
                          x2={p.x + 96}
                          y2={Y}
                          stroke="var(--line)"
                          strokeWidth={5}
                          strokeDasharray="12 16"
                          strokeLinecap="round"
                        />
                        {[-96, -32, 32, 96].map((dx) => (
                          <circle
                            key={dx}
                            cx={p.x + dx}
                            cy={Y}
                            r={10}
                            fill="var(--ink-2)"
                          />
                        ))}
                      </>
                    )}
                  </g>
                </g>
              );
            })}
          </g>

          {/* ================= tahap 2 — dua layar disandingkan ================= */}
          <g>
            <line
              x1={960}
              y1={190}
              x2={960}
              y2={890}
              stroke="var(--line)"
              strokeWidth={4}
              style={{
                transform: `scaleY(${belah})`,
                transformOrigin: "960px 540px",
              }}
            />

            {/* kiri: layar yang mengamati */}
            <g style={{ opacity: kiri.opacity, transform: kiri.transform }}>
              <g transform="translate(-530 -260)">
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

            {/* kanan: HP penerima */}
            <g style={{ opacity: kanan.opacity, transform: kanan.transform }}>
              <Hp x={1300} y={330} w={280} h={440} nyala={0.9}>
                <rect
                  x={1332}
                  y={520}
                  width={216}
                  height={62}
                  rx={18}
                  fill="var(--accent)"
                />
                <text
                  x={1440}
                  y={552}
                  fontSize={26}
                  fontFamily="var(--font-body)"
                  fontWeight={700}
                  fill="var(--ink-0)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {PESAN}
                </text>
              </Hp>
            </g>
          </g>

          {/* Penjaga: kalau baris VO kedua dipendekkan sampai perbandingannya
              tidak sempat ditahan, ini yang memberi tahu — bukan mata, yang
              tidak akan menyadari selisih setengah detik. */}
          {durasiScene - B_BANDING < 3 && (
            <text
              x={960}
              y={1010}
              fontSize={22}
              fontFamily="var(--font-mono)"
              fill="var(--warn)"
              textAnchor="middle"
            >
              perbandingan ditahan &lt; 3 dtk — lihat 09-ringkasan-direction.md
            </text>
          )}
        </svg>
      </div>
    </Scene>
  );
};
