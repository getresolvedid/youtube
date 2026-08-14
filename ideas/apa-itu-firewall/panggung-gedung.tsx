/* Panggung bersama seluruh episode T15 — gedung berpintu banyak, penjaganya, dan
   benda-benda yang berpindah di depannya.

   DUA BELAS scene memakai ruang yang sama, dan itu gagasan utamanya, bukan
   kebetulan: scene 1 memperlihatkan gedungnya dari luar, scene 3 mendekat ke
   pintunya, scene 5 menggembok semuanya, scene 6 mendirikan penjaga di depan
   pintu yang sama, scene 7 sampai 12 bekerja di titik itu juga, dan scene 15
   mundur ke gedung yang sama untuk terakhir kalinya. Supaya potongan keras di
   antaranya terbaca sebagai "tempat yang sama, kelanjutan yang sama" dan bukan
   sebagai "layar berganti", gedung dan pintunya harus menempati piksel yang
   sama persis.

   Karena itu koordinatnya tinggal di sini, bukan diketik ulang di tiap scene.
   Dua salinan angka yang wajib sama adalah dua angka yang akan berbeda dalam
   seminggu — dan melesetnya tidak akan terlihat sebagai error, cuma sebagai
   gedung yang bergeser sedikit saat scene berganti.

   ARAHNYA MENGIKAT: kiri = luar, kanan = dalam.
   Ketukan selalu datang dari tepi kiri dan bergerak ke kanan; penjaga berdiri
   di antara keduanya, menghadap kiri. Scene 11 memutar badannya, dan seluruh
   arti scene itu bergantung pada arah yang sudah dipakai sepuluh scene
   sebelumnya. Membaliknya di satu scene memutus scene 1, 4, 5, 7, 11, 14 dan 15
   sekaligus.

   LAYAR LAPTOP DAN DINDING GEDUNG SENGAJA SEUKURAN. `Layar` menggambar bidang
   `GEDUNG.w x GEDUNG.h` yang sama persis dengan dinding, supaya di scene 1 layar
   itu bisa BERUBAH jadi dinding tanpa satu pun benda berpindah tempat. Kalau
   ukurannya dibedakan, yang terbaca dua gambar yang saling menggantikan.

   Berkas ini SENGAJA di luar `scenes/`. `npm run sisa` memeriksa setiap `.tsx`
   di dalam `scenes/` terhadap daftar kunci dari naskah (HARD RULE 5), jadi
   berkas bantu di sana akan dilaporkan sebagai nama yang tidak dikenal.
*/
import type React from "react";

/* ===========================================================================
   Koordinat — px pada frame 1920x1080
   ======================================================================== */

/** Garis lantai. Dipakai SEMUA scene sebagai alas; gedung, penjaga, dan sosok
 *  mana pun bertumpu padanya. */
export const Y_LANTAI = 880;

/** Dinding gedung. Titik acuannya pusat bawah, jadi menaruhnya cuma butuh satu
 *  koordinat — sama seperti `Loket` di T14. */
export const X_GEDUNG = 1180;
export const GEDUNG = { w: 720, h: 560 } as const;

/** Pusat bidang dinding — titik zoom kamera di scene 1, 13, dan 15. */
export const P_DINDING = { x: X_GEDUNG, y: Y_LANTAI - GEDUNG.h / 2 };

/** Pintu: dua baris, empat kolom. Delapan pintu itu bukan angka yang mengklaim
 *  apa pun (`naskah.md § Sumber`) — ia sekadar "banyak, dan tiap satu bernomor",
 *  dan delapan adalah jumlah terbesar yang masih terbaca satu per satu dari
 *  jarak tonton HP. */
export const PINTU = { w: 96, h: 132, kolom: 4, baris: 2, dx: 160, dy: 212 } as const;

export const N_PINTU = PINTU.kolom * PINTU.baris;

export type PosPintu = { x: number; y: number; nomor: number };

/** Pintu ke-i, urut baca: 0..3 baris bawah kiri ke kanan, 4..7 baris atas.
 *  `y` adalah KAKI pintu, sama seperti gedung dan penjaga. */
export const posPintu = (i: number): PosPintu => {
  const kol = i % PINTU.kolom;
  const bar = Math.floor(i / PINTU.kolom);
  return {
    x: X_GEDUNG + (kol - (PINTU.kolom - 1) / 2) * PINTU.dx,
    y: Y_LANTAI - 44 - bar * PINTU.dy,
    nomor: i + 1,
  };
};

/** Pintu yang "hidup" — yang memang harus bisa diketuk (scene 3 dan seterusnya).
 *  Ketiganya dipakai ulang di scene 4, 5, 12 dan 14, jadi daftarnya di sini. */
export const PINTU_HIDUP = [0, 2, 5] as const;

/** Pintu yang dibuka sendiri oleh pemiliknya di scene 14 dan 15. Sengaja SALAH
 *  SATU dari pintu hidup, bukan pintu baru: yang berubah di bagian 7 adalah
 *  siapa yang boleh mengetuknya, bukan jumlah pintunya. */
export const I_PINTU_DIBUKA = 2;

/* --- penjaga & jalur ketukan ----------------------------------------------- */

/** Penjaga berdiri di antara ketukan dan pintu. Jaraknya ke dinding sengaja
 *  lebar: seluruh episode bertumpu pada adanya RUANG BERHENTI di depan pintu,
 *  dan ruang itu harus terlihat sebelum penjaganya ada di sana. */
export const X_PENJAGA = 620;

/** Ketinggian jalur ketukan dan kiriman yang melintas. Sejajar dengan pintu
 *  baris bawah supaya garis lintasnya tidak pernah memotong badan penjaga. */
export const JALUR_Y = Y_LANTAI - 200;

/** Tepi kiri tempat ketukan lahir, dan tempat benda keluar frame. */
export const X_LUAR = 120;

/** Daftar aturan saat ia jadi benda PENDAMPING (scene 6, 7, 8, 12, 14):
 *  melayang di atas kepala penjaga, di luar dinding gedung.
 *
 *  Ia sengaja TIDAK ditaruh di antara penjaga dan dinding, walaupun di situ ada
 *  ruang kosong: kartunya jadi menempel di dinding gedung dan menutup satu
 *  pintu, dan pintu yang hilang di tengah episode adalah cacat yang tidak
 *  terlihat sebagai cacat — cuma sebagai gedung yang pintunya berkurang.
 *  Ketahuan di render still pertama scene 6, bukan dari pemeriksaan mana pun. */
export const P_DAFTAR = { x: X_PENJAGA - 180, y: Y_LANTAI - 350 };
export const SKALA_DAFTAR_SISI = 0.52;

/** Buku catatan di tangan penjaga. Ia ditaruh di sisi DALAM — antara penjaga dan
 *  dinding — supaya tiga benda di sekitar penjaga menempati tiga ruang yang
 *  berbeda dan tidak pernah saling menutupi:
 *
 *    daftar   kiri atas, di atas jalur ketukan
 *    penjaga  tengah, di garis lantai
 *    buku     kanan bawah, di antara penjaga dan dinding
 *
 *  Versi pertama menaruh buku dan antrean ketukan di sisi yang sama, dan
 *  ketukannya mendarat tepat di kepala penjaga. */
export const P_BUKU = { x: X_PENJAGA + 120, y: Y_LANTAI - 230 };

export const ABU = "var(--ink-1)";
export const GELAP = "var(--line)";
export const AKSEN = "var(--accent-ink)";
export const TEDUH = "var(--ink-2)";

/** Transform kamera: memperbesar `skala` kali dengan titik `x,y` tetap di
 *  tempatnya, lalu digeser `dx,dy`. Satu bentuk untuk semua scene — kamera yang
 *  ditulis ulang tiap scene cepat atau lambat memakai titik tumpu yang berbeda,
 *  dan gedungnya melompat saat potongan keras. */
export const kamera = (o: {
  x?: number;
  y?: number;
  skala?: number;
  dx?: number;
  dy?: number;
}): string => {
  const x = o.x ?? P_DINDING.x;
  const y = o.y ?? P_DINDING.y;
  const s = o.skala ?? 1;
  return `translate(${o.dx ?? 0} ${o.dy ?? 0}) translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;
};

const teksDasar = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  textAnchor: "middle" as const,
  dominantBaseline: "middle" as const,
};

/* ===========================================================================
   Bentuk — semua mengembalikan <g>, dipasang di dalam satu <svg viewBox>
   ======================================================================== */

/** Satu-satunya garis yang ada di hampir semua scene. Ia yang membuat potongan
 *  keras antar-scene terbaca sebagai perpindahan pandang, bukan perpindahan
 *  tempat. */
export const Lantai: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <path
    d={`M120 ${Y_LANTAI}h1680`}
    stroke={GELAP}
    strokeWidth={5}
    strokeLinecap="round"
    opacity={opacity}
  />
);

export type StatusPintu = {
  /** 0 = pintu mati (gelap, tidak ada apa-apa di baliknya), 1 = menyala. */
  nyala?: number;
  /** 0..1 — gembok tergambar di daun pintunya. */
  gembok?: number;
  /** 0..1 — bukaan gelap melebar dari tepi kiri daun pintu. */
  buka?: number;
  /** Menandai pintu sebagai yang sedang dibicarakan; dipakai scene 14 dan 15. */
  sorot?: number;
  /** Pergeseran mendatar daun pintu, px. Dipakai scene 1 untuk menggetarkannya
   *  saat ada yang mencoba membuka dari luar — pintunya bergerak, tapi tidak
   *  pernah terbuka. Nilainya datang dari `getar()` (shared/anim.ts), yang
   *  meluruh sendiri ke nol, jadi tiap pintu selalu berhenti di tempat semula. */
  geser?: number;
};

const Gembok: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <g opacity={opacity}>
    <rect x={-17} y={-4} width={34} height={28} rx={5} fill={TEDUH} />
    <path
      d="M-9 -4v-9a9 9 0 0 1 18 0v9"
      fill="none"
      stroke={TEDUH}
      strokeWidth={5}
      strokeLinecap="round"
    />
  </g>
);

/** Satu pintu. Titik acuannya KAKI pintu, seperti semua benda di panggung ini. */
export const Pintu: React.FC<PosPintu & StatusPintu & { nomorTampil?: number }> = ({
  x,
  y,
  nomor,
  nyala = 0,
  gembok = 0,
  buka = 0,
  sorot = 0,
  geser = 0,
  nomorTampil = 1,
}) => {
  const w = PINTU.w;
  const h = PINTU.h;
  const garis = sorot > 0.5 ? AKSEN : nyala > 0.5 ? ABU : GELAP;

  return (
    <g transform={`translate(${x + geser} ${y})`}>
      <rect
        x={-w / 2}
        y={-h}
        width={w}
        height={h}
        rx={7}
        fill={sorot > 0.5 ? "var(--accent-soft)" : "var(--bg)"}
        stroke={garis}
        strokeWidth={5}
        opacity={0.45 + 0.55 * Math.max(nyala, sorot)}
      />
      {/* bukaan: melebar dari tepi kiri, jadi daun pintunya terbaca membuka ke
          arah luar — arah yang sama dengan datangnya ketukan. */}
      {buka > 0 && (
        <rect
          x={-w / 2 + 7}
          y={-h + 7}
          width={(w - 14) * buka}
          height={h - 14}
          rx={4}
          fill={GELAP}
        />
      )}
      {nomorTampil > 0 && (
        <text
          {...teksDasar}
          y={-h + 30}
          fontSize={26}
          fill={TEDUH}
          opacity={nomorTampil * (0.5 + 0.5 * nyala)}
        >
          {nomor}
        </text>
      )}
      {/* gagang — kecil, tapi ia yang membuat kotaknya terbaca sebagai pintu */}
      <circle cx={w / 2 - 20} cy={-h / 2} r={5} fill={garis} opacity={0.8} />
      {gembok > 0 && (
        <g transform={`translate(0 ${-h / 2})`}>
          <Gembok opacity={gembok} />
        </g>
      )}
    </g>
  );
};

/** Gedung utuh: dinding, atap, dan delapan pintunya.
 *
 *  `pintu` panjangnya harus `N_PINTU`; scene yang cuma mengurus sebagian tetap
 *  mengirim seluruh daftarnya, supaya tidak ada pintu yang diam-diam hilang. */
export const Gedung: React.FC<{
  dinding?: number;
  pintu?: readonly StatusPintu[];
  nomorTampil?: number;
  opacity?: number;
}> = ({ dinding = 1, pintu, nomorTampil = 1, opacity = 1 }) => {
  const daftar = pintu ?? Array.from({ length: N_PINTU }, () => ({}));
  return (
    <g opacity={opacity}>
      <g opacity={dinding}>
        <rect
          x={X_GEDUNG - GEDUNG.w / 2}
          y={Y_LANTAI - GEDUNG.h}
          width={GEDUNG.w}
          height={GEDUNG.h}
          rx={14}
          fill="var(--bg-elev)"
          stroke={ABU}
          strokeWidth={6}
        />
        {/* atap yang menjorok — yang membuat bidangnya terbaca sebagai bangunan
            dan bukan sebagai panel besar */}
        <rect
          x={X_GEDUNG - GEDUNG.w / 2 - 26}
          y={Y_LANTAI - GEDUNG.h - 26}
          width={GEDUNG.w + 52}
          height={26}
          rx={8}
          fill="var(--bg-elev)"
          stroke={ABU}
          strokeWidth={6}
        />
      </g>
      {daftar.map((s, i) => (
        <Pintu key={i} {...posPintu(i)} {...s} nomorTampil={nomorTampil} />
      ))}
    </g>
  );
};

/** Ketukan — gelombang yang bergerak ke KANAN, ke arah dinding.
 *
 *  Sengaja tanpa wajah, tanpa tudung, tanpa warna bahaya: inti scene 4 justru
 *  bahwa siapa pun yang kebetulan lewat bisa melakukannya, tanpa perlu jadi
 *  siapa-siapa. Ketukan yang digambar sebagai penjahat mengubah masalahnya jadi
 *  masalah orang lain. */
export const Ketukan: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, warna = ABU }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <circle cx={-26} cy={0} r={7} fill={warna} />
    {[16, 30, 44].map((r, i) => (
      <path
        key={r}
        d={`M${-26 + r * 0.55} ${-r * 0.72}A${r} ${r} 0 0 1 ${-26 + r * 0.55} ${r * 0.72}`}
        fill="none"
        stroke={warna}
        strokeWidth={5 - i}
        strokeLinecap="round"
        opacity={1 - i * 0.22}
      />
    ))}
  </g>
);

/** Sosok netral — penjaga, dan siapa pun yang berdiri di luar.
 *
 *  `hadap` 1 = menghadap KIRI (ke luar, ke arah ketukan), -1 = menghadap KANAN
 *  (ke dalam, ke gedung). Scene 11 memutarnya, dan itu satu-satunya scene yang
 *  boleh. `topi` yang membedakan penjaga dari sosok biasa: tanpa itu, penjaga
 *  di scene 6 dan sosok di scene 14 tidak bisa dibedakan. */
export const Sosok: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  hadap?: number;
  topi?: boolean;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, hadap = 1, topi = false, warna = ABU }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <g transform={`scale(${hadap} 1)`}>
      <circle cx={0} cy={-116} r={31} fill="var(--bg)" stroke={warna} strokeWidth={6} />
      {topi && (
        <path
          d="M-34 -140h68M-26 -140v-10a26 26 0 0 1 52 0v10"
          fill="none"
          stroke={AKSEN}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {/* hidung kecil — satu-satunya penanda arah hadap yang tetap terbaca
          waktu sosoknya kecil */}
      <path d={`M-31 -112h-12`} stroke={warna} strokeWidth={6} strokeLinecap="round" />
    </g>
    <path
      d="M-48 0v-32a48 48 0 0 1 96 0V0"
      fill="none"
      stroke={warna}
      strokeWidth={6}
      strokeLinecap="round"
    />
  </g>
);

/** Daftar aturan — benda paling penting di bagian 5 dan 6.
 *
 *  Barisnya digambar sebagai bilah, bukan tulisan: begitu ada teks yang bisa
 *  dibaca, penonton berhenti mendengarkan dan mulai membaca. Yang perlu terbaca
 *  cuma tiga hal — urutannya, mana yang sedang dibaca, dan bahwa baris terakhir
 *  BERBEDA dari semuanya.
 *
 *  `terbaca` = berapa baris yang sudah dilewati penanda baca (scene 9).
 *  `sorot`   = baris yang cocok dan menghentikan pembacaan; -1 kalau tidak ada.
 *  `bolehSemua` = baris terakhir dibalik jadi "selain itu, boleh" (scene 8). */
export const N_BARIS = 5;

export const Daftar: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  baris?: number;
  sorot?: number;
  terbaca?: number;
  akhirNyala?: number;
  bolehSemua?: boolean;
  /** Baris longgar yang diselipkan di paling atas (scene 9). 0..1 */
  sisipan?: number;
  /** 0..1 — seluruh baris di bawah `sorot` diredupkan. */
  redup?: number;
}> = ({
  x,
  y,
  skala = 1,
  opacity = 1,
  baris = N_BARIS,
  sorot = -1,
  terbaca = -1,
  akhirNyala = 0,
  bolehSemua = false,
  sisipan = 0,
  redup = 0,
}) => {
  const W = 380;
  const H_BARIS = 54;
  const total = baris + 1; /* + baris terakhir */
  const tinggi = 46 + (total + 1) * H_BARIS;

  const bilah = (i: number, akhir: boolean, longgar: boolean) => {
    const yy = -tinggi + 46 + i * H_BARIS + H_BARIS / 2;
    const aktif = sorot === i;
    const dilewati = terbaca >= 0 && i < terbaca;
    const dibawahSorot = sorot >= 0 && i > sorot;
    const warna = akhir
      ? bolehSemua
        ? "var(--ok)"
        : "var(--bad)"
      : longgar
        ? "var(--warn)"
        : aktif
          ? AKSEN
          : ABU;
    const alpha = akhir
      ? 0.35 + 0.65 * akhirNyala
      : aktif
        ? 1
        : dibawahSorot
          ? 1 - 0.75 * redup
          : dilewati
            ? 0.4
            : 0.8;
    return (
      <g key={`${i}-${akhir}`} opacity={alpha}>
        <rect
          x={-W / 2 + 22}
          y={yy - 15}
          width={W - 44}
          height={30}
          rx={8}
          fill={warna}
          opacity={aktif || akhir || longgar ? 0.9 : 0.55}
        />
        {/* potongan kanan tiap baris dibuat lebih pendek supaya barisnya terbaca
            sebagai tulisan, bukan sebagai bilah grafik */}
        <rect
          x={W / 2 - 22 - 84}
          y={yy - 15}
          width={84}
          height={30}
          rx={8}
          fill="var(--bg-elev)"
        />
        <rect
          x={W / 2 - 22 - 78}
          y={yy - 9}
          width={60 - (i % 3) * 12}
          height={18}
          rx={6}
          fill={warna}
          opacity={0.5}
        />
      </g>
    );
  };

  const barisBiasa = Array.from({ length: baris }, (_, i) =>
    bilah(i + (sisipan > 0.5 ? 1 : 0), false, false),
  );

  return (
    <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
      <rect
        x={-W / 2}
        y={-tinggi}
        width={W}
        height={tinggi}
        rx={14}
        fill="var(--bg-elev)"
        stroke={ABU}
        strokeWidth={5}
      />
      {sisipan > 0 && <g opacity={sisipan}>{bilah(0, false, true)}</g>}
      {barisBiasa}
      {bilah(baris + (sisipan > 0.5 ? 1 : 0), true, false)}
      {/* garis pemisah di atas baris terakhir — ia bukan aturan biasa */}
      <path
        d={`M${-W / 2 + 22} ${-46 - H_BARIS}h${W - 44}`}
        stroke={GELAP}
        strokeWidth={3}
        opacity={0.8}
      />
    </g>
  );
};

/** Penanda baca yang turun menyusuri daftar (scene 9). Segitiga di sisi KIRI,
 *  arah tunjuk ke kanan — arah baca yang sama dengan seluruh panggung ini. */
export const PenandaBaca: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
}> = ({ x, y, skala = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <path d="M-26 -20l32 20-32 20z" fill={AKSEN} />
  </g>
);

/** Buku catatan penjaga — bendanya jawaban bagian 5, dan ia SENGAJA tidak mirip
 *  daftar: daftar itu tegak dan bertepi keras, buku ini terbuka dua halaman dan
 *  bergaris tipis. Kalau keduanya terbaca sebagai satu benda, penonton cuma
 *  dapat "penjaganya punya kertas" dan seluruh scene 7 kehilangan alasannya. */
export const Buku: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** Jumlah baris yang sudah tertulis, 0..3. */
  baris?: number;
  /** 0..1 — baris terakhir menyala sebagai kecocokan. */
  cocok?: number;
}> = ({ x, y, skala = 1, opacity = 1, baris = 0, cocok = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <path
      d="M-116 -74h108v148h-108zM8 -74h108v148H8z"
      fill="var(--bg-elev)"
      stroke={ABU}
      strokeWidth={5}
      strokeLinejoin="round"
    />
    <path d="M0 -74v148" stroke={ABU} strokeWidth={5} />
    {Array.from({ length: Math.max(0, Math.min(3, Math.floor(baris))) }, (_, k) => (
      <g key={k} transform={`translate(0 ${-38 + k * 40})`}>
        <path
          d="M-100 0h76"
          stroke={k === Math.floor(baris) - 1 && cocok > 0 ? AKSEN : TEDUH}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M24 0h76"
          stroke={k === Math.floor(baris) - 1 && cocok > 0 ? AKSEN : TEDUH}
          strokeWidth={7}
          strokeLinecap="round"
          opacity={0.7}
        />
      </g>
    ))}
    {cocok > 0 && (
      <path
        d="M-104 62l22 22 44-52"
        fill="none"
        stroke="var(--ok)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={cocok}
      />
    )}
  </g>
);

/** Kotak berlabel — benda yang diperiksa di scene 12 dan yang pulang di scene 15.
 *
 *  `isi` menggambar bayangan di dalamnya. Ia diperlihatkan ke PENONTON, tidak
 *  pernah ke penjaga: itu seluruh ketegangan scene 12. Bentuknya sengaja netral,
 *  bukan tengkorak dan bukan warna bahaya — yang jadi soal justru bahwa
 *  perbedaannya tidak pernah terlihat dari luar. */
export const Kotak: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  rot?: number;
  /** 0..1 — label di sisi kotak menyala. */
  label?: number;
  /** 0..1 — bayangan isi terlihat menembus dindingnya. */
  isi?: number;
}> = ({ x, y, skala = 1, opacity = 1, rot = 0, label = 0, isi = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-64}
      y={-52}
      width={128}
      height={104}
      rx={8}
      fill="var(--bg-elev)"
      stroke={ABU}
      strokeWidth={5}
    />
    {/* pita perekat — penutup yang tidak pernah dibuka */}
    <path d="M0 -52v104" stroke={ABU} strokeWidth={4} opacity={0.55} />
    {isi > 0 && (
      <g opacity={isi * 0.75}>
        <circle cx={0} cy={6} r={22} fill={TEDUH} />
        <path d="M-11 6h22M0 -5v22" stroke="var(--bg-elev)" strokeWidth={5} strokeLinecap="round" />
      </g>
    )}
    {label > 0 && (
      <g opacity={label}>
        <rect x={-52} y={-44} width={104} height={30} rx={5} fill="var(--bg)" stroke={AKSEN} strokeWidth={3} />
        <path d="M-42 -34h44M-42 -25h64" stroke={AKSEN} strokeWidth={4} strokeLinecap="round" />
      </g>
    )}
  </g>
);

/** Peta yang dibawa pulang pengetuk (scene 10) — satu-satunya benda baru di
 *  episode ini yang tidak pernah dinamai. Titik terisi = satu hal yang berhasil
 *  diketahui dari luar. */
export const Peta: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  /** Indeks titik yang terisi. */
  terisi?: readonly number[];
}> = ({ x, y, skala = 1, opacity = 1, terisi = [] }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-92}
      y={-64}
      width={184}
      height={128}
      rx={10}
      fill="var(--bg)"
      stroke={ABU}
      strokeWidth={5}
    />
    {Array.from({ length: N_PINTU }, (_, i) => {
      const kol = i % PINTU.kolom;
      const bar = Math.floor(i / PINTU.kolom);
      const cx = (kol - 1.5) * 42;
      const cy = 26 - bar * 52;
      const on = terisi.includes(i);
      return (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={on ? 12 : 8}
          fill={on ? AKSEN : "none"}
          stroke={on ? AKSEN : GELAP}
          strokeWidth={4}
        />
      );
    })}
  </g>
);

/** Layar laptop scene 1. Bidangnya SEUKURAN dinding gedung, dan itu wajib —
 *  lihat catatan di kepala berkas ini. */
export const Layar: React.FC<{
  opacity?: number;
  /** 0..1 — isi halaman terisi baris demi baris. */
  isi?: number;
}> = ({ opacity = 1, isi = 1 }) => {
  const x0 = X_GEDUNG - GEDUNG.w / 2;
  const y0 = Y_LANTAI - GEDUNG.h;
  return (
    <g opacity={opacity}>
      <rect
        x={x0}
        y={y0}
        width={GEDUNG.w}
        height={GEDUNG.h}
        rx={14}
        fill="var(--bg-elev)"
        stroke={ABU}
        strokeWidth={6}
      />
      {/* bilah jendela di atas — yang membuat bidangnya terbaca sebagai layar */}
      <path d={`M${x0} ${y0 + 62}h${GEDUNG.w}`} stroke={ABU} strokeWidth={4} opacity={0.7} />
      <circle cx={x0 + 34} cy={y0 + 31} r={9} fill={TEDUH} />
      <circle cx={x0 + 64} cy={y0 + 31} r={9} fill={TEDUH} />
      {Array.from({ length: 6 }, (_, k) => {
        const p = Math.max(0, Math.min(1, isi * 6 - k));
        return (
          <rect
            key={k}
            x={x0 + 52}
            y={y0 + 128 + k * 62}
            width={(GEDUNG.w - 104) * (k % 2 === 0 ? 0.86 : 0.62) * p}
            height={26}
            rx={8}
            fill={TEDUH}
            opacity={0.55}
          />
        );
      })}
      {/* kaki laptop, di bawah bidang layar dan di atas garis lantai */}
      <path
        d={`M${X_GEDUNG - 120} ${Y_LANTAI}h240`}
        stroke={ABU}
        strokeWidth={10}
        strokeLinecap="round"
      />
    </g>
  );
};
