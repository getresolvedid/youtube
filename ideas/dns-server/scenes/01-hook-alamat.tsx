/* T14 · scene 1 · hook-alamat — bagian 1 [question], 18,84 dtk
   VO:        01-hook-alamat-vo.md          ← sumber kalimat & beat
   Direction: 01-hook-alamat-direction.md   ← sumber tata letak & koreografi

   Frame pertama episode. Tidak ada fade in dan tidak ada yang masuk dari luar:
   perambannya sudah di sana sejak frame nol, dan yang pertama bergerak adalah
   kursor. Penonton harus merasa menyusul sesuatu yang sedang berjalan.

   DUA KEPUTUSAN YANG MENENTUKAN SISA EPISODE:

   1. Halaman terisi TANPA tween — `d >= T_ISI`, bukan interpolasi. Kecepatannya
      yang jadi isinya; begitu ia memudar masuk selama 0,3 detik, ia berhenti
      terasa instan dan celah yang dibongkar di tahap 4 kehilangan kontrasnya.

   2. Aksen dipakai HANYA untuk tanda tanya. Ini satu-satunya scene di bagian 1,
      jadi warna aksen belum boleh berarti "jawaban" — di sini ia berarti "yang
      belum dijawab". Baru sejak scene 5 ia berpindah arti.

   Detik tiap tahap tidak diketik di sini; semuanya dari `beat()` di
   timing.gen.ts (HARD RULE 4).
*/
import type React from "react";

import { E, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { PERAMBAN, POTONGAN, X_LAYAR, Y_LAYAR, H_BILAH } from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "hook-alamat";

/* --- waktu: satu baris VO = satu tahap ------------------------------------ */

const B_KETIK = beat(ID, 0); // "Kamu ketik satu nama, lalu tekan enter."
const B_MUNCUL = beat(ID, 1); // "Halaman itu muncul."
const B_PUTAR = beat(ID, 2); // "Sekarang putar pelan bagian yang barusan lewat."
const B_CELAH = beat(ID, 3); // "Ada satu jeda kecil di situ, ..."
const B_BELUM = beat(ID, 4); // "Di jeda itu, komputermu belum tahu ..."
const B_TANYA = beat(ID, 5); // "Jadi dari mana akhirnya dia tahu?"

const NAMA = POTONGAN.join(".");

const T_KETIK = B_KETIK + 0.35;
const DUR_KETIK = 1.45;
/** Halaman terisi di satu frame — lihat keputusan 1 di kepala berkas. */
const T_ISI = B_MUNCUL + 0.12;
const T_MUNDUR = B_PUTAR + 0.3;
const DUR_MUNDUR = 1.15;

const KIRI = X_LAYAR - PERAMBAN.w / 2;
const BILAH_Y = Y_LAYAR + 24;
const T_BILAH = { x0: 360, x1: 1560, y: 985 };

export const HookAlamat: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: mengetik --- */
  const ketik = t(d, {
    mulai: T_KETIK,
    durasi: DUR_KETIK,
    dari: 0,
    ke: 1,
    ease: E.linear, // mengetik tidak melambat di ujung
  });

  /* --- tahap 3: seluruh frame mundur --- */
  const mundur = t(d, {
    mulai: T_MUNDUR,
    durasi: DUR_MUNDUR,
    dari: 0,
    ke: 1,
    ease: E.power1in,
  });

  /* Huruf, halaman, dan kepala pemutar dipetakan dari `mundur` yang SAMA supaya
     ketiganya bergerak sebagai satu benda, bukan tiga animasi yang kebetulan
     bersamaan. */
  const nHuruf = Math.floor(NAMA.length * ketik * (1 - mundur));
  const halaman = d >= T_ISI ? 1 - mundur : 0;

  /* --- tahap 4: celah dibongkar --- */
  const celah = t(d, { mulai: B_CELAH, durasi: 0.85, dari: 0, ke: 1, ease: E.expoOut });
  const bilahAda = t(d, { mulai: T_MUNDUR - 0.2, durasi: 0.4, dari: 0, ke: 1 });
  const perambanTipis = t(d, { mulai: B_BELUM, durasi: 0.6, dari: 1, ke: 0.16 });

  /* --- tahap 5 & 6: nama sendirian, lalu tanda tanya --- */
  const namaBesar = t(d, { mulai: B_BELUM + 0.15, durasi: 0.55, dari: 0, ke: 1, ease: E.expoOut });
  const naikNama = t(d, { mulai: B_BELUM + 0.15, durasi: 0.55, dari: 22, ke: 0, ease: E.expoOut });
  const tanya = t(d, {
    mulai: B_TANYA + 0.1,
    durasi: 0.6,
    dari: 0.7,
    ke: 1,
    ease: E.backOut(2.1),
  });
  const tanyaAda = t(d, { mulai: B_TANYA + 0.1, durasi: 0.4, dari: 0, ke: 1 });
  const napasTanya = tPP(d, { mulai: B_TANYA + 0.9, durasi: 2.4, dari: 0, ke: -8 });

  /* Kepala pemutar berhenti di titik celah, lalu penanda turun menjepitnya. */
  const xPlay =
    T_BILAH.x1 - (T_BILAH.x1 - (T_BILAH.x0 + 520)) * mundur;
  const lebarCelah = 26 + 300 * celah;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ---------- peramban ---------- */}
          <g opacity={perambanTipis}>
            <rect
              x={KIRI}
              y={Y_LAYAR}
              width={PERAMBAN.w}
              height={PERAMBAN.h}
              rx={18}
              fill="var(--bg-elev)"
              stroke="var(--ink-1)"
              strokeWidth={6}
            />
            <path
              d={`M${KIRI} ${Y_LAYAR + H_BILAH}h${PERAMBAN.w}`}
              stroke="var(--ink-1)"
              strokeWidth={6}
            />

            {/* bilah alamat */}
            <rect
              x={KIRI + 40}
              y={BILAH_Y}
              width={PERAMBAN.w - 80}
              height={48}
              rx={24}
              fill="var(--bg)"
              stroke="var(--line)"
              strokeWidth={3}
            />
            <text
              x={KIRI + 72}
              y={BILAH_Y + 24}
              fontSize={30}
              fontFamily="var(--font-mono)"
              fill="var(--ink-0)"
              dominantBaseline="middle"
            >
              {NAMA.slice(0, nHuruf)}
            </text>
            {/* kursor: berkedip dari detik, bukan dari state */}
            <rect
              x={KIRI + 76 + nHuruf * 18}
              y={BILAH_Y + 10}
              width={3}
              height={28}
              fill="var(--accent-ink)"
              opacity={Math.floor(d * 2) % 2 === 0 ? 0.9 : 0.15}
            />

            {/* badan halaman — sengaja abu-abu rata, bukan situs sungguhan */}
            <g opacity={halaman}>
              <rect
                x={KIRI + 40}
                y={Y_LAYAR + H_BILAH + 40}
                width={PERAMBAN.w - 80}
                height={200}
                rx={12}
                fill="var(--line)"
              />
              <rect
                x={KIRI + 40}
                y={Y_LAYAR + H_BILAH + 264}
                width={(PERAMBAN.w - 80) * 0.62}
                height={38}
                rx={8}
                fill="var(--line)"
              />
              <rect
                x={KIRI + 40}
                y={Y_LAYAR + H_BILAH + 320}
                width={(PERAMBAN.w - 80) * 0.44}
                height={38}
                rx={8}
                fill="var(--line)"
              />
            </g>
          </g>

          {/* ---------- bilah waktu: dipakai sekali, tidak pernah kembali ---------- */}
          <g opacity={bilahAda * (1 - celah * 0.75)}>
            <path
              d={`M${T_BILAH.x0} ${T_BILAH.y}h${T_BILAH.x1 - T_BILAH.x0}`}
              stroke="var(--line)"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <circle cx={xPlay} cy={T_BILAH.y} r={11} fill="var(--ink-1)" />
            {/* dua penanda yang menjepit celahnya */}
            <g opacity={celah}>
              <path
                d={`M${xPlay - lebarCelah / 2} ${T_BILAH.y - 34}v68`}
                stroke="var(--accent-ink)"
                strokeWidth={4}
              />
              <path
                d={`M${xPlay + lebarCelah / 2} ${T_BILAH.y - 34}v68`}
                stroke="var(--accent-ink)"
                strokeWidth={4}
              />
            </g>
          </g>

          {/* ---------- isi celah: nama sendirian, lalu tanda tanya ---------- */}
          <g opacity={namaBesar} transform={`translate(0 ${naikNama})`}>
            <text
              x={X_LAYAR - 90}
              y={560}
              fontSize={104}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {NAMA}
            </text>
          </g>

          <g
            opacity={tanyaAda}
            transform={`translate(${X_LAYAR + 400} ${560 + napasTanya}) scale(${tanya})`}
          >
            <text
              fontSize={148}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--accent-ink)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              ?
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
