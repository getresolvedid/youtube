/* T01-S1 · scene 7 · namanya — beat payoff penutup, 4,25 dtk
   Direction: 07-namanya-direction.md
   VO:        07-namanya-vo.md

   Scene ini tidak menambah satu benda pun. Ia cuma menempelkan NAMA ke tiga
   benda yang sudah berdiri, sudah dipakai, dan sudah punya angkanya
   masing-masing — dan itulah satu-satunya urutan yang diizinkan HARD RULE 6.

   Ketiganya menyala BERSAMAAN di sini: pembandingnya sudah selesai, sekarang
   ketiganya subjek. Kolom angka tetap terlihat — nama tanpa jaraknya cuma
   kosakata.
*/
import type React from "react";

import { E, masuk, t, useDetik } from "../../../../shared/anim";
import { Scene } from "../../../../shared/Stage";
import {
  Chip,
  KolomAngka,
  TeksAtas,
  MEJA,
  TigaTempat,
  X_KOLOM,
  Y_LEMARI,
  Y_MEJA,
  Y_NEMPEL,
} from "../tiga-tempat";
import { beat } from "./timing.gen";

const ID = "namanya";

/** Label mendarat DARI ARAH bendanya — ia milik benda itu, bukan keterangan
 *  yang ditempel dari luar. */
const LABEL = [
  { teks: "cache", y: Y_NEMPEL, mulai: beat(ID, 0) + 0.2 },
  { teks: "ram", y: Y_MEJA, mulai: beat(ID, 1) + 0.05 },
  { teks: "hardisk", y: Y_LEMARI, mulai: beat(ID, 1) + 0.3 },
] as const;

/** Label berhenti di sebelah kiri benda TERLEBAR di kolom itu — mejanya, bukan
 *  lemarinya. Versi pertama memakai tepi lemari, dan akibatnya label "ram"
 *  duduk di atas mejanya sendiri. */
const X_LABEL = X_KOLOM - MEJA.w / 2 - 20;

export const Namanya: React.FC = () => {
  const d = useDetik();

  return (
    <Scene tengah={false}>
      <TeksAtas {...masuk(d, { mulai: 0.02, durasi: 0.35 })}>
        sekarang <span style={{ color: "var(--accent-ink)" }}>namanya</span>
      </TeksAtas>

      <Chip redup />
      <TigaTempat terang={() => true} />
      <KolomAngka d={d} mulai={[-1, -1, -1]} />

      {LABEL.map((l) => (
        <p
          key={l.teks}
          style={{
            position: "absolute",
            left: 90,
            top: l.y - 34,
            width: X_LABEL - 90,
            textAlign: "right",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 46,
            color: "var(--accent-ink)",
            opacity: t(d, { mulai: l.mulai, durasi: 0.3, dari: 0, ke: 1 }),
            transform: `translateX(${t(d, {
              mulai: l.mulai,
              durasi: 0.45,
              dari: 24,
              ke: 0,
              ease: E.expoOut,
            })}px)`,
          }}
        >
          {l.teks}
        </p>
      ))}
    </Scene>
  );
};
