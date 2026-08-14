/* T14 · scene 12 · ganti-loket — bagian 7 [case], 43,69 dtk
   VO:        12-ganti-loket-vo.md
   Direction: 12-ganti-loket-direction.md

   BUKAN RANGKUMAN (docs/02 § Aturan flow). Tidak ada daftar poin dan tidak ada
   "tadi kita sudah belajar" — yang terjadi di sini satu keputusan nyata,
   dibedah. Kalimat bawa-pulang ditaruh sebagai penutupnya, lalu potong keras ke
   tanda brand.

   EMPAT KEPUTUSAN:

   0. Frame pertamanya MEWARISI frame terakhir `11-amplop-vs-segel`: jalur di
      garis 900 dan kartu "?" yang berhenti di `TANGGA.x0`. Keduanya digambar
      ulang di sini apa adanya, dan loket terdekat tumbuh TEPAT di titik itu.
      Urutan tahap 1 mengikat — tumbuh dulu, kamera mundur belakangan; mundur
      lebih dulu memindahkan titiknya sebelum penonton melihat apa yang tumbuh
      di sana, dan potongan kerasnya kembali terbaca sebagai layar baru.

   1. Tahap 10 (papan catatan di loket BARU) adalah tahap terpenting dan paling
      gampang hilang saat memotong durasi. Tanpa dia, episode berakhir dengan
      saran terselubung untuk mengganti loket — padahal yang barusan dijelaskan
      justru bahwa loket melihat semua yang ditanyakan. Papannya WAJIB komponen
      `Papan` yang sama dengan scene 10, di posisi dan skala yang sama persis:
      kesamaan itu yang membuatnya mendarat tanpa perlu dijelaskan lagi.

   2. Bilah waktu TANPA ANGKA. Yang membuktikan klaimnya adalah panjang relatif —
      potongan pendek lawan sisa yang panjang — dan panjang relatif tidak butuh
      sumber (`naskah.md § Sumber` masih ⚠). Kalau pengukurannya nanti jadi,
      angka boleh masuk ke LAYAR di tahap ini; jangan pernah masuk ke VO.

   3. Tahap 8 tidak menyebut siapa yang memblokir dan tidak menggambarkannya.
      Tanpa lambang, tanpa seragam. Yang digambar cuma dua jawaban berbeda untuk
      nama yang sama — begitu scene ini menyebut lembaga, ia jadi video lain yang
      tidak bisa ditonton dua tahun lagi.
*/
import type React from "react";

import { E, gambarGaris, masuk, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  I_PEMILIK,
  jendelaLoket,
  Kartu,
  Loket,
  NOMOR_BARU,
  Papan,
  posLoket,
  POTONGAN,
  TANGGA,
} from "../panggung-loket";
import { P_PAPAN } from "./10-polos";
import { beat } from "../timing.gen";

const ID = "ganti-loket";

const B_MUNDUR = beat(ID, 0); // "Sekarang mundur sedikit, dan lihat tangganya utuh lagi."
const B_SATU = beat(ID, 1); // "Dari semua loket itu, ada satu yang bisa kamu ganti sendiri."
const B_DEKAT = beat(ID, 2); // "Yang paling dekat denganmu. Yang selama ini bertanya untukmu."
const B_KENCANG = beat(ID, 3); // "Orang menggantinya, lalu bilang internetnya jadi lebih kencang."
const B_CUMA = beat(ID, 4); // "Yang berubah sebenarnya cuma satu. ..."
const B_SAMA = beat(ID, 5); // "Setelah nomornya ketemu, jalurnya sama persis ..."
const B_LAIN = beat(ID, 6); // "Yang benar-benar berubah biasanya hal lain."
const B_DIJAWAB = beat(ID, 7); // "Situs yang tadinya dijawab salah, sekarang dijawab benar."
const B_TERBUKA = beat(ID, 8); // "Itu terbuka. Bukan kencang."
const B_MELIHAT = beat(ID, 9); // "Dan loket barunya tetap melihat semua yang kamu tanyakan."
const B_SEBELUM = beat(ID, 10); // "Sebelum kamu sampai ke mana pun, ada yang ditanya dulu."
const B_BAWA = beat(ID, 11); // "Ganti loketnya boleh. ..."

const NAMA = POTONGAN.join(".");

/** Bilah waktu memuat satu halaman. Potongan pertama SANGAT pendek — itu
 *  seluruh buktinya, dan ia relatif, bukan bilangan. */
const BILAH = { x: 300, w: 1320, y: 918 };
const W_TANYA = 92;

export const GantiLoket: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: warisan scene 11, loket tumbuh, BARU kamera mundur ---
     Jalur di garis 900 dan kartu yang berhenti di TANGGA.x0 adalah frame
     terakhir `11-amplop-vs-segel`, digambar ulang di sini apa adanya supaya
     potongan kerasnya jatuh di atas dua benda yang tidak bergerak. Urutannya
     mengikat: tumbuh dulu, mundur belakangan. Mundur lebih dulu memindahkan
     titik itu sebelum penonton melihat apa yang tumbuh di sana. */
  const tumbuh = t(d, { mulai: B_MUNDUR + 0.1, durasi: 0.55, dari: 0, ke: 1, ease: E.expoOut });
  const kartuMasuk = t(d, { mulai: B_MUNDUR + 0.45, durasi: 0.4, dari: 0, ke: 1, ease: E.power2in });
  const mundur = t(d, { mulai: B_MUNDUR + 0.7, durasi: 0.9, dari: 0, ke: 1, ease: E.expoOut });
  const sisaTangga = t(d, { mulai: B_MUNDUR + 0.75, durasi: 0.7, dari: 0, ke: 1 });
  const jalurPergi = 1 - t(d, { mulai: B_MUNDUR + 0.8, durasi: 0.7, dari: 0, ke: 1 });
  const skala = 1 - 0.18 * mundur;

  /* --- tahap 2 & 3: loket terbawah menyala, sisanya jadi siluet --- */
  const pilih = t(d, { mulai: B_SATU, durasi: 0.6, dari: 0, ke: 1 });
  const label = t(d, { mulai: B_DEKAT, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 4: loketnya ditukar --- */
  const keluarLoket = t(d, { mulai: B_KENCANG + 0.2, durasi: 0.5, dari: 0, ke: 1, ease: E.power2in });
  const masukLoket = t(d, { mulai: B_KENCANG + 0.4, durasi: 0.55, dari: 0, ke: 1, ease: E.expoOut });
  const klaim = t(d, { mulai: B_KENCANG + 0.6, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 5 & 6: bilah waktu, dan sisanya yang tidak berubah --- */
  const bilah = gambarGaris(d, BILAH.w, { mulai: B_CUMA + 0.15, durasi: 0.7 });
  const sorot = t(d, { mulai: B_CUMA + 0.7, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });
  const sisaSama = t(d, { mulai: B_SAMA + 0.2, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 7: klaimnya dicoret --- */
  const coret = gambarGaris(d, 420, { mulai: B_LAIN + 0.15, durasi: 0.35 });

  /* --- tahap 8 & 9: dijawab salah, lalu dijawab benar --- */
  const jawab = t(d, { mulai: B_DIJAWAB + 0.2, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const terbuka = t(d, { mulai: B_TERBUKA + 0.15, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });
  const kencangPergi = t(d, { mulai: B_TERBUKA + 0.4, durasi: 0.6, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 10: papan yang SAMA PERSIS dengan scene 10 --- */
  const papan = t(d, { mulai: B_MELIHAT, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const barisPapan = t(d, { mulai: B_MELIHAT + 0.3, durasi: 2.6, dari: 0, ke: 4, ease: E.linear });

  /* --- tahap 11 & 12: semua padam, satu loket, lalu kalimat bawa-pulang --- */
  const padam = t(d, { mulai: B_SEBELUM, durasi: 0.8, dari: 1, ke: 0 });
  const tanyaMasuk = t(d, { mulai: B_SEBELUM + 0.5, durasi: 0.9, dari: 0, ke: 1, ease: E.power2out });

  const P0 = posLoket(0);
  const J0 = jendelaLoket(0);

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g transform={`translate(960 560) scale(${skala}) translate(-960 -560)`}>
            {/* ---------- warisan frame terakhir scene 11 ---------- */}
            <g opacity={jalurPergi * padam}>
              <path d="M160 900H1920" stroke="var(--line)" strokeWidth={6} strokeLinecap="round" />
            </g>
            <Kartu
              x={TANGGA.x0 + (J0.x - TANGGA.x0) * kartuMasuk}
              y={900 + (J0.y - 900) * kartuMasuk}
              teks="?"
              skala={0.5 * (1 - 0.4 * kartuMasuk)}
              opacity={(1 - kartuMasuk) * padam}
            />

            {/* ---------- tangga: sisanya jadi siluet ---------- */}
            <g opacity={padam}>
              {Array.from({ length: TANGGA.n }, (_, i) => {
                if (i === 0) return null;
                const p = posLoket(i);
                return (
                  <Loket
                    key={i}
                    x={p.x}
                    y={p.y}
                    skala={p.skala}
                    nyala={1 - 0.82 * pilih}
                    aksen={i === I_PEMILIK}
                    isi={i === I_PEMILIK ? 1 : 0}
                    opacity={sisaTangga}
                  />
                );
              })}

              {/* loket lama: TUMBUH dari lantai di tahap 1, lalu keluar ke kiri */}
              <g
                transform={`translate(${P0.x} ${P0.y}) scale(1 ${tumbuh}) translate(${-P0.x} ${-P0.y})`}
              >
                <Loket
                  x={P0.x - 620 * keluarLoket}
                  y={P0.y}
                  skala={P0.skala}
                  nyala={1}
                  opacity={1 - keluarLoket}
                />
              </g>
              {/* loket baru masuk dari kanan */}
              <Loket
                x={P0.x + 620 * (1 - masukLoket)}
                y={P0.y}
                skala={P0.skala}
                nyala={1}
                opacity={masukLoket}
              />

              <g style={masuk(d, { mulai: B_DEKAT, durasi: 0.5, geser: 14 })} opacity={label}>
                <text
                  x={P0.x}
                  y={P0.y + 44}
                  fontSize={27}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill="var(--ink-1)"
                  textAnchor="middle"
                >
                  yang bertanya untukmu
                </text>
              </g>
            </g>

            {/* ---------- papan catatan loket baru — sama persis dengan scene 10 ---------- */}
            <g opacity={papan * padam}>
              <Papan x={P_PAPAN.x} y={P_PAPAN.y} baris={barisPapan} skala={P_PAPAN.skala} />
            </g>
          </g>

          {/* ---------- klaim yang dikutip, lalu dicoret ---------- */}
          <g opacity={klaim * padam}>
            <text
              x={640}
              y={250}
              fontSize={58}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-0)"
              textAnchor="middle"
            >
              “jadi lebih kencang”
            </text>
            <path
              d="M430 234h420"
              stroke="var(--bad)"
              strokeWidth={8}
              strokeLinecap="round"
              {...coret}
            />
          </g>

          {/* ---------- bilah waktu memuat satu halaman ---------- */}
          <g opacity={padam}>
            <path
              d={`M${BILAH.x} ${BILAH.y}h${BILAH.w}`}
              stroke="var(--line)"
              strokeWidth={22}
              strokeLinecap="round"
              {...bilah}
            />
            {/* potongan pertama: bertanya nama. Sangat pendek, dan itu buktinya. */}
            <path
              d={`M${BILAH.x} ${BILAH.y}h${W_TANYA}`}
              stroke="var(--accent-ink)"
              strokeWidth={22}
              strokeLinecap="round"
              opacity={sorot}
            />
            {/* sisanya: tidak ada satu piksel pun yang berubah */}
            <path
              d={`M${BILAH.x + W_TANYA + 12} ${BILAH.y}h${BILAH.w - W_TANYA - 12}`}
              stroke="var(--ink-2)"
              strokeWidth={22}
              strokeLinecap="round"
              opacity={sisaSama * 0.9}
            />
            <text
              x={BILAH.x + W_TANYA / 2}
              y={BILAH.y - 34}
              fontSize={24}
              fontFamily="var(--font-mono)"
              fill="var(--accent-ink)"
              textAnchor="middle"
              opacity={sorot}
            >
              bertanya nama
            </text>
            <text
              x={BILAH.x + (BILAH.w + W_TANYA) / 2}
              y={BILAH.y - 34}
              fontSize={24}
              fontFamily="var(--font-mono)"
              fill="var(--ink-2)"
              textAnchor="middle"
              opacity={sisaSama}
            >
              sisanya — tidak disentuh
            </text>
          </g>

          {/* ---------- dijawab salah, lalu dijawab benar ---------- */}
          <g opacity={jawab * padam}>
            <text
              x={1500}
              y={250}
              fontSize={34}
              fontFamily="var(--font-mono)"
              fill="var(--ink-1)"
              textAnchor="middle"
            >
              {NAMA}
            </text>
            <g opacity={1 - jawab}>
              <path
                d="M1452 300l96 96M1548 300l-96 96"
                stroke="var(--bad)"
                strokeWidth={9}
                strokeLinecap="round"
              />
            </g>
            <g opacity={jawab}>
              <Kartu x={1500} y={348} teks={NOMOR_BARU} skala={0.5} />
            </g>
          </g>

          {/* ---------- terbuka, bukan kencang ---------- */}
          <g opacity={terbuka * padam}>
            <text
              x={960}
              y={470}
              fontSize={96}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--accent-ink)"
              textAnchor="middle"
            >
              terbuka
            </text>
            <text
              x={960 + 520 * kencangPergi}
              y={560}
              fontSize={48}
              fontFamily="var(--font-display)"
              fontWeight={800}
              fill="var(--ink-2)"
              textAnchor="middle"
              opacity={1 - kencangPergi}
            >
              bukan kencang
            </text>
          </g>

          {/* ---------- satu loket, satu pertanyaan, lalu kalimat bawa-pulang ---------- */}
          <g opacity={1 - padam}>
            <Loket x={960} y={640} skala={1.05} nyala={1} />
            <Kartu
              x={520 + 330 * tanyaMasuk}
              y={508}
              teks="?"
              skala={0.5}
              warna="var(--ok)"
              opacity={tanyaMasuk}
            />
            <g style={masuk(d, { mulai: B_BAWA + 0.15, durasi: 0.6, geser: 20 })}>
              <text
                x={960}
                y={790}
                fontSize={44}
                fontFamily="var(--font-display)"
                fontWeight={700}
                fill="var(--ink-0)"
                textAnchor="middle"
              >
                Sebelum kamu sampai ke mana pun,
              </text>
              <text
                x={960}
                y={850}
                fontSize={44}
                fontFamily="var(--font-display)"
                fontWeight={700}
                fill="var(--ink-0)"
                textAnchor="middle"
              >
                ada yang ditanya dulu.
              </text>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
