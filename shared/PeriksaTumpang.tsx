/* Pemeriksa tumpang-tindih — apakah ada dua benda yang saling menutupi.

   KENAPA INI HIDUP DI DALAM HALAMAN, BUKAN DI PIKSEL.

   Dari PNG, "dua benda bertumpuk" dan "satu benda yang kebetulan berbentuk
   begitu" terlihat sama persis. Yang membedakan keduanya cuma ada di DOM:
   kotak siapa, seluas apa. Karena itu pengukurannya dilakukan di dalam raman
   saat frame-nya dirender, lalu hasilnya dikirim ke Node lewat `console.log` —
   ditangkap `onBrowserLog` di tools/periksa-tumpang.mjs.

   TIDAK MENGUBAH APA PUN YANG DIRENDER. Komponennya mengembalikan `null` dan
   cuma mengukur. Kalau `periksaTumpang` tidak dikirim lewat input props, ia
   tidak melakukan apa-apa sama sekali — jadi ia aman menempel di <Panggung>
   untuk SEMUA komposisi, termasuk render produksi.

   YANG DIHITUNG SEBAGAI BENDA: hanya yang membawa makna dan karena itu bisa
   RUGI kalau tertutupi —

     · elemen HTML yang punya teks langsung        <p>, <h2>, <div> berteks
     · <text> di dalam SVG                          label di dalam figur
     · ikon: <svg> yang kecil, <img>, <canvas>

   Ketiganya diukur dari TINTANYA, bukan dari kotak elemennya: baris huruf
   lewat `Range`, gambar lewat `getBBox()`. Kotak elemen selalu lebih besar
   daripada yang terlihat — label rata tengah di kotak selebar 400px, ikon
   dengan ruang kosong di dalam viewBox-nya — dan selisih itu yang bikin dua
   benda berjarak dilaporkan bertumpuk.

   YANG TIDAK: permukaan. Kartu, panel, bilah berwarna, kotak berlatar, dan
   SVG BESAR yang jadi kanvas figur. Label memang ditaruh di atas semua itu —
   itulah tata letak yang benar. Kalau permukaan ikut dihitung, setiap scene
   melaporkan puluhan "tumpang" yang semuanya bukan cacat, dan perintah yang
   keluarannya selalu merah akan dimatikan orang dalam seminggu.

   Konsekuensinya disebutkan terus terang: dua PERSEGI di dalam satu figur SVG
   yang saling menimpa tidak terdeteksi di sini. Yang diburu perintah ini adalah
   label yang menabrak label, dan label yang menabrak ikon — cacat yang paling
   sering lolos ke MP4 karena di Studio ia cuma terjadi selama satu detik.

   YANG SENGAJA BERTUMPUK menandai dirinya sendiri di berkas scene-nya:

     <div data-tumpang="sengaja">        ikut dirender, tidak pernah dilaporkan
     <div data-tumpang="abaikan">        sama, tapi untuk elemen bantu/penanda

   Keduanya dibaca sama oleh pemeriksa ini; dua nama supaya niatnya kebaca saat
   berkas scene-nya dibuka lagi setahun kemudian.
*/
import type React from "react";
import { useEffect, useMemo } from "react";
import { continueRender, delayRender, getInputProps } from "remotion";

/** Awalan baris `console.log` yang dicari tools/periksa-tumpang.mjs. Raman juga
 *  mengeluarkan log lain (React, font), jadi keluarannya harus bisa dipisahkan
 *  tanpa menebak. */
export const PENANDA_TUMPANG = "TUMPANG::";

/* --- ambang. Angkanya dipilih, bukan diturunkan ---------------------------- */

/** Sisi terpendek yang masih dianggap benda, dalam piksel panggung 1920x1080.
 *  Di bawah ini biasanya garis pemisah, titik, atau sisa border — bukan sesuatu
 *  yang bisa "tertutupi". */
const MIN_SISI = 10;

/** Opacity efektif (hasil kali seluruh leluhur) minimum supaya sebuah benda
 *  dianggap TERLIHAT. Ini yang menahan temuan palsu terbesar: hampir semua
 *  scene menyilangkan satu benda keluar sementara benda berikutnya masuk, dan
 *  di frame-frame itu keduanya memang menempati ruang yang sama — dengan
 *  sengaja. 0,35 kira-kira titik ketika sesuatu berhenti terbaca sebagai
 *  bayangan dan mulai terbaca sebagai benda. */
const MIN_OPACITY = 0.35;

/** Luas irisan dibagi luas kotak yang lebih kecil. Di bawah ini biasanya cuma
 *  senggolan satu-dua piksel dari pembulatan tata letak. */
const MIN_RASIO = 0.06;

/** Sisi terpendek IRISANNYA. Dua baris teks yang bertumpuk dalam satu label —
 *  "bukan yang" di atas "kamu tuju" — kotaknya beririsan 4 piksel karena kotak
 *  baris memang memuat ruang untuk ekor huruf. Rasionya bisa lewat 10% kalau
 *  barisnya panjang, padahal 4 piksel tidak menutupi apa pun. */
const MIN_TEBAL = 6;

/** Batas "ini ikon, bukan kanvas", sebagai porsi luas panggung. SVG yang lebih
 *  besar dari ini diperlakukan sebagai permukaan dan ditelusuri ke dalam untuk
 *  mengambil <text>-nya; yang lebih kecil dihitung sebagai satu benda utuh dan
 *  isinya tidak diurus — saling menimpa di dalam satu ikon memang begitulah
 *  ikon digambar. */
const MAKS_LUAS_IKON = 0.06;

/* --- pengukuran ------------------------------------------------------------ */

export type Temuan = {
  readonly a: string;
  readonly b: string;
  readonly rasio: number;
  /** Kotak irisannya, koordinat panggung — untuk ditunjuk di frame PNG-nya. */
  readonly kotak: { x: number; y: number; w: number; h: number };
};

type Kotak = {
  readonly el: Element;
  readonly rect: DOMRect;
  readonly nama: string;
};

/** Elemen HTML yang isinya gambar, bukan pembungkus. */
const GAMBAR_HTML = new Set(["img", "canvas", "video"]);

/** Di dalam SVG, cuma ini yang membawa makna. `rect`, `path`, `circle`, dan `g`
 *  adalah bahan gambarnya — mereka memang saling menimpa. */
const TINTA_SVG = new Set(["text", "image", "foreignobject"]);

/** Nama pendek yang cukup untuk menemukan elemennya lagi di berkas scene. */
const namaEl = (el: Element): string => {
  const tag = el.tagName.toLowerCase();
  const kelas = el.getAttribute("class");
  const teks = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 34);
  return (
    tag +
    (kelas ? `.${kelas.trim().split(/\s+/).join(".")}` : "") +
    (teks ? ` "${teks}"` : "")
  );
};

/** Opacity hasil kali sampai batas. Mengembalikan 0 kalau ada leluhur yang
 *  menyembunyikannya — `display:none` sebenarnya sudah membuat rect-nya nol,
 *  tapi `visibility:hidden` tidak. */
const opacityEfektif = (el: Element, batas: Element): number => {
  let hasil = 1;
  let n: Element | null = el;
  while (n) {
    const s = getComputedStyle(n);
    if (s.display === "none" || s.visibility === "hidden") return 0;
    hasil *= Number(s.opacity);
    if (n === batas) break;
    n = n.parentElement;
  }
  return hasil;
};

/** Punya simpul teks sendiri — bukan teks milik anaknya. Ini yang memisahkan
 *  `<p>Halaman itu muncul.</p>` dari `<div>` yang cuma membungkusnya. */
const punyaTeksLangsung = (el: Element): boolean => {
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === 3 && (n.textContent ?? "").trim().length > 0) return true;
  }
  return false;
};

/** Kotak TINTANYA, bukan kotak elemennya. Label yang rata tengah di dalam kotak
 *  selebar 400px cuma memakai 90px di tengahnya; memakai kotak elemen membuat
 *  dua label bertetangga dilaporkan bertumpuk padahal di layar ada ruang lebar
 *  di antara keduanya. Range mengukur baris hurufnya sendiri. */
const kotakTinta = (el: Element): DOMRect => {
  const kotakEl = el.getBoundingClientRect();
  try {
    const r = document.createRange();
    r.selectNodeContents(el);
    const kotakR = r.getBoundingClientRect();
    r.detach();
    if (kotakR.width <= 0 || kotakR.height <= 0) return kotakEl;

    /* Range pun masih mengembalikan KOTAK BARIS, bukan hurufnya: di atas dan di
       bawah selalu ada sisa — separuh leading dari `line-height`, plus ruang
       untuk ekor huruf yang tidak selalu dipakai. Judul yang berdiri tepat di
       atas ikon karena itu terbaca "bertumpuk" padahal di layar ada jarak.
       Yang disisakan di sini perkiraan, dan sengaja konservatif: yang hilang
       cuma senggolan tipis, dan senggolan tipis memang tidak menutupi apa pun. */
    const s = getComputedStyle(el);
    const fs = Number.parseFloat(s.fontSize) || 0;
    const lh = Number.parseFloat(s.lineHeight);
    const leading = Number.isFinite(lh) ? Math.max(0, (lh - fs) / 2) : 0;
    const sisip = Math.min(leading + fs * 0.12, kotakR.height / 3);

    return new DOMRect(
      kotakR.x,
      kotakR.y + sisip,
      kotakR.width,
      kotakR.height - 2 * sisip,
    );
  } catch {
    /* Elemen tanpa isi yang bisa dipilih — pakai kotak elemennya. */
  }
  return kotakEl;
};

/** Kotak GAMBARNYA untuk `<svg>`, bukan kotak elemennya. Sprite ikon punya
 *  ruang kosong di dalam viewBox-nya, jadi kotak elemen selalu lebih besar
 *  daripada yang terlihat — dan di panggung 9:16 yang sempit, ikon karena itu
 *  "menyenggol" apa pun yang berdiri tepat di atasnya padahal di layar ada
 *  jarak. `getBBox()` mengembalikan batas isi sebenarnya. */
const kotakGambar = (el: SVGGraphicsElement): DOMRect | null => {
  try {
    const bb = el.getBBox();
    const ctm = el.getScreenCTM();
    if (!ctm || bb.width <= 0 || bb.height <= 0) return null;
    const kiriAtas = new DOMPoint(bb.x, bb.y).matrixTransform(ctm);
    const kananBawah = new DOMPoint(bb.x + bb.width, bb.y + bb.height).matrixTransform(ctm);
    return new DOMRect(
      Math.min(kiriAtas.x, kananBawah.x),
      Math.min(kiriAtas.y, kananBawah.y),
      Math.abs(kananBawah.x - kiriAtas.x),
      Math.abs(kananBawah.y - kiriAtas.y),
    );
  } catch {
    /* `<use>` ke simbol yang belum termuat — pakai kotak elemennya. */
    return null;
  }
};

const dikecualikan = (el: Element): boolean => {
  let n: Element | null = el;
  while (n) {
    if (n.hasAttribute("data-tumpang")) return true;
    n = n.parentElement;
  }
  return false;
};

const luas = (r: DOMRect) => r.width * r.height;

const kumpulkan = (panggung: Element): Kotak[] => {
  const hasil: Kotak[] = [];
  const luasPanggung = luas(panggung.getBoundingClientRect());

  /** `dalamSvg` mengubah aturannya: di luar SVG yang dicari teks HTML dan ikon,
   *  di dalam SVG cuma <text>. */
  const telusur = (el: Element, dalamSvg: boolean) => {
    const tag = el.tagName.toLowerCase();
    const kotakEl = el.getBoundingClientRect();
    /* Yang berteks diukur dari tinta hurufnya, yang bergambar dari geometri
       gambarnya; sisanya dari kotaknya. */
    const rect =
      tag === "svg" || dalamSvg
        ? (kotakGambar(el as SVGGraphicsElement) ?? kotakEl)
        : punyaTeksLangsung(el)
          ? kotakTinta(el)
          : kotakEl;
    const cukupBesar = Math.min(rect.width, rect.height) >= MIN_SISI;

    /* SVG besar = kanvas figur. Ia sendiri bukan benda; isinya yang dihitung.
       Diputuskan dari kotak ELEMENnya, bukan kotak gambarnya: kanvas selebar
       frame yang isinya baru beberapa garis tetap kanvas, dan kalau diukur dari
       gambarnya ia mendadak lolos sebagai "ikon" lalu dilaporkan menumpuk
       seluruh isi figurnya sendiri. */
    const svgKanvas =
      tag === "svg" && luas(kotakEl) > MAKS_LUAS_IKON * luasPanggung;

    const berTinta = svgKanvas
      ? false
      : dalamSvg
        ? TINTA_SVG.has(tag)
        : tag === "svg" || GAMBAR_HTML.has(tag) || punyaTeksLangsung(el);

    if (
      berTinta &&
      cukupBesar &&
      !dikecualikan(el) &&
      opacityEfektif(el, panggung) >= MIN_OPACITY
    ) {
      hasil.push({ el, rect, nama: namaEl(el) });
      /* Sudah dihitung sebagai satu benda utuh — isinya tidak diurus lagi. */
      return;
    }

    for (const anak of Array.from(el.children)) {
      telusur(anak, dalamSvg || tag === "svg");
    }
  };

  for (const anak of Array.from(panggung.children)) telusur(anak, false);
  return hasil;
};

export const periksaTumpang = (): Temuan[] => {
  const panggung = document.querySelector(".panggung");
  if (!panggung) return [];

  const kotak = kumpulkan(panggung);
  const temuan: Temuan[] = [];

  for (let i = 0; i < kotak.length; i++) {
    const a = kotak[i];
    if (!a) continue;

    for (let j = i + 1; j < kotak.length; j++) {
      const b = kotak[j];
      if (!b) continue;

      /* Leluhur vs keturunan selalu beririsan 100% dan itu bukan cacat — itu
         cuma berarti yang satu ada di dalam yang lain. Jarang terjadi karena
         `kumpulkan` berhenti begitu menemukan benda, tapi <text> di dalam
         <foreignObject> bisa. */
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;

      const w =
        Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
      const h =
        Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top);
      if (w <= 0 || h <= 0) continue;
      if (Math.min(w, h) < MIN_TEBAL) continue;

      const rasio = (w * h) / Math.min(luas(a.rect), luas(b.rect));
      if (rasio < MIN_RASIO) continue;

      temuan.push({
        a: a.nama,
        b: b.nama,
        rasio: Math.round(rasio * 100) / 100,
        kotak: {
          x: Math.round(Math.max(a.rect.left, b.rect.left)),
          y: Math.round(Math.max(a.rect.top, b.rect.top)),
          w: Math.round(w),
          h: Math.round(h),
        },
      });
    }
  }

  return temuan.sort((x, y) => y.rasio - x.rasio);
};

/* --- komponen -------------------------------------------------------------- */

export const PeriksaTumpang: React.FC = () => {
  /* Dibaca dari input props, bukan dari prop komponen: <Panggung> dipakai oleh
     puluhan komposisi lewat empat perangkai berbeda, dan menyalurkan satu
     saklar dev lewat semuanya berarti empat tempat yang bisa lupa. */
  const aktif = Boolean(
    (getInputProps() as { periksaTumpang?: boolean }).periksaTumpang,
  );

  /* Handle dibuat SAAT RENDER, bukan di dalam effect. Kalau dibuat di effect,
     Remotion sudah boleh memotret sebelum handle-nya sempat ada. */
  const handle = useMemo(
    () => (aktif ? delayRender("periksa-tumpang") : null),
    [aktif],
  );

  useEffect(() => {
    if (handle === null) return;

    /* Menunggu font selesai dimuat. Tanpa ini kotak teks diukur dengan font
       cadangan, dan lebarnya bisa meleset jauh — persis di ukuran itulah
       pertanyaan "bertumpuk atau tidak" diputuskan. */
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        // eslint-disable-next-line no-console
        console.log(PENANDA_TUMPANG + JSON.stringify(periksaTumpang()));
        continueRender(handle);
      });
    });
  }, [handle]);

  return null;
};
