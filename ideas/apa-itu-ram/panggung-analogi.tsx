/* Panggung bersama `bolak-balik` (scene 3), `ram-analogy` (scene 4),
   `kenapa-cepat` (scene 5), dan `ram-tugas` (scene 10).

   Keempat scene itu memakai RUANG YANG SAMA, dan itu bukan kebetulan melainkan
   gagasan utamanya: scene 3 menggambar lubang berbentuk meja di ruang kosong
   antara gudang dan prosesor, scene 4 mengisi lubang itu, scene 5 menjelaskan
   kenapa isian itu bekerja. Supaya potongan keras di antara ketiganya terbaca
   sebagai "ruangan yang sama, kelanjutan yang sama" dan bukan sebagai "layar
   berganti", siluet, meja nyata, dan kedua garisnya harus menempati piksel yang
   sama.

   Scene 9 kembali ke ruangan itu sesudah tiga scene yang mendekatkan kamera ke
   batangnya, dan justru itu sebabnya ia harus memakai koordinat yang sama
   persis: kalau mejanya berdiri beberapa piksel dari tempatnya yang dulu,
   "mundur sedikit, lihat mejanya utuh lagi" berhenti terbaca sebagai kembali
   dan jadi panggung baru yang kebetulan mirip.

   Karena itu koordinatnya tinggal di sini, bukan diketik dua kali. Dua salinan
   angka yang wajib sama adalah dua angka yang akan berbeda dalam seminggu, dan
   melesetnya tidak akan terlihat sebagai error — cuma sebagai meja yang meleset
   sedikit saat scene berganti.

   Berkas ini SENGAJA di luar `scenes/`. `npm run sisa` memeriksa setiap `.tsx`
   di dalam `scenes/` terhadap daftar kunci dari naskah (HARD RULE 5), jadi
   berkas bantu di sana akan dilaporkan sebagai nama yang tidak dikenal. Di
   tingkat episode, di samping Episode.tsx, ia memang bukan scene.
*/
import type React from "react";

import { E, t } from "../../shared/anim";
import { Ic } from "../../shared/Icons";

/* ===========================================================================
   Koordinat — px pada frame 1920x1080
   ======================================================================== */

export const KARTU = { w: 330, h: 360 };
export const Y_KARTU = 460;

/** Posisi akhir kedua kartu. Scene 3 yang menggesernya ke sini; scene 4 mulai
 *  dengan keduanya SUDAH di sini dan tidak memindahkannya lagi. */
export const X_LEMARI = 290;
export const X_PROSESOR = 1650;
/** Lemari mengecil setelah menepi: makin jauh, makin kecil. */
export const SKALA_LEMARI = 0.86;

/** Lemari arsip — ukuran .lemari/.laci di shared/figur.css. */
export const LEMARI = { w: 240, h: 262, pad: 15, gap: 9, n: 4, atas: 26 };
export const TINGGI_LACI =
  (LEMARI.h - 2 * LEMARI.pad - (LEMARI.n - 1) * LEMARI.gap) / LEMARI.n;

/** Berkas per laci. Tiga, bukan satu: gudangnya harus terbaca PENUH, dan
 *  salinan yang berangkat di scene 4 harus terbaca sebagai satu dari banyak. */
export const PER_LACI = 3;
export const BERKAS_LACI = 44;
/** Jarak mendatar antar berkas dalam satu laci, dari pusat laci. */
export const JARAK_BERKAS = 58;

/** Laci dan kolom yang jadi sumber salinan di scene 4. Kolom tengah (offset 0)
 *  supaya titik berangkatnya persis di sumbu kartu — satu angka lebih sedikit
 *  yang bisa meleset. */
export const LACI_SUMBER = 1;

/** Pusat laci ke-i, pada kartu yang BELUM diskalakan. */
export const yLaciLokal = (i: number): number =>
  Y_KARTU -
  KARTU.h / 2 +
  LEMARI.atas +
  LEMARI.pad +
  i * (TINGGI_LACI + LEMARI.gap) +
  TINGGI_LACI / 2;

/** Titik sebuah berkas di dalam laci, dalam koordinat frame.
 *  Dihitung, bukan diketik: kalau SKALA_LEMARI berubah dan angkanya tetap,
 *  berkasnya berangkat dari titik di udara beberapa piksel dari lacinya. */
export const titikLaci = (
  i: number,
  { skala = SKALA_LEMARI, x = X_LEMARI, kolom = 0 } = {},
): { x: number; y: number } => ({
  x: x + kolom * JARAK_BERKAS * skala,
  y: Y_KARTU + (yLaciLokal(i) - Y_KARTU) * skala,
});

/** Pusat ikon prosesor di dalam kartunya. */
export const P_PROSESOR = {
  x: X_PROSESOR,
  y: Y_KARTU - KARTU.h / 2 + LEMARI.atas + LEMARI.h / 2,
};

/* --- meja: lubangnya (scene 3) dan bendanya (scene 4) --------------------- */

export const MEJA = { w: 520, kaki: 144, skala: 1.25 };
export const X_MEJA = 1070;
/** Tepi atas papan meja. Skala meja bertumpu di sini (`transform-origin: top`),
 *  jadi angka ini tidak berubah saat skalanya berubah — dan permukaan meja
 *  adalah tempat berkas mendarat, satu-satunya yang harus pasti. */
export const Y_MEJA = 500;
export const LEBAR_MEJA = MEJA.w * MEJA.skala;

/** Kotak meja dalam koordinat frame — dipakai siluet putus-putus scene 3 dan
 *  garis tautan ke prosesor di scene 4. Angka 34 & 9 adalah inset dan tebal
 *  kaki di `.meja::after` (shared/figur.css); ikut diskalakan supaya siluet
 *  benar-benar sebentuk dengan bendanya. */
export const KOTAK_MEJA = {
  kiri: X_MEJA - LEBAR_MEJA / 2,
  kanan: X_MEJA + LEBAR_MEJA / 2,
  atas: Y_MEJA,
  papanBawah: Y_MEJA + 34 * MEJA.skala,
  bawah: Y_MEJA + MEJA.kaki * MEJA.skala,
  kakiKiri: X_MEJA - LEBAR_MEJA / 2 + (34 + 4.5) * MEJA.skala,
  kakiKanan: X_MEJA + LEBAR_MEJA / 2 - (34 + 4.5) * MEJA.skala,
};

/** Garis penghubung — tebal, warna, dan opasitas yang sama di kedua scene.
 *  Jarak dibandingkan lewat PANJANGNYA; begitu dua garis beda bobot, yang
 *  dibandingkan penonton bukan lagi panjangnya. */
export const GARIS = { warna: "var(--accent-ink)", tebal: 4, opasitas: 0.55 };

/* --- jalur panjang & tautan pendek ---------------------------------------
   Scene 4 yang MENGGAMBAR keduanya; scene 5 mewarisi keduanya sudah jadi dan
   memakainya sebagai dua benda yang dibandingkan (`1x` vs "ribuan kali").
   Karena itu angkanya di sini: jalur yang bergeser beberapa piksel saat scene
   berganti bukan error, cuma garis yang tiba-tiba pindah — persis jenis
   kesalahan yang tidak terlihat sampai ada yang menonton potongannya. */

/** Sisi kotak ikon berkas saat sudah mendarat di meja. */
export const BERKAS = 120;
/** Berkas `file` mengisi y 12..84 dari viewBox 96, jadi sisi bawah gambarnya
 *  12,5% dari sisi kotak di atas dasar kotak. Itu yang dikurangkan supaya
 *  berkasnya duduk DI ATAS papan, bukan tenggelam separuh. */
export const dudukDiMeja = (sisi: number): number => Y_MEJA - sisi / 2 + sisi * 0.125;

export const ASAL = titikLaci(LACI_SUMBER, { skala: SKALA_LEMARI, x: X_LEMARI });
export const TUJUAN = { x: X_MEJA - 25, y: dudukDiMeja(BERKAS) };
/** Titik kendali lengkung. Salinan diangkat dulu sebelum turun — perjalanan
 *  mendatar lurus terbaca sebagai benda yang digeser, bukan dibawa. */
export const C_TERBANG = { x: (ASAL.x + TUJUAN.x) / 2, y: 246 };
/** Panjang lengkung, hampiran (rerata tali busur & jaring kendali). Dipakai
 *  sebagai dasharray sekaligus offset awal supaya jalurnya tergambar seiring
 *  berkasnya bergerak. */
export const L_JALUR = 800;
export const D_JALUR = `M${ASAL.x} ${ASAL.y} Q${C_TERBANG.x} ${C_TERBANG.y} ${TUJUAN.x} ${TUJUAN.y}`;

/** Tautan pendek meja <-> prosesor, dan lompatan kecil di atasnya. */
export const RAIH_MEJA = { x: KOTAK_MEJA.kanan, y: KOTAK_MEJA.atas + 18 };
export const RAIH_CPU = { x: X_PROSESOR - 165, y: P_PROSESOR.y + 55 };
export const PANJANG_RAIH = Math.hypot(RAIH_CPU.x - RAIH_MEJA.x, RAIH_CPU.y - RAIH_MEJA.y);

/* ===========================================================================
   Perabot
   ======================================================================== */

export const Kartu: React.FC<{
  x: number;
  skala?: number;
  label: string;
  opacity?: number;
  children: React.ReactNode;
}> = ({ x, skala = 1, label, opacity = 1, children }) => (
  <div
    className="panel"
    style={{
      position: "absolute",
      left: x - KARTU.w / 2,
      top: Y_KARTU - KARTU.h / 2,
      width: KARTU.w,
      height: KARTU.h,
      padding: 0,
      opacity,
      transform: `scale(${skala})`,
      transformOrigin: "center",
    }}
  >
    {/* Bendanya dibungkus <div>, tidak ditaruh sebagai anak langsung .panel:
        `.panel:has(> .ic)` di theme.css menata anaknya sebagai grid ikon-kiri
        teks-kanan, dan tata letak itu untuk kartu daftar, bukan untuk figur. */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: LEMARI.atas,
        height: LEMARI.h,
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </div>

    <p
      className="t-sub"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 22,
        textAlign: "center",
        fontSize: "calc(var(--fs-sub) * 0.72)",
        color: "var(--ink-0)",
      }}
    >
      {label}
    </p>
  </div>
);

export const Lemari: React.FC<{
  /** Opasitas berkas ke-`n` (0..PER_LACI*n-1, urut kiri->kanan lalu ke bawah).
   *  Fungsi, bukan angka: scene yang menentukan kapan tiap berkas datang. */
  isi: (n: number) => number;
  /** 0..1 — berkas sumber berubah dari abu-abu jadi aksen. */
  sumber?: number;
  /** Skala denyut berkas sumber. */
  denyut?: number;
}> = ({ isi, sumber = 0, denyut = 1 }) => (
  <div className="lemari" style={{ width: LEMARI.w, height: LEMARI.h }}>
    {Array.from({ length: LEMARI.n }, (_, i) => (
      <div
        key={i}
        /* Latar --bg, bukan --bg-elev bawaannya: di dalam .panel yang juga
           --bg-elev, laci bawaan itu tidak terlihat sama sekali. */
        style={{ position: "relative", background: "var(--bg)" }}
        className="laci"
      >
        {Array.from({ length: PER_LACI }, (_, j) => {
          const kolom = j - (PER_LACI - 1) / 2;
          const n = i * PER_LACI + j;
          const ini = isi(n);
          const iniSumber = i === LACI_SUMBER && kolom === 0;

          return (
            <div
              key={j}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: BERKAS_LACI,
                height: BERKAS_LACI,
                marginLeft: -BERKAS_LACI / 2 + kolom * JARAK_BERKAS,
                marginTop: -BERKAS_LACI / 2,
                opacity: ini,
                transform: `scale(${iniSumber ? denyut : 1})`,
              }}
            >
              <Ic
                n="file"
                warna="c-mute"
                style={{ width: BERKAS_LACI, height: BERKAS_LACI }}
              />
              {/* Lapis aksen ditumpuk, bukan kelas yang ditukar — kelas cuma
                  bisa hidup-mati, opasitas bisa jadi fungsi frame. */}
              {iniSumber && (
                <Ic
                  n="file"
                  warna="c-accent"
                  tumpang="sengaja"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: BERKAS_LACI,
                    height: BERKAS_LACI,
                    opacity: sumber,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

/** Prosesor. `nyala` 0..1 — 0 berarti ia sedang menunggu, 1 berarti berkasnya
 *  ada di tangannya. Di scene 3 nilai ini nol hampir sepanjang waktu; itulah
 *  isi scene-nya. */
export const Prosesor: React.FC<{ nyala: number }> = ({ nyala }) => (
  <div style={{ position: "relative", width: 180, height: 180 }}>
    <Ic
      n="chip"
      ukuran="lg"
      warna="c-mute"
      style={{ position: "absolute", inset: 0, opacity: 0.45 + 0.25 * nyala }}
    />
    <Ic
      n="chip"
      ukuran="lg"
      warna="c-accent"
      tumpang="sengaja"
      style={{ position: "absolute", inset: 0, opacity: nyala }}
    />
  </div>
);

/** Lubang berbentuk meja. Digambar putus-putus dan TIDAK PERNAH diisi di scene
 *  3 — meja nyatanya baru datang di scene 4, tepat di kotak ini. */
export const SiluetMeja: React.FC<{
  gambar: number;
  opacity?: number;
  /** Dibedakan per scene: dua <mask> ber-id sama di satu dokumen akan saling
   *  menimpa, dan yang kalah diam-diam memakai reveal milik yang lain. */
  id?: string;
}> = ({ gambar, opacity = 1, id = "siluet-meja" }) => {
  const k = KOTAK_MEJA;
  /* Satu path, satu reveal: papan digambar dulu (searah jarum jam), lalu turun
     ke kedua kaki. Kalau ketiganya path terpisah, ketiganya mulai bersamaan dan
     mejanya terbaca muncul, bukan tergambar. */
  const d = [
    `M${k.kiri} ${k.papanBawah}V${k.atas}H${k.kanan}V${k.papanBawah}Z`,
    `M${k.kakiKiri} ${k.papanBawah}V${k.bawah}`,
    `M${k.kakiKanan} ${k.papanBawah}V${k.bawah}`,
  ].join("");
  /* Hampiran panjang total: keliling papan + dua kaki. */
  const L =
    2 * (k.kanan - k.kiri) + 2 * (k.papanBawah - k.atas) + 2 * (k.bawah - k.papanBawah);

  /* Putus-putus DAN tergambar bertahap — dua hal yang sama-sama butuh
     `stroke-dasharray`, jadi tidak bisa ditumpuk di satu elemen. Yang tergambar
     adalah MASKER-nya (garis tebal, tanpa putus); garis putus-putusnya sendiri
     diam dan cuma terlihat sejauh maskernya sudah sampai. Versi pertama memakai
     dasharray untuk reveal saja, dan hasilnya siluet bergaris penuh — terbaca
     sebagai meja yang memang ada, bukan sebagai lubang berbentuk meja. */
  return (
    <g opacity={opacity}>
      <mask id={id} maskUnits="userSpaceOnUse">
        <path
          d={d}
          fill="none"
          stroke="#fff"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={L}
          strokeDashoffset={L * (1 - gambar)}
        />
      </mask>
      <path
        d={d}
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={4}
        strokeLinecap="butt"
        strokeDasharray="16 14"
        mask={`url(#${id})`}
      />
    </g>
  );
};

/** Meja nyata. Papan + kaki dari `.meja` di shared/figur.css; `tumbuh` 0..1
 *  membuatnya melebar mengisi siluet, bukan sekadar muncul. */
export const MejaNyata: React.FC<{ tumbuh: number; opacity: number }> = ({
  tumbuh,
  opacity,
}) => (
  <div
    style={{
      position: "absolute",
      left: X_MEJA - MEJA.w / 2,
      top: Y_MEJA,
      opacity,
      transform: `translateY(${(1 - tumbuh) * 26}px) scale(${
        MEJA.skala
      }) scaleX(${0.24 + 0.76 * tumbuh})`,
      transformOrigin: "top center",
    }}
  >
    <div className="meja" style={{ width: MEJA.w }} />
  </div>
);

/* ===========================================================================
   Gerak bersama
   ======================================================================== */

/** Satu putaran antar-jemput: berangkat, dipakai sebentar, pulang, menunggu.
 *  Mengembalikan posisi 0..1 pada lintasan dan seberapa "terpakai" tujuannya.
 *
 *  Ditulis dengan `%`, dan itu tetap fungsi murni dari frame — yang dilarang
 *  shared/anim.ts adalah state, bukan aritmetika. Seek ke detik mana pun
 *  menghasilkan putaran yang sama.
 */
export const antarJemput = (
  detik: number,
  { mulai, siklus }: { mulai: number; siklus: number },
): { maju: number; sampai: number; jalan: boolean } => {
  if (detik < mulai) return { maju: 0, sampai: 0, jalan: false };
  const u = ((detik - mulai) % siklus) / siklus;

  /* 0,00-0,40 berangkat · 0,40-0,50 dipakai · 0,50-0,90 pulang · 0,90-1 diam */
  const maju =
    u < 0.4
      ? E.power2out(u / 0.4)
      : u < 0.5
        ? 1
        : u < 0.9
          ? 1 - E.power2out((u - 0.5) / 0.4)
          : 0;

  const sampai = u >= 0.36 && u < 0.56 ? 1 : 0;
  return { maju, sampai, jalan: true };
};

/** Titik pada lengkung kuadratik — lintasan salinan & antar-jemput. */
export const lengkung = (
  p: number,
  A: { x: number; y: number },
  C: { x: number; y: number },
  B: { x: number; y: number },
): { x: number; y: number } => ({
  x: (1 - p) ** 2 * A.x + 2 * (1 - p) * p * C.x + p ** 2 * B.x,
  y: (1 - p) ** 2 * A.y + 2 * (1 - p) * p * C.y + p ** 2 * B.y,
});

/** Denyut halus, periode tetap — dipakai supaya scene panjang tidak punya
 *  frame beku (docs/02 § pacing, "tidak ada layar diam lebih dari 4 detik"). */
export const napas = (
  detik: number,
  { mulai, periode = 2.6, jauh = 4 }: { mulai: number; periode?: number; jauh?: number },
): number =>
  detik <= mulai ? 0 : Math.sin(((detik - mulai) * 2 * Math.PI) / periode) * jauh;

/** Tween pendek yang dipakai berulang di kedua scene. */
export const munculkan = (detik: number, mulai: number, durasi = 0.4): number =>
  t(detik, { mulai, durasi, dari: 0, ke: 1, ease: E.expoOut });
