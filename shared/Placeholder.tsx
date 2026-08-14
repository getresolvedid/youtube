/* Scene yang belum dibuat.

   Muncul untuk setiap ID di naskah yang belum punya komponen di
   ideas/<slug>/scenes/. Sengaja jelek dan sengaja menampilkan VO-nya: episode
   tetap bisa di-scrub dengan timing yang benar, dan yang belum digarap terlihat
   sebagai lubang, bukan sebagai layar gelap yang dikira sudah selesai.

   JANGAN pernah dirender ke MP4 final. Cek sisa lubang:
     npm run sisa
*/
import type React from "react";

import { E, masuk, t, useDetik } from "./anim";

export const BelumDibuat: React.FC<{
  id: string;
  bagian: string;
  durasi: number;
  vo: string;
  /** Satu baris dari daftar scene di naskah — dipakai kalau rencana VO-nya
   *  memang belum ada, supaya kartunya tetap bilang scene ini tentang apa. */
  ringkas: string;
}> = ({ id, bagian, durasi, vo, ringkas }) => {
  const d = useDetik();
  const maju = t(d, { mulai: 0, durasi, dari: 0, ke: 1, ease: E.linear });

  return (
    <div
      className="scene"
      style={{
        background:
          "repeating-linear-gradient(45deg, rgba(245,158,11,.07) 0 24px, transparent 24px 48px)",
        border: "3px dashed var(--warn)",
      }}
    >
      <div className="scene-content center" style={{ gap: 24 }}>
        <p className="kicker c-warn" style={masuk(d, { urutan: 0 })}>
          belum dibuat · {bagian}
        </p>
        <h1 className="big c-warn" style={{ fontSize: 120, ...masuk(d, { urutan: 1 }) }}>
          {id}
        </h1>
        <p
          className="t-sub"
          style={{ maxWidth: "62ch", lineHeight: 1.3, ...masuk(d, { urutan: 2 }) }}
        >
          {vo || ringkas || "— belum ada di naskah maupun rencana VO —"}
        </p>
        <p className="t-label" style={masuk(d, { urutan: 3 })}>
          {durasi.toFixed(2)} dtk
          {/* Tanpa rencana VO durasinya cuma VO_PLACEHOLDER_SECONDS — angka yang
              tidak berarti apa-apa. Kartunya harus mengatakannya sendiri, kalau
              tidak ia terbaca seolah timing-nya sudah benar. */}
          {vo ? "" : " · rencana VO belum ada, durasi masih placeholder"}
        </p>

        {/* Bar kemajuan — supaya durasi scene terasa saat scrubbing, bukan
            cuma terbaca sebagai angka. */}
        <div
          style={{
            width: 520,
            height: 6,
            borderRadius: 3,
            background: "var(--line)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${maju * 100}%`,
              height: "100%",
              background: "var(--warn)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
