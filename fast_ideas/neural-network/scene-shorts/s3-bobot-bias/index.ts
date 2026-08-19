/* Daftar scene Short 3 "bobot & bias" (T19 · Episode 03) — HARD RULE 1.

     1-kenapa-bobot.tsx  hook — tiga sambungan, ketebalannya beda
     2-pengaruh.tsx      denyut besar lewat yang tebal, kecil lewat yang tipis
     3-bias-geser.tsx    garis bilangan + kapsul penggeser; penandanya bergeser
     4-dilatih.tsx       satu tween: tebal berubah, kapsul bergeser, jarak mengecil
     5-intinya.tsx       BOBOT → PENGARUH; BIAS → GESER. Di sinilah keduanya dinamai
     6-berikutnya.tsx    lengkungan aktivasi muncul di dalam simpul
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)

   BERKAS BANTU (di luar folder ini): ../panggung-nn.tsx · ../panggung-neuron.tsx
   · ../panggung-seri.tsx
*/
import type React from "react";

import { KenapaBobot } from "./1-kenapa-bobot";
import { Pengaruh } from "./2-pengaruh";
import { BiasGeser } from "./3-bias-geser";
import { Dilatih } from "./4-dilatih";
import { Intinya } from "./5-intinya";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "kenapa-bobot": KenapaBobot,
  pengaruh: Pengaruh,
  "bias-geser": BiasGeser,
  dilatih: Dilatih,
  intinya: Intinya,
  berikutnya: Berikutnya,
};
