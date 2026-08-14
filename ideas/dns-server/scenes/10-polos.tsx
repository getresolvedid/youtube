/* T14 · scene 10 · polos — bagian 6 [explaining], 32,11 dtk
   VO:        10-polos-vo.md
   Direction: 10-polos-direction.md

   Scene paling tegang di episode. IA TIDAK BOLEH MENAKUT-NAKUTI — yang
   dijelaskan sifat mekanismenya (tidak ada pemeriksaan), bukan penjahatnya.
   Semua keputusan di bawah tunduk pada itu.

   TIGA KEPUTUSAN:

   1. Sosok di tepi jalur NETRAL: tanpa tudung, tanpa topeng, tanpa merah, tanpa
      siluet gelap — komponen `Sosok` yang sama dengan pemilik situs di scene 6.
      Inti scene ini justru bahwa siapa pun yang kebetulan ada di jalur bisa
      melakukannya, tanpa perlu jadi siapa-siapa. Penjahat berkostum mengubahnya
      jadi cerita tentang orang jahat, dan penonton pulang berpikir "berarti aman
      kalau tidak ada orang jahat".

   2. Kartu asli dan kartu palsu dari komponen `Kartu` yang SAMA, dengan prop
      yang sama. Kalau yang palsu digambar beda — warna lain, sobek, mencurigakan
      — seluruh scene runtuh, karena penonton akan bertanya kenapa penerimanya
      tidak lihat saja.

   3. Penerima TIDAK PUNYA alat pemeriksa. Tidak ada kaca pembesar, stempel, atau
      daftar periksa — semuanya membocorkan scene 11. Dan tahap 9 tanpa tanda
      bahaya sama sekali: yang bikin ngeri justru bahwa tidak ada apa pun yang
      kelihatan salah.
*/
import type React from "react";

import { E, t, useDetik } from "../../../shared/anim";
import { Scene } from "../../../shared/Stage";
import {
  GARIS,
  Kartu,
  Loket,
  LOKET,
  NOMOR_BARU,
  NOMOR_LAMA,
  Papan,
  Sosok,
} from "../panggung-loket";
import { beat } from "../timing.gen";

const ID = "polos";

const B_TERBUKA = beat(ID, 0); // "Karena dari awal, pertanyaannya memang berjalan terbuka."
const B_TANPA = beat(ID, 1); // "Tidak ada amplop, tidak ada gembok."
const B_SIAPAPUN = beat(ID, 2); // "Siapa pun yang kebetulan ada di jalur itu bisa membacanya."
const B_TAHU = beat(ID, 3); // "Dia tahu nama apa yang kamu tanyakan, ..."
const B_LEBIH = beat(ID, 4); // "Tapi ada yang lebih penting daripada dibaca."
const B_DULUAN = beat(ID, 5); // "Dia juga bisa menjawab duluan."
const B_TIDAKPERIKSA = beat(ID, 6); // "Dan yang bertanya tidak punya cara memeriksa ..."
const B_PERCAYA = beat(ID, 7); // "Dia percaya jawaban yang datang paling awal."
const B_CEPAT = beat(ID, 8); // "Jadi jawaban yang keliru cuma perlu lebih cepat. ..."

const Y_JALUR = 400;
/** Penerimanya adalah LOKET — yang bertanya untukmu, sama seperti di scene 5.
 *  Versi pertama menggambarnya sebagai kotak kosong, dan kotak kosong tidak
 *  menuntut apa pun dari penonton: yang harus terasa adalah bahwa yang percaya
 *  jawaban pertama itu benda yang sudah dia kenal sejak scene 5. */
const X_PENERIMA = 1650;
const Y_PENERIMA = 560;
const S_PENERIMA = 0.8;
const P_SOSOK = { x: 820, y: 660 };
/** Papan catatan — posisi & skala ini DIPAKAI ULANG PERSIS di `12-ganti-loket`.
 *  Kalau salah satunya digeser, keduanya digeser. */
export const P_PAPAN = { x: 1150, y: 690, skala: 0.86 };
const ISI = ["halaman", "surat", "nama lain"];

export const Polos: React.FC = () => {
  const d = useDetik();

  /* --- tahap 1 & 2: kartu berjalan terbuka, satu diperbesar di tengah --- */
  const besar = t(d, { mulai: B_TANPA, durasi: 0.5, dari: 0, ke: 1, ease: E.expoOut });

  /* --- tahap 3 & 4: sosok berdiri di tepi, papannya terisi --- */
  const sosok = t(d, { mulai: B_SIAPAPUN, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const papan = t(d, { mulai: B_TAHU, durasi: 0.6, dari: 0, ke: 1, ease: E.expoOut });
  const baris = t(d, { mulai: B_TAHU + 0.3, durasi: 3.4, dari: 0, ke: 4, ease: E.linear });

  /* --- tahap 5: satu tahap yang isinya cuma jeda --- */
  const dekat = t(d, { mulai: B_LEBIH + 0.2, durasi: 0.8, dari: 0, ke: 1, ease: E.power2out });

  /* --- tahap 6: kartunya sendiri dilempar, dan berangkat LEBIH DULU --- */
  /* KEDUANYA TIBA DI TAHAP 8, bukan di tahap 6. Versi pertama memberi keduanya
     durasi tetap (1,5 dtk dan 2,6 dtk) sehingga keduanya sudah sampai di detik
     20,8 — lalu PARKIR di titik yang sama persis selama 4,3 detik penuh, satu
     menimpa yang lain. Yang terlihat di layar cuma SATU kartu, dan yang hilang
     justru gambar terpenting scene ini (catatan direction: "dua kartu yang
     tidak bisa dibedakan"). Karena itu waktu tibanya dipatok ke beat, bukan ke
     durasi tetap: begitu satu kalimat VO berubah panjang, keduanya ikut. */
  const T_BERANGKAT = B_DULUAN + 0.15;
  const T_TIBA_PALSU = B_PERCAYA; // awal tahap 8 — "yang datang paling awal"
  const T_TIBA_ASLI = B_PERCAYA + 0.45; // sepersekian detik sesudahnya

  /* `power1out` bukan hiasan: lajunya paling tinggi tepat saat dilempar, lalu
     mengendur. Itu yang membuat "lebih cepat" terbaca padahal jaraknya lebih
     pendek — perbandingan laju itulah seluruh isi scene. Kartu asli linear,
     berangkat dari jauh di kiri, dan justru karena tidak pernah melambat ia
     terlihat cuma kalah start. */
  const palsu = t(d, {
    mulai: T_BERANGKAT,
    durasi: T_TIBA_PALSU - T_BERANGKAT,
    dari: 0,
    ke: 1,
    ease: E.power1out,
  });
  const asli = t(d, {
    mulai: T_BERANGKAT,
    durasi: T_TIBA_ASLI - T_BERANGKAT,
    dari: 0,
    ke: 1,
    ease: E.linear,
  });

  const xPalsu = P_SOSOK.x + (X_PENERIMA - 120 - P_SOSOK.x) * palsu;
  const xAsli = 300 + (X_PENERIMA - 120 - 300) * asli;

  /* --- tahap 8: pintu menutup begitu yang pertama diterima --- */
  /* Yang palsu MASUK — ia tidak boleh cuma berhenti di depan jendela. Selama ia
     masih tergeletak di situ, kartu asli yang tiba sesudahnya mendarat tepat di
     atasnya dan keduanya jadi satu bentuk. Mengecil sambil memudar terbaca
     sebagai "diterima, tanpa jeda"; pintu menutup 0,15 dtk sesudahnya, jadi
     urutannya kelihatan: masuk dulu, baru tertutup. */
  const masuk = t(d, { mulai: T_TIBA_PALSU, durasi: 0.3, dari: 0, ke: 1, ease: E.power2in });
  const tutup = t(d, { mulai: B_PERCAYA + 0.15, durasi: 0.18, dari: 0, ke: 1, ease: E.power2in });
  const pantul = t(d, { mulai: B_PERCAYA + 0.45, durasi: 0.8, dari: 0, ke: 1, ease: E.power2in });

  /* --- tahap 9: berangkat ke tempat yang salah. Tanpa tanda bahaya. --- */
  const salah = t(d, { mulai: B_CEPAT + 0.2, durasi: 0.9, dari: 0, ke: 1, ease: E.expoOut });

  /* Kartu yang berjalan di tahap 1–5: siklus tetap dari detik, tanpa acak. */
  const jalanKartu = (k: number): number =>
    ((d * 190 + k * 520 + 200) % 2100) - 120;

  const fasePertama = 1 - t(d, { mulai: B_DULUAN - 0.4, durasi: 0.5, dari: 0, ke: 1 });

  return (
    <Scene>
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {/* ---------- jalur, melebar mengisi frame ---------- */}
          <path
            d={`M60 ${Y_JALUR}h1800`}
            stroke="var(--line)"
            strokeWidth={8}
            strokeLinecap="round"
          />

          {/* ---------- penerima: loket yang sama, tanpa satu pun alat pemeriksa ---------- */}
          <g>
            <Loket x={X_PENERIMA} y={Y_PENERIMA} skala={S_PENERIMA} nyala={1} />
            {/* jendelanya menutup begitu yang pertama masuk — bukan "pintu"
                baru, melainkan bukaan yang sudah ada sejak scene 5 */}
            <rect
              x={X_PENERIMA - (LOKET.jendela.w / 2) * S_PENERIMA}
              y={Y_PENERIMA + LOKET.jendela.y * S_PENERIMA}
              width={LOKET.jendela.w * S_PENERIMA}
              height={LOKET.jendela.h * S_PENERIMA * tutup}
              fill="var(--ink-1)"
              opacity={0.9}
            />
          </g>

          {/* ---------- kartu berjalan, isinya terbaca dari luar ---------- */}
          <g opacity={fasePertama}>
            {[0, 1, 2].map((k) => {
              const x = jalanKartu(k);
              const dekatTengah = 1 - Math.min(1, Math.abs(x - 900) / 420);
              return (
                <Kartu
                  key={k}
                  x={x}
                  y={Y_JALUR}
                  teks={ISI[k] ?? ""}
                  skala={0.6 + 0.45 * besar * dekatTengah}
                />
              );
            })}
          </g>

          {/* ---------- sosok netral di tepi jalur ---------- */}
          <g opacity={sosok}>
            <Sosok
              x={P_SOSOK.x}
              y={P_SOSOK.y - 40 * dekat}
              skala={0.95}
              /* kepala mengikuti kartu terdekat — fungsi murni dari detik */
              hadap={Math.sin(d * 1.6) * 9}
            />
          </g>

          {/* ---------- papan catatannya: nama, dan jam ---------- */}
          <g opacity={papan}>
            <Papan x={P_PAPAN.x} y={P_PAPAN.y} baris={baris} skala={P_PAPAN.skala} />
          </g>

          {/* ---------- dua kartu yang tidak bisa dibedakan ---------- */}
          <g opacity={1 - fasePertama}>
            {/* dari sosok — berangkat belakangan, tiba duluan, lalu MASUK */}
            <Kartu
              x={xPalsu + 60 * masuk}
              y={Y_JALUR + (P_SOSOK.y - 150 - Y_JALUR) * (1 - palsu)}
              teks={NOMOR_LAMA}
              skala={0.66 * (1 - 0.3 * masuk)}
              opacity={1 - masuk}
            />
            {/* yang asli — berangkat duluan, tiba belakangan, lalu memantul */}
            <Kartu
              x={xAsli - 150 * pantul}
              y={Y_JALUR + 240 * pantul}
              teks={NOMOR_BARU}
              skala={0.66}
              rot={38 * pantul}
              opacity={1 - 0.15 * pantul}
            />
          </g>

          {/* ---------- berangkat ke tempat yang salah ---------- */}
          <g opacity={salah}>
            <path
              d={`M${X_PENERIMA} ${Y_PENERIMA + 10}q0 130 -60 170`}
              fill="none"
              stroke={GARIS.warna}
              strokeWidth={GARIS.tebal}
              strokeLinecap="round"
              opacity={GARIS.opasitas}
            />
            <rect
              x={1490}
              y={772}
              width={230}
              height={166}
              rx={12}
              fill="var(--bg-elev)"
              stroke="var(--ink-1)"
              strokeWidth={5}
              opacity={salah}
            />
            <text
              x={1605}
              y={866}
              fontSize={30}
              fontFamily="var(--font-mono)"
              fill="var(--ink-1)"
              textAnchor="middle"
            >
              bukan yang
            </text>
            <text
              x={1605}
              y={902}
              fontSize={30}
              fontFamily="var(--font-mono)"
              fill="var(--ink-1)"
              textAnchor="middle"
            >
              kamu tuju
            </text>
          </g>
        </svg>
      </div>
    </Scene>
  );
};
