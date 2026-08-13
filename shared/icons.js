/* ===========================================================================
   Set ikon channel — SVG sprite yang disuntikkan ke dalam dokumen.
   Aturan pakai: docs/03-tema-visual.md § Ikon & figur

     <script src="shared/icons.js"></script>
     ...
     <svg class="ic"><use href="#ic-ram"/></svg>
     <svg class="ic ic-lg c-accent"><use href="#ic-chip"/></svg>

   Kenapa disuntik lewat JS dan bukan <use href="file.svg#id">:
   referensi sprite eksternal tidak selalu terbaca saat capture headless.
   Sprite inline selalu aman dan tidak butuh permintaan jaringan.

   Gaya: garis, viewBox 96×96, stroke-width 6, ujung membulat, tanpa isian.
   Semua ikon mewarisi warna teks induknya (currentColor), jadi kelas warna
   tema (.c-accent, .c-ok, .c-bad, .c-warn) langsung berlaku.
   ======================================================================== */

(function () {
  "use strict";

  var I = {
    /* --- benda di analogi utama --- */
    desk:    '<path d="M10 54h76M18 54v26M78 54v26M24 54V34h48v20"/>',
    cabinet: '<rect x="24" y="12" width="48" height="72" rx="6"/><path d="M24 36h48M24 60h48M44 24h8M44 48h8M44 72h8"/>',
    file:    '<path d="M28 12h28l14 14v58H28z"/><path d="M56 12v14h14M38 46h20M38 60h20"/>',
    stack:   '<path d="M20 62h56M20 74h56M26 50h44M32 38h32"/>',

    /* --- perangkat keras --- */
    chip:    '<rect x="26" y="26" width="44" height="44" rx="6"/><rect x="40" y="40" width="16" height="16" rx="3"/><path d="M40 26V14M56 26V14M40 82V70M56 82V70M26 40H14M26 56H14M82 40H70M82 56H70"/>',
    ram:     '<rect x="12" y="30" width="72" height="36" rx="4"/><path d="M26 30v36M40 30v36M54 30v36M68 30v36M24 66v8M40 66v8M56 66v8M72 66v8"/>',
    disk:    '<circle cx="48" cy="48" r="34"/><circle cx="48" cy="48" r="8"/><path d="M48 14a34 34 0 0 1 30 18"/>',

    /* --- orang & arah --- */
    person:  '<circle cx="48" cy="26" r="12"/><path d="M24 82v-8a24 24 0 0 1 48 0v8"/>',
    arrows:  '<path d="M14 36h56M56 22l14 14-14 14M82 60H26M40 46 26 60l14 14"/>',
    ruler:   '<rect x="10" y="34" width="76" height="28" rx="4"/><path d="M26 34v12M40 34v18M54 34v12M68 34v18"/>',
    layers:  '<path d="M48 12 14 30l34 18 34-18z"/><path d="M14 48l34 18 34-18M14 66l34 18 34-18"/>',

    /* --- status --- */
    check:   '<path d="M20 50l20 20 36-44"/>',
    x:       '<path d="M26 26l44 44M70 26L26 70"/>',
    warning: '<path d="M48 14 84 78H12z"/><path d="M48 40v18M48 66v2"/>',
    info:    '<circle cx="48" cy="48" r="34"/><path d="M48 44v22M48 32v2"/>',

    /* --- kejadian --- */
    bolt:    '<path d="M54 10 26 54h20l-6 32 30-46H50z"/>',
    drop:    '<path d="M48 12c14 18 22 28 22 38a22 22 0 0 1-44 0c0-10 8-20 22-38z"/>',
    refresh: '<path d="M80 44a32 32 0 1 0-4 22"/><path d="M82 24v22H60"/>',
    clock:   '<circle cx="48" cy="48" r="34"/><path d="M48 26v22l14 10"/>',
    pause:   '<circle cx="48" cy="48" r="34"/><path d="M40 36v24M56 36v24"/>',

    /* --- data & lain-lain --- */
    graphDown: '<path d="M14 20v62h68"/><path d="M26 34l18 16 14-10 22 26"/>',
    graphUp:   '<path d="M14 20v62h68"/><path d="M26 70l18-18 14 10 22-28"/>',
    money:     '<circle cx="48" cy="48" r="34"/><path d="M48 28v40M58 38c0-5-5-8-10-8s-10 3-10 8 4 7 10 8 10 3 10 9-5 8-10 8-10-3-10-8"/>',
    comment:   '<path d="M14 22h68v44H44L26 82V66H14z"/><path d="M32 38h32M32 50h20"/>',
    app:       '<rect x="12" y="18" width="72" height="60" rx="6"/><path d="M12 34h72M24 26h2M34 26h2"/>',
  };

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");

  var kebab = function (s) { return s.replace(/[A-Z]/g, function (c) { return "-" + c.toLowerCase(); }); };
  var html = "";
  for (var nama in I) {
    html +=
      '<symbol id="ic-' + kebab(nama) + '" viewBox="0 0 96 96" fill="none" ' +
      'stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">' +
      I[nama] +
      "</symbol>";
  }
  svg.innerHTML = html;

  if (document.body) document.body.insertBefore(svg, document.body.firstChild);
  else document.addEventListener("DOMContentLoaded", function () {
    document.body.insertBefore(svg, document.body.firstChild);
  });

  window.HFIcons = Object.keys(I).map(function (n) { return "ic-" + kebab(n); });
})();
