/* ===========================================================================
   Scene standar — koreografi opening & closing.
   Dipakai apa adanya supaya semua episode membuka dan menutup identik.
   Markup + aturan pakai: docs/10-scene-standar.md

     <script src="../../../shared/scenes.js"></script>
     ...
     HFScenes.opening(tl, { at: 15.0 });        // brand sting, 1,5 dtk
     HFScenes.closing(tl, { at: 452.0 });       // end card 16:9, 5 dtk
     HFScenes.closing(tl, { at: 48.0, format: "9x16" });   // Shorts, 2 dtk

   Deterministik: tanpa Math.random / Date.now / repeat:-1.
   ======================================================================== */

(function (global) {
  "use strict";

  var DUR = {
    opening: 1.5,
    closing16x9: 5.0,
    closing9x16: 2.0,
  };

  // Keliling lingkaran cincin pada mark (r = 33) — untuk animasi stroke draw.
  var RING = 2 * Math.PI * 33; // ≈ 207.35

  /**
   * Brand sting. BUKAN pembuka video — ditaruh di awal babak 2, setelah hook.
   * Tidak pernah dipakai di Shorts.
   *
   * @param {gsap.core.Timeline} tl
   * @param {{at:number, id?:string}} o  at = detik mulai scene
   * @returns {number} durasi scene (detik)
   */
  function opening(tl, o) {
    var id = o.id || "sc-open";
    var t = o.at;
    var s = "#" + id + " ";

    tl.set("#" + id, { autoAlpha: 1 }, t);

    // 1. Cincin menggambar diri
    tl.set(s + ".sting-ring", { strokeDasharray: RING, strokeDashoffset: RING }, t);
    tl.to(s + ".sting-ring", { strokeDashoffset: 0, duration: 0.62, ease: "power2.out" }, t + 0.05);

    // 2. Titik hijau — "the resolve point"
    tl.from(s + ".sting-dot", { scale: 0, transformOrigin: "center", duration: 0.42, ease: "back.out(2.2)" }, t + 0.40);

    // 3. Kotak mark meredup masuk di belakangnya
    tl.from(s + ".sting-plate", { opacity: 0, duration: 0.35, ease: "power1.out" }, t + 0.05);

    // 4. Wordmark disingkap dari kiri
    tl.to(s + ".sting-word", { clipPath: "inset(0 0% 0 0)", duration: 0.52, ease: "power3.out" }, t + 0.58);

    // 5. Tutup
    tl.to("#" + id, { autoAlpha: 0, duration: 0.28, ease: "power1.in" }, t + DUR.opening - 0.28);
    tl.set("#" + id, { autoAlpha: 0 }, t + DUR.opening);

    return DUR.opening;
  }

  /**
   * End card. 16:9 → 5 dtk (paruh kanan dikosongkan untuk end screen YouTube).
   * 9:16 → 2 dtk, konten di tengah kotak aman.
   *
   * @param {gsap.core.Timeline} tl
   * @param {{at:number, id?:string, format?:"16x9"|"9x16"}} o
   * @returns {number} durasi scene (detik)
   */
  function closing(tl, o) {
    var id = o.id || "sc-close";
    var short = o.format === "9x16";
    var dur = short ? DUR.closing9x16 : DUR.closing16x9;
    var t = o.at;
    var s = "#" + id + " ";

    tl.set("#" + id, { autoAlpha: 1 }, t);

    tl.from(s + ".close-mark", { opacity: 0, scale: 0.86, transformOrigin: "center", duration: 0.5, ease: "back.out(1.6)" }, t + 0.1);
    tl.from(s + ".close-cta", { opacity: 0, y: 26, duration: 0.55, ease: "power3.out" }, t + 0.28);
    tl.from(s + ".close-rule", { scaleX: 0, duration: 0.5, ease: "expo.out" }, t + 0.5);
    tl.from(s + ".close-handle", { opacity: 0, y: 16, duration: 0.45, ease: "power2.out" }, t + 0.62);

    if (!short) {
      tl.from(s + ".close-sub", { opacity: 0, y: 14, duration: 0.45, ease: "power2.out" }, t + 0.8);
      // Aktivitas tengah-scene supaya 5 detik terakhir tidak jadi layar diam.
      tl.to(s + ".close-mark", { y: -6, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 1 }, t + 1.6);
    }

    tl.set("#" + id, { autoAlpha: 0 }, t + dur);
    return dur;
  }

  global.HFScenes = { opening: opening, closing: closing, DUR: DUR, RING: RING };
})(window);
