/* Panggung bersama seluruh episode T18 — jaringan, potongan kiriman, dan
   benda-benda yang berpindah di antaranya.

   DUA BELAS scene memakai ruang yang sama, dan itu yang membuat potong keras di
   antaranya terbaca sebagai "tempat yang sama, kelanjutan yang sama" dan bukan
   sebagai "layar berganti". Karena itu koordinatnya tinggal di sini, bukan
   diketik ulang di tiap scene — dua salinan angka yang wajib sama adalah dua
   angka yang akan berbeda dalam seminggu, dan melesetnya tidak muncul sebagai
   error, cuma sebagai benda yang bergeser sedikit saat scene berganti.

   ARAHNYA MENGIKAT: kiri = pengirim, kanan = penerima.
   Setiap potongan bergerak dari kiri ke kanan sepanjang episode. Satu-satunya
   benda yang bergerak berlawanan adalah permintaan kirim ulang di
   `07-peran-tcp` dan jawaban server di `11-buka-website` — dan justru karena
   sepuluh scene lain konsisten, dua gerakan balik itu langsung terbaca sebagai
   "sesuatu yang kembali".

   TIGA JALUR, bukan satu. `JALUR_Y` sengaja tiga garis mendatar: begitu
   `06-jadi-paket` memperlihatkan potongan menempuh jalur yang berbeda-beda,
   ketiganya harus sudah jadi tempat yang dikenal penonton — bukan garis yang
   baru digambar saat dibutuhkan.

   Berkas ini SENGAJA di luar `scenes/`. `npm run sisa` memeriksa setiap `.tsx`
   di dalam `scenes/` terhadap daftar kunci dari naskah (HARD RULE 5), jadi
   berkas bantu di sana akan dilaporkan sebagai nama yang tidak dikenal.
*/
import type React from "react";

/* ===========================================================================
   Koordinat — px pada frame 1920x1080
   ======================================================================== */

/** Garis lantai. Alas untuk semua figur yang "berdiri" — laptop, rumah,
 *  kendaraan, server. */
export const Y_LANTAI = 880;

/** Pengirim (kiri) dan penerima (kanan). Dipakai sembilan scene. */
export const X_KIRI = 300;
export const X_KANAN = 1620;

/** Tiga jalur mendatar tempat potongan berjalan. Indeks 0 = paling atas.
 *  Jalur 1 (tengah) adalah jalur "biasa" — dipakai scene yang cuma butuh satu. */
export const JALUR_Y = [430, 560, 690] as const;
export const JALUR_UTAMA = JALUR_Y[1];

/** Simpul di tengah tiap jalur — persimpangan yang dilewati potongan.
 *  Tiga per jalur, jaraknya sama, supaya gerakan antar-simpul bisa dihitung
 *  linear tanpa tabel posisi kedua. */
export const X_SIMPUL = [640, 960, 1280] as const;

/** Titik tengah panggung — pusat zoom kamera di scene 1, 9, 12 dan 13. */
export const P_TENGAH = { x: 960, y: 540 } as const;

/** Transform kamera. Satu bentuk untuk semua scene supaya zoom & geser tidak
 *  ditulis dua gaya yang berbeda. */
export const kamera = (o: { skala?: number; dx?: number; dy?: number } = {}): string => {
  const s = o.skala ?? 1;
  const dx = o.dx ?? 0;
  const dy = o.dy ?? 0;
  return `translate(${P_TENGAH.x + dx} ${P_TENGAH.y + dy}) scale(${s}) translate(${-P_TENGAH.x} ${-P_TENGAH.y})`;
};

/* ===========================================================================
   Jaringan latar — sengaja DETERMINISTIK

   Posisi simpulnya ditulis satu per satu, bukan dihitung acak. `Math.random()`
   dilarang di komposisi (CLAUDE.md § Deterministik): Remotion merender frame
   1.234 tanpa pernah merender 1.233, jadi jaringan acak akan berkedip beda
   tiap frame dan pecah total saat render paralel.
   ======================================================================== */

export const SIMPUL_LATAR: readonly { x: number; y: number }[] = [
  { x: 180, y: 250 }, { x: 420, y: 180 }, { x: 700, y: 260 }, { x: 980, y: 160 },
  { x: 1260, y: 250 }, { x: 1540, y: 190 }, { x: 1760, y: 300 },
  { x: 260, y: 470 }, { x: 560, y: 540 }, { x: 860, y: 460 }, { x: 1160, y: 550 },
  { x: 1460, y: 470 }, { x: 1700, y: 560 },
  { x: 180, y: 760 }, { x: 470, y: 830 }, { x: 780, y: 740 }, { x: 1080, y: 840 },
  { x: 1380, y: 760 }, { x: 1660, y: 830 },
];

/** Pasangan simpul yang dihubungkan garis. Ditulis tangan supaya jaringannya
 *  terbaca sebagai jaring, bukan sebagai bintang dari satu titik. */
export const RUSUK_LATAR: readonly [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
  [0, 7], [1, 8], [2, 9], [3, 10], [4, 11], [5, 12],
  [7, 13], [8, 14], [9, 15], [10, 16], [11, 17], [12, 18],
  [2, 8], [4, 10], [9, 14], [11, 16],
];

/** Jaring latar yang menyala bertahap. `maju` 0..1 menentukan berapa bagian
 *  jaring yang sudah muncul — dipakai scene 1 (mekar), 12 dan 13 (menyala lagi). */
export const JaringLatar: React.FC<{ maju: number; opacity?: number }> = ({
  maju,
  opacity = 1,
}) => (
  <g opacity={opacity} aria-hidden>
    {RUSUK_LATAR.map(([ia, ib], i) => {
      const a = SIMPUL_LATAR[ia];
      const b = SIMPUL_LATAR[ib];
      if (!a || !b) return null;
      const u = i / RUSUK_LATAR.length;
      const tampil = maju > u ? Math.min(1, (maju - u) * 6) : 0;
      return (
        <line
          key={`r${i}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="var(--line)"
          strokeWidth={2}
          opacity={0.55 * tampil}
        />
      );
    })}
    {SIMPUL_LATAR.map((s, i) => {
      const u = i / SIMPUL_LATAR.length;
      const tampil = maju > u ? Math.min(1, (maju - u) * 6) : 0;
      return (
        <circle
          key={`s${i}`}
          cx={s.x}
          cy={s.y}
          r={6}
          fill="var(--ink-2)"
          opacity={0.7 * tampil}
        />
      );
    })}
  </g>
);

/* ===========================================================================
   Jalur & simpul kerja
   ======================================================================== */

/** Satu jalur mendatar. `nyala` 0..1 — jalur yang sedang dipakai digambar
 *  terang, sisanya tetap terlihat tapi redup. Jalur yang HILANG saat tidak
 *  dipakai akan membuat panggungnya terasa berubah tiap scene. */
export const Jalur: React.FC<{
  y: number;
  dari?: number;
  ke?: number;
  nyala?: number;
}> = ({ y, dari = X_KIRI + 120, ke = X_KANAN - 120, nyala = 0 }) => (
  <g aria-hidden>
    <line
      x1={dari}
      y1={y}
      x2={ke}
      y2={y}
      stroke="var(--line)"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <line
      x1={dari}
      y1={y}
      x2={ke}
      y2={y}
      stroke="var(--accent)"
      strokeWidth={4}
      strokeLinecap="round"
      opacity={nyala}
    />
  </g>
);

/** Persimpangan. Bentuknya belah ketupat, bukan lingkaran — supaya berbeda dari
 *  simpul jaring latar dan terbaca sebagai "tempat memilih arah". */
export const Simpul: React.FC<{ x: number; y: number; nyala?: number }> = ({
  x,
  y,
  nyala = 0,
}) => (
  <g transform={`translate(${x} ${y})`} aria-hidden>
    <rect
      x={-16}
      y={-16}
      width={32}
      height={32}
      transform="rotate(45)"
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={3}
    />
    <rect
      x={-16}
      y={-16}
      width={32}
      height={32}
      transform="rotate(45)"
      fill="var(--accent)"
      opacity={nyala}
    />
  </g>
);

/* ===========================================================================
   Potongan kiriman

   SATU komponen untuk seluruh episode. Potongan di scene 6, 7, 8, 9, 11 dan 12
   harus terbaca sebagai benda yang sama; dua komponen yang mirip cepat atau
   lambat jadi dua gambar yang berbeda.
   ======================================================================== */

export type WarnaPaket = "biasa" | "ok" | "hilang" | "ulang";

const ISI_PAKET: Record<WarnaPaket, { isi: string; garis: string }> = {
  biasa: { isi: "var(--bg-elev)", garis: "var(--accent)" },
  ok: { isi: "var(--ok-soft)", garis: "var(--ok)" },
  hilang: { isi: "var(--bg-elev)", garis: "var(--bad)" },
  ulang: { isi: "var(--accent-soft)", garis: "var(--accent)" },
};

export const PAKET = { w: 96, h: 72 } as const;

/** Satu potongan kiriman. Titik acuannya PUSAT, jadi menaruhnya di jalur cukup
 *  satu koordinat y. */
export const Paket: React.FC<{
  x: number;
  y: number;
  nomor?: number;
  warna?: WarnaPaket;
  skala?: number;
  opacity?: number;
  /** Label kecil di bawah kotak — dipakai scene 6 untuk menempelkan tujuannya. */
  label?: string;
}> = ({ x, y, nomor, warna = "biasa", skala = 1, opacity = 1, label }) => {
  const c = ISI_PAKET[warna];
  return (
    <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
      <rect
        x={-PAKET.w / 2}
        y={-PAKET.h / 2}
        width={PAKET.w}
        height={PAKET.h}
        rx={10}
        fill={c.isi}
        stroke={c.garis}
        strokeWidth={4}
      />
      {/* Pita di sisi kiri — penanda "ini kotak", supaya kotak kosong tidak
          terbaca sebagai panel teks. */}
      <rect
        x={-PAKET.w / 2 + 12}
        y={-PAKET.h / 2}
        width={10}
        height={PAKET.h}
        fill={c.garis}
        opacity={0.45}
      />
      {nomor !== undefined && (
        <text
          x={8}
          y={10}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={34}
          fontWeight={700}
          fill="var(--ink-0)"
        >
          {String(nomor).padStart(2, "0")}
        </text>
      )}
      {label && (
        <text
          x={0}
          y={PAKET.h / 2 + 28}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={22}
          fill="var(--ink-2)"
        >
          {label}
        </text>
      )}
    </g>
  );
};

/* ===========================================================================
   Perangkat
   ======================================================================== */

/** Laptop. Titik acuannya PUSAT BAWAH (kaki), sama seperti semua figur berdiri. */
export const Laptop: React.FC<{
  x: number;
  y: number;
  skala?: number;
  /** Isi layar — dipakai scene 1 dan 11 untuk menaruh halaman yang dimuat. */
  layar?: React.ReactNode;
  nyala?: number;
}> = ({ x, y, skala = 1, layar, nyala = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`}>
    {/* alas */}
    <path
      d="M-150 0 L150 0 L172 22 L-172 22 Z"
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    {/* badan layar */}
    <rect
      x={-134}
      y={-186}
      width={268}
      height={186}
      rx={10}
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={4}
    />
    {/* bidang layar */}
    <rect
      x={-118}
      y={-170}
      width={236}
      height={152}
      rx={5}
      fill="var(--bg)"
      opacity={0.65 + 0.35 * nyala}
    />
    <g clipPath="url(#klip-layar-laptop)">{layar}</g>
    <clipPath id="klip-layar-laptop">
      <rect x={-118} y={-170} width={236} height={152} rx={5} />
    </clipPath>
  </g>
);

/** Server / komputer tujuan. Dibedakan dari laptop dengan bentuk rak bertingkat
 *  — di scene 7 dan 11 keduanya muncul bersamaan dan tidak boleh tertukar. */
export const Server: React.FC<{
  x: number;
  y: number;
  skala?: number;
  nyala?: number;
}> = ({ x, y, skala = 1, nyala = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <rect
      x={-96}
      y={-260}
      width={192}
      height={260}
      rx={12}
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={4}
    />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <line
          x1={-96}
          y1={-260 + 65 * (i + 1)}
          x2={96}
          y2={-260 + 65 * (i + 1)}
          stroke="var(--line)"
          strokeWidth={3}
        />
        <circle
          cx={-62}
          cy={-260 + 65 * i + 33}
          r={9}
          fill={i === 0 ? "var(--ok)" : "var(--ink-2)"}
          opacity={i === 0 ? 0.4 + 0.6 * nyala : 0.5}
        />
        <rect
          x={-38}
          y={-260 + 65 * i + 26}
          width={104}
          height={14}
          rx={7}
          fill="var(--ink-2)"
          opacity={0.35}
        />
      </g>
    ))}
  </g>
);

/** Ponsel dan desktop — hanya dipakai scene 3, untuk memperlihatkan bahwa yang
 *  tersambung bukan cuma satu jenis benda. */
export const Ponsel: React.FC<{ x: number; y: number; skala?: number }> = ({
  x,
  y,
  skala = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <rect
      x={-46}
      y={-156}
      width={92}
      height={156}
      rx={14}
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={4}
    />
    <rect x={-34} y={-142} width={68} height={116} rx={4} fill="var(--bg)" />
  </g>
);

export const Desktop: React.FC<{ x: number; y: number; skala?: number }> = ({
  x,
  y,
  skala = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <rect
      x={-120}
      y={-190}
      width={240}
      height={158}
      rx={10}
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={4}
    />
    <rect x={-106} y={-176} width={212} height={130} rx={4} fill="var(--bg)" />
    <rect x={-26} y={-32} width={52} height={22} fill="var(--line)" />
    <rect x={-72} y={-12} width={144} height={12} rx={6} fill="var(--line)" />
  </g>
);

/* ===========================================================================
   Dunia nyata — dipakai scene 4 dan 5, lalu ditinggalkan

   Keduanya sengaja digambar dengan garis yang sama tebalnya dengan benda
   digital, supaya match cut fisik -> digital terbaca sebagai satu benda yang
   BERUBAH dan bukan dua gambar yang saling menggantikan.
   ======================================================================== */

/** Kotak kiriman fisik. Ukurannya sengaja sepadan `PAKET` supaya perubahannya
 *  di scene 4 tidak melompat. */
export const Kotak: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  dari?: string;
  ke?: string;
}> = ({ x, y, skala = 1, opacity = 1, dari, ke }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-90}
      y={-68}
      width={180}
      height={136}
      rx={6}
      fill="var(--bg-elev)"
      stroke="var(--ink-2)"
      strokeWidth={4}
    />
    {/* selotip */}
    <line x1={0} y1={-68} x2={0} y2={68} stroke="var(--ink-2)" strokeWidth={4} opacity={0.5} />
    {/* label */}
    <rect x={-62} y={-42} width={124} height={56} rx={4} fill="var(--bg)" stroke="var(--line)" strokeWidth={2} />
    {dari && (
      <text x={-54} y={-22} fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink-2)">
        {dari}
      </text>
    )}
    {ke && (
      <text x={-54} y={4} fontFamily="var(--font-mono)" fontSize={22} fontWeight={700} fill="var(--ink-0)">
        {ke}
      </text>
    )}
  </g>
);

/** Kendaraan pengantar. Kotaknya ditaruh terpisah di scene 4 supaya bisa
 *  terlihat masuk ke baknya. */
export const Kendaraan: React.FC<{ x: number; y: number; skala?: number }> = ({
  x,
  y,
  skala = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <rect x={-170} y={-130} width={220} height={130} rx={8} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
    <path
      d="M50 -130 L128 -130 L166 -66 L166 0 L50 0 Z"
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <rect x={62} y={-116} width={62} height={44} rx={4} fill="var(--bg)" />
    <circle cx={-104} cy={6} r={30} fill="var(--ink-1)" />
    <circle cx={118} cy={6} r={30} fill="var(--ink-1)" />
    <circle cx={-104} cy={6} r={13} fill="var(--bg-elev)" />
    <circle cx={118} cy={6} r={13} fill="var(--bg-elev)" />
  </g>
);

/** Rumah bernomor. Scene 5 memakai tiga, lalu ketiganya berubah jadi komputer. */
export const Rumah: React.FC<{
  x: number;
  y: number;
  nomor: string;
  skala?: number;
  nyala?: number;
}> = ({ x, y, nomor, skala = 1, nyala = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path
      d="M-110 0 L-110 -104 L0 -186 L110 -104 L110 0 Z"
      fill="var(--bg-elev)"
      stroke="var(--line)"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <rect x={-30} y={-72} width={60} height={72} rx={4} fill="var(--bg)" stroke="var(--line)" strokeWidth={3} />
    {/* papan nomor */}
    <rect
      x={-40}
      y={-134}
      width={80}
      height={38}
      rx={6}
      fill="var(--bg)"
      stroke="var(--accent)"
      strokeWidth={3}
      opacity={0.4 + 0.6 * nyala}
    />
    <text
      x={0}
      y={-107}
      textAnchor="middle"
      fontFamily="var(--font-mono)"
      fontSize={24}
      fontWeight={700}
      fill="var(--ink-0)"
      opacity={0.5 + 0.5 * nyala}
    >
      {nomor}
    </text>
  </g>
);

/** Buku aturan — muncul sekali di scene 3, lalu tidak pernah lagi. */
export const Buku: React.FC<{
  x: number;
  y: number;
  skala?: number;
  buka?: number;
  judul?: string;
}> = ({ x, y, skala = 1, buka = 0, judul }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <rect x={-190} y={-130} width={380} height={260} rx={10} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
    <line x1={0} y1={-130} x2={0} y2={130} stroke="var(--line)" strokeWidth={4} />
    {judul && (
      <text
        x={0}
        y={-160}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={34}
        fontWeight={700}
        fill="var(--ink-0)"
        opacity={1 - buka}
      >
        {judul}
      </text>
    )}
    {[0, 1, 2, 3].map((i) => (
      <g key={i} opacity={buka}>
        <rect x={-160} y={-92 + i * 46} width={130} height={12} rx={6} fill="var(--ink-2)" opacity={0.4} />
        <rect x={30} y={-92 + i * 46} width={130} height={12} rx={6} fill="var(--ink-2)" opacity={0.4} />
      </g>
    ))}
  </g>
);

/** Bingkai peramban — scene 1, 11 dan 12. Isinya dikirim sebagai children. */
export const Peramban: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  alamat?: string;
  muat?: number;
  children?: React.ReactNode;
}> = ({ x, y, w = 620, h = 400, alamat, muat = 0, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={12} fill="var(--bg-elev)" stroke="var(--line)" strokeWidth={4} />
    <line x1={-w / 2} y1={-h / 2 + 62} x2={w / 2} y2={-h / 2 + 62} stroke="var(--line)" strokeWidth={3} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={-w / 2 + 34 + i * 30} cy={-h / 2 + 31} r={9} fill="var(--ink-2)" opacity={0.5} />
    ))}
    <rect x={-w / 2 + 130} y={-h / 2 + 14} width={w - 170} height={34} rx={17} fill="var(--bg)" />
    {alamat && (
      <text
        x={-w / 2 + 150}
        y={-h / 2 + 39}
        fontFamily="var(--font-mono)"
        fontSize={22}
        fill="var(--ink-1)"
      >
        {alamat}
      </text>
    )}
    {/* bilah pemuatan */}
    <rect
      x={-w / 2}
      y={-h / 2 + 60}
      width={w * Math.min(1, Math.max(0, muat))}
      height={5}
      fill="var(--accent)"
    />
    {children}
  </g>
);

/* ===========================================================================
   Papan tanda — dipakai enam scene untuk menaruh label di layar.

   SATU komponen, karena label yang digambar ulang di tiap scene akan berbeda
   tinggi barisnya dan terbaca sebagai teks yang "melompat" saat scene berganti.
   ======================================================================== */

export const Label: React.FC<{
  x: number;
  y: number;
  teks: string;
  sub?: string;
  opacity?: number;
  transform?: string;
  besar?: boolean;
  warna?: string;
}> = ({ x, y, teks, sub, opacity = 1, transform, besar = false, warna = "var(--ink-0)" }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity} style={{ transform }}>
    <text
      x={0}
      y={0}
      textAnchor="middle"
      fontFamily="var(--font-display)"
      fontSize={besar ? 76 : 40}
      fontWeight={700}
      fill={warna}
      letterSpacing={besar ? 2 : 0}
    >
      {teks}
    </text>
    {sub && (
      <text
        x={0}
        y={besar ? 52 : 36}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontSize={besar ? 30 : 24}
        fill="var(--ink-2)"
      >
        {sub}
      </text>
    )}
  </g>
);

/** Tanda centang & silang — dipakai scene 7 dan 8 untuk status tiap nomor. */
export const Centang: React.FC<{ x: number; y: number; skala?: number; opacity?: number }> = ({
  x,
  y,
  skala = 1,
  opacity = 1,
}) => (
  <path
    d="M-16 0 l12 14 24 -30"
    transform={`translate(${x} ${y}) scale(${skala})`}
    fill="none"
    stroke="var(--ok)"
    strokeWidth={7}
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={opacity}
  />
);

export const Tanya: React.FC<{ x: number; y: number; skala?: number; opacity?: number }> = ({
  x,
  y,
  skala = 1,
  opacity = 1,
}) => (
  <text
    x={x}
    y={y + 12}
    textAnchor="middle"
    fontFamily="var(--font-display)"
    fontSize={44 * skala}
    fontWeight={700}
    fill="var(--bad)"
    opacity={opacity}
  >
    ?
  </text>
);
