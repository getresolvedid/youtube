/* Panggung bersama seluruh episode T16 — jalan mendatar, dua meja di ujungnya,
   dan satu kotak yang berjalan di atasnya.

   LIMA BELAS scene memakai ruang yang sama, dan itu gagasan utamanya, bukan
   kebetulan: scene 1 menetapkan jalannya, scene 4 menggembok kotaknya, scene 5
   menurunkan kunci ke jalan yang sama, scene 7 memulangkan kunci itu ke meja
   kanan dan tidak pernah memindahkannya lagi, scene 8 sampai 14 bekerja di
   jalan yang sama, dan scene 16 mundur ke jalan itu untuk terakhir kalinya.
   Supaya potongan keras di antaranya terbaca sebagai "tempat yang sama,
   kelanjutan yang sama" dan bukan sebagai "layar berganti", jalan, meja, dan
   tangan harus menempati piksel yang sama persis.

   Karena itu koordinatnya tinggal di sini, bukan diketik ulang di tiap scene.
   Dua salinan angka yang wajib sama adalah dua angka yang akan berbeda dalam
   seminggu — dan melesetnya tidak muncul sebagai error, cuma sebagai jalan yang
   bergeser sedikit tiap kali scene berganti.

   ARAHNYA MENGIKAT: kiri = kamu (pengirim), kanan = yang kamu kirimi.
   Kotak selalu bergerak ke KANAN. Scene 10 satu-satunya yang punya arus dua
   arah, dan seluruh arti scene itu bergantung pada arah yang sudah dipakai
   sembilan scene sebelumnya. Scene 12 memulangkan satu kotak ke kiri, dan itu
   penolakan — bukan arah baru.

   KUNCI PUNYA SATU TEMPAT DAN TIDAK PERNAH PINDAH. Sejak `07-gembok-terbuka`
   ia berdiri di `P_KUNCI_MEJA` dan scene 8, 9, 11 dan 16 memakai titik yang
   sama persis. Diamnya itu isi bagian 5; kunci yang bergeser beberapa piksel
   tiap scene diam-diam membatalkan seluruh argumennya.

   Berkas ini SENGAJA di luar `scenes/`. `npm run sisa` memeriksa setiap `.tsx`
   di dalam `scenes/` terhadap daftar kunci dari naskah (HARD RULE 5), jadi
   berkas bantu di sana akan dilaporkan sebagai nama yang tidak dikenal.
*/
import type React from "react";

/* ===========================================================================
   Koordinat — px pada frame 1920x1080
   ======================================================================== */

/** Garis lantai — alas kaki meja. Bukan jalannya. */
export const Y_LANTAI = 880;

/** Jalan: garis tempat kotak berjalan, setinggi permukaan kedua meja supaya
 *  kotak bisa meluncur dari meja ke jalan tanpa naik atau turun. */
export const Y_JALAN = 620;

export const X_KIRIM = 300;
export const X_TERIMA = 1500;

/** Tepi tempat benda lahir dan tempat benda keluar frame. */
export const X_LUAR_KIRI = 40;
export const X_LUAR_KANAN = 1880;

export const MEJA = { w: 300, h: Y_LANTAI - Y_JALAN } as const;

/** Titik zoom kamera baku: tengah jalan, setinggi kotak. */
export const P_JALAN = { x: (X_KIRIM + X_TERIMA) / 2, y: Y_JALAN - 60 };

/** Tempat kunci berdiri sejak scene 7 — DIPAKAI EMPAT SCENE, jangan disalin. */
export const P_KUNCI_MEJA = { x: X_TERIMA, y: Y_JALAN - 34 } as const;

/** Tangan di sepanjang jalan. Lima itu bukan angka yang mengklaim apa pun
 *  (`naskah.md` § Sumber) — ia sekadar "banyak, dan tidak satu pun kamu pilih",
 *  dan lima adalah jumlah terbanyak yang masih terbaca satu per satu dari jarak
 *  tonton HP. */
export const N_TANGAN = 5;

export const posTangan = (i: number): number => 520 + i * 190;

/** Ketinggian tumpukan gembok — di bawah telapak tangan, di atas garis lantai. */
export const Y_GEMBOK = Y_JALAN + 180;

/** Bangunan di tengah jalan — ruang antara di scene 15 dan 16. Letaknya sengaja
 *  di antara tangan ketiga dan keempat, bukan tepat di tengah: titik tengah
 *  membuatnya terbaca sebagai tujuan, bukan sebagai tempat yang dilewati. */
export const X_ANTARA = 995;

/** Tumpukan gembok terbuka di tepi jalan, di bawah jalur tangan. Dibagikan di
 *  `07-gembok-terbuka` dan masih di titik yang sama di scene 8, 9 dan 11 —
 *  scene 11 bertumpu pada penonton mengenali tumpukan yang ITU JUGA. */
export const X_GEMBOK = [615, 805, 995, 1185, 1310] as const;

/** Gembok yang diambil di scene 7 — yang tengah, supaya barisnya tetap terbaca
 *  penuh sesudah satu diambil. */
export const I_GEMBOK_DIAMBIL = 2;

export const ABU = "var(--ink-1)";
export const GELAP = "var(--line)";
export const AKSEN = "var(--accent-ink)";
export const TEDUH = "var(--ink-2)";

/** Transform kamera: memperbesar `skala` kali dengan titik `x,y` tetap di
 *  tempatnya, lalu digeser `dx,dy`. Satu bentuk untuk semua scene — kamera yang
 *  ditulis ulang tiap scene cepat atau lambat memakai titik tumpu yang berbeda,
 *  dan jalannya melompat saat potongan keras. */
export const kamera = (o: {
  x?: number;
  y?: number;
  skala?: number;
  dx?: number;
  dy?: number;
}): string => {
  const x = o.x ?? P_JALAN.x;
  const y = o.y ?? P_JALAN.y;
  const s = o.skala ?? 1;
  return `translate(${o.dx ?? 0} ${o.dy ?? 0}) translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;
};

/* ===========================================================================
   Bentuk — semua mengembalikan <g>, dipasang di dalam satu <svg viewBox>
   ======================================================================== */

/** Satu-satunya garis yang ada di hampir semua scene. Ia yang membuat potongan
 *  keras antar-scene terbaca sebagai perpindahan pandang, bukan perpindahan
 *  tempat. */
export const Jalan: React.FC<{
  opacity?: number;
  /** 0..1 — bagian jalan yang tergambar, dari kiri. */
  panjang?: number;
  warna?: string;
}> = ({ opacity = 1, panjang = 1, warna = TEDUH }) => (
  <path
    d={`M${X_LUAR_KIRI} ${Y_JALAN}h${(X_LUAR_KANAN - X_LUAR_KIRI) * Math.max(0, Math.min(1, panjang))}`}
    stroke={warna}
    strokeWidth={6}
    strokeLinecap="round"
    opacity={opacity}
  />
);

/** Tangan yang menadah dari bawah jalan.
 *
 *  Sengaja tanpa lengan, tanpa badan, tanpa wajah: inti scene 1 justru bahwa
 *  siapa pun yang kebetulan ada di jalan itu memegang kotakmu, tanpa perlu jadi
 *  siapa-siapa. Tangan yang digambar sebagai penjahat mengubah masalahnya jadi
 *  masalah orang lain. */
export const Tangan: React.FC<{
  x: number;
  skala?: number;
  opacity?: number;
  /** 0..1 — tangan ini sedang memegang sesuatu. */
  nyala?: number;
}> = ({ x, skala = 1, opacity = 1, nyala = 0 }) => {
  const warna = nyala > 0.5 ? AKSEN : ABU;
  const a = 0.55 + 0.45 * nyala;
  return (
    <g transform={`translate(${x} ${Y_JALAN + 16}) scale(${skala})`} opacity={opacity}>
      {/* JARI DIGAMBAR DI ATAS GARIS JALAN — tanpa itu telapaknya terbaca
          sebagai lengkungan, bukan sebagai tangan yang menadah. */}
      {[-33, -11, 11, 33].map((dx, i) => (
        <path
          key={dx}
          d={`M${dx} 6v${-46 - (i === 1 || i === 2 ? 12 : 0)}`}
          stroke={warna}
          strokeWidth={11}
          strokeLinecap="round"
          opacity={a}
        />
      ))}
      {/* ibu jari — menjulur ke kiri, ke arah datangnya kiriman */}
      <path d="M-46 34l-26 -20" stroke={warna} strokeWidth={11} strokeLinecap="round" opacity={a} />
      {/* telapak */}
      <rect
        x={-46}
        y={2}
        width={92}
        height={74}
        rx={18}
        fill="var(--bg-elev)"
        stroke={warna}
        strokeWidth={7}
        opacity={a}
      />
      {/* pergelangan — yang membuat tangannya terbaca datang dari bawah jalan */}
      <path d="M-20 76v34M20 76v34" stroke={warna} strokeWidth={7} strokeLinecap="round" opacity={a * 0.8} />
    </g>
  );
};

/** Meja di ujung jalan. Permukaannya SETINGGI jalan — itu yang membuat kotak
 *  bisa meluncur keluar tanpa terbaca naik atau turun. */
export const Meja: React.FC<{
  x: number;
  opacity?: number;
  /** 0..1 — meja ini sedang dibicarakan. */
  sorot?: number;
}> = ({ x, opacity = 1, sorot = 0 }) => {
  const warna = sorot > 0.5 ? AKSEN : ABU;
  return (
    <g opacity={opacity}>
      {/* badan meja digambar sebagai BIDANG penuh, bukan dua kaki kurus: kaki
          setinggi 260 px di frame 1080 terbaca sebagai jangkungan, dan meja
          yang tidak terasa berat membuat kotak di atasnya ikut terasa ringan */}
      <rect
        x={x - MEJA.w / 2 + 26}
        y={Y_JALAN + 4}
        width={MEJA.w - 52}
        height={Y_LANTAI - Y_JALAN - 4}
        rx={10}
        fill="var(--bg-elev)"
        stroke={warna}
        strokeWidth={6}
        opacity={0.85}
      />
      <path
        d={`M${x - MEJA.w / 2 + 70} ${Y_JALAN + 60}v${Y_LANTAI - Y_JALAN - 110}M${x + MEJA.w / 2 - 70} ${Y_JALAN + 60}v${Y_LANTAI - Y_JALAN - 110}`}
        stroke={warna}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.4}
      />
      {/* permukaan — SETINGGI jalan, itu yang membuat kotak bisa meluncur keluar
          tanpa terbaca naik atau turun */}
      <rect
        x={x - MEJA.w / 2}
        y={Y_JALAN - 14}
        width={MEJA.w}
        height={20}
        rx={8}
        fill={sorot > 0.5 ? "var(--accent-soft)" : "var(--bg-elev)"}
        stroke={warna}
        strokeWidth={6}
      />
    </g>
  );
};

/** Kotak sengaja BESAR. Versi pertamanya 128x104 dan terbaca sebagai benda kecil
 *  yang hilang di frame 1920x1080 — di panggung ini kotak itu subjek utamanya,
 *  bukan properti. */
export const KOTAK = { w: 184, h: 148 } as const;

/** Surat — isi kotak, dan satu-satunya benda di episode ini yang tulisannya
 *  boleh berubah bentuk.
 *
 *  `acak` 0 = baris tulisan biasa, 1 = deretan tanda yang tidak terbaca. Ia
 *  dipakai TEPAT SEKALI, di `07-gembok-terbuka` tahap 5 (`naskah.md` § Analogi
 *  utama): kalau ia jadi hiasan yang muncul di mana-mana, penonton pulang
 *  dengan kesimpulan bahwa enkripsi itu soal bentuk huruf. */
export const Surat: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  acak?: number;
  /** 0..1 — berapa banyak baris yang sudah tergambar. */
  baris?: number;
}> = ({ x, y, skala = 1, opacity = 1, acak = 0, baris = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect
      x={-42}
      y={-54}
      width={84}
      height={108}
      rx={6}
      fill="var(--bg)"
      stroke={ABU}
      strokeWidth={4}
    />
    {[0, 1, 2, 3].map((k) => {
      const p = Math.max(0, Math.min(1, baris * 4 - k));
      if (p <= 0) return null;
      const lebar = (k % 2 === 0 ? 56 : 40) * p;
      /* Ambang berbeda per baris supaya pergantiannya menyapu dari atas ke
         bawah — satu tween, bukan empat. */
      const teracak = acak > k * 0.18;
      return teracak ? (
        <g key={k} transform={`translate(-28 ${-34 + k * 24})`}>
          {Array.from({ length: Math.round(lebar / 12) }, (_, j) => (
            <path
              key={j}
              d={`M${j * 12} -5l6 10M${j * 12 + 6} -5l-6 10`}
              stroke={TEDUH}
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
        </g>
      ) : (
        <path
          key={k}
          d={`M-28 ${-34 + k * 24}h${lebar}`}
          stroke={TEDUH}
          strokeWidth={6}
          strokeLinecap="round"
        />
      );
    })}
  </g>
);

/** Gembok. `terbuka` 0 = terkunci, 1 = sengkangnya terangkat dan terbuka. */
export const Gembok: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  terbuka?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, terbuka = 0, warna = ABU }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect x={-30} y={-9} width={60} height={50} rx={9} fill="var(--bg-elev)" stroke={warna} strokeWidth={6} />
    {/* sengkang: saat terbuka ia terangkat dan miring ke kanan */}
    <g transform={`translate(${12 * terbuka} ${-12 * terbuka}) rotate(${18 * terbuka} 0 -9)`}>
      <path
        d="M-17 -9v-17a17 17 0 0 1 34 0v17"
        fill="none"
        stroke={warna}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </g>
    <circle cx={0} cy={16} r={6} fill={warna} />
  </g>
);

/** Kunci. `patah` 0..1 memisahkannya jadi dua potong (scene 13). */
export const Kunci: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  rot?: number;
  patah?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, rot = 0, patah = 0, warna = AKSEN }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${skala})`} opacity={opacity}>
    <g transform={`translate(${-18 * patah} ${-8 * patah}) rotate(${-12 * patah})`}>
      <circle cx={-34} cy={0} r={22} fill="none" stroke={warna} strokeWidth={8} />
    </g>
    <g transform={`translate(${18 * patah} ${8 * patah}) rotate(${12 * patah})`}>
      <path d="M-14 0h60" stroke={warna} strokeWidth={8} strokeLinecap="round" />
      <path d="M28 0v18M42 0v18" stroke={warna} strokeWidth={8} strokeLinecap="round" />
    </g>
  </g>
);

/** Kotak kiriman — benda yang sama dari scene 1 sampai scene 16.
 *
 *  Titik acuannya KAKI kotak, sama seperti semua benda di panggung ini, jadi
 *  menaruhnya di jalan cukup `y = Y_JALAN`.
 *
 *  `buka` memutar tutupnya pada engsel BELAKANG (sisi kanan), arah yang sama
 *  dengan arah jalan. `isi` digambar hanya kalau tutupnya terbuka — kecuali
 *  `bayang`, yang memperlihatkannya ke penonton menembus dinding kotak. */
export const Kotak: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  rot?: number;
  /** 0..1 — tutup terangkat. */
  buka?: number;
  /** 0..1 — gembok terjepit di bibir kotak. */
  gembok?: number;
  /** 0..1 — pita segel melintang di sambungan tutup. */
  segel?: number;
  /** 0..1 — segelnya robek jadi dua potong. */
  segelRobek?: number;
  /** 0..1 — label di sisi kotak. */
  label?: number;
  /** 0..1 — isi kotak terlihat menembus dinding (untuk penonton saja). */
  bayang?: number;
  /** Diteruskan ke <Surat> saat tutupnya terbuka. */
  acak?: number;
  /** 0..1 — sudut kanan bawah kotak hilang (scene 12). */
  potong?: number;
  warna?: string;
}> = ({
  x,
  y,
  skala = 1,
  opacity = 1,
  rot = 0,
  buka = 0,
  gembok = 0,
  segel = 0,
  segelRobek = 0,
  label = 0,
  bayang = 0,
  acak = 0,
  potong = 0,
  warna = ABU,
}) => {
  const w = KOTAK.w;
  const h = KOTAK.h;
  const badan =
    potong > 0.5
      ? `M${-w / 2} ${-h}h${w}v${h - 48}l-48 48h${-(w - 48)}z`
      : `M${-w / 2} ${-h}h${w}v${h}h${-w}z`;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${skala})`} opacity={opacity}>
      <path d={badan} fill="var(--bg-elev)" stroke={warna} strokeWidth={5} strokeLinejoin="round" />

      {bayang > 0 && (
        <g opacity={bayang * 0.7}>
          <Surat x={0} y={-h / 2} skala={0.72} acak={acak} />
        </g>
      )}

      {label > 0 && (
        <g opacity={label}>
          <rect x={-w / 2 + 18} y={-h + 22} width={76} height={46} rx={6} fill="var(--bg)" stroke={AKSEN} strokeWidth={4} />
          <path
            d={`M${-w / 2 + 30} ${-h + 38}h48M${-w / 2 + 30} ${-h + 54}h32`}
            stroke={AKSEN}
            strokeWidth={5}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* tutup — engsel di sisi KANAN, arah yang sama dengan arah jalan */}
      <g transform={`rotate(${-104 * buka} ${w / 2} ${-h})`}>
        <rect
          x={-w / 2 - 4}
          y={-h - 20}
          width={w + 8}
          height={22}
          rx={5}
          fill="var(--bg-elev)"
          stroke={warna}
          strokeWidth={5}
        />
      </g>

      {/* isi hanya terlihat kalau tutupnya benar-benar terangkat */}
      {buka > 0.35 && (
        <Surat x={0} y={-h / 2 - 6} skala={0.78} opacity={(buka - 0.35) / 0.65} acak={acak} />
      )}

      {segel > 0 && (
        <g opacity={segel}>
          <path
            d={`M${-w / 2 - 6} ${-h - 36}h${w / 2 - 4}`}
            stroke="var(--ok)"
            strokeWidth={7}
            strokeLinecap="round"
            transform={segelRobek > 0 ? `translate(${-10 * segelRobek} ${6 * segelRobek})` : undefined}
          />
          <path
            d={`M${6} ${-h - 36}h${w / 2}`}
            stroke="var(--ok)"
            strokeWidth={7}
            strokeLinecap="round"
            transform={segelRobek > 0 ? `translate(${10 * segelRobek} ${-6 * segelRobek})` : undefined}
          />
          {/* tanda segel — BERGERIGI, sengaja tidak mirip tanda tangan di surat
              pengenal (scene 11) yang bergelombang */}
          <path
            d={`M${w / 2 + 12} ${-h - 44}l10 10l-10 10l10 10`}
            fill="none"
            stroke="var(--ok)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={1 - segelRobek}
          />
        </g>
      )}

      {gembok > 0 && <Gembok x={0} y={-h - 6} skala={0.78} opacity={gembok} />}
    </g>
  );
};

/** Sosok netral — penerima, dan siapa pun yang berdiri di sisi jalan.
 *
 *  Tanpa wajah dan tanpa nama, dan itu mengikat sampai scene 11: penerima harus
 *  tetap terasa asing sampai pertanyaan "ini benar dia atau bukan" akhirnya
 *  ditanyakan. `hadap` 1 = menghadap kiri, -1 = menghadap kanan. */
export const Sosok: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  hadap?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, hadap = 1, warna = ABU }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <g transform={`scale(${hadap} 1)`}>
      <circle cx={0} cy={-148} r={40} fill="var(--bg)" stroke={warna} strokeWidth={7} />
      <path d="M-40 -143h-16" stroke={warna} strokeWidth={7} strokeLinecap="round" />
    </g>
    <path
      d="M-62 0v-42a62 62 0 0 1 124 0V0"
      fill="none"
      stroke={warna}
      strokeWidth={7}
      strokeLinecap="round"
    />
  </g>
);

/** Surat pengenal yang menempel di gembok (scene 11 dan 16).
 *
 *  Tulisannya bentuk garis, bukan huruf: teks yang bisa dibaca membuat penonton
 *  berhenti mendengarkan dan mulai membaca. `tanda` 0..1 menggambar tanda tangan
 *  bergelombang di sudut bawah — bentuk yang sengaja BEDA dari tanda segel yang
 *  bergerigi. */
export const SuratPengenal: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  tanda?: number;
}> = ({ x, y, skala = 1, opacity = 1, tanda = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <rect x={-72} y={-48} width={144} height={96} rx={8} fill="var(--bg)" stroke={ABU} strokeWidth={5} />
    <path d="M-56 -24h68M-56 -6h92" stroke={TEDUH} strokeWidth={6} strokeLinecap="round" />
    <path
      d="M-56 26q12 -18 24 0t24 0"
      fill="none"
      stroke={AKSEN}
      strokeWidth={5}
      strokeLinecap="round"
      opacity={tanda}
    />
  </g>
);

/** Bangunan di jalan — ruang antara (scene 15, 16) dan rumah di ujung (scene 15).
 *
 *  `rumah` memberi atap segitiga; tanpa itu ia kotak beratap datar. Keduanya
 *  netral: membuka kotak di tengah jalan adalah pilihan rancangan yang punya
 *  alasan, bukan kejahatan, dan warna bahaya di sini menjawab pertanyaan scene
 *  15 sebelum ditanyakan. */
export const Bangunan: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  rumah?: boolean;
  nyala?: number;
}> = ({ x, y, skala = 1, opacity = 1, rumah = false, nyala = 0 }) => {
  const warna = nyala > 0.5 ? AKSEN : ABU;
  return (
    <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
      <rect
        x={-70}
        y={-116}
        width={140}
        height={116}
        rx={8}
        fill={nyala > 0.5 ? "var(--accent-soft)" : "var(--bg-elev)"}
        stroke={warna}
        strokeWidth={6}
      />
      {rumah ? (
        <path d="M-84 -116L0 -168l84 52" fill="none" stroke={warna} strokeWidth={6} strokeLinejoin="round" />
      ) : (
        <rect x={-84} y={-134} width={168} height={18} rx={5} fill="var(--bg-elev)" stroke={warna} strokeWidth={6} />
      )}
      <rect x={-22} y={-62} width={44} height={62} rx={4} fill="var(--bg)" stroke={warna} strokeWidth={5} />
    </g>
  );
};

/** Potongan yang ditahan di meja (scene 9). Dua bentuk yang sengaja BERBEDA —
 *  bedanya itu setengah isi scene, dan kesamaan hasilnya setengah lagi. */
export const Potongan: React.FC<{
  x: number;
  y: number;
  bentuk?: 0 | 1;
  skala?: number;
  opacity?: number;
  warna?: string;
}> = ({ x, y, bentuk = 0, skala = 1, opacity = 1, warna = ABU }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    {bentuk === 0 ? (
      <path
        d="M-30 -30h60v28a12 12 0 0 0 0 24v28h-60z"
        fill="var(--bg-elev)"
        stroke={warna}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M-30 -30h28a12 12 0 0 1 24 0h28v60h-80z"
        fill="var(--bg-elev)"
        stroke={warna}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    )}
  </g>
);

/** Barang setengah jadi yang bolak-balik di jalan (scene 9). Sengaja TIDAK
 *  mirip kunci dan tidak mirip kotak: yang perlu terbaca cuma bahwa ia belum
 *  jadi apa-apa, dan memegangnya tidak memberi siapa pun apa-apa. */
export const SetengahJadi: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, warna = TEDUH }) => (
  <g transform={`translate(${x} ${y}) scale(${skala})`} opacity={opacity}>
    <path
      d="M-34 24l16-48h36l16 48z"
      fill="var(--bg-elev)"
      stroke={warna}
      strokeWidth={5}
      strokeLinejoin="round"
      strokeDasharray="12 9"
    />
  </g>
);
