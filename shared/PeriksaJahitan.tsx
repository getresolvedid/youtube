/* Pengukur JAHITAN — apa yang ada di layar, dan di mana, pada satu frame.

   Berkas ini tidak menilai apa pun. Ia cuma mengeluarkan daftar benda beserta
   kotaknya, dan tools/periksa-jahitan.mjs yang membandingkan dua daftar: frame
   TERAKHIR scene N lawan frame PERTAMA scene N+1.

   KENAPA INI ADA, TERPISAH DARI PeriksaTumpang.

   Setiap berkas direction di repo ini membuka dengan klausul yang sama —
   "frame pertamanya = frame terakhir <scene sebelumnya>". Itu klaim yang cuma
   hidup di `.md`: `npm run check` membuktikan frame tidak kosong, `npm run
   tumpang` membuktikan tidak ada yang saling menutupi, dan tidak ada satu pun
   yang membuktikan potongan kerasnya tidak melompat. Cacatnya ada di SATU
   frame, tepat di sambungannya, jadi ia tidak pernah kebetulan terlihat saat
   scrubbing — kelas yang sama dengan yang melahirkan periksa-tumpang.

   YANG DIUKUR: SEMUA yang digambar, bukan cuma teks dan ikon.

   Di sini bedanya paling besar dengan PeriksaTumpang. Pemeriksa tumpang sengaja
   membuang permukaan — kartu, panel, kanvas figur — karena label memang ditaruh
   di atasnya, dan menghitungnya berarti setiap scene melaporkan puluhan temuan
   yang bukan cacat. Untuk jahitan alasan itu tidak berlaku sama sekali: yang
   membuat potongan keras terbaca DISENGAJA justru benda-benda besar yang tidak
   bergerak — garis lantai, badan loket, jalur. Kalau `path` dan `rect` dibuang,
   yang tersisa cuma label, dan sebagian besar sambungan di repo ini memang
   berganti label. Jadi di sini `path`, `rect`, `circle`, `line`, dan kawan-kawan
   ikut diukur, dan pembandingannya yang menanggung kebisingannya.

   KENAPA BUKAN MEMBANDINGKAN PIKSEL. Selisih piksel mengembalikan satu angka
   tanpa nama: "31% frame berubah" tidak memberi tahu benda mana yang lompat,
   dan angka itu naik-turun karena fade, gradien latar, dan anti-alias huruf.
   Kotak berlabel bisa menyebut yang hilang, yang muncul, dan yang bergeser
   berapa piksel — dan itu yang bisa ditindaklanjuti tanpa membuka PNG-nya.
   Untuk yang tidak bisa dinamai kotak, alatnya tetap menyimpan kedua PNG-nya
   bersebelahan supaya mata yang memutuskan.

   TIDAK MENGUBAH APA PUN YANG DIRENDER. Komponennya mengembalikan `null`.
   Tanpa input prop `periksaJahitan` ia tidak melakukan apa-apa, jadi aman
   menempel di <Panggung> untuk semua komposisi termasuk render produksi.
*/
import type React from "react";
import { useEffect, useMemo } from "react";
import { continueRender, delayRender, getInputProps } from "remotion";

/** Awalan baris `console.log` yang dicari tools/periksa-jahitan.mjs. */
export const PENANDA_JAHITAN = "JAHITAN::";

/** Sisi terpendek yang masih dianggap benda, dalam piksel panggung. Di bawah ini
 *  biasanya sisa border, titik, atau ekor garis — sesuatu yang tidak akan pernah
 *  jadi alasan sebuah potongan terasa melompat. Garis MENDATAR tetap lolos:
 *  yang diuji sisi terpendek dari kotaknya, dan garis lantai setebal 6px selebar
 *  frame punya sisi terpendek 6. Karena itu ambangnya rendah — bukan 10 seperti
 *  di PeriksaTumpang, tempat yang dicari label. */
const MIN_SISI = 5;

/** Opacity efektif minimum supaya sebuah benda dianggap TERLIHAT. Sama dengan
 *  PeriksaTumpang, dan alasannya justru lebih penting di sini: benda yang
 *  sedang memudar keluar di frame terakhir scene N memang TIDAK diwarisi scene
 *  N+1, dan melaporkannya sebagai "hilang" akan menyalakan alarm di setiap
 *  sambungan yang benar. */
const MIN_OPACITY = 0.35;

/** Benda per frame. Lebih dari ini dan yang diukur bukan lagi koreografi
 *  melainkan tekstur — kisi sel, deretan bilah, latar bertitik. Pembandingannya
 *  jadi lambat (O(n²) per kunci) tanpa menambah satu pun temuan yang bisa
 *  ditindaklanjuti. */
const MAKS_BENDA = 400;

export type Benda = {
  /** Kunci pencocokan antar-frame. Bukan id — sengaja kasar, supaya dua benda
   *  yang "sejenis dan seukuran" di dua frame bisa dipasangkan. */
  readonly kunci: string;
  /** Nama yang bisa dibaca manusia di laporan. */
  readonly nama: string;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

/** Bahan gambar di dalam SVG. Semuanya ikut diukur — lihat catatan kepala. */
const GEOMETRI_SVG = new Set([
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polygon",
  "polyline",
  "text",
  "image",
  "use",
]);

const GAMBAR_HTML = new Set(["img", "canvas", "video"]);

const punyaTeksLangsung = (el: Element): boolean => {
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === 3 && (n.textContent ?? "").trim().length > 0) return true;
  }
  return false;
};

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

/** Kotak gambar sebenarnya untuk elemen SVG. `getBoundingClientRect()` pada
 *  `<path>` di dalam `<g transform>` bisa jauh lebih besar daripada tintanya. */
const kotakSvg = (el: SVGGraphicsElement): DOMRect | null => {
  try {
    const bb = el.getBBox();
    const ctm = el.getScreenCTM();
    if (!ctm || (bb.width <= 0 && bb.height <= 0)) return null;
    const a = new DOMPoint(bb.x, bb.y).matrixTransform(ctm);
    const b = new DOMPoint(bb.x + bb.width, bb.y + bb.height).matrixTransform(ctm);
    return new DOMRect(
      Math.min(a.x, b.x),
      Math.min(a.y, b.y),
      Math.abs(b.x - a.x),
      Math.abs(b.y - a.y),
    );
  } catch {
    return null;
  }
};

/** Dibulatkan ke kelipatan 8 supaya benda yang sama di dua frame tetap sekunci
 *  walaupun ukurannya bergeser satu-dua piksel karena pembulatan tata letak
 *  atau ease yang belum benar-benar selesai. */
const petak = (n: number) => Math.round(n / 8) * 8;

const teksSingkat = (el: Element) =>
  (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 28);

const kumpulkan = (panggung: Element): Benda[] => {
  const hasil: Benda[] = [];
  const asal = panggung.getBoundingClientRect();

  const catat = (el: Element, rect: DOMRect, dalamSvg: boolean) => {
    if (Math.min(rect.width, rect.height) < MIN_SISI) return;
    if (opacityEfektif(el, panggung) < MIN_OPACITY) return;

    const tag = el.tagName.toLowerCase();
    const teks = tag === "text" || !dalamSvg ? teksSingkat(el) : "";
    /* Teks dikunci dari ISINYA, bukan dari ukurannya: label yang sama boleh
       berpindah ukuran antar-scene dan tetap benda yang sama. Bentuk dikunci
       dari ukurannya, karena itu satu-satunya yang dipunyainya. */
    const kunci = teks
      ? `teks:${teks}`
      : `${tag}:${petak(rect.width)}x${petak(rect.height)}`;

    hasil.push({
      kunci,
      nama: teks ? `${tag} "${teks}"` : `${tag} ${Math.round(rect.width)}x${Math.round(rect.height)}`,
      /* Relatif terhadap panggung, bukan terhadap viewport: dua komposisi bisa
         dirender dengan skala berbeda dan angkanya harus tetap sebanding. */
      x: Math.round(rect.x - asal.x),
      y: Math.round(rect.y - asal.y),
      w: Math.round(rect.width),
      h: Math.round(rect.height),
    });
  };

  const telusur = (el: Element, dalamSvg: boolean) => {
    if (hasil.length >= MAKS_BENDA) return;
    const tag = el.tagName.toLowerCase();

    if (dalamSvg && GEOMETRI_SVG.has(tag)) {
      const r = kotakSvg(el as SVGGraphicsElement);
      if (r) catat(el, r, true);
      /* `<text>` bisa membungkus `<tspan>`; sisanya tidak punya anak yang
         menggambar. Diperlakukan sebagai benda utuh. */
      return;
    }

    if (!dalamSvg && (GAMBAR_HTML.has(tag) || punyaTeksLangsung(el))) {
      catat(el, el.getBoundingClientRect(), false);
      if (GAMBAR_HTML.has(tag)) return;
    }

    for (const anak of Array.from(el.children)) {
      telusur(anak, dalamSvg || tag === "svg");
    }
  };

  for (const anak of Array.from(panggung.children)) telusur(anak, false);
  return hasil;
};

export const ukurJahitan = (): Benda[] => {
  const panggung = document.querySelector(".panggung");
  return panggung ? kumpulkan(panggung) : [];
};

/* --- komponen -------------------------------------------------------------- */

export const PeriksaJahitan: React.FC = () => {
  const aktif = Boolean(
    (getInputProps() as { periksaJahitan?: boolean }).periksaJahitan,
  );

  /* Handle dibuat SAAT RENDER, bukan di dalam effect — kalau di effect, Remotion
     sudah boleh memotret sebelum handle-nya sempat ada. Sama dengan
     PeriksaTumpang, dan alasannya sama. */
  const handle = useMemo(
    () => (aktif ? delayRender("periksa-jahitan") : null),
    [aktif],
  );

  useEffect(() => {
    if (handle === null) return;
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        // eslint-disable-next-line no-console
        console.log(PENANDA_JAHITAN + JSON.stringify(ukurJahitan()));
        continueRender(handle);
      });
    });
  }, [handle]);

  return null;
};
