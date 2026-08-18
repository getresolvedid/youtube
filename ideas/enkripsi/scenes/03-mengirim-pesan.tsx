/* T17 (provisional) · scene 3 · mengirim-pesan — bagian 3 [problem]
   VO:        03-mengirim-pesan-vo.md
   Direction: 03-mengirim-pesan-direction.md

   Frame pertama sesudah kartu judul. Scene ini TIDAK mengajarkan apa pun — ia
   cuma membuat penonton mengenali situasinya sebagai situasinya sendiri.

   DUA KEPUTUSAN:

   1. TAHAP 1 -> 2 MERAPAT, BUKAN POTONG KERAS. Ini pengecualian yang disengaja
      dari patokan 95% potong keras di docs/02, dan satu-satunya di episode ini
      (arahan user: "Instead of cutting immediately, move the camera toward the
      smartphone"). Satu `kamera({skala})` dipakai seluruh grup.

   2. PAKETNYA LAHIR DI SINI, dan bentuknya dipatok sampai akhir episode —
      `Paket` di ../panggung-kiriman.tsx. Tiga bilah putih di dalamnya = kalimat
      yang masih terbaca; itu yang nanti hilang di scene 6.
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import { Hp, PESAN, Paket, Sosok, kamera, layarHp } from "../panggung-kiriman";
import { beat } from "../timing.gen";

const ID = "mengirim-pesan";

const B_BAYANG = beat(ID, 0); // "Sekarang, bayangkan kamu ingin mengirim pesan…"
const B_BUKA = beat(ID, 1); // "Kamu membuka percakapan."
const B_KETIK = beat(ID, 2); // "Kamu mengetik, 'Halo, apa kabar?'"
const B_KIRIM = beat(ID, 3); // "Lalu, kamu menekan tombol kirim."
const B_KELUAR = beat(ID, 4); // "Tapi sebenarnya, pesan itu harus melewati internet…"

/** HP di meja, sebelum kamera merapat. */
const HP = { x: 928, y: 556, w: 150, h: 262 } as const;

/** Skala kamera saat HP mengisi ~75% frame. Diturunkan dari tinggi HP: layar
 *  1080 dibagi tinggi HP 262, dikali 0,75. Ditulis sebagai angka jadi supaya
 *  tidak ada yang mengira ia boleh disetel bebas — tahap 3 bergantung padanya. */
const RAPAT = 3.1;

/** TITIK TUMPU KAMERA — di baris kolom ketik, BUKAN di tengah HP.
 *
 *  Perbaikan dari render still pertama. Dengan tumpu di tengah HP, kolom ketik
 *  dan tombol kirim — satu-satunya tempat yang benar-benar terjadi sesuatu di
 *  tahap 3 dan 4 — terdorong ke tepi bawah frame dan bertabrakan dengan kotak
 *  subtitel preview, sementara dua pertiga layar atas cuma ruang percakapan
 *  kosong. Bertumpu di kolomnya, aksinya tinggal di tempat dan ruang kosongnya
 *  yang terdorong keluar. */
const Y_KOLOM = 556 + 209;

/** Bidang layar HP-nya, diturunkan dari badannya — bukan diketik ulang.
 *  Isi percakapan ditaruh relatif terhadap ini supaya ia ikut sendiri kalau
 *  bentuk `Hp` berubah lagi. */
const LAYAR = layarHp(HP.x, HP.y, HP.w, HP.h);

export const MengirimPesan: React.FC = () => {
  const d = useDetik();

  const bangun = masuk(d, { mulai: B_BAYANG + 0.05, durasi: 0.8, geser: 24 });
  const angkat = t(d, {
    mulai: B_BAYANG + 0.7,
    durasi: 1.0,
    dari: 16,
    ke: 0,
    ease: E.expoOut,
  });
  const nyala = t(d, { mulai: B_BAYANG + 1.1, durasi: 0.7, dari: 0, ke: 1 });

  /* --- tahap 2: kamera merapat ke HP, bukan potong ---
     Titik tumpunya di tengah HP, jadi HP-nya tinggal di tempat sementara meja
     dan sosoknya keluar bingkai sendiri. */
  const rapat = t(d, {
    mulai: B_BUKA,
    durasi: 1.5,
    dari: 1,
    ke: RAPAT,
    ease: E.expoOut,
  });
  const chat = t(d, { mulai: B_BUKA + 0.5, durasi: 0.6, dari: 0, ke: 1 });
  const kolom = t(d, { mulai: B_BUKA + 0.9, durasi: 0.5, dari: 0, ke: 1 });

  /* --- tahap 3: mengetik --- */
  const nHuruf = Math.floor(
    t(d, {
      mulai: B_KETIK + 0.15,
      durasi: 1.7,
      dari: 0,
      ke: PESAN.length,
      ease: E.linear,
    }),
  );

  /* --- tahap 4: ibu jari sampai, BERHENTI, baru menekan ---
     Jedanya bukan perlambatan: tween tombolnya memang mulai 0,35 dtk sesudah
     ibu jarinya sampai. */
  const jari = t(d, {
    mulai: B_KIRIM,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const tekan = tPP(d, { mulai: B_KIRIM + 0.85, durasi: 0.32, dari: 1, ke: 0.84 });
  const naik = t(d, {
    mulai: B_KIRIM + 1.0,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });

  /* --- tahap 5: gelembung keluar layar dan mengeras jadi paket ---
     Satu nilai untuk radius sudut DAN lebar. Dua tween terpisah membuat sudutnya
     selesai lebih dulu dari lebarnya, dan bentuk antaranya terbaca sebagai
     bentuk ketiga. */
  const keras = t(d, {
    mulai: B_KELUAR + 0.5,
    durasi: 0.6,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const geser = t(d, {
    mulai: B_KELUAR + 0.3,
    durasi: 2.6,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });
  /* Kamera ikut paketnya: HP-nya keluar bingkai ke kiri sementara paketnya
     tinggal di tengah frame. */
  const ikut = t(d, {
    mulai: B_KELUAR + 0.3,
    durasi: 2.6,
    dari: 0,
    ke: -560,
    ease: E.power1out,
  });

  const layarKanan = HP.x + HP.w;
  const xGelembung = HP.x + HP.w / 2 + (layarKanan + 620 - (HP.x + HP.w / 2)) * geser;

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <g
            opacity={bangun.opacity}
            style={{ transform: bangun.transform }}
            transform={`translate(${ikut} 0)`}
          >
            <g transform={kamera(rapat, HP.x + HP.w / 2, Y_KOLOM)}>
              {/* --- meja, memudar sendiri saat kamera merapat --- */}
              <g opacity={1 - chat}>
                <rect
                  x={300}
                  y={806}
                  width={1320}
                  height={14}
                  rx={7}
                  fill="var(--line)"
                />
                <rect
                  x={1210}
                  y={760}
                  width={300}
                  height={44}
                  rx={12}
                  fill="var(--bg-elev)"
                  stroke="var(--line)"
                  strokeWidth={3}
                />
                {/* benda kecil di meja — arahan user minta satu, bukan ruang kosong */}
                <rect
                  x={420}
                  y={744}
                  width={54}
                  height={60}
                  rx={8}
                  fill="var(--bg-elev)"
                  stroke="var(--line)"
                  strokeWidth={3}
                />
                <Sosok x={720} y={806} />
                <path
                  d={`M 800 690 Q 880 700 926 ${664 + angkat}`}
                  stroke="var(--ink-1)"
                  strokeWidth={30}
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              <g transform={`translate(0 ${angkat * (1 - chat)})`}>
                <Hp {...HP} nyala={nyala}>
                  {/* --- aplikasi percakapan, muncul di tahap 2 --- */}
                  <g opacity={chat}>
                    {/* Kepala percakapan — DIPATOK ke tepi atas bidang layar,
                        bukan ke tepi badan HP. Sejak `Hp` punya bezel, lubang
                        suara, dan kamera depan, dua tepi itu tidak lagi
                        berjarak sama, dan offset yang diketik dari badan
                        membuat kepala percakapan menempel di bezelnya. */}
                    <rect
                      x={LAYAR.x}
                      y={LAYAR.y}
                      width={LAYAR.w}
                      height={22}
                      fill="var(--bg-elev)"
                    />
                    <text
                      x={LAYAR.x + 11}
                      y={LAYAR.y + 16}
                      fontSize={12}
                      fontFamily="var(--font-body)"
                      fontWeight={700}
                      fill="var(--ink-0)"
                    >
                      Teman
                    </text>

                    {/* kolom ketik */}
                    <rect
                      x={HP.x + 12}
                      y={HP.y + 196}
                      width={HP.w - 52}
                      height={26}
                      rx={13}
                      fill="var(--bg)"
                      stroke={kolom > 0.5 ? "var(--accent-ink)" : "var(--line)"}
                      strokeWidth={1.5}
                    />
                    <text
                      x={HP.x + 20}
                      y={HP.y + 213}
                      fontSize={9.5}
                      fontFamily="var(--font-body)"
                      fill="var(--ink-2)"
                      opacity={nHuruf === 0 ? 1 : 0}
                    >
                      Ketik pesan…
                    </text>
                    <text
                      x={HP.x + 20}
                      y={HP.y + 213}
                      fontSize={9.5}
                      fontFamily="var(--font-body)"
                      fill="var(--ink-0)"
                    >
                      {PESAN.slice(0, nHuruf)}
                    </text>

                    {/* tombol kirim */}
                    <g
                      transform={`translate(${HP.x + HP.w - 22} ${
                        HP.y + 209
                      }) scale(${tekan}) translate(${-(HP.x + HP.w - 22)} ${-(
                        HP.y + 209
                      )})`}
                    >
                      <circle
                        cx={HP.x + HP.w - 22}
                        cy={HP.y + 209}
                        r={13}
                        fill="var(--accent)"
                      />
                      <path
                        d={`M ${HP.x + HP.w - 33} ${HP.y + 209} h 10 M ${
                          HP.x + HP.w - 26
                        } ${HP.y + 205} l 4 4 l -4 4`}
                        stroke="var(--ink-0)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </g>

                    {/* ibu jari — bilah tumpul, bukan tangan berdetail */}
                    {/* Ibu jari — bilah tumpul, bukan tangan berdetail. Ia hanya
                        ADA saat tahap 4 (`opacity={jari}`): sebelum itu ia
                        tergeletak di bawah bidang layar dan terbaca sebagai
                        gumpalan abu-abu yang tidak jelas apa. Ketahuan dari
                        render still, bukan dari pemeriksaan mana pun. */}
                    <rect
                      x={HP.x + HP.w - 46 + 20 * jari}
                      y={HP.y + 238 - 30 * jari}
                      width={28}
                      height={50}
                      rx={14}
                      fill="var(--ink-1)"
                      opacity={0.7 * jari}
                    />
                  </g>
                </Hp>
              </g>
            </g>

            {/* --- gelembung yang naik ke percakapan lalu keluar layar ---
                Digambar DI LUAR <Hp> supaya ia tidak ikut terpotong bidang
                layarnya saat menyeberangi tepi. */}
            <g transform={kamera(rapat, HP.x + HP.w / 2, Y_KOLOM)}>
              <g opacity={naik}>
                <Paket
                  x={xGelembung}
                  y={HP.y + 170 - 46 * naik}
                  radius={22 - 12 * keras}
                  lebar={104 - 20 * keras}
                  tinggi={62 + 8 * keras}
                  skala={0.42 + 0.02 * keras}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
