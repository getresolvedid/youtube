/* T01 · scene 4 · ram-analogy — bagian 4 [answer] → [what], 13,25 dtk
   VO:        04-ram-analogy-vo.md          ← sumber kalimat & beat
   Direction: 04-ram-analogy-direction.md   ← sumber tata letak & koreografi

   Scene yang MENAMAI subjek episode. Frame pertamanya = frame terakhir
   `03-bolak-balik`: lemari di kiri, prosesor di kanan, dan lubang berbentuk meja
   menganga di antaranya. Tidak ada yang masuk atau menepi di sini — panggungnya
   sudah berdiri, dan itu yang membuat potongan kerasnya terbaca sebagai
   "lubangnya terisi" alih-alih sebagai layar baru.

   Versi sebelumnya mengerjakan semuanya sendiri dalam 9,4 dtk: memperkenalkan
   gudang, memindahkan berkas, dan menamai RAM. Terlalu buru-buru — masalahnya
   belum terasa, jadi jawabannya terdengar seperti definisi kamus. Perkenalan
   gudangnya sekarang milik scene 3 (HARD RULE 5), dan yang tersisa di sini murni
   jawabannya.

   TIGA KEPUTUSAN YANG MENENTUKAN SISA EPISODE:

   1. Berkasnya DISALIN, bukan dipindah — dan tahap 3 dipakai khusus untuk itu.
      Aslinya tetap di laci sampai frame terakhir, dan salinannya berangkat dari
      titik yang sama persis. Kalau ia pindah, penonton dapat model "data ada di
      satu tempat saja", dan model itu baru meledak jauh di belakang, di scene
      "RAM lupa saat listrik mati": mematikan listrik jadi berarti kehilangan
      berkasnya.

   2. Jaraknya digambar, tidak dikatakan. Jalur lemari->meja tertinggal di layar
      sepanjang ~800px; tautan meja->prosesor cuma ~110px, dan keduanya digambar
      dengan tebal, warna, serta opasitas yang SAMA (GARIS di panggung-analogi).
      Begitu bobotnya beda, yang dibandingkan penonton bukan lagi panjangnya.

   3. Meja TIDAK menempel ke prosesor. Yang menempel itu cache, dan cache baru
      datang di bagian 6 (naskah.md § Titik putus analogi). Di sini meja cuma
      jauh lebih dekat daripada gudang — dekat, bukan menyatu.

   Indigo dipakai HANYA untuk jawaban: meja, berkas, jalur, dan kata RAM. Lemari
   tetap abu-abu; prosesor baru boleh indigo di tahap 4, saat ia berhenti
   menunggu — kebalikan langsung dari scene 3, di mana ia gelap hampir sepanjang
   waktu.

   Detik tiap tahap tidak diketik di sini; semuanya dari `beat()` di
   timing.gen.ts (HARD RULE 4).
*/
import type React from "react";

import { E, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import {
  antarJemput,
  ASAL,
  BERKAS,
  C_TERBANG,
  D_JALUR,
  GARIS,
  Kartu,
  lengkung,
  Lemari,
  L_JALUR,
  MEJA,
  MejaNyata,
  napas,
  PANJANG_RAIH,
  Prosesor,
  RAIH_CPU,
  RAIH_MEJA,
  SiluetMeja,
  SKALA_LEMARI,
  TUJUAN,
  X_LEMARI,
  X_MEJA,
  X_PROSESOR,
  Y_MEJA,
} from "../panggung-analogi";
import { beat } from "../timing.gen";

const ID = "ram-analogy";

/* --- waktu: satu baris VO = satu tahap ------------------------------------ */

const B_SALIN = beat(ID, 0); // "Jadi berkasnya disalin dulu."
const B_MEJA = beat(ID, 1); // "Ke meja kerja yang jauh lebih dekat."
const B_ASLI = beat(ID, 2); // "Aslinya tetap di gudang, tidak ke mana-mana."
const B_MERAIH = beat(ID, 3); // "Sekarang prosesor tinggal meraih, ..."
const B_RAM = beat(ID, 4); // "Ya, meja kerja itu ram."

/** Salinan berangkat 0,9 dtk setelah tahap 1 mulai dan mendarat 2,6 dtk
 *  kemudian — di dalam tahap 2, setelah mejanya berdiri. Ia terbang menuju
 *  tempat yang belum ada, lalu tempatnya datang menjemput. */
const T_LEPAS = B_SALIN + 0.9;
const DUR_TERBANG = 2.6;
const T_MENDARAT = T_LEPAS + DUR_TERBANG;

/* --- geometri khusus scene ini -------------------------------------------- */

/* Jalur panjang (ASAL -> C_TERBANG -> TUJUAN) dan tautan pendek (RAIH_MEJA ->
   RAIH_CPU) tinggal di ../panggung-analogi.tsx: scene 5 mewarisi keduanya sudah
   tergambar dan memakainya sebagai dua benda yang dibandingkan, jadi angkanya
   tidak boleh hidup di satu scene saja. */

/** Skala salinan saat masih di laci — disamakan dengan ukuran berkas di
 *  dalamnya supaya di detik keberangkatan keduanya benar-benar bertumpuk, dan
 *  pemisahannya terbaca sebagai satu jadi dua. */
const SKALA_AWAL = (44 * SKALA_LEMARI) / BERKAS;

export const RamAnalogy: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1: salinan berangkat --- */
  const sumber = t(d, { mulai: B_SALIN + 0.15, durasi: 0.4, dari: 0, ke: 1 });
  /* Denyut sekali tepat saat salinannya lepas: sumbernya bereaksi, lalu tetap
     di tempatnya. Tanpa ini, pemisahannya terbaca sebagai berkas yang berangkat
     dan kebetulan ada berkas lain yang tertinggal. */
  const denyutLepas = tPP(d, { mulai: T_LEPAS - 0.1, durasi: 0.5, dari: 1, ke: 1.2 });
  /* Tahap 3 memanggil ulang berkas yang sama — kali ini dinamai VO. */
  const denyutAsli = tPP(d, { mulai: B_ASLI, durasi: 0.8, dari: 1, ke: 1.22 });

  const p = t(d, {
    mulai: T_LEPAS,
    durasi: DUR_TERBANG,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  const pos = lengkung(p, ASAL, C_TERBANG, TUJUAN);
  const pantul = tPP(d, {
    mulai: T_MENDARAT,
    durasi: 0.3,
    dari: 0,
    ke: -13,
    ease: E.power2out,
  });

  /* --- tahap 2: meja nyata mengisi siluet --- */
  const tumbuh = t(d, { mulai: B_MEJA, durasi: 0.55, dari: 0, ke: 1, ease: E.expoOut });
  /* Siluetnya padam persis seiring mejanya penuh — dua benda sebentuk yang
     tampil bersamaan terbaca sebagai gambar dobel, bukan sebagai lubang yang
     terisi. */
  const siluet = 1 - tumbuh;

  /* --- tahap 3: lingkaran dari berkas asli --- */
  const riak = t(d, { mulai: B_ASLI, durasi: 0.7, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 4: prosesor berhenti menunggu --- */
  const gambarRaih = t(d, {
    mulai: B_MERAIH + 0.1,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  /* Siklus 0,62 dtk — tiga lompatan sampai tahap 5. Bandingkan dengan 1,6 dtk
     di scene 3: gerakan yang sama, sepertiga waktunya, dan tidak ada satu pun
     yang harus menyeberangi panggung. */
  const raih = antarJemput(d, { mulai: B_MERAIH + 0.55, siklus: 0.62 });
  const posRaih = {
    x: RAIH_MEJA.x + (RAIH_CPU.x - RAIH_MEJA.x) * raih.maju,
    y: RAIH_MEJA.y + (RAIH_CPU.y - RAIH_MEJA.y) * raih.maju,
  };
  const nyalaProsesor = t(d, {
    mulai: B_MERAIH + 0.35,
    durasi: 0.5,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* lubang yang diwariskan scene 3 — padam saat mejanya berdiri */}
          <SiluetMeja id="siluet-ram-analogy" gambar={1} opacity={siluet * 0.7} />

          {/* jalur panjang: gudang -> meja. Tertinggal di layar sesudah
              berkasnya mendarat — ia BUKAN efek perjalanan, ia jaraknya. */}
          <path
            d={D_JALUR}
            fill="none"
            stroke={GARIS.warna}
            strokeWidth={GARIS.tebal}
            strokeLinecap="round"
            strokeDasharray={L_JALUR}
            strokeDashoffset={L_JALUR * (1 - p)}
            opacity={GARIS.opasitas}
          />

          {/* tautan pendek: meja -> prosesor */}
          <path
            d={`M${RAIH_MEJA.x} ${RAIH_MEJA.y}L${RAIH_CPU.x} ${RAIH_CPU.y}`}
            fill="none"
            stroke={GARIS.warna}
            strokeWidth={GARIS.tebal}
            strokeLinecap="round"
            strokeDasharray={PANJANG_RAIH}
            strokeDashoffset={PANJANG_RAIH * (1 - gambarRaih)}
            opacity={GARIS.opasitas}
          />

          {/* riak dari berkas asli — "masih di sini" */}
          <circle
            cx={ASAL.x}
            cy={ASAL.y}
            r={16 + 78 * riak}
            fill="none"
            stroke="var(--accent-ink)"
            strokeWidth={3}
            opacity={0.75 * (1 - riak)}
          />
        </svg>

        {/* ---------- meja nyata ---------- */}
        <MejaNyata tumbuh={tumbuh} opacity={t(d, { mulai: B_MEJA, durasi: 0.24, dari: 0, ke: 1 })} />

        {/* ---------- lemari arsip ---------- */}
        <Kartu x={X_LEMARI} skala={SKALA_LEMARI} label="lemari arsip">
          <Lemari isi={() => 1} sumber={sumber} denyut={denyutLepas * denyutAsli} />
        </Kartu>

        {/* ---------- prosesor ---------- */}
        <Kartu x={X_PROSESOR} label="prosesor">
          <Prosesor nyala={nyalaProsesor} />
        </Kartu>

        {/* ---------- label meja: "meja kerja" lalu RAM ---------- */}
        <div
          style={{
            position: "absolute",
            left: X_MEJA - 320,
            top: Y_MEJA + MEJA.kaki * MEJA.skala + 22,
            width: 640,
            textAlign: "center",
          }}
        >
          <p
            className="t-sub"
            style={{
              fontSize: "calc(var(--fs-sub) * 0.72)",
              color: "var(--ink-0)",
              ...masuk(d, { mulai: B_MEJA + 0.85, durasi: 0.42, geser: 14 }),
            }}
          >
            meja kerja
          </p>
          {/* Penamaan [what]. Datang PALING AKHIR dan sendirian: kartu judul
              sudah menulis "RAM" di detik ~10, jadi kalau ia muncul bersama
              mejanya ia terbaca sebagai pengulangan judul. Muncul setelah
              mejanya berdiri dan terpakai, ia jadi penegasan — "yang barusan
              kamu lihat, itu dia". */}
          <p
            className="t-title"
            style={{
              fontSize: 76,
              marginTop: 12,
              color: "var(--accent-ink)",
              ...masuk(d, { mulai: B_RAM + 0.14, durasi: 0.5, geser: 22 }),
            }}
          >
            RAM
          </p>
        </div>

        {/* ---------- salinan yang terbang, lalu diam di meja ---------- */}
        <div
          style={{
            position: "absolute",
            left: pos.x - BERKAS / 2,
            top:
              pos.y -
              BERKAS / 2 +
              pantul +
              napas(d, { mulai: T_MENDARAT + 0.4 }),
            width: BERKAS,
            height: BERKAS,
            opacity: t(d, { mulai: T_LEPAS, durasi: 0.12, dari: 0, ke: 1 }),
            transform: `scale(${SKALA_AWAL + (1 - SKALA_AWAL) * p})`,
            transformOrigin: "center",
          }}
        >
          <Ic n="file" warna="c-accent" style={{ width: BERKAS, height: BERKAS }} />
        </div>

        {/* ---------- lompatan pendek meja -> prosesor ---------- */}
        {raih.jalan && (
          <div
            style={{
              position: "absolute",
              left: posRaih.x - 22,
              top: posRaih.y - 22,
              width: 44,
              height: 44,
              opacity: gambarRaih,
            }}
          >
            <Ic n="file" warna="c-accent" style={{ width: 44, height: 44 }} />
          </div>
        )}
      </div>
    </Scene>
  );
};
