/* T14 · scene 3 · nomor-bukan-nama — bagian 3 [problem], 19,26 dtk
   VO:        03-nomor-bukan-nama-vo.md
   Direction: 03-nomor-bukan-nama-direction.md

   Frame pertamanya = frame terakhir `01-hook-alamat` minus perambannya: nama
   besar di tengah-kiri, tanda tanya di sebelahnya. Kartu judul lewat di antara
   keduanya, tapi sambungannya tetap langsung — opening tidak bicara (docs/10),
   jadi pertanyaan yang digantung scene 1 masih menganga saat scene ini mulai.

   DUA KEPUTUSAN:

   1. Garis dari komputer BERHENTI di nomornya, tidak menembus ke bangunan.
      Kalau ia sampai ke bangunannya, penonton melihat "komputer pergi ke tempat
      itu" — dan yang harus dilihat adalah "komputer cuma bisa memakai nomornya".

   2. Ruang kosong di tahap 6 adalah isinya, bukan sisa tata letak. Jarak antara
      nama dan nomor itulah masalah yang dibawa episode ini, dan scene 4 akan
      mencoba menjembataninya dengan cara yang salah.
*/
import type React from "react";

import { E, gambarGaris, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Bangunan, GARIS, Komputer, NOMOR_LAMA, POTONGAN } from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "nomor-bukan-nama";

const B_MASALAH = beat(ID, 0); // "Masalahnya, nama yang kamu ketik tadi ..."
const B_DEKAT = beat(ID, 1); // "Sekarang lihat tempat yang kamu tuju itu dari dekat."
const B_PAPAN = beat(ID, 2); // "Papan namanya dicopot."
const B_NOMOR = beat(ID, 3); // "Yang tersisa cuma sederet nomor."
const B_KESITU = beat(ID, 4); // "Ke situlah komputermu harus berangkat, ..."
const B_HAFAL = beat(ID, 5); // "Sementara yang kamu hafal cuma namanya."

const NAMA = POTONGAN.join(".");

/** Nama mulai di tempat scene 1 meninggalkannya, lalu menepi ke kiri. */
const X_NAMA_AWAL = 870;
const X_NAMA_AKHIR = 430;
const Y_TEKS = 540;

const X_BANGUNAN = 1420;
const Y_BANGUNAN = 830;
const SKALA_BANGUNAN = 0.92;
/** Titik nomor di dinding bangunan — dihitung, bukan diketik, supaya ujung
 *  garis tidak pernah berdiri beberapa piksel dari angkanya. */
const P_NOMOR = { x: X_BANGUNAN, y: Y_BANGUNAN - 262 * SKALA_BANGUNAN };
/** Garis berhenti di TEPI KIRI angkanya, bukan di tengahnya dan bukan di
   bangunannya. */
const X_UJUNG = P_NOMOR.x - 150;

const D_GARIS = `M420 760Q${(420 + X_UJUNG) / 2} ${790} ${X_UJUNG} ${P_NOMOR.y + 6}`;
const L_GARIS = 940;

export const NomorBukanNama: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: nama menepi, ruang kanan dikosongkan --- */
  const geser = t(d, {
    mulai: B_MASALAH + 0.2,
    durasi: 0.7,
    dari: X_NAMA_AWAL,
    ke: X_NAMA_AKHIR,
    ease: E.power2out,
  });

  /* --- tahap 2: bangunan tumbuh dari garis lantai --- */
  const tumbuh = t(d, { mulai: B_DEKAT, durasi: 0.65, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 3: papan lepas dan jatuh --- */
  const jatuh = t(d, { mulai: B_PAPAN + 0.1, durasi: 0.9, dari: 0, ke: 1, ease: E.power2in });
  const papanAda = t(d, { mulai: B_PAPAN + 0.75, durasi: 0.25, dari: 1, ke: 0 });

  /* --- tahap 4: nomor menyala --- */
  const nomor = t(d, { mulai: B_NOMOR, durasi: 0.45, dari: 0, ke: 1, ease: E.expoOut });
  const kilau = tPP(d, { mulai: B_NOMOR, durasi: 0.9, dari: 1, ke: 1.35 });

  /* --- tahap 5: garis berhenti di nomor --- */
  const garis = gambarGaris(d, L_GARIS, { mulai: B_KESITU + 0.15, durasi: 0.9 });

  /* --- tahap 6: denyut BERGANTIAN, bukan bersamaan --- */
  const denyutNama = tPP(d, { mulai: B_HAFAL + 0.15, durasi: 0.7, dari: 1, ke: 1.09 });
  const denyutNomor = tPP(d, { mulai: B_HAFAL + 0.95, durasi: 0.7, dari: 1, ke: 1.09 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ---------- garis lantai ---------- */}
          <path
            d="M120 830h1680"
            stroke="var(--line)"
            strokeWidth={5}
            strokeLinecap="round"
          />

          {/* ---------- jalur: komputer -> nomor, BERHENTI di angkanya ---------- */}
          <path
            d={D_GARIS}
            fill="none"
            stroke={GARIS.warna}
            strokeWidth={GARIS.tebal}
            strokeLinecap="round"
            opacity={GARIS.opasitas}
            {...garis}
          />

          <Komputer x={300} y={830} skala={0.92} />

          {/* ---------- bangunan ---------- */}
          <g transform={`translate(${X_BANGUNAN} ${Y_BANGUNAN}) scale(1 ${tumbuh})`}>
            <g transform={`translate(${-X_BANGUNAN} ${-Y_BANGUNAN})`}>
              <Bangunan
                x={X_BANGUNAN}
                y={Y_BANGUNAN}
                skala={SKALA_BANGUNAN}
                papan={papanAda}
                papanJatuh={{ rot: -34 * jatuh, dy: 620 * jatuh }}
                nomor={NOMOR_LAMA}
                /* Angkanya digambar di lapis terpisah di bawah, supaya denyut &
                   kilaunya tidak ikut membesarkan bangunannya. */
                nomorMuncul={0}
              />
            </g>
          </g>

          {/* nomor diberi denyut & kilau lewat lapis terpisah supaya bangunannya
              sendiri tidak ikut membesar */}
          <g
            transform={`translate(${P_NOMOR.x} ${P_NOMOR.y}) scale(${denyutNomor})`}
            opacity={nomor * Math.min(1, kilau)}
          >
            <text
              fontSize={44 * SKALA_BANGUNAN}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {NOMOR_LAMA}
            </text>
          </g>

          {/* ---------- nama, yang tidak dipakai siapa pun di jalur itu ---------- */}
          <g transform={`translate(${geser} ${Y_TEKS}) scale(${denyutNama})`}>
            <text
              fontSize={92}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {NAMA}
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
