/* T18 · scene 12 · kesimpulan — rangkuman
   VO:        12-kesimpulan-vo.md
   Direction: 12-kesimpulan-direction.md

   Bentuknya paling sederhana di seluruh episode, dan itu disengaja: yang bekerja
   di sini kalimatnya, bukan gerakannya.

   DUA KEPUTUSAN:

   1. Tahap 1 punya NOL tween. Storyboard meminta jeda 0,5–0,8 dtk di VO; di
      layar jeda itu dibuat dengan tidak menggerakkan apa pun.

   2. Tiga baris rangkuman jatuh SATU PER SATU. Tiga baris yang muncul serentak
      dibaca sebagai daftar, dan daftar tidak diingat.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Centang, JaringLatar, Label, Paket } from "../panggung-jaringan";
import { beat } from "../timing.gen";

const ID = "kesimpulan";

const B_TANYA = beat(ID, 0); // "Jadi, apa itu TCP/IP?"
const B_KUMPULAN = beat(ID, 1); // "TCP/IP adalah sekumpulan protokol…"
const B_IP = beat(ID, 2); // "IP membantu menentukan alamat dan jalur tujuan."
const B_TCP = beat(ID, 3); // "TCP membantu memastikan data dikirim…"
const B_FONDASI = beat(ID, 4); // "Dan bersama berbagai protokol lainnya…"

export const Kesimpulan: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: pertanyaan berdiri sendiri. Nol tween di sini. --- */
  const tanya = masuk(d, { mulai: B_TANYA + 0.1, durasi: 0.6, geser: 20 });

  /* --- tahap 2: jaring yang SAMA dengan scene 1 menyala kembali --- */
  const jaring = t(d, { mulai: B_KUMPULAN, durasi: 2.0, dari: 0, ke: 1, ease: E.power1out });
  const naik = t(d, { mulai: B_KUMPULAN, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 3, 4, 5: tiga baris, satu per satu --- */
  const b1 = masuk(d, { mulai: B_IP + 0.15, durasi: 0.55, geser: 20 });
  const b2 = masuk(d, { mulai: B_TCP + 0.15, durasi: 0.55, geser: 20 });
  const b3 = masuk(d, { mulai: B_FONDASI + 0.15, durasi: 0.55, geser: 20 });

  const geser1 = t(d, { mulai: B_IP + 0.4, durasi: 2.2, dari: 0, ke: 1, ease: E.sineInOut });
  const urut2 = t(d, { mulai: B_TCP + 0.5, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });
  const denyut = tPP(d, { mulai: B_FONDASI + 0.8, durasi: 1.2, dari: 1, ke: 0.55 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <JaringLatar maju={jaring} opacity={0.6 * jaring * denyut} />

          {/* --- tahap 1 & 2: pertanyaan, lalu naik memberi ruang --- */}
          <g style={{ opacity: tanya.opacity, transform: tanya.transform }}>
            <Label
              x={960}
              y={520 - 320 * naik}
              teks="TCP/IP"
              sub={naik > 0.6 ? undefined : "apa itu, sebenarnya?"}
              besar
            />
          </g>

          {/* --- baris 1: alamat & jalur --- */}
          <g style={{ opacity: b1.opacity, transform: b1.transform }}>
            <Label x={720} y={470} teks="IP" sub="ADDRESS & ROUTING" />
            <Paket x={1290} y={452} skala={0.5} opacity={0.9} />
            <Paket x={1180 + 220 * geser1} y={452} skala={0.5} warna="ok" opacity={geser1} />
          </g>

          {/* --- baris 2: keandalan --- */}
          <g style={{ opacity: b2.opacity, transform: b2.transform }}>
            <Label x={720} y={650} teks="TCP" sub="RELIABLE DELIVERY" />
            {[1, 2, 3].map((n, i) => {
              const xAcak = 1180 + ([110, 0, 220][i] ?? 0);
              const xUrut = 1180 + i * 110;
              return (
                <g key={n}>
                  <Paket
                    x={xAcak + (xUrut - xAcak) * urut2}
                    y={632}
                    nomor={n}
                    skala={0.5}
                    warna={urut2 > 0.9 ? "ok" : "biasa"}
                  />
                  <Centang x={xAcak + (xUrut - xAcak) * urut2} y={676} skala={0.8} opacity={urut2} />
                </g>
              );
            })}
          </g>

          {/* --- baris 3: menutup keduanya --- */}
          <g style={{ opacity: b3.opacity, transform: b3.transform }}>
            <Label x={960} y={860} teks="TCP/IP" sub="COMMUNICATION" />
          </g>
        </svg>
      </div>
    </Scene>
  );
};
