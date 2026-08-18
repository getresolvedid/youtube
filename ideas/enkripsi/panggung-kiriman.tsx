/* Kosakata visual episode "enkripsi" — dipakai bersama SEMBILAN scene.

   Berkas ini sengaja di luar `scenes/`: `npm run sisa` memeriksa setiap `.tsx`
   di dalam folder scene terhadap daftar kunci dari naskah, jadi berkas bantu
   yang tinggal di sana akan dilaporkan sebagai nama yang tidak dikenal
   (CLAUDE.md HARD RULE 1).

   KENAPA SATU BERKAS, DAN BUKAN DIGAMBAR ULANG PER SCENE. Arahan animasi user
   (2026-08-17) menuntutnya tiga kali, dan ketiganya bukan soal kerapian kode:

     1. "Reuse the same network"  — jaringan di `lewat-internet` dan
        `terkunci-di-jalan` harus terlihat SAMA, karena seluruh pelajaran
        episode ini ada di perbandingan keduanya.
     2. "Reuse the same observer" — pengamat yang sama, di tempat yang sama,
        dengan layar yang sama. Yang berubah cuma isi layarnya.
     3. "Reuse the same message"  — satu kalimat contoh, tidak pernah berganti
        di tengah jalan.

   Kalau ketiganya digambar ulang per scene, perbedaan kecil yang tidak
   disengaja — simpul bergeser, pengamat berpindah, kalimat beda satu huruf —
   akan terbaca penonton sebagai PERUBAHAN YANG BERARTI. Dan yang mereka
   bandingkan bukan lagi bentuk paketnya.

   ARAHNYA MENGIKAT: kiri = pengirim, kanan = penerima. Tidak ada satu scene pun
   yang boleh membalik arah itu.
*/
import type React from "react";

import { E, t } from "../../shared/anim";

/* --- kalimat contoh, satu untuk seluruh episode ---------------------------- */

/** Kalimat yang dikirim. Sama persis di scene 3, 5, 8, 9 — arahan user:
 *  "Do not switch to different messages halfway through." */
export const PESAN = "Halo, apa kabar?";

/** Bentuk terkunci yang tampil di badan paket. */
export const SANDI = "X7K9@2";

/** Bentuk terkunci yang tampil di layar pengamat — lebih panjang dari yang di
 *  badan paket, dan itu DISENGAJA (arahan user memakai dua bentuk berbeda).
 *  Layar penuh yang isinya sependek badan paket terbaca sebagai label, bukan
 *  sebagai isi yang panjang dan tidak terbaca. */
export const SANDI_PANJANG = "X7K9@2#L8$Q";

/* --- koordinat bersama ----------------------------------------------------- */

/** Jalur yang dilewati paket. Dipakai apa adanya oleh `lewat-internet` dan
 *  `terkunci-di-jalan` — dua scene yang HARUS terlihat sama. */
export const JALUR = { kiri: 300, kanan: 1620, y: 560 } as const;

/** Simpul di sepanjang jalur. Jaraknya DITULIS, tidak dihitung dari acak:
 *  `Math.random()` menghasilkan gambar berbeda tiap frame saat render paralel. */
export const SIMPUL = [300, 564, 828, 1092, 1356, 1620] as const;

/** Simpul latar — lebih redup dan di luar jalur utama, supaya jaringannya
 *  terasa jauh lebih besar daripada satu garis (arahan user shot 4B). */
export const SIMPUL_JAUH = [
  { x: 430, y: 320 },
  { x: 700, y: 250 },
  { x: 980, y: 336 },
  { x: 1240, y: 262 },
  { x: 1500, y: 330 },
  { x: 520, y: 800 },
  { x: 860, y: 858 },
  { x: 1180, y: 812 },
  { x: 1460, y: 866 },
] as const;

/** HP pengirim & penerima, di kedua ujung jalur. Koordinatnya DIPATOK di sini
 *  dan dipakai scene 4, 5, 7, dan 8 apa adanya — kalau HP penerima bergeser
 *  antara scene 4 dan scene 7, penonton membacanya sebagai tempat yang lain,
 *  dan perbandingan yang jadi seluruh isi bagian 5 ikut hilang. */
export const HP_KIRI = { x: 100, y: 430, w: 150, h: 262 } as const;
export const HP_KANAN = { x: 1690, y: 430, w: 150, h: 262 } as const;

/** Yang mengamati — DI LUAR jalur, di bawahnya. Dipakai scene 5 dan scene 7 di
 *  koordinat yang sama persis (arahan user: "Reuse the same observer"). */
export const PENGAMAT = { x: 900, alas: 1012 } as const;
export const MONITOR = { x: 1006, y: 790, w: 252, h: 170 } as const;

/** Titik tumpu kamera saat merapat ke layar yang mengamati. Satu nilai untuk
 *  scene 5 dan 7, karena gerak kamera yang berbeda membuat penonton mengira ia
 *  sedang melihat tempat yang lain. */
export const TUMPU_MONITOR = {
  cx: MONITOR.x + MONITOR.w / 2,
  cy: MONITOR.y + MONITOR.h / 2,
} as const;

/** Skala saat layar yang mengamati mengisi sebagian besar frame. Tinggal di sini,
 *  bukan di salah satu scene, supaya scene 5 dan scene 7 tidak pernah bisa
 *  berbeda — push-in yang tidak sama membuat penonton mengira ia sedang melihat
 *  tempat yang lain, dan perbandingan yang jadi seluruh isi bagian 5 ikut hilang. */
export const RAPAT_MONITOR = 2.6;

/** Kamera satu grup, bukan per elemen — elemen yang membesar sendiri-sendiri
 *  terbaca berpencar, bukan sebagai kamera yang merapat. */
export const kamera = (skala: number, cx = 960, cy = 540): string =>
  `translate(${cx} ${cy}) scale(${skala}) translate(${-cx} ${-cy})`;

/** Kamera yang merapat KE sebuah benda dan sekaligus MEMBAWANYA ke tengah frame.
 *
 *  `kamera()` biasa cuma membesarkan di tempat: benda yang berdiri di sudut
 *  bawah tetap di sudut bawah, cuma jadi besar — dan bagian bawahnya terdorong
 *  keluar tepi. Itu persis yang terjadi pada layar pengamat di render still
 *  pertama scene 5: ia membesar sampai separuhnya keluar frame, dan paketnya
 *  ikut terdorong ke tepi atas.
 *
 *  Di sini titik jangkarnya BERGESER dari (cx,cy) ke tengah frame seiring
 *  zoomnya — jadi pada skala 1 tidak ada yang berpindah sama sekali (identitas),
 *  dan pada skala penuh bendanya tepat di tengah. Panning-nya turunan dari
 *  skala, bukan tween kedua yang bisa selesai di waktu yang berbeda. */
export const kameraKe = (
  skala: number,
  cx: number,
  cy: number,
  maks: number,
): string => {
  const p = maks > 1 ? Math.min(1, Math.max(0, (skala - 1) / (maks - 1))) : 0;
  const ax = cx + (960 - cx) * p;
  const ay = cy + (540 - cy) * p;
  return `translate(${ax} ${ay}) scale(${skala}) translate(${-cx} ${-cy})`;
};

/* --- sosok ----------------------------------------------------------------- */

/** Sosok manusia — kepala, bahu, badan. SATU komponen untuk pengirim, penerima,
 *  dan pengamat, jadi yang membedakan mereka cuma tempat, ukuran, dan terangnya.
 *
 *  Pengamat SENGAJA memakai komponen yang sama: arahan user melarang tudung,
 *  ruang gelap, dan sosok jahat yang dilebih-lebihkan — "use a neutral person
 *  looking at a computer. This keeps the video educational." */
export const Sosok: React.FC<{
  x: number;
  /** Garis alas — kaki sosok berdiri/duduk di sini. */
  y: number;
  skala?: number;
  opacity?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, warna = "var(--ink-1)" }) => (
  <g
    transform={`translate(${x} ${y}) scale(${skala}) translate(${-x} ${-y})`}
    opacity={opacity}
  >
    <circle cx={x} cy={y - 250} r={52} fill={warna} />
    <path
      d={`M ${x - 84} ${y}
          L ${x - 84} ${y - 128}
          Q ${x - 84} ${y - 182} ${x} ${y - 182}
          Q ${x + 84} ${y - 182} ${x + 84} ${y - 128}
          L ${x + 84} ${y}
          Z`}
      fill={warna}
    />
  </g>
);

/* --- perangkat ------------------------------------------------------------- */

/** Bidang layar sebuah HP — diturunkan dari kotak badannya, bukan diketik ulang.
 *
 *  Diekspor karena scene menaruh isinya (kepala percakapan, kolom ketik,
 *  gelembung) di koordinat mutlak. Selama angkanya disalin ke berkas scene,
 *  setiap perubahan bentuk HP diam-diam menggeser isinya keluar bidang layar —
 *  dan yang terlihat cuma teks yang menempel di bezel, tanpa satu pun error. */
export const layarHp = (
  x: number,
  y: number,
  w: number,
  h: number,
): { x: number; y: number; w: number; h: number; r: number } => {
  const p = Math.max(6, w * 0.055);
  return {
    x: x + p,
    y: y + p * 2.2,
    w: w - p * 2,
    h: h - p * 4.2,
    r: w * 0.075,
  };
};

/** HP — bukan kotak bersudut bulat.
 *
 *  Yang membuat sebuah bentuk terbaca sebagai HP bukan proporsinya — kotak
 *  150 x 262 sama sahnya dibaca sebagai pintu, kartu, atau lemari — melainkan
 *  LIMA TANDA KECIL yang cuma dipunyai HP: bezel yang mengelilingi layar,
 *  lubang suara di atas, kamera depan, bilah geser di bawah, dan tombol di sisi
 *  badannya. Semuanya kecil, dan justru itu sebabnya ia bekerja: penonton tidak
 *  membacanya satu per satu, ia cuma berhenti bertanya benda apa itu.
 *
 *  Ini penting di episode ini melebihi kerapian, karena HP muncul di TUJUH
 *  scene sebagai dua ujung percakapan — dan seluruh arah panggung (kiri
 *  pengirim, kanan penerima) bertumpu pada penonton mengenali keduanya sebagai
 *  benda yang sama jenisnya.
 *
 *  Semua tanda itu digambar di dalam MARGIN badan, di luar bidang layar
 *  (`layarHp`), jadi isi yang dikirim scene lewat `children` tidak pernah
 *  bertabrakan dengannya.
 *
 *  Lapis "menyala" TERPISAH dari bidang layarnya, dan itu perbaikan dari render
 *  still pertama: sebelumnya `nyala` cuma menaikkan opasitas layar yang warnanya
 *  `--bg` — di atas latar yang juga `--bg`, menyala dan mati terlihat sama
 *  persis. Ketahuan dari PNG, bukan dari pemeriksaan mana pun (CLAUDE.md:
 *  `check` lulus bukan bukti gambarnya ada). */
export const Hp: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  /** 0 = layar mati, 1 = menyala penuh. */
  nyala?: number;
  children?: React.ReactNode;
}> = ({ x, y, w, h, nyala = 1, children }) => {
  const p = Math.max(6, w * 0.055);
  const L = layarHp(x, y, w, h);
  /* Tebal garis dan jari-jari sudut IKUT LEBARNYA, bukan angka tetap: HP yang
     sama dipakai selebar 150 (di jalur) sampai 540 (mengisi frame), dan garis
     tetap 2px hilang di yang kecil sekaligus terlihat tipis di yang besar. */
  const garis = Math.max(2, w * 0.013);

  return (
    <g>
      {/* --- tombol di sisi badan: daya di kanan, volume di kiri.
              Digambar SEBELUM badannya supaya ia terbaca menempel di sisi,
              bukan tertempel di atasnya. --- */}
      <rect
        x={x + w - garis}
        y={y + h * 0.24}
        width={garis * 2.4}
        height={h * 0.11}
        rx={garis}
        fill="var(--ink-2)"
        opacity={0.85}
      />
      <rect
        x={x - garis * 1.4}
        y={y + h * 0.2}
        width={garis * 2.4}
        height={h * 0.07}
        rx={garis}
        fill="var(--ink-2)"
        opacity={0.7}
      />
      <rect
        x={x - garis * 1.4}
        y={y + h * 0.29}
        width={garis * 2.4}
        height={h * 0.07}
        rx={garis}
        fill="var(--ink-2)"
        opacity={0.7}
      />

      {/* --- badan --- */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={w * 0.155}
        fill="var(--bg-elev)"
        stroke="var(--ink-2)"
        strokeWidth={garis}
      />

      {/* --- bidang layar --- */}
      <rect x={L.x} y={L.y} width={L.w} height={L.h} rx={L.r} fill="var(--bg)" />
      <rect
        x={L.x}
        y={L.y}
        width={L.w}
        height={L.h}
        rx={L.r}
        fill="var(--accent-ink)"
        opacity={0.16 * nyala}
      />

      {children}

      {/* --- lubang suara + kamera depan, di margin ATAS ---
              Digambar SESUDAH children supaya isi layar tidak pernah menimpanya:
              bagian ini milik badan HP-nya, bukan milik yang sedang tampil. --- */}
      <rect
        x={x + w / 2 - w * 0.12}
        y={y + p * 0.8}
        width={w * 0.24}
        height={Math.max(2.5, w * 0.028)}
        rx={w * 0.014}
        fill="var(--ink-2)"
        opacity={0.9}
      />
      <circle
        cx={x + w / 2 + w * 0.185}
        cy={y + p * 0.8 + Math.max(1.25, w * 0.014)}
        r={Math.max(1.6, w * 0.018)}
        fill="var(--ink-2)"
        opacity={0.75}
      />

      {/* --- bilah geser, di margin BAWAH --- */}
      <rect
        x={x + w / 2 - w * 0.15}
        y={y + h - p * 1.35}
        width={w * 0.3}
        height={Math.max(2.5, w * 0.022)}
        rx={w * 0.011}
        fill="var(--ink-1)"
        opacity={0.55}
      />
    </g>
  );
};

/** Layar meja pengamat — bukan HP. Bedanya bentuk memang perlu: pengamat tidak
 *  sedang berkirim pesan, dia sedang MELIHAT yang lewat. */
export const Monitor: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  nyala?: number;
  children?: React.ReactNode;
}> = ({ x, y, w, h, nyala = 1, children }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={16}
      fill="var(--bg-elev)"
      stroke="var(--ink-2)"
      strokeWidth={4}
    />
    <rect
      x={x + 14}
      y={y + 14}
      width={w - 28}
      height={h - 28}
      rx={10}
      fill="var(--bg)"
    />
    <rect
      x={x + 14}
      y={y + 14}
      width={w - 28}
      height={h - 28}
      rx={10}
      fill="var(--accent-ink)"
      opacity={0.14 * nyala}
    />
    {/* kaki + alas */}
    <rect x={x + w / 2 - 12} y={y + h} width={24} height={38} fill="var(--ink-2)" />
    <rect
      x={x + w / 2 - 78}
      y={y + h + 38}
      width={156}
      height={12}
      rx={6}
      fill="var(--ink-2)"
    />
    {children}
  </g>
);

/* --- jaringan -------------------------------------------------------------- */

/** Jalur bersimpul. `nyala(i)` menentukan seberapa terang simpul ke-i — dipakai
 *  scene untuk menyalakan simpul tepat saat paketnya lewat, tanpa menyimpan
 *  state apa pun.
 *
 *  Arahan user: "Do not show actual physical cables everywhere. The network
 *  should feel digital and abstract." Karena itu garisnya putus-putus, bukan
 *  kabel, dan tidak ada satu pun ikon perangkat di sepanjang jalur. */
export const Jaringan: React.FC<{
  /** 0 = simpul jauh belum ada, 1 = tampil penuh. */
  luas?: number;
  nyala?: (i: number) => number;
  opacity?: number;
}> = ({ luas = 1, nyala, opacity = 1 }) => (
  <g opacity={opacity}>
    {/* simpul latar — lebih redup, memberi kesan jaringan yang jauh lebih besar */}
    <g opacity={0.5 * luas}>
      {SIMPUL_JAUH.map((s) => (
        <g key={`${s.x}-${s.y}`}>
          <circle cx={s.x} cy={s.y} r={9} fill="var(--line)" />
        </g>
      ))}
    </g>

    <line
      x1={JALUR.kiri}
      y1={JALUR.y}
      x2={JALUR.kanan}
      y2={JALUR.y}
      stroke="var(--line)"
      strokeWidth={6}
      strokeDasharray="18 22"
      strokeLinecap="round"
    />

    {SIMPUL.map((x, i) => {
      const n = nyala ? nyala(i) : 0;
      return (
        <g key={x}>
          {/* halo yang menyala saat paketnya lewat — radiusnya ikut naik supaya
              nyalanya terbaca di layar kecil, bukan cuma sebagai perubahan warna */}
          <circle
            cx={x}
            cy={JALUR.y}
            r={13 + 16 * n}
            fill="var(--accent-ink)"
            opacity={0.28 * n}
          />
          <circle
            cx={x}
            cy={JALUR.y}
            r={13}
            fill={n > 0.5 ? "var(--accent-ink)" : "var(--ink-2)"}
          />
        </g>
      );
    })}
  </g>
);

/** Nyala satu simpul saat paket melewatinya — fungsi murni dari posisi paket,
 *  bukan dari waktu. Simpul menyala karena ADA YANG LEWAT, jadi menurunkannya
 *  dari jarak membuat nyalanya tidak pernah meleset saat kalimat VO berubah dan
 *  seluruh timing bergeser. */
export const nyalaDariJarak = (xPaket: number, xSimpul: number): number =>
  Math.max(0, 1 - Math.abs(xPaket - xSimpul) / 120);

/** Bentuk siap pakai untuk prop `nyala` di <Jaringan>. Ditaruh di sini supaya
 *  scene 4, 5, dan 7 memanggil hal yang sama persis — kalau salah satunya
 *  menulis rumusnya sendiri, jaringan yang seharusnya identik mulai berbeda
 *  tanpa ada yang menyadarinya. */
export const nyalaSimpul =
  (xPaket: number) =>
  (i: number): number =>
    nyalaDariJarak(xPaket, SIMPUL[i] ?? Number.NEGATIVE_INFINITY);

/* --- paket ----------------------------------------------------------------- */

/** Paket yang berjalan — SATU benda untuk seluruh episode.
 *
 *  `terkunci` 0 → 1 mengubah tiga hal sekaligus dari satu nilai: warnanya
 *  mendalam, gemboknya muncul, dan glif isinya berganti dari garis-garis
 *  (kalimat) jadi lambang acak. Tiga tween terpisah akan membuat salah satunya
 *  selesai lebih dulu, dan bentuk antaranya terbaca sebagai bentuk KETIGA. */
export const Paket: React.FC<{
  x: number;
  y: number;
  terkunci?: number;
  skala?: number;
  opacity?: number;
  /** Sudut kotak. 22 = gelembung chat, 4 = paket. */
  radius?: number;
  lebar?: number;
  tinggi?: number;
}> = ({
  x,
  y,
  terkunci = 0,
  skala = 1,
  opacity = 1,
  radius = 10,
  lebar = 108,
  tinggi = 76,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${skala}) translate(${-x} ${-y})`}
    opacity={opacity}
  >
    <rect
      x={x - lebar / 2}
      y={y - tinggi / 2}
      width={lebar}
      height={tinggi}
      rx={radius}
      fill="var(--accent)"
    />
    <rect
      x={x - lebar / 2}
      y={y - tinggi / 2}
      width={lebar}
      height={tinggi}
      rx={radius}
      fill="var(--accent-deep)"
      opacity={terkunci}
    />
    <rect
      x={x - lebar / 2}
      y={y - tinggi / 2}
      width={lebar}
      height={tinggi}
      rx={radius}
      fill="none"
      stroke="var(--accent-ink)"
      strokeWidth={3}
      opacity={terkunci}
    />

    {/* isi: tiga bilah = kalimat yang terbaca. memudar saat terkunci. */}
    <g opacity={1 - terkunci}>
      <rect x={x - 30} y={y - 17} width={60} height={7} rx={3.5} fill="var(--ink-0)" />
      <rect x={x - 30} y={y - 3} width={44} height={7} rx={3.5} fill="var(--ink-0)" />
      <rect x={x - 30} y={y + 11} width={52} height={7} rx={3.5} fill="var(--ink-0)" />
    </g>

    {/* gembok TERTUTUP, muncul bersama warnanya */}
    <g opacity={terkunci}>
      <path
        d={`M ${x - 11} ${y - 4} v -9 a 11 11 0 0 1 22 0 v 9`}
        fill="none"
        stroke="var(--ink-0)"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <rect
        x={x - 17}
        y={y - 4}
        width={34}
        height={26}
        rx={5}
        fill="var(--ink-0)"
      />
    </g>
  </g>
);

/* --- kotak proses ---------------------------------------------------------- */

/** Kotak berlabel yang menutup di sekeliling isinya — dipakai `enkripsi` dan
 *  `dekripsi` dengan label berbeda. Bentuk yang sama untuk keduanya adalah
 *  keputusan: dekripsi harus terbaca sebagai tindakan yang MEMBALIK enkripsi,
 *  bukan sebagai mesin lain yang kebetulan ada di ujung sana. */
export const KotakProses: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** 0 = terbuka lebar, 1 = tertutup rapat. */
  tutup?: number;
  opacity?: number;
  children?: React.ReactNode;
}> = ({ x, y, w, h, label, tutup = 0, opacity = 1, children }) => (
  <g opacity={opacity}>
    <rect
      x={x - w / 2}
      y={y - h / 2}
      width={w}
      height={h}
      rx={20}
      fill="var(--bg-elev)"
      stroke="var(--accent-ink)"
      strokeWidth={4}
    />
    {children}
    {/* dua daun yang menutup dari kiri & kanan — yang di dalamnya tertutup
        SUNGGUHAN, bukan cuma diberi selubung gelap */}
    <rect
      x={x - w / 2 + 2}
      y={y - h / 2 + 2}
      width={(w / 2 - 2) * tutup}
      height={h - 4}
      fill="var(--bg-elev)"
    />
    <rect
      x={x + w / 2 - 2 - (w / 2 - 2) * tutup}
      y={y - h / 2 + 2}
      width={(w / 2 - 2) * tutup}
      height={h - 4}
      fill="var(--bg-elev)"
    />
    <text
      x={x}
      y={y - h / 2 - 26}
      fontSize={34}
      fontFamily="var(--font-mono)"
      fontWeight={700}
      fill="var(--accent-ink)"
      textAnchor="middle"
      letterSpacing={4}
    >
      {label}
    </text>
  </g>
);

/** Kunci — lambang, bukan kunci logam. Arahan user: "The key should be shown as
 *  a visual metaphor, not necessarily as a literal physical key." */
export const Kunci: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
}> = ({ x, y, skala = 1, opacity = 1 }) => (
  <g
    transform={`translate(${x} ${y}) scale(${skala}) translate(${-x} ${-y})`}
    opacity={opacity}
  >
    <circle
      cx={x - 16}
      cy={y}
      r={17}
      fill="none"
      stroke="var(--ok)"
      strokeWidth={7}
    />
    <path
      d={`M ${x + 1} ${y} h 34 M ${x + 22} ${y} v 13 M ${x + 33} ${y} v 10`}
      stroke="var(--ok)"
      strokeWidth={7}
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

/** Gembok berdiri sendiri — untuk kartu penutup dan isyarat di scene 6.
 *  `terbuka` 1 = sengkangnya miring terangkat. */
export const Gembok: React.FC<{
  x: number;
  y: number;
  skala?: number;
  opacity?: number;
  terbuka?: number;
  warna?: string;
}> = ({ x, y, skala = 1, opacity = 1, terbuka = 0, warna = "var(--accent-ink)" }) => (
  <g
    transform={`translate(${x} ${y}) scale(${skala}) translate(${-x} ${-y})`}
    opacity={opacity}
  >
    <path
      d={`M ${x - 22} ${y - 8} v -18 a 22 22 0 0 1 44 0 v 18`}
      fill="none"
      stroke={warna}
      strokeWidth={10}
      strokeLinecap="round"
      transform={`translate(${18 * terbuka} ${-6 * terbuka}) rotate(${
        -14 * terbuka
      } ${x} ${y - 26})`}
    />
    <rect x={x - 34} y={y - 8} width={68} height={52} rx={10} fill={warna} />
  </g>
);

/** Satu tween yang dipakai berkali-kali: benda masuk dengan mengembang sedikit.
 *  Ditaruh di sini supaya sembilan scene tidak masing-masing memilih angka
 *  sendiri — ritme yang berbeda-beda di tiap scene terbaca sebagai episode yang
 *  digarap beberapa orang. */
export const munculSkala = (d: number, mulai: number): number =>
  t(d, { mulai, durasi: 0.5, dari: 0.86, ke: 1, ease: E.backOut(1.6) });
