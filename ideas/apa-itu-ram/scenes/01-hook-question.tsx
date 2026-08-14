/* T01 · scene 1 · hook-question — bagian 1 [question], 12,4 dtk
   Direction: 01-hook-question-direction.md   ← sumber tata letak & koreografi
   VO:        01-hook-question-vo.md                  ← sumber kalimat & beat

   Frame pertama video. Tidak ada sapaan, tidak ada logo — brand sting baru
   datang setelah ini (docs/10). Yang harus terjadi di sini cuma satu:
   penonton punya pertanyaan yang belum bisa dijawabnya sendiri.

   DUA LAYAR, dipisah `[newscreen]` di direction:

     A  layar desktop lebar, pintasan peramban diklik, peramban terbuka
        + "Kelihatannya sepele?"
     B  "Tapi isi itu tadi ada di mana?"
        + tiga figur: file, hard disk, prosesor —
        lalu KETIGANYA ditandai salah, satu per satu

   Kenapa benar-benar berganti layar, bukan menambah isi di bawah yang lama:
   layar A adalah PERTANYAANNYA, layar B adalah RUANG JAWABANNYA. Menaruh
   keduanya bersamaan membuat desktop yang sudah selesai tugasnya ikut bersaing
   dengan tiga kandidat yang justru harus dibandingkan satu sama lain.

   Ketiga kandidat dicoret dan TIDAK ada penggantinya di scene ini. Jawabannya
   — data disalin lebih dulu ke RAM — baru datang di bagian 4. Yang ditinggalkan
   scene pembuka ini bukan "salah satu dari tiga ini", tapi lubang: tiga tebakan
   paling masuk akal sudah habis, dan penonton belum punya yang keempat.

   Titik waktunya DIAMBIL dari `beat("hook-question", i)`, tidak diketik —
   satu baris VO = satu beat (HARD RULE 4):

     beat 0  "Bayangkan kamu baru saja membuka    -> A: kursor, klik, buka
              sebuah aplikasi."
     beat 1  "Isinya muncul di layar, satu per    -> A: isi halaman terisi
              satu."
     beat 2  "Kelihatannya sepele."               -> A: pertanyaan
     beat 3  "Tapi isi itu tadi diambil dari      -> B: ganti layar, tiga
              mana, dan sekarang dikerjakan          kandidat, lalu dicoret
              di mana?"

   Beat 0 adalah UNDANGAN-nya (HARD RULE 6) dan ia sendirian di barisnya: di
   layar itulah detik jendela terbuka, sebelum ada isi apa pun yang bisa
   ditanyakan. Digabung dengan beat 1, jendela dan isinya jatuh bersamaan dan
   tidak ada satu pun yang sempat dilihat.

   Pergantian layar jatuh tepat di beat 3, saat "Tapi" diucapkan. Kata "tapi"
   DAN layar yang berganti membawa pesan yang sama; menjatuhkannya di detik yang
   sama membuat keduanya saling menguatkan alih-alih terbaca sebagai dua kejutan
   berurutan.

   Tata letaknya SELURUHNYA absolut — lihat catatan di ujung berkas.
*/
import type React from "react";

import { E, getar, masuk, t, tPP, useDetik } from "../../../shared/anim";
import { Ic, type NamaIkon } from "../../../shared/Icons";
import { Scene } from "../../../shared/Stage";
import { beat } from "../timing.gen";

const ID = "hook-question";

/** Detik pergantian layar A -> B — dipatok ke beat 3, kata "Tapi".
 *
 *  POTONGAN KERAS, bukan silang. Versi pertama scene ini menyilangkan keduanya
 *  selama 0,26 dtk dan hasilnya terlihat sendiri di still detik 5,0: judul
 *  layar B menembus desktop layar A selama ~3 frame — dua gambar sekaligus,
 *  yang terbaca sebagai render rusak, bukan transisi. Potongan keras memang
 *  gaya channel ini (docs/03 § Gerak); di sini ia juga satu-satunya yang benar.
 *
 *  Angkanya TIDAK diketik: begitu satu kata di rencana VO berubah, detik ini
 *  ikut bergeser sendiri — dan angka yang diketik tangan tidak (HARD RULE 4). */
const T_GANTI = beat(ID, 3);

/** Sedikit mendahului "Kelihatannya sepele." supaya pertanyaan besar sudah
 *  terbaca saat kalimat itu jatuh, bukan sesudahnya. */
const T_Q1 = beat(ID, 2) - 0.3;

/* Pusat vertikal tiap lapis, dalam px pada frame 1080. */
const Y_LAYAR = 372;
const Y_Q1 = 752;
const Y_Q2 = 380;
const Y_FIGUR = 762;

const lapis = (top: number): React.CSSProperties => ({
  position: "absolute",
  left: 0,
  right: 0,
  top,
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

/* ===========================================================================
   LAYAR A — desktop, klik, peramban terbuka
   ======================================================================== */

/* Direction menyebut "wide desktop screen", jadi kotaknya melebar (1180×540),
   bukan sekadar diperbesar. Konsekuensinya ada ruang di kiri — dipakai supaya
   pintasan yang diklik TETAP TERLIHAT setelah peramban terbuka. Jendela yang
   menutupi pintasannya sendiri menghapus bukti bahwa yang barusan terjadi
   adalah klik pada benda itu.

   Semua koordinat relatif terhadap kotak layar, jadi `transformOrigin` jendela
   bisa dipatok tepat di pintasan — jendelanya tumbuh DARI ikon yang diklik. */

const LAYAR = { w: 1180, h: 540 };
const PINTASAN = { x: 62, y: 58, w: 104 };
/** Titik yang diklik kursor, sekaligus titik tumbuh jendela. */
const KLIK = { x: PINTASAN.x + PINTASAN.w / 2, y: PINTASAN.y + PINTASAN.w / 2 };
/** Sisi kiri jendela — di kanan pintasan, bukan menimpanya. */
const JENDELA = { kiri: 232, atas: 52, kanan: 64, bawah: 56 };

const T_KURSOR = 0.3; // kursor mulai bergerak
const T_KLIK = 1.02; // kursor menekan
const T_BUKA = 1.14; // jendela mulai terbuka

const Kursor: React.FC<{ d: number }> = ({ d }) => {
  /* Melambat saat mendekat (power2.out), bukan linear — kursor yang bergerak
     rata terbaca sebagai animasi, kursor yang melambat terbaca sebagai tangan. */
  const maju = (dari: number, ke: number) =>
    t(d, { mulai: T_KURSOR, durasi: 0.72, dari, ke, ease: E.power2out });

  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        position: "absolute",
        left: maju(LAYAR.w - 300, KLIK.x - 4),
        top: maju(LAYAR.h - 96, KLIK.y - 2),
        width: 38,
        height: 38,
        /* Muncul saat mulai bergerak, hilang setelah jendelanya terbuka.
           Tugasnya sudah selesai di situ; kursor yang menetap sampai layar
           berganti menarik mata ke titik yang tidak terjadi apa-apa. */
        opacity:
          t(d, { mulai: T_KURSOR, durasi: 0.18, dari: 0, ke: 1 }) *
          t(d, { mulai: T_BUKA + 0.8, durasi: 0.3, dari: 1, ke: 0 }),
        /* Tekanan klik: turun cepat, balik cepat. */
        transform: `scale(${tPP(d, {
          mulai: T_KLIK,
          durasi: 0.18,
          dari: 1,
          ke: 0.78,
          ease: E.power2out,
        })})`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,.55))",
      }}
    >
      <path
        d="M4 2 L4 19 L8.6 14.6 L11.4 21 L14.2 19.8 L11.5 13.6 L18 13.6 Z"
        fill="#F6F8FB"
        stroke="#0B1020"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Bilah alamat peramban — yang membedakan jendela ini dari jendela aplikasi
 *  mana pun. Pil-nya terisi setelah jendela terbuka, seperti alamat yang baru
 *  selesai dimuat. */
const BilahPeramban: React.FC<{ d: number }> = ({ d }) => (
  <div
    style={{
      height: 46,
      borderBottom: "2px solid var(--line)",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 18px",
    }}
  >
    {/* dua titik, mengikuti gaya ikon `browser` di shared/Icons.tsx.
        BUKAN tiga titik warna ala macOS (docs/03). */}
    <i style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ink-2)" }} />
    <i style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ink-2)" }} />
    <div
      style={{
        marginLeft: 10,
        flex: 1,
        height: 20,
        borderRadius: 10,
        background: "var(--bg)",
        border: "2px solid var(--line)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "var(--line)",
          width: `${
            58 *
            t(d, { mulai: T_BUKA + 0.22, durasi: 0.4, dari: 0, ke: 1, ease: E.expoOut })
          }%`,
        }}
      />
    </div>
  </div>
);

const Desktop: React.FC = () => {
  const d = useDetik();

  return (
    <div
      style={{
        position: "relative",
        width: LAYAR.w,
        height: LAYAR.h,
        borderRadius: 22,
        background: "var(--bg-elev)",
        border: "3px solid var(--line)",
        /* Jendela tumbuh dengan sedikit lonjakan; tanpa ini ia bisa menyembul
           keluar bingkai layar untuk satu-dua frame. */
        overflow: "hidden",
        opacity: t(d, { mulai: 0.05, durasi: 0.35, dari: 0, ke: 1 }),
        transform: `scale(${t(d, {
          mulai: 0.05,
          durasi: 0.45,
          dari: 0.93,
          ke: 1,
          ease: E.expoOut,
        })})`,
      }}
    >
      {/* pintasan peramban di desktop — tetap terlihat setelah jendela terbuka */}
      <div
        style={{
          position: "absolute",
          left: PINTASAN.x,
          top: PINTASAN.y,
          width: PINTASAN.w,
          textAlign: "center",
          opacity: t(d, { mulai: 0.2, durasi: 0.3, dari: 0, ke: 1 }),
        }}
      >
        <Ic n="browser" style={{ width: PINTASAN.w, height: PINTASAN.w }} />
        <p className="t-label" style={{ fontSize: 18, marginTop: 8, color: "var(--ink-1)" }}>
          peramban
        </p>
      </div>

      {/* riak klik — menegaskan bahwa yang barusan terjadi adalah klik,
          bukan jendela yang muncul sendiri */}
      <div style={{ position: "absolute", left: KLIK.x, top: KLIK.y, width: 0, height: 0 }}>
        <div
          style={{
            position: "absolute",
            left: -68,
            top: -68,
            width: 136,
            height: 136,
            borderRadius: "50%",
            border: "3px solid var(--accent-ink)",
            opacity: t(d, {
              mulai: T_KLIK,
              durasi: 0.42,
              dari: 0.9,
              ke: 0,
              ease: E.power2out,
            }),
            transform: `scale(${t(d, {
              mulai: T_KLIK,
              durasi: 0.42,
              dari: 0.25,
              ke: 1,
              ease: E.expoOut,
            })})`,
          }}
        />
      </div>

      {/* jendela peramban — tumbuh dari pintasan yang diklik */}
      <div
        style={{
          position: "absolute",
          left: JENDELA.kiri,
          top: JENDELA.atas,
          right: JENDELA.kanan,
          bottom: JENDELA.bawah,
          borderRadius: 14,
          background: "var(--bg)",
          border: "2px solid var(--accent)",
          overflow: "hidden",
          opacity: t(d, { mulai: T_BUKA, durasi: 0.16, dari: 0, ke: 1 }),
          transform: `scale(${t(d, {
            mulai: T_BUKA,
            durasi: 0.52,
            dari: 0.06,
            ke: 1,
            ease: E.backOut(1.2),
          })})`,
          transformOrigin: `${KLIK.x - JENDELA.kiri}px ${KLIK.y - JENDELA.atas}px`,
        }}
      >
        <BilahPeramban d={d} />

        {/* isi halaman — INILAH "data aplikasi" yang ditanyakan pertanyaan
            sesudahnya, dan benda yang tiga figur di layar B cari tempatnya.

            Baris teratas --accent-ink, bukan --accent. Sampai detik 3,55 tidak
            ada teks di layar, jadi baris ini satu-satunya titik terang di 3,5
            detik pertama video — dan --accent (#4F46E5) di atas --bg terlalu
            gelap untuk memikulnya. Tema sudah memisahkan keduanya persis untuk
            ini: --accent untuk permukaan, --accent-ink untuk yang harus
            terbaca (theme.css baris 33). `npm run check` yang menemukannya. */}
        <div style={{ padding: "26px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
          {[0.82, 0.96, 0.64, 0.9, 0.72].map((lebar, i) => (
            <div
              key={lebar}
              style={{
                height: 20,
                borderRadius: 10,
                background: i === 0 ? "var(--accent-ink)" : "var(--line)",
                width: `${
                  lebar *
                  100 *
                  t(d, {
                    mulai: T_BUKA + 0.36 + i * 0.18,
                    durasi: 0.38,
                    dari: 0,
                    ke: 1,
                    ease: E.expoOut,
                  })
                }%`,
              }}
            />
          ))}
        </div>
      </div>

      <Kursor d={d} />
    </div>
  );
};

/* ===========================================================================
   LAYAR B — tiga kandidat, ketiganya salah
   ======================================================================== */

/** Tiga tempat yang MUNGKIN menyimpan data aplikasi yang sedang dibuka.
 *  Urutannya bukan selera: file (benda yang dicari) -> hard disk (tempat ia
 *  memang tersimpan) -> prosesor (tempat ia dipakai). Itu urutan yang sama
 *  dengan perjalanan datanya di seluruh episode, ditanam di sini sebelum
 *  perjalanan itu diceritakan.
 *
 *  "prosesor", bukan "cpu" seperti di direction — kamus pengucapan di naskah.md
 *  memutuskan channel ini tidak memakai "CPU" sama sekali. */
const KANDIDAT: { ikon: NamaIkon; label: string }[] = [
  { ikon: "file", label: "file" },
  { ikon: "disk", label: "hard disk" },
  { ikon: "chip", label: "prosesor" },
];

/** Ketiganya muncul dulu sebagai tebakan yang setara.
 *
 *  Kandidat pertama datang 0,1 dtk setelah potongan, bukan setengah detik
 *  sesudahnya. Jeda yang lebih panjang meninggalkan layar berisi judul saja —
 *  teks penuh layar tanpa satu pun elemen visual, yaitu persis yang dilarang
 *  HARD RULE 2. Still frame 146 di versi sebelumnya menunjukkannya. */
const T_KANDIDAT = 4.95;
const JEDA_KANDIDAT = 0.42;

/** Baru setelah semuanya berdiri, satu per satu dicoret. Kandidat terakhir
 *  mendarat di 6,29 dan coretan pertama jatuh 0,76 dtk sesudahnya: satu tarikan
 *  napas di mana ketiganya berdiri utuh dan penonton sempat memilih salah satu.
 *  Tanpa jeda itu, kartu ketiga masih bergerak masuk saat kartu pertama sudah
 *  dicoret, dan tidak ada momen ketiganya pernah setara. */
const T_SALAH = 7.05;
const JEDA_SALAH = 0.65;
const DUR_GETAR = 0.52;

const Kandidat: React.FC<{
  ikon: NamaIkon;
  label: string;
  mulai: number;
  /** Detik kartu ini ditandai salah. */
  salah: number;
}> = ({ ikon, label, mulai, salah }) => {
  const d = useDetik();

  const m = masuk(d, { mulai, durasi: 0.5, geser: 24 });
  const goyang = getar(d, { mulai: salah, durasi: DUR_GETAR, jauh: 14, putaran: 3 });
  /* Cepat (0,14 dtk) supaya merahnya mendarat bersama ayunan pertama getaran.
     Kalau warnanya lebih lambat dari goyangannya, kartu terbaca bergetar dulu
     lalu memerah — dua kejadian, padahal maksudnya satu. */
  const merah = t(d, { mulai: salah, durasi: 0.14, dari: 0, ke: 1, ease: E.power2out });

  return (
    <div
      style={{
        position: "relative",
        flex: "1 1 0",
        opacity: m.opacity,
        /* masuk() sudah mengembalikan translateY; getarannya DIGABUNG di sini,
           bukan ditulis sebagai `transform` kedua — properti yang sama ditulis
           dua kali diam-diam saling menimpa, tanpa error apa pun. */
        transform: `${m.transform} translateX(${goyang}px)`,
      }}
    >
      <div
        className="panel"
        style={{ padding: 32, alignItems: "center", height: "100%" }}
      >
        <Ic n={ikon} warna={d >= salah ? "c-bad" : "c-mute"} />
        <p
          className="t-sub"
          style={{
            fontSize: "calc(var(--fs-sub) * 0.8)",
            whiteSpace: "nowrap",
            color: "var(--ink-0)",
          }}
        >
          {label}
        </p>
      </div>

      {/* Salinan .panel.bad (theme.css) yang ditumpuk di atas kartu, bukan kelas
          yang ditukar. Kelas hanya bisa hidup-mati; lapis ini bisa dinaikkan
          opasitasnya sebagai fungsi frame. Ia ADIK dari .panel, bukan anaknya:
          `.panel:has(> .ic)` menata anaknya sebagai grid, dan lapis ini akan
          ikut ditempatkan di sana. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(239, 68, 68, 0.45)",
          background: "linear-gradient(var(--bad-soft), transparent)",
          opacity: merah,
        }}
      />
    </div>
  );
};

/* ===========================================================================
   Scene
   ======================================================================== */

export const HookQuestion: React.FC = () => {
  const d = useDetik();

  /* Potongan keras: satu frame layar A, frame berikutnya layar B. Keduanya
     fungsi murni dari `d` sama seperti tween mana pun, jadi seek ke detik mana
     pun tetap benar — yang dilarang shared/anim.ts adalah state, bukan cabang. */
  const tampilA = d < T_GANTI ? 1 : 0;

  /* Layar A mundur sedikit saat pertanyaannya datang — cukup untuk terbaca
     sebagai "berhenti, sekarang pikirkan", tidak cukup untuk terbaca sebagai
     perpindahan tata letak. */
  const skalaA = t(d, { mulai: T_Q1, durasi: 0.7, dari: 1, ke: 0.95, ease: E.power3out });
  const naikA = t(d, { mulai: T_Q1, durasi: 0.7, dari: 0, ke: -34, ease: E.power3out });

  return (
    <Scene>
      {/* ---------- LAYAR A ---------- */}
      <div style={{ opacity: tampilA }}>
        <div style={lapis(Y_LAYAR)}>
          <div
            style={{
              transform: `translateY(${naikA}px) scale(${skalaA})`,
              transformOrigin: "center",
            }}
          >
            <Desktop />
          </div>
        </div>

        <div style={lapis(Y_Q1)}>
          <h1
            className="t-title"
            style={{ lineHeight: 1.06, ...masuk(d, { mulai: T_Q1, durasi: 0.55, geser: 26 }) }}
          >
            Kelihatannya sepele?
          </h1>
        </div>
      </div>

      {/* ---------- LAYAR B ---------- */}
      <div style={{ opacity: 1 - tampilA }}>
        <div style={lapis(Y_Q2)}>
          {/* TANPA masuk(). Judul ini harus sudah UTUH di frame pertama setelah
              potongan — kalau ia memudar masuk, potongannya berhenti jadi
              potongan: layar A hilang mendadak lalu layar kosong beberapa frame
              sebelum ada isinya. Versi pertama scene ini persis begitu, dan
              still frame 146 menunjukkannya sebagai layar hitam polos.
              Yang bergerak cuma posisinya — mendarat, bukan muncul. */}
          <h1
            className="t-title"
            style={{
              maxWidth: 1560,
              textAlign: "center",
              lineHeight: 1.1,
              transform: `translateY(${t(d, {
                mulai: T_GANTI,
                durasi: 0.42,
                dari: 16,
                ke: 0,
                ease: E.expoOut,
              })}px)`,
            }}
          >
            Tapi isi itu tadi ada di mana?
          </h1>
        </div>

        <div
          style={{
            ...lapis(Y_FIGUR),
            flexDirection: "row",
            justifyContent: "center",
            gap: 32,
            paddingLeft: 90,
            paddingRight: 90,
          }}
        >
          {KANDIDAT.map((k, i) => (
            <Kandidat
              key={k.ikon}
              ikon={k.ikon}
              label={k.label}
              mulai={T_KANDIDAT + i * JEDA_KANDIDAT}
              salah={T_SALAH + i * JEDA_SALAH}
            />
          ))}
        </div>
      </div>
    </Scene>
  );
};

/* Catatan tata letak — kenapa SEMUANYA absolut.

   Kalau layar A dan layar B dibuat sebagai elemen dalam alur normal, keduanya
   akan saling mendorong selama silang 0,26 dtk: layar B yang mulai muncul
   menambah tinggi dokumen, dan layar A yang belum sepenuhnya hilang ikut
   bergeser. Pergeseran beberapa frame seperti itu terbaca sebagai glitch,
   bukan sebagai koreografi. Dengan `lapis()` keduanya menempati ruang yang
   sama dan tidak pernah tahu satu sama lain ada. */
