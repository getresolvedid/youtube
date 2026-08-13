/* Setelan CLI Remotion. Berlaku untuk `remotion studio` dan `remotion render`,
   TIDAK untuk komposisi — ukuran/fps ada di src/Root.tsx, dibaca dari .env
   lewat shared/config.gen.ts (docs/08-konfigurasi.md).

   Berkas ini sengaja tidak membaca .env: apa pun yang ditulis di sini masuk ke
   proses CLI, bukan ke bundle, tapi menaruh nilai produksi di dua tempat bikin
   keduanya bisa berbeda diam-diam. */
import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/index.ts");

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");

/* Overwrite supaya render ulang tidak berhenti minta konfirmasi. */
Config.setOverwriteOutput(true);

/* Chrome headless baru — dipakai eksplisit supaya hasil render sama di mesin
   lain dan tidak bergantung Chrome yang kebetulan terpasang. */
Config.setChromiumOpenGlRenderer("angle");
