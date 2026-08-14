/**
 * elevenlabs-keys.mjs — kelola & rotasi API key ElevenLabs.
 *
 * Key disimpan berurutan di .env. Yang dipakai semua skrip selalu
 * ELEVENLABS_API_KEY; sisanya (ELEVENLABS_API_KEY_2, _3, ...) adalah cadangan.
 * Rotasi = menggeser urutan itu, dan berkas .env ditulis ulang di tempat
 * (komentar, urutan baris, dan variabel lain tidak tersentuh).
 *
 *   node tools/elevenlabs-keys.mjs status         daftar key (disamarkan)
 *   node tools/elevenlabs-keys.mjs check          sisa kuota tiap key (panggil API)
 *   node tools/elevenlabs-keys.mjs rotate         promosikan cadangan jadi aktif
 *   node tools/elevenlabs-keys.mjs rotate --auto  rotasi HANYA jika key aktif habis/ditolak
 *   node tools/elevenlabs-keys.mjs add sk_xxx     tambah key baru sebagai cadangan
 *   node tools/elevenlabs-keys.mjs drop 2         buang key slot ke-2
 *
 * Opsi: --file <path>  (default: .env di akar repo)
 *
 * Tool ini membaca .env langsung, jadi TIDAK perlu --env-file.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const KEY_RE = /^(\s*)(ELEVENLABS_API_KEY(?:_(\d+))?)\s*=\s*(.*)$/;

const argv = process.argv.slice(2);
const cmd = argv[0] ?? "status";
const flag = (name) => argv.includes(name);
const opt = (name) => {
  const i = argv.indexOf(name);
  return i === -1 ? undefined : argv[i + 1];
};
const envPath = opt("--file") ?? join(ROOT, ".env");

const mask = (k) => (k.length <= 14 ? "*".repeat(k.length) : `${k.slice(0, 7)}…${k.slice(-4)}`);
const slotName = (i) => (i === 0 ? "ELEVENLABS_API_KEY" : `ELEVENLABS_API_KEY_${i + 1}`);

/** Baca .env sebagai baris + posisi tiap slot key, supaya bisa ditulis ulang di tempat. */
function readEnv() {
  let lines;
  try {
    lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  } catch {
    console.error(`.env tidak ditemukan di ${envPath}. Salin dulu: Copy-Item .env.example .env`);
    process.exit(1);
  }

  const slots = [];
  lines.forEach((line, lineNo) => {
    const m = line.match(KEY_RE);
    if (!m) return;
    slots.push({ lineNo, indent: m[1], suffix: m[3] ? Number(m[3]) : 1, value: m[4].trim() });
  });
  slots.sort((a, b) => a.suffix - b.suffix);
  return { lines, slots };
}

/** Tulis ulang nilai key sesuai urutan baru; baris lain tidak disentuh. */
function writeKeys(lines, slots, values) {
  // Baris slot dipakai ulang sesuai urutan kemunculan di berkas.
  const lineNos = slots.map((s) => s.lineNo).sort((a, b) => a - b);
  const indent = slots[0]?.indent ?? "";

  values.forEach((val, i) => {
    const name = slotName(i);
    if (i < lineNos.length) {
      lines[lineNos[i]] = `${indent}${name}=${val}`;
    } else {
      // Slot baru: sisipkan tepat setelah baris key terakhir.
      lines.splice(lineNos[lineNos.length - 1] + 1 + (i - lineNos.length), 0, `${indent}${name}=${val}`);
    }
  });

  // Slot berlebih (setelah drop) dikosongkan namanya tetap ada sebagai tempat cadangan.
  for (let i = values.length; i < lineNos.length; i++) {
    lines[lineNos[i]] = `${indent}${slotName(i)}=`;
  }

  writeFileSync(envPath, lines.join("\n"), "utf8");
}

/** Halaman API key memperlihatkan ID key (heksadesimal) di samping key-nya
 *  sendiri (`sk_…`, cuma muncul sekali saat dibuat/dirotasi). Yang tersalin
 *  hampir selalu yang pertama, dan API menolaknya dengan HTTP 400 — bukan 401 —
 *  sehingga terbaca seperti permintaannya yang salah, bukan nilainya. */
const idBukanKey = (k) => !k.startsWith("sk_");

async function quota(key) {
  if (idBukanKey(key)) {
    return {
      ok: false,
      status: "ID",
      detail: "nilai ini ID key, bukan key-nya — key asli berawalan sk_ dan hanya tampil sekali saat dibuat/dirotasi",
    };
  }

  const res = await fetch("https://api.elevenlabs.io/v1/user/subscription", {
    headers: { "xi-api-key": key },
  });
  if (!res.ok) return { ok: false, status: res.status, detail: await res.text().catch(() => "") };
  const d = await res.json();
  const used = d.character_count ?? 0;
  const limit = d.character_limit ?? 0;
  return {
    ok: true,
    tier: d.tier ?? "?",
    used,
    limit,
    left: Math.max(0, limit - used),
    reset: d.next_character_count_reset_unix
      ? new Date(d.next_character_count_reset_unix * 1000).toISOString().slice(0, 10)
      : "?",
  };
}

const { lines, slots } = readEnv();
const keys = slots.map((s) => s.value).filter(Boolean);

switch (cmd) {
  case "status": {
    if (!keys.length) {
      console.log("Belum ada key. Tambah: node tools/elevenlabs-keys.mjs add sk_xxx");
      break;
    }
    console.log(`Key di ${envPath}:\n`);
    keys.forEach((k, i) => {
      console.log(`  ${i === 0 ? "→ AKTIF " : "  cadang"}  ${slotName(i).padEnd(24)} ${mask(k)}`);
    });
    console.log(`\n${keys.length} key. Sisa kuota: node tools/elevenlabs-keys.mjs check`);
    break;
  }

  case "check": {
    if (!keys.length) { console.log("Belum ada key."); break; }
    for (const [i, k] of keys.entries()) {
      const q = await quota(k);
      const label = `${i === 0 ? "AKTIF " : "cadang"} ${slotName(i)} ${mask(k)}`;
      if (!q.ok) {
        console.log(`✗ ${label} — DITOLAK (HTTP ${q.status})`);
        continue;
      }
      const pct = q.limit ? Math.round((q.left / q.limit) * 100) : 0;
      console.log(`${q.left > 0 ? "✓" : "✗"} ${label} — ${q.left}/${q.limit} kredit tersisa (${pct}%) · ${q.tier} · reset ${q.reset}`);
    }
    break;
  }

  case "rotate": {
    if (keys.length < 2) {
      console.error("Butuh minimal 2 key untuk rotasi. Tambah dulu: node tools/elevenlabs-keys.mjs add sk_xxx");
      process.exit(1);
    }
    if (flag("--auto")) {
      const q = await quota(keys[0]);
      if (q.ok && q.left > 0) {
        console.log(`Key aktif masih punya ${q.left} kredit — tidak dirotasi.`);
        break;
      }
      console.log(q.ok ? "Key aktif kehabisan kredit." : `Key aktif ditolak (HTTP ${q.status}).`);
    }
    const rotated = [...keys.slice(1), keys[0]];
    writeKeys(lines, slots, rotated);
    console.log(`Rotasi selesai. Aktif sekarang: ${mask(rotated[0])} (sebelumnya ${mask(keys[0])}).`);
    console.log("Muat ulang di terminal: . .\\tools\\load-env.ps1");
    break;
  }

  case "add": {
    const k = argv[1];
    if (!k || !k.startsWith("sk_")) {
      console.error('Pakai: node tools/elevenlabs-keys.mjs add sk_xxx');
      process.exit(1);
    }
    if (keys.includes(k)) { console.log("Key itu sudah ada."); break; }
    const next = [...keys, k];
    writeKeys(lines, slots, next);
    console.log(`Ditambahkan sebagai ${slotName(next.length - 1)} (cadangan). Aktif tetap ${mask(next[0])}.`);
    break;
  }

  case "drop": {
    const n = Number(argv[1]);
    if (!Number.isInteger(n) || n < 1 || n > keys.length) {
      console.error(`Pakai: node tools/elevenlabs-keys.mjs drop <1..${keys.length}>`);
      process.exit(1);
    }
    const dropped = keys[n - 1];
    const next = keys.filter((_, i) => i !== n - 1);
    writeKeys(lines, slots, next);
    console.log(`Dibuang: ${mask(dropped)}. Sisa ${next.length} key.`);
    console.log("Jangan lupa cabut key itu di dashboard ElevenLabs — menghapus dari .env tidak menonaktifkannya.");
    break;
  }

  default:
    console.error(`Perintah tidak dikenal: ${cmd}`);
    console.error("Tersedia: status | check | rotate [--auto] | add <key> | drop <n>");
    process.exit(1);
}
