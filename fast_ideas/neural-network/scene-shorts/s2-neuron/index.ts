/* Daftar scene Short 2 "neuron" (T19 · Episode 02) — HARD RULE 1 berlaku utuh.

   DIBANGUN ULANG 2026-08-19 mengikuti peta 15 episode: scene `tebal-tipis` dan
   `ambang` lama dihapus (ambang itu Episode 04), diganti `jumlah-bias`,
   `keluaran`, dan `mesin-kecil` (naskah.md § Bentrok tercatat 1).

     1-satu-simpul.tsx   hook — kamera masuk ke satu simpul
     2-tiga-masuk.tsx    beberapa masukan, tiap sambungan beda kuatnya
     3-jumlah-bias.tsx   digabung jadi satu, lalu ditambah angka penggeser
     4-keluaran.tsx      angka itu jadi keluaran, berangkat ke lapis berikutnya
     5-mesin-kecil.tsx   MASUK → HITUNG → KELUAR. Di sinilah namanya jatuh
     6-berikutnya.tsx    kamera masuk ke ketebalan sambungan; siapa yang menentukannya?
     (99-closing = tanda brand 2 dtk, shared/StandarScenes.tsx)
*/
import type React from "react";

import { SatuSimpul } from "./1-satu-simpul";
import { TigaMasuk } from "./2-tiga-masuk";
import { JumlahBias } from "./3-jumlah-bias";
import { Keluaran } from "./4-keluaran";
import { MesinKecil } from "./5-mesin-kecil";
import { Berikutnya } from "./6-berikutnya";

export const SCENES: Readonly<Record<string, React.FC>> = {
  "satu-simpul": SatuSimpul,
  "tiga-masuk": TigaMasuk,
  "jumlah-bias": JumlahBias,
  keluaran: Keluaran,
  "mesin-kecil": MesinKecil,
  berikutnya: Berikutnya,
};
