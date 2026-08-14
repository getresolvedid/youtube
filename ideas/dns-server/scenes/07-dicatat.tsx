/* T14 · scene 7 · dicatat — bagian 5 [why], 20,97 dtk
   VO:        07-dicatat-vo.md
   Direction: 07-dicatat-direction.md

   Sebab kedua, dan ia menjawab keberatan yang baru saja dilahirkan scene 6:
   tangga sepanjang itu kedengarannya jauh lebih lambat daripada daftar yang
   tadi dibuang.

   Frame pertamanya = frame terakhir `06-tangga`. Tidak ada yang masuk atau
   menepi; scene ini menambahkan satu lapis di atas panggung yang sudah berdiri.

   TIGA KEPUTUSAN:

   1. Arah TURUN harus terbaca di gerakan pertama. Kalau kartunya sempat
      bergerak mendatar dulu, "jalan pulang" hilang dan tahap 5 tidak punya
      sebab.

   2. Catatan tertinggal TANPA kartunya berhenti. Kartu yang berhenti di tiap
      loket untuk menempelkan catatan terbaca sebagai perjalanan yang makin
      lambat — kebalikan dari yang dimaksud scene ini. Karena itu helainya
      dipicu dari `p` yang sama dengan posisi kartunya.

   3. Sisa tangga di tahap 5 TIDAK BOLEH berkedip sama sekali. Satu kilau kecil
      saja dan penonton menyimpulkan pertanyaannya tetap naik, cuma lebih cepat.
      Yang benar: ia tidak naik.

   Kata "cache" tidak muncul sekali pun di episode ini — ia punya episode sendiri
   di backlog (T07), dan menyerempetnya di sini menghabiskan hook episode itu
   tanpa membayar apa pun ke episode ini.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  Catatan,
  GARIS,
  I_PEMILIK,
  jendelaLoket,
  Kartu,
  Loket,
  NOMOR_BARU,
  posLoket,
  TANGGA,
} from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "dicatat";

const B_LAMBAT = beat(ID, 0); // "Tapi naik tangga begitu tiap kali ..."
const B_SIMPAN = beat(ID, 1); // "Makanya jawabannya tidak dibuang begitu saja."
const B_PULANG = beat(ID, 2); // "Di sepanjang jalan pulang, tiap loket menuliskannya."
const B_BESOK = beat(ID, 3); // "Pertanyaan yang sama besok tidak perlu naik lagi."
const B_BERHENTI = beat(ID, 4); // "Dia berhenti di catatan pertama yang ditemuinya."
const B_JARANG = beat(ID, 5); // "Jadi tangganya memang ada."
/* beat 6 — "Jarang benar-benar dinaiki." — sengaja TIDAK dipakai animasi.
   Kamera sudah mundur di beat 5 dan frame-nya ditahan; baris ini mendarat di
   gambar yang sudah diam, dan itu memang tugasnya. Dipecah dari beat 5 pada
   2026-08-14 untuk memberi scene ini baris pendek (audit naskah VO). */

/** Jalur naik: dari jendela loket 0 sampai jendela loket teratas. */
const TITIK = Array.from({ length: TANGGA.n }, (_, i) => jendelaLoket(i));
/** Akses ber-jepit: `TANGGA.n` selalu >= 2, jadi ini tidak pernah benar-benar
 *  jatuh ke cadangan — tapi ia membuat indeksnya aman tanpa `!` di mana-mana. */
const tt = (i: number): { x: number; y: number } =>
  TITIK[Math.max(0, Math.min(TITIK.length - 1, i))] ?? { x: 0, y: 0 };

const D_JALUR = TITIK.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join("");
const L_JALUR = TITIK.slice(1).reduce(
  (n, p, i) => n + Math.hypot(p.x - tt(i).x, p.y - tt(i).y),
  0,
);

/** Titik pada jalur, `u` 0 = loket 0, 1 = loket teratas. */
const diJalur = (u: number): { x: number; y: number } => {
  const seg = (TANGGA.n - 1) * Math.max(0, Math.min(1, u));
  const i = Math.min(TANGGA.n - 2, Math.floor(seg));
  const f = seg - i;
  const a = tt(i);
  const b = tt(i + 1);
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
};

/** Catatan menempel di sisi loket, bukan di jendelanya — supaya ia terbaca
 *  sebagai helai yang ditempelkan, bukan sebagai kartu yang tersangkut. */
const titikCatatan = (i: number): { x: number; y: number } => {
  const p = posLoket(i);
  return { x: p.x - 214 * p.skala, y: p.y - 150 * p.skala };
};

export const Dicatat: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: seluruh jalur naik menyala — inilah ongkos yang dikeluhkan --- */
  const jalurNaik = t(d, { mulai: B_LAMBAT + 0.1, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 2 & 3: kartu turun, catatan tertinggal di sepanjang jalan --- */
  const turun = t(d, {
    mulai: B_SIMPAN + 0.2,
    durasi: 2.4,
    dari: 1,
    ke: 0,
    ease: E.power2out,
  });
  const kartuAda = t(d, { mulai: B_SIMPAN + 0.2, durasi: 0.2, dari: 0, ke: 1 });
  const posKartu = diJalur(turun);

  /* --- tahap 4 & 5: pertanyaan kedua naik, lalu berbalik di anak tangga bawah --- */
  const naik2 = t(d, { mulai: B_BESOK + 0.2, durasi: 0.7, dari: -0.35, ke: 0, ease: E.power2out });
  const balik2 = t(d, {
    mulai: B_BERHENTI + 0.25,
    durasi: 0.8,
    dari: 0,
    ke: -0.5,
    ease: E.power2in,
  });
  const u2 = naik2 + balik2;
  const pos2 = diJalur(Math.max(0, u2));
  const kartu2Ada = t(d, { mulai: B_BESOK + 0.2, durasi: 0.2, dari: 0, ke: 1 });
  const nyalaCatatan0 = t(d, { mulai: B_BERHENTI, durasi: 0.35, dari: 0, ke: 1 });

  /* --- tahap 6: kamera mundur, dan cuma anak tangga terbawah yang menyala --- */
  const mundur = t(d, { mulai: B_JARANG, durasi: 0.9, dari: 0, ke: 1, ease: E.expoOut });
  const skala = 1 - 0.2 * mundur;
  /* Jalur naik padam SELURUHNYA di tahap 6 kecuali ruas terbawah. */
  const jalurRedup = 1 - t(d, { mulai: B_BERHENTI, durasi: 0.6, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={`translate(960 620) scale(${skala}) translate(-960 -620)`}>
            {/* ---------- jalur naik: menyala penuh, lalu padam ---------- */}
            <path
              d={D_JALUR}
              fill="none"
              stroke={GARIS.warna}
              strokeWidth={GARIS.tebal}
              strokeLinecap="round"
              strokeDasharray={L_JALUR}
              strokeDashoffset={L_JALUR * (1 - jalurNaik)}
              opacity={GARIS.opasitas * jalurRedup}
            />

            {/* ruas terbawah — satu-satunya yang tetap menyala di tahap 6 */}
            <path
              d={`M${tt(0).x} ${tt(0).y}L${tt(1).x} ${tt(1).y}`}
              stroke={GARIS.warna}
              strokeWidth={GARIS.tebal}
              strokeLinecap="round"
              opacity={GARIS.opasitas * nyalaCatatan0}
            />

            {/* ---------- loket ---------- */}
            {Array.from({ length: TANGGA.n }, (_, i) => {
              const p = posLoket(i);
              /* Sisa tangga meredup di tahap 5–6 dan tidak pernah berkedip. */
              const redup = i === 0 ? 1 : 1 - 0.72 * t(d, { mulai: B_BERHENTI, durasi: 0.6, dari: 0, ke: 1 });
              return (
                <Loket
                  key={i}
                  x={p.x}
                  y={p.y}
                  skala={p.skala}
                  nyala={redup}
                  aksen={i === I_PEMILIK}
                  laci={0}
                  isi={i === I_PEMILIK ? 1 : 0}
                />
              );
            })}

            {/* ---------- catatan yang tertinggal di jalan pulang ---------- */}
            {Array.from({ length: TANGGA.n }, (_, i) => {
              const c = titikCatatan(i);
              /* Dipicu dari `turun` yang SAMA: helainya tidak pernah muncul
                 sebelum kartunya lewat, tanpa kartunya harus berhenti. */
              const uLoket = i / (TANGGA.n - 1);
              const lewat = turun <= uLoket + 0.02 ? 1 : 0;
              const p = t(d, {
                mulai: B_PULANG - 0.4 + (1 - uLoket) * 1.6,
                durasi: 0.4,
                dari: 0,
                ke: 1,
                ease: E.backOut(1.6),
              });
              return (
                <Catatan
                  key={i}
                  x={c.x}
                  y={c.y}
                  skala={posLoket(i).skala * p}
                  opacity={lewat * p}
                  nyala={i === 0 ? nyalaCatatan0 : 0}
                />
              );
            })}

            {/* ---------- kartu jawaban yang turun ---------- */}
            <Kartu
              x={posKartu.x}
              y={posKartu.y}
              teks={NOMOR_BARU}
              skala={0.42}
              opacity={kartuAda * (1 - t(d, { mulai: B_BESOK - 0.5, durasi: 0.4, dari: 0, ke: 1 }))}
            />

            {/* ---------- pertanyaan kedua: naik sebentar, lalu berbalik ---------- */}
            <Kartu
              x={pos2.x}
              y={pos2.y + 120 * Math.max(0, -u2)}
              teks="?"
              skala={0.42}
              warna="var(--ok)"
              opacity={kartu2Ada}
            />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
