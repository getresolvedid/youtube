/* T17 (provisional) · scene 10 · definisi — bagian 7
   VO:        10-definisi-vo.md
   Direction: 10-definisi-direction.md

   INI BUKAN `[case]` DALAM ARTI docs/02 — alasannya di naskah.md dan
   10-definisi-vo.md, bukan di sini.

   IKON-IKONNYA MEMENUHI HARD RULE 2, dan itu bukan formalitas: shot 10B di
   arahan user isinya teks saja — judul besar plus satu kalimat definisi. Layar
   penuh teks adalah slide presentasi, dan penonton YouTube menutup slide.
   Karena itu gembok dan ikonnya TIDAK dihilangkan saat definisinya mendarat;
   keduanya tinggal di frame, cuma mundur ke belakang.

   Ikonnya dari shared/Icons.tsx lewat <use href="#ic-…">, bukan digambar ulang.
   Belum ada ikon "HP" dan "laptop" di sprite itu; sementara dipakai `app` dan
   `browser`, dan kalau keduanya perlu, tambahkan ke shared/Icons.tsx supaya
   episode lain ikut kebagian — jangan menggambarnya di berkas ini.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Gembok, munculSkala } from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "definisi";

const B_DEFINISI = beat(ID, 0); // "Jadi, enkripsi adalah proses mengubah data…"
const B_TUTUP = beat(ID, 1); // "Itulah mengapa enkripsi penting…"

/** Benda sehari-hari yang isinya lewat jalan yang sama. Posisinya DITULIS,
 *  bukan dihitung dari acak — `Math.random()` menghasilkan gambar berbeda tiap
 *  frame saat render paralel. */
const IKON = [
  { n: "comment", x: 960, y: 146 },
  { n: "app", x: 1300, y: 300 },
  { n: "browser", x: 1250, y: 596 },
  { n: "file", x: 670, y: 596 },
  { n: "stack", x: 620, y: 300 },
] as const;

/* Cincin ikonnya diangkat dari render still pertama: pada lingkaran yang lama,
   ikon bawah duduk tepat di atas garis judul dan keduanya saling menabrak. */
const PUSAT = { x: 960, y: 404 } as const;

export const Definisi: React.FC = () => {
  const d = useDetik();

  const gembok = munculSkala(d, 0.15);
  const gembokMuncul = t(d, { mulai: 0.15, durasi: 0.5, dari: 0, ke: 1 });

  /* Judul & definisinya mendarat SESUDAH ikonnya berdiri. Gembok dan ikon
     mundur — opasitas dan skala di rentang yang sama — tapi tidak dihapus. */
  const mundur = t(d, {
    mulai: B_DEFINISI + 1.2,
    durasi: 0.8,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const judul = masuk(d, { mulai: B_DEFINISI + 1.4, durasi: 0.55, geser: 24 });
  const definisi = masuk(d, { mulai: B_DEFINISI + 1.75, durasi: 0.55, geser: 20 });

  /* Gembok TERTUTUP sejak frame pertama — dia lambang scene ini, dan gembok
     menganga di kartu penutup mengatakan kebalikan dari yang kita maksud.
     Yang terjadi di tahap 2 bukan "menutup dari keadaan terbuka", melainkan satu
     angkatan pendek lalu turun lagi di atas isinya: itu yang terbaca sebagai
     MENGUNCI SESUATU, bukan sebagai gembok yang kebetulan diam. */

  /* --- tahap 2: teksnya memudar, gembok kembali ke depan dan MENUTUP --- */
  const teksPudar = t(d, { mulai: B_TUTUP, durasi: 0.5, dari: 1, ke: 0 });
  const kembali = t(d, {
    mulai: B_TUTUP + 0.2,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const menutup = tPP(d, {
    mulai: B_TUTUP + 0.7,
    durasi: 0.9,
    dari: 0,
    ke: 1,
  });
  const takeaway = masuk(d, { mulai: B_TUTUP + 1.5, durasi: 0.6, geser: 22 });

  /* Mundur di tahap 1, lalu kembali penuh di tahap 2. */
  const depan = 1 - 0.55 * mundur + 0.55 * kembali * mundur;
  const besar = 1 - 0.2 * mundur + 0.2 * kembali * mundur;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* --- ikon-ikon mengelilingi gembok --- */}
          <g opacity={depan}>
            {IKON.map((ik, i) => {
              const m = masuk(d, {
                mulai: 0.5 + i * 0.1,
                durasi: 0.5,
                geser: 18,
              });
              return (
                <g
                  key={ik.n}
                  style={{ opacity: m.opacity, transform: m.transform }}
                >
                  <use
                    href={`#ic-${ik.n}`}
                    x={ik.x - 48}
                    y={ik.y - 48}
                    width={96}
                    height={96}
                    style={{ color: "var(--ink-1)" }}
                  />
                </g>
              );
            })}
          </g>

          {/* --- gembok di tengah --- */}
          <g opacity={gembokMuncul * depan}>
            <g
              transform={`translate(${PUSAT.x} ${PUSAT.y}) scale(${
                2.4 * gembok * besar
              }) translate(${-PUSAT.x} ${-PUSAT.y})`}
            >
              {/* isi yang dilindungi, di dalam gemboknya — tanpa ini gembok yang
                  menutup di tahap 2 menutup ruang kosong */}
              <g opacity={0.9} data-tumpang="sengaja">
                <rect
                  x={PUSAT.x - 20}
                  y={PUSAT.y + 4}
                  width={40}
                  height={5}
                  rx={2.5}
                  fill="var(--bg)"
                />
                <rect
                  x={PUSAT.x - 20}
                  y={PUSAT.y + 16}
                  width={28}
                  height={5}
                  rx={2.5}
                  fill="var(--bg)"
                />
              </g>
              <Gembok x={PUSAT.x} y={PUSAT.y} terbuka={menutup} />
            </g>
          </g>

          {/* --- judul & definisi --- */}
          <g opacity={teksPudar}>
            <g style={{ opacity: judul.opacity, transform: judul.transform }}>
              <text
                x={960}
                y={776}
                fontSize={82}
                fontFamily="var(--font-display)"
                fontWeight={800}
                fill="var(--ink-0)"
                textAnchor="middle"
              >
                APA ITU ENKRIPSI?
              </text>
            </g>
            <g style={{ opacity: definisi.opacity, transform: definisi.transform }}>
              <text
                x={960}
                y={852}
                fontSize={38}
                fontFamily="var(--font-body)"
                fontWeight={600}
                fill="var(--ink-1)"
                textAnchor="middle"
              >
                Mengubah data menjadi bentuk yang tidak mudah dibaca
              </text>
              <text
                x={960}
                y={902}
                fontSize={38}
                fontFamily="var(--font-body)"
                fontWeight={600}
                fill="var(--ink-1)"
                textAnchor="middle"
              >
                tanpa kunci yang tepat.
              </text>
            </g>
          </g>

          {/* --- baris terakhir --- */}
          <g style={{ opacity: takeaway.opacity, transform: takeaway.transform }}>
            <text
              x={960}
              y={836}
              fontSize={58}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--accent-ink)"
              textAnchor="middle"
              letterSpacing={2}
            >
              ENKRIPSI = MELINDUNGI DATA
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
