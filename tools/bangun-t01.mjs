/* Bangun ulang index.html (T01) dari nol, mengikuti flow 7 bagian.
   Sumber timing: keluaran estimate-timing.mjs. Sumber isi: naskah.md.  */
import { readFileSync, writeFileSync } from "node:fs";

const SP = "C:/Users/ASUSTU~1/AppData/Local/Temp/claude/d--wargasipil-youtube/9026f12b-07b9-4374-9949-5d68e0680549/scratchpad";
const R = (n) => Math.round(n * 100) / 100;

// --- timing dari estimator ---------------------------------------------------
const durs = [];
for (const l of readFileSync(SP + "/t01-timing.txt", "utf8").split(/\r?\n/)) {
  const m = l.match(/^\|\s*(\d{3})\s*\|\s*\d+\s*\|\s*[\d.]+\s*\|\s*([\d.]+)\s*\|/);
  if (m) durs.push({ no: m[1], dur: +m[2] });
}
const T = {};
let t = 0;
for (const d of durs) {
  T["s" + d.no] = { start: R(t), dur: d.dur };
  t = R(t + d.dur);
  if (d.no === "003") { T["sc-open"] = { start: R(t), dur: 1.5 }; t = R(t + 1.5); }
}
T["sc-close"] = { start: R(t), dur: 5.0 };
t = R(t + 5.0);
const TOTAL = t;

// --- isi tiap scene ----------------------------------------------------------
// kind: judul | kartu2 | kartu3 | statement | angka | sumbu | piramida | bar2 | grid | spec
const ic = (n, k = "ic ic-lg") => `<svg class="${k}" data-anim><use href="#ic-${n}"/></svg>`;
const kartu = (icon, warna, kick, teks) =>
  `<div class="panel" data-anim><svg class="ic ${warna}"><use href="#ic-${icon}"/></svg>` +
  (kick ? `<p class="kicker">${kick}</p>` : "") + `<p class="t-sub">${teks}</p></div>`;

const S = {
  // ===== 1 QUESTION =====
  s001: `${ic("app")}<h1 class="t-display" data-anim>Di mana data aplikasi<br>saat aplikasi dibuka?</h1>`,
  s002: `${ic("info", "ic")}<h1 class="t-title c-mute" data-anim>Kelihatannya sepele.</h1>`,
  s003: `<div class="duo">${kartu("clock", "c-warn", "kadang", "terasa lambat")}${kartu("check", "c-ok", "kadang", "terasa cepat")}</div>`,

  // ===== 3 PROBLEM =====
  s004: `${ic("disk")}<h1 class="t-title" data-anim>Semua yang kamu punya<br>tersimpan di satu tempat.</h1>
         <div class="duo" style="grid-template-columns:repeat(4,1fr)">
           <div class="pill" data-anim>foto</div><div class="pill" data-anim>dokumen</div>
           <div class="pill" data-anim>aplikasi</div><div class="pill" data-anim>sistem</div></div>`,
  s005: `${ic("disk", "ic ic-lg c-accent")}<h1 class="big" style="font-size:110px" data-anim>PENYIMPANAN</h1><p class="t-body" data-anim>hard disk, atau S S D</p>`,
  s006: `${ic("disk", "ic")}<h1 class="big" data-anim>512 GB</h1><p class="t-sub" data-anim>kapasitasnya luas</p>`,
  s007: `<p class="kicker" data-anim>bayangkan</p>
         <div class="ruang"><div class="meja"></div><div class="lemari"><i class="laci"></i><i class="laci"></i><i class="laci"></i><i class="laci"></i></div></div>
         <p class="t-sub" data-anim>lemari arsip raksasa — di gudang, lantai bawah</p>`,
  s008: `${ic("arrows", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Butuh satu berkas?</h1><p class="t-sub c-warn" data-anim>Turun ke gudang. Setiap kali.</p>`,
  s009: `${ic("chip", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Sekarang bandingkan<br>dengan prosesornya.</h1>`,
  s010: `${ic("chip", "ic")}<h1 class="big c-accent" data-anim>miliaran</h1><p class="t-sub" data-anim>perintah setiap detik</p>`,
  s011: `<p class="kicker" data-anim>waktu prosesor</p>
         <div class="bars" style="height:auto;flex-direction:column;align-items:stretch;gap:24px">
           <div data-anim><p class="bar-l" style="text-align:left;margin:0 0 8px">bekerja</p><div style="height:44px;width:8%;background:var(--ok);border-radius:8px"></div></div>
           <div data-anim><p class="bar-l" style="text-align:left;margin:0 0 8px">menunggu gudang</p><div style="height:44px;width:100%;background:var(--bad);border-radius:8px"></div></div>
         </div>`,
  s012: `${ic("clock", "ic ic-lg c-bad")}<h1 class="t-title" data-anim>Bagi prosesor, menunggu hard disk</h1><p class="t-sub c-bad" data-anim>terasa seperti berminggu-minggu.</p>`,
  s013: `${ic("stack", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Padahal selama itu</h1><p class="t-sub" data-anim>jutaan pekerjaan lain bisa selesai.</p>`,
  s014: `<div class="duo">${kartu("disk", "c-ok", "", "muat banyak")}${kartu("clock", "c-bad", "", "lambat")}</div>`,
  s015: `<div class="duo" style="grid-template-columns:repeat(3,1fr)">${kartu("disk", "c-ok", "", "muat banyak")}${kartu("clock", "c-bad", "", "lambat")}${kartu("chip", "c-accent", "sebaliknya", "cepat, tapi kecil")}</div>`,

  // ===== 4 ANSWER -> WHAT =====
  s016: `${ic("x", "ic ic-lg c-bad")}<h1 class="t-title" data-anim>Jawabannya bukan<br>membaca langsung dari gudang.</h1>`,
  s017: `${ic("file", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Data yang dibutuhkan</h1><p class="t-sub c-accent" data-anim>disalin lebih dulu.</p>`,
  s018: `${ic("arrows", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Ke tempat yang jauh lebih dekat.</h1><p class="t-sub" data-anim>Dan jauh lebih cepat.</p>`,
  s019: `${ic("ram", "ic ic-xl c-accent")}<h1 class="big c-accent" data-anim>RAM</h1>`,
  s020: `${ic("info", "ic")}<h1 class="t-sub c-mute" data-anim>random access memory</h1><p class="t-body" data-anim>Namanya tidak penting.</p>`,
  s021: `${ic("desk", "ic ic-xl c-accent")}<h1 class="t-title" data-anim>RAM adalah meja kerja komputer.</h1>`,
  s022: `<div class="duo">${kartu("cabinet", "c-mute", "gudang", "untuk menyimpan")}${kartu("desk", "c-accent", "meja", "untuk mengerjakan")}</div>`,

  // ===== 5 WHY =====
  s023: `${ic("info", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Kenapa memindahkan ke meja<br>benar-benar menyelesaikannya?</h1>`,
  s024: `<p class="kicker" data-anim>alasan pertama</p>${ic("ruler", "ic ic-xl c-accent")}<h1 class="big" style="font-size:130px" data-anim>JARAK</h1>`,
  s025: `<div class="sumbu" data-anim><div class="garis"></div>
           <div class="titik" style="left:6%"><i></i><b>prosesor</b><span>&nbsp;</span></div>
           <div class="titik" style="left:34%"><i></i><b>RAM</b><span>dekat</span></div>
           <div class="titik" style="left:92%"><i style="background:var(--bad)"></i><b class="c-bad">gudang</b><span>jauh</span></div></div>`,
  s026: `${ic("ruler", "ic")}<h1 class="t-title" data-anim>Makin pendek jaraknya,</h1><p class="t-sub c-ok" data-anim>makin cepat datanya sampai.</p>`,
  s027: `<p class="kicker" data-anim>kalau dirasakan sebagai waktu manusia</p>
         <div class="sumbu" data-anim><div class="garis"></div>
           <div class="titik" style="left:20%"><i></i><b>RAM</b><span>± 1 menit</span></div>
           <div class="titik" style="left:88%"><i style="background:var(--bad)"></i><b class="c-bad">hard disk</b><span>± 2 bulan</span></div></div>`,
  s028: `<p class="kicker" data-anim>alasan kedua — yang lebih menentukan</p>${ic("refresh", "ic ic-xl c-accent")}`,
  s029: `${ic("grid" in {} ? "layers" : "layers", "ic")}<h1 class="t-title" data-anim>Program tidak membaca<br>datanya secara acak.</h1>`,
  s030: `<p class="kicker" data-anim>bagian yang sama, berulang-ulang</p><div class="grid" data-anim id="grid030"></div>`,
  s031: `${ic("refresh", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>Sekali disalin ke meja,</h1><p class="t-sub c-ok" data-anim>dipakai ribuan kali tanpa turun lagi.</p>`,
  s032: `<p class="kicker" data-anim>satu perjalanan mahal</p>
         <div class="bars"><div><div class="bar" style="height:60px;background:var(--ink-2)"></div><p class="bar-l">1 perjalanan</p></div>
         <div><div class="bar" style="height:380px;background:var(--ok)"></div><p class="bar-l">ribuan pemakaian</p></div></div>`,
  s033: `${ic("money", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Tapi kecepatan itu ada harganya.</h1>`,
  s034: `<div class="duo" style="grid-template-columns:repeat(3,1fr)">${kartu("ruler", "c-warn", "", "jauh lebih kecil")}${kartu("money", "c-warn", "", "jauh lebih mahal")}${kartu("drop", "c-bad", "", "tidak bertahan")}</div>`,
  s035: `${ic("app", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Dan itu menjawab<br>yang kamu lihat di awal.</h1>`,
  s036: `<div class="duo">${kartu("clock", "c-warn", "buka ke-1", "diambil dari gudang")}${kartu("check", "c-ok", "buka ke-2", "masih di meja")}</div>`,
  s037: `${ic("desk", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>Yang kedua langsung muncul</h1><p class="t-sub c-ok" data-anim>karena datanya sudah tergeletak di meja.</p>`,

  // ===== 6 EXPLAINING =====
  s038: `<h1 class="big c-accent" data-anim>3</h1><p class="t-sub" data-anim>hal yang jarang diceritakan soal meja ini</p>`,
  s039: `<p class="kicker" data-anim>pertama</p>${ic("drop", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>RAM sebenarnya tidak bisa mengingat.</h1>`,
  s040: `${ic("drop", "ic")}<h1 class="t-title" data-anim>Ingatannya disimpan</h1><p class="t-sub c-warn" data-anim>di wadah yang bocor pelan-pelan.</p>`,
  s041: `${ic("refresh", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Jadi isinya ditulis ulang<br>terus-menerus.</h1>`,
  s042: `${ic("refresh", "ic")}<h1 class="big c-accent" data-anim>ribuan×</h1><p class="t-sub" data-anim>setiap detik, selama komputer menyala</p>`,
  s043: `${ic("pause", "ic ic-lg c-bad")}<h1 class="t-title" data-anim>Berhenti sebentar saja —</h1><p class="t-sub c-bad" data-anim>isinya hilang seluruhnya.</p>`,
  s044: `${ic("bolt", "ic ic-xl c-bad")}<h1 class="t-title" data-anim>Itu sebabnya kerjaan yang belum disimpan<br>hilang saat listrik mati.</h1>`,
  s045: `${ic("cabinet", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>Gudang tidak begitu.</h1><p class="t-sub" data-anim>Isinya tetap ada walau listrik dicabut.</p>`,
  s046: `<p class="kicker" data-anim>kedua</p>${ic("layers", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Mejanya ternyata bukan cuma satu.</h1>`,
  s047: `${ic("chip", "ic ic-xl c-accent")}<h1 class="t-title" data-anim>Ada meja jauh lebih kecil —<br>menempel di keping prosesor.</h1>`,
  s048: `${ic("chip", "ic ic-lg c-accent")}<h1 class="big" style="font-size:150px" data-anim>CACHE</h1>`,
  s049: `<div class="bars"><div><div class="bar" style="height:40px;background:var(--accent)"></div><p class="bar-l">cache · MB</p></div>
         <div><div class="bar" style="height:400px;background:var(--ink-2)"></div><p class="bar-l">RAM · GB</p></div></div>`,
  s050: `${ic("ruler", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>Tapi cache jauh lebih cepat —</h1><p class="t-sub c-ok" data-anim>karena jaraknya nyaris nol.</p>`,
  s051: `<div class="pir" data-anim><div style="width:380px;background:var(--accent)">cache</div><div style="width:620px;background:var(--accent-deep)">RAM</div><div style="width:860px;background:var(--warn)">SSD</div><div style="width:1100px;background:var(--bad)">hard disk</div></div>`,
  s052: `<div class="duo" style="grid-template-columns:repeat(3,1fr)">${kartu("ruler", "c-ok", "makin dekat", "makin cepat")}${kartu("layers", "c-warn", "tapi", "makin kecil")}${kartu("money", "c-bad", "dan", "makin mahal")}</div>`,
  s053: `${ic("info", "ic ic-lg")}<h1 class="t-title" data-anim>Kenapa tidak semuanya<br>dibuat secepat cache?</h1>`,
  s054: `<div class="duo">${kartu("ruler", "c-warn", "", "ruang")}${kartu("money", "c-warn", "", "uang")}</div>`,
  s055: `${ic("chip", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Cache harus muat di dalam keping.</h1><p class="t-sub c-mute" data-anim>Ruang di sana sangat sempit.</p>`,
  s056: `<p class="kicker" data-anim>harga per gigabita</p>
         <div class="bars"><div><div class="bar" style="height:80px;background:var(--ink-2)"></div><p class="bar-l">RAM</p></div>
         <div><div class="bar" style="height:390px;background:var(--bad)"></div><p class="bar-l">cache</p></div></div>`,
  s057: `${ic("layers", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Jadi komputer tidak memilih satu.</h1><p class="t-sub c-accent" data-anim>Ia memakai semuanya sekaligus.</p>`,
  s058: `<p class="kicker" data-anim>ketiga</p>${ic("stack", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Apa yang terjadi kalau mejanya penuh?</h1>`,
  s059: `${ic("file", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Yang paling jarang disentuh</h1><p class="t-sub c-warn" data-anim>ditandai lebih dulu.</p>`,
  s060: `${ic("cabinet", "ic ic-lg")}<h1 class="t-title" data-anim>Lalu dipindahkan kembali ke gudang.</h1>`,
  s061: `${ic("info", "ic")}<h1 class="t-title" data-anim>Kedengarannya pintar.</h1><p class="t-sub c-warn" data-anim>Sampai berkas itu dibutuhkan lagi.</p>`,
  s062: `${ic("clock", "ic ic-lg c-bad")}<h1 class="t-title" data-anim>Karena mengambilnya balik</h1><p class="t-sub c-bad" data-anim>berarti perjalanan dua bulan tadi.</p>`,
  s063: `${ic("pause", "ic ic-xl c-bad")}<h1 class="t-title" data-anim>Dan semuanya berhenti menunggu.</h1>`,
  s064: `${ic("graph-down", "ic ic-lg c-bad")}<h1 class="t-title" data-anim>Itulah rasanya saat komputer<br>tiba-tiba tersendat parah.</h1>`,

  // ===== 7 CASE =====
  s065: `${ic("info", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Di mana ini benar-benar terlihat?</h1>`,
  s066: `${ic("chip", "ic ic-lg")}<h1 class="t-title" data-anim>Komputer yang dipakai<br>membuat video ini.</h1>`,
  s067: `<p class="kicker" data-anim>Intel Core i7-11700F · 8 inti</p>
         <div class="spec"><div data-anim><b>cache</b><span>± 20 MB</span></div><div data-anim><b>RAM</b><span>32 GB</span></div></div>`,
  s068: `${ic("ruler", "ic ic-lg c-accent")}<h1 class="big" style="font-size:120px" data-anim>1.600×</h1><p class="t-sub" data-anim>RAM lebih besar daripada cache</p>`,
  s069: `${ic("chip", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Tapi hampir semua pekerjaan</h1><p class="t-sub c-accent" data-anim>tetap lewat meja kecil itu.</p>`,
  s070: `${ic("app", "ic ic-lg")}<h1 class="t-title" data-anim>Di ponsel, hal yang sama<br>terjadi setiap hari.</h1>`,
  s071: `<div class="duo">${kartu("app", "c-ok", "baru dibuka", "menempati RAM")}${kartu("x", "c-bad", "RAM penuh", "yang lama ditutup")}</div>`,
  s072: `${ic("refresh", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Itu sebabnya aplikasi yang ditinggal sebentar</h1><p class="t-sub c-warn" data-anim>kadang memuat ulang dari awal.</p>`,
  s073: `${ic("stack", "ic ic-lg c-accent")}<h1 class="t-title" data-anim>Di server, pola yang sama<br>dipakai dengan sengaja.</h1>`,
  s074: `${ic("disk", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>Data yang paling sering diminta</h1><p class="t-sub c-ok" data-anim>ditaruh di RAM, supaya disk tak tersentuh.</p>`,
  s075: `${ic("stack", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>20 tab · aplikasi desain · pemutar musik</h1>`,
  s076: `<div class="duo">${kartu("x", "c-bad", "RAM 8 GB", "meja penuh duluan")}${kartu("check", "c-ok", "RAM 16 GB", "semuanya masih muat")}</div>`,
  s077: `${ic("check", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>Tidak ada yang perlu dipindahkan.</h1>`,
  s078: `${ic("ram", "ic ic-lg c-accent")}<h1 class="big" style="font-size:110px" data-anim>Perlu nambah RAM?</h1>`,
  s079: `${ic("check", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>Kalau mejamu sering penuh —</h1><p class="t-sub c-ok" data-anim>tambahan RAM mengubah segalanya.</p>`,
  s080: `${ic("x", "ic ic-lg c-bad")}<h1 class="t-title" data-anim>Kalau masih muat?</h1><h1 class="big c-bad" data-anim>0%</h1>`,
  s081: `${ic("check", "ic ic-lg c-ok")}<h1 class="t-title" data-anim>RAM terpakai 80% bukan masalah.</h1><p class="t-sub" data-anim>RAM yang kosong justru terbuang percuma.</p>`,
  s082: `${ic("graph-up", "ic ic-lg c-warn")}<h1 class="t-title" data-anim>Yang harus dilihat:</h1><p class="t-sub" data-anim>seberapa sering data dipindah ke gudang.</p>`,
  s083: `<div class="duo">${kartu("disk", "c-accent", "Windows", "berkas halaman")}${kartu("disk", "c-accent", "Linux &amp; Mac", "swap")}</div>
         <p class="t-sub c-ok" data-anim>Kalau itu terus naik — barulah nambah RAM masuk akal.</p>`,
};

// --- rakit HTML --------------------------------------------------------------
const BAGIAN = {
  s001: "1 [question]", s004: "3 [problem]", s016: "4 [answer] → [what]",
  s023: "5 [why]", s038: "6 [explaining]", s065: "7 [case]",
};

let scenes = "";
for (const [id, isi] of Object.entries(S)) {
  if (BAGIAN[id]) scenes += `\n      <!-- ============ ${BAGIAN[id]} ============ -->\n`;
  const x = T[id];
  if (!x) { console.error("tidak ada timing:", id); continue; }
  scenes += `      <div class="scene clip" id="${id}" data-start="${x.start}" data-duration="${x.dur}" data-track-index="0" style="visibility:hidden">
        <div class="scene-content center">${isi}</div>
      </div>\n`;
  if (id === "s003") {
    const o = T["sc-open"];
    scenes += `
      <!-- ============ 2 brand opening (scene standar) ============ -->
      <div class="scene clip sc-open" id="sc-open" data-start="${o.start}" data-duration="${o.dur}" data-track-index="1" style="visibility:hidden">
        <div class="scene-content">
          <div class="sting">
            <svg class="sting-mark" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="stingPlate" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#818CF8"/><stop offset="1" stop-color="#4338CA"/></linearGradient>
                <linearGradient id="stingDot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34D399"/><stop offset="1" stop-color="#10B981"/></linearGradient>
              </defs>
              <rect class="sting-plate" width="120" height="120" rx="30" fill="url(#stingPlate)"/>
              <circle class="sting-ring" cx="60" cy="60" r="33" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
              <circle class="sting-dot" cx="60" cy="60" r="13" fill="url(#stingDot)"/>
            </svg>
            <img class="sting-word" src="shared/assets/logos/getresolved-wordmark-inverse.svg" alt="">
          </div>
        </div>
      </div>\n`;
  }
}

const c = T["sc-close"];
scenes += `
      <!-- ============ closing (scene standar) ============ -->
      <div class="scene clip sc-close" id="sc-close" data-start="${c.start}" data-duration="${c.dur}" data-track-index="1" style="visibility:hidden">
        <div class="scene-content">
          <img class="close-mark" src="shared/assets/logos/getresolved-mark.svg" alt="">
          <h2 class="close-cta">Yang dipakai, <em>di RAM</em>.</h2>
          <div class="close-rule"></div>
          <p class="close-handle">@GetResolved</p>
          <p class="close-sub">Penjelasan teknologi, coding, dan engineering dalam Bahasa Indonesia.</p>
        </div>
      </div>\n`;

const html = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>

    <link rel="stylesheet" href="shared/theme.css" />
    <link rel="stylesheet" href="shared/scenes.css" />

    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; }

      .kicker { font-family: var(--font-mono); font-size: var(--fs-label); font-weight: 700;
                letter-spacing: .16em; text-transform: uppercase; color: var(--ink-1); }
      .duo { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; width: 100%; }
      .big { font-family: var(--font-mono); font-weight: 700; font-size: 190px; line-height: 1;
             letter-spacing: -.03em; font-variant-numeric: tabular-nums; }

      .ruang  { align-self: stretch; display: flex; align-items: flex-end; justify-content: space-between; width: 100%; height: 250px; margin-bottom: 120px; }
      .meja   { width: 520px; height: 34px; background: var(--accent); border-radius: 8px; position: relative; }
      .meja::after { content: ""; position: absolute; left: 34px; right: 34px; top: 34px; height: 110px;
                     border-left: 9px solid var(--accent-deep); border-right: 9px solid var(--accent-deep); }
      .lemari { width: 220px; height: 240px; border: 7px solid var(--ink-1); border-radius: 12px;
                display: flex; flex-direction: column; gap: 9px; padding: 15px; }
      .laci   { flex: 1; background: var(--bg-elev); border: 2px solid var(--line); border-radius: 6px; }

      .sumbu { align-self: stretch; position: relative; width: 100%; height: 260px; }
      .garis { position: absolute; left: 0; right: 0; top: 130px; height: 4px;
               background: linear-gradient(90deg, var(--accent), var(--warn), var(--bad)); border-radius: 2px; }
      .titik { position: absolute; top: 118px; text-align: center; transform: translateX(-50%); }
      .titik i { display: block; width: 24px; height: 24px; border-radius: 50%; background: var(--ink-0); margin: 0 auto 22px; }
      .titik b { display: block; font-family: var(--font-display); font-weight: 800; font-size: 32px; }
      .titik span { display: block; font-family: var(--font-mono); font-size: 24px; color: var(--ink-1); }

      .pir { align-self: stretch; display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%; }
      .pir div { height: 72px; border-radius: 10px; display: grid; place-items: center;
                 font-family: var(--font-display); font-weight: 800; font-size: 30px; color: var(--bg); }

      .bars { display: flex; align-items: flex-end; gap: 90px; height: 430px; }
      .bar  { width: 190px; border-radius: 12px 12px 0 0; transform-origin: bottom; }
      .bar-l { text-align: center; font-family: var(--font-mono); font-size: 26px; color: var(--ink-1); margin-top: 18px; }

      .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px; width: 860px; }
      .grid i { aspect-ratio: 1; border-radius: 6px; background: var(--bg-elev); border: 1px solid var(--line); }
      .grid i.on { background: var(--accent); border-color: var(--accent); }

      .spec { width: 100%; display: flex; flex-direction: column; gap: 18px; }
      .spec div { display: flex; justify-content: space-between; align-items: baseline;
                  padding: 20px 28px; background: var(--bg-elev); border: 1px solid var(--line); border-radius: var(--radius); }
      .spec b { font-family: var(--font-display); font-weight: 600; font-size: 34px; }
      .spec span { font-family: var(--font-mono); font-weight: 700; font-size: 34px; color: var(--accent-ink); }
    </style>
  </head>

  <body>
    <!--
      T01 · "Di mana data aplikasi saat aplikasi dibuka?" — 16:9
      Naskah (sumber kebenaran): ideas/apa-itu-ram/naskah.md
      Disusun mengikuti FLOW 7 BAGIAN — docs/02.

      KOMPOSISI BISU. Track 8 (voice over) sengaja kosong; VO dibuat setelah
      naskah dibekukan (docs/04 §5).
    -->
    <div id="root" class="hf-stage hf-16x9" data-composition-id="t01l"
         data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080">
${scenes}    </div>

    <script src="shared/icons.js"></script>
    <script src="shared/scenes.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      /* Grid locality (scene 030) — deterministik, tanpa Math.random. */
      (function () {
        const g = document.getElementById("grid030");
        const panas = [14, 15, 16, 26, 27, 28, 38, 39, 40];
        for (let i = 0; i < 60; i++) {
          const c = document.createElement("i");
          if (panas.includes(i)) c.className = "on";
          g.appendChild(c);
        }
      })();

      /* Koreografi dasar: tampil, tween masuk bertahap, aktivitas tengah, sembunyi. */
      const EASE = ["power3.out", "power2.out", "back.out(1.4)", "expo.out", "circ.out"];

      document.querySelectorAll(".scene").forEach((el, i) => {
        if (el.classList.contains("sc-open") || el.classList.contains("sc-close")) return;
        const start = parseFloat(el.dataset.start);
        const dur = parseFloat(el.dataset.duration);
        const sel = "#" + el.id + " [data-anim]";
        const n = el.querySelectorAll("[data-anim]").length;

        tl.set("#" + el.id, { autoAlpha: 1 }, start);
        if (n) {
          /* Offset & stagger sengaja kecil. from() GSAP menerapkan state awal
             seketika, jadi jeda besar di sini = layar kosong di awal SETIAP
             scene — pada 83 scene itu terbaca sebagai kedipan. */
          tl.from(sel, { opacity: 0, y: i % 3 === 0 ? 26 : 18, duration: 0.45,
            ease: EASE[i % EASE.length], stagger: 0.07 }, start + 0.05);
        }
        if (dur > 4.5 && n) {
          tl.to(sel, { y: -5, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 1,
            stagger: 0.08 }, start + dur * 0.45);
        }
        tl.set("#" + el.id, { autoAlpha: 0 }, start + dur);
      });

      /* Tween khusus.
         ATURAN: elemen yang muncul di sini TIDAK boleh memakai data-anim —
         dua tween .from() pada elemen yang sama saling merekam state dan
         menyisakan elemen tak terlihat. */
      const at = (id) => parseFloat(document.querySelector(id).dataset.start);

      ["#s051"].forEach((s) => {
        tl.from(s + " .pir div", { scaleX: 0, transformOrigin: "center", duration: 0.55,
          ease: "expo.out", stagger: 0.13 }, at(s) + 0.25);
      });

      ["#s025", "#s027"].forEach((s) => {
        tl.from(s + " .garis", { scaleX: 0, transformOrigin: "left center", duration: 0.9,
          ease: "power2.out" }, at(s) + 0.2);
        tl.from(s + " .titik", { opacity: 0, scale: 0.7, transformOrigin: "center",
          duration: 0.45, ease: "back.out(2)", stagger: 0.18 }, at(s) + 0.5);
      });

      ["#s032", "#s049", "#s056"].forEach((s) => {
        tl.from(s + " .bar", { scaleY: 0, duration: 0.6, ease: "expo.out", stagger: 0.15 }, at(s) + 0.3);
      });

      (function () {
        const s = "#s030";
        tl.from(s + " .grid i", { opacity: 0, duration: 0.3, ease: "power1.out",
          stagger: { each: 0.012, from: "start" } }, at(s) + 0.25);
        tl.to(s + " .grid i.on", { scale: 1.18, transformOrigin: "center", duration: 0.5,
          ease: "sine.inOut", yoyo: true, repeat: 3, stagger: 0.05 }, at(s) + 1.2);
      })();

      (function () {
        const s = "#s007";
        tl.from(s + " .meja", { x: -160, opacity: 0, duration: 0.7, ease: "power3.out" }, at(s) + 0.25);
        tl.from(s + " .lemari", { x: 160, opacity: 0, duration: 0.7, ease: "power3.out" }, at(s) + 0.35);
        tl.from(s + " .laci", { scaleY: 0, transformOrigin: "top", duration: 0.4,
          ease: "power2.out", stagger: 0.09 }, at(s) + 0.8);
      })();

      /* Scene standar */
      HFScenes.opening(tl, { at: ${T["sc-open"].start} });
      HFScenes.closing(tl, { at: ${T["sc-close"].start} });

      window.__timelines["t01l"] = tl;
    </script>
  </body>
</html>
`;

writeFileSync("d:/wargasipil/youtube/index.html", html);
console.log("index.html dibangun ulang ·", Object.keys(S).length + 2, "scene · total", TOTAL, "dtk =",
  Math.floor(TOTAL / 60) + ":" + String(Math.round(TOTAL % 60)).padStart(2, "0"));
