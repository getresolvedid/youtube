/* T01 · scene 3 · bolak-balik — bagian 3 [problem], 17,55 dtk
   VO:        03-bolak-balik-vo.md          ← sumber kalimat & beat
   Direction: 03-bolak-balik-direction.md   ← sumber tata letak & koreografi

   Scene ini TIDAK menjawab apa pun. Tugasnya membuat masalahnya terasa cukup
   lama sampai penonton sendiri yang menginginkan jalan keluarnya — docs/02
   menyebutnya eksplisit: "[problem] tidak boleh diringkas jadi satu kalimat.
   Kalau penonton tidak merasakan masalahnya, jawaban di bagian 4 terasa seperti
   definisi kamus." Versi sebelumnya memang begitu: gudang, perjalanan, dan nama
   RAM diborong satu scene 9,4 detik, dan bagian [problem] tidak pernah ada.

   Yang bekerja di sini bukan gambarnya, tapi PENGULANGANNYA. Empat putaran
   antar-jemput yang sama persis, tanpa jeda, sementara prosesornya gelap —
   penonton harus sempat bosan, karena bosan itulah isi scene ini. Karena itu
   tahap 4 dan 5 dipisah walau satu gagasan: bolak-baliknya perlu jalan beberapa
   putaran sebelum kalimat "cuma menunggu" jatuh.

   Detik tiap tahap TIDAK diketik di sini — semuanya dari `beat()` di
   timing.gen.ts, yang menghitungnya dari jumlah kata tiap baris rencana VO
   (HARD RULE 4). Begitu satu kalimat diubah, koreografi ini ikut bergeser
   sendiri.

   Keadaan AKHIR scene ini adalah keadaan AWAL scene 4: lemari di kiri, prosesor
   di kanan, siluet meja tergambar penuh. Koordinatnya milik bersama, di
   ../panggung-analogi.tsx — kalau ada yang digeser di sini, scene 4 ikut.
*/
import type React from "react";

import { E, t, tPP, useDetik } from "../../../shared/anim";
import { Ic } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import {
  antarJemput,
  Kartu,
  KARTU,
  LACI_SUMBER,
  LEMARI,
  lengkung,
  Lemari,
  munculkan,
  Prosesor,
  P_PROSESOR,
  SiluetMeja,
  SKALA_LEMARI,
  titikLaci,
  X_LEMARI,
  X_PROSESOR,
  Y_KARTU,
} from "../panggung-analogi";
import { beat } from "../timing.gen";

const ID = "bolak-balik";

/* --- waktu: satu baris VO = satu tahap ------------------------------------ */

const B_GUDANG = beat(ID, 0); // "Bayangkan sebuah gudang, penuh lemari arsip ..."
const B_JAUH = beat(ID, 1); // "Di seberangnya ada yang mengerjakan berkas itu, ..."
const B_KOSONG = beat(ID, 2); // "Tapi di antara keduanya tidak ada tempat menaruh ..."
const B_JEMPUT = beat(ID, 3); // "Jadi tiap kali dipakai, berkasnya dijemput ..."
const B_TUNGGU = beat(ID, 4); // "Selama dijemput, prosesor cuma menunggu."

/** Satu putaran antar-jemput. 1,6 dtk memberi empat putaran penuh sampai scene
 *  habis — cukup untuk terbaca sebagai kebiasaan, bukan sebagai satu kejadian. */
const SIKLUS = 1.6;

/** Berkas laci datang satu per satu; 12 berkas x 0,2 dtk = 2,4 dtk, selesai
 *  sebelum tahap 2 mulai. Jeda-nya yang bikin "penuh" terbaca sebagai proses,
 *  bukan sebagai gambar yang sudah jadi. */
const JEDA_ISI = 0.2;

/* --- geometri khusus scene ini -------------------------------------------- */

/** Lemari berdiri sendirian di tengah dulu, baru menepi. */
const X_LEMARI_AWAL = 960;
const X_PROSESOR_AWAL = 2140;

/** Titik singgah antar-jemput. Berangkat dari laci sumber, berhenti TEPAT DI
 *  LUAR kartu prosesor — bukan di pusat ikonnya. Versi pertama mengantarnya ke
 *  P_PROSESOR dan berkasnya menutupi kepingnya persis di detik keping itu
 *  menyala, jadi satu-satunya tanda "sampai" justru tertutup oleh benda yang
 *  menyampaikannya.
 *
 *  Lengkungnya diangkat supaya lintasannya lewat DI ATAS siluet meja — berkas
 *  yang menembus mejanya akan terbaca sebagai mendarat di situ. */
const TUJUAN = { x: X_PROSESOR - KARTU.w / 2 - 46, y: P_PROSESOR.y };
const C_JEMPUT = { x: (X_LEMARI + TUJUAN.x) / 2, y: 300 };
const UKURAN_BERKAS = 74;

export const BolakBalik: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: panggung berdiri --- */
  const masukLemari = munculkan(d, B_GUDANG + 0.15, 0.6);
  const menepi = t(d, {
    mulai: B_JAUH,
    durasi: 0.75,
    dari: 0,
    ke: 1,
    ease: E.power3out,
  });
  const xLemari = X_LEMARI_AWAL + (X_LEMARI - X_LEMARI_AWAL) * menepi;
  const skalaLemari = (1 + (SKALA_LEMARI - 1) * menepi) * (0.9 + 0.1 * masukLemari);

  const masukProsesor = t(d, {
    mulai: B_JAUH + 0.24,
    durasi: 0.7,
    dari: 0,
    ke: 1,
    ease: E.expoOut,
  });
  const xProsesor = X_PROSESOR_AWAL + (X_PROSESOR - X_PROSESOR_AWAL) * masukProsesor;

  /* --- tahap 3: lubang berbentuk meja --- */
  const gambarSiluet = t(d, {
    mulai: B_KOSONG + 0.15,
    durasi: 1.8,
    dari: 0,
    ke: 1,
    ease: E.power2out,
  });
  /* Lubangnya berdenyut pelan setelah tergambar. Tanpa ini ada ~1,9 dtk di ekor
     tahap 3 yang benar-benar diam — dan layar diam lebih dari 4 detik dilarang
     docs/02, tapi jauh sebelum itu ia sudah terbaca sebagai render yang macet. */
  const denyutSiluet =
    0.7 + 0.3 * (0.5 + 0.5 * Math.sin(((d - B_KOSONG) * 2 * Math.PI) / 3.2));

  /* --- tahap 4 & 5: antar-jemput --- */
  const jemput = antarJemput(d, { mulai: B_JEMPUT, siklus: SIKLUS });
  const asal = titikLaci(LACI_SUMBER, { skala: SKALA_LEMARI, x: X_LEMARI });
  const pos = lengkung(jemput.maju, asal, C_JEMPUT, TUJUAN);

  /* Jam baru datang di tahap 5, tapi gelapnya prosesor sudah berjalan sejak
     tahap 4 — kalimatnya menamai apa yang sudah dilihat penonton, bukan
     memperkenalkan kejadian baru. */
  const jam = munculkan(d, B_TUNGGU, 0.45);
  const denyutJam = tPP(d, { mulai: B_TUNGGU, durasi: 1.4, dari: 1, ke: 1.14 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <SiluetMeja id="siluet-bolak-balik" gambar={gambarSiluet} opacity={denyutSiluet} />
        </svg>

        {/* ---------- lemari arsip ---------- */}
        <Kartu
          x={xLemari}
          skala={skalaLemari}
          opacity={masukLemari}
          label="lemari arsip"
        >
          <Lemari
            isi={(n) =>
              t(d, {
                mulai: B_GUDANG + 0.9 + n * JEDA_ISI,
                durasi: 0.4,
                dari: 0,
                ke: 1,
                ease: E.backOut(1.8),
              })
            }
          />
        </Kartu>

        {/* ---------- prosesor ---------- */}
        <Kartu x={xProsesor} label="prosesor">
          <Prosesor nyala={jemput.sampai} />
        </Kartu>

        {/* jam — "menunggu" dinamai, bukan diperagakan ulang */}
        <div
          style={{
            position: "absolute",
            left: X_PROSESOR - 36,
            top: Y_KARTU - LEMARI.h / 2 - LEMARI.atas - 84,
            width: 72,
            height: 72,
            opacity: jam,
            transform: `scale(${denyutJam})`,
          }}
        >
          <Ic n="clock" warna="c-mute" style={{ width: 72, height: 72 }} />
        </div>

        {/* ---------- berkas yang diantar-jemput ----------
            Lintasannya TIDAK ditinggalkan di layar. Yang berulang tidak boleh
            berjejak: empat jalur yang menumpuk terbaca sebagai satu jalur yang
            makin ramai, bukan sebagai satu perjalanan yang diulang-ulang. */}
        {jemput.jalan && (
          <div
            style={{
              position: "absolute",
              left: pos.x - UKURAN_BERKAS / 2,
              top: pos.y - UKURAN_BERKAS / 2,
              width: UKURAN_BERKAS,
              height: UKURAN_BERKAS,
            }}
          >
            {/* Lintasannya berangkat dari DALAM lemari, jadi di awal dan akhir
                tiap perjalanan ia memang lewat di atas berkas-berkas di laci —
                itu justru yang membuatnya terbaca "diambil dari sana". */}
            <Ic
              n="file"
              warna="c-accent"
              tumpang="sengaja"
              style={{ width: UKURAN_BERKAS, height: UKURAN_BERKAS }}
            />
          </div>
        )}
      </div>
    </Scene>
  );
};

/* Kenapa jalur antar-jemputnya tidak digambar sama sekali, padahal scene 4
   justru meninggalkan jalurnya di layar.

   Keduanya menjawab pertanyaan yang berbeda. Di scene 4 garis itu adalah
   JARAK — satu perjalanan, dan panjangnya yang jadi ukuran. Di sini yang diukur
   bukan jarak melainkan BERAPA KALI, dan angka itu tidak bisa digambar sebagai
   garis: empat garis yang menumpuk di lintasan yang sama cuma menghasilkan satu
   garis yang lebih tebal. Yang menghitungnya adalah penonton, dengan menonton
   hal yang sama terjadi lagi.

   Karena itu `GARIS` di panggung-analogi.tsx sengaja tidak diimpor di sini —
   bukan impor yang lupa ditulis.
*/
