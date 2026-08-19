# 99-closing — kartu penutup Short

Komponennya milik `shared/` — `<EndCard rasio="9x16">`
([docs/10](../../../../docs/10-scene-standar.md)). Tidak dibangun ulang di sini,
tidak didaftarkan di `SCENES`, tidak punya rencana VO.

Durasi: `CLOSING_SHORT_SECONDS` dari `.env` (2 dtk).

**Frame pertamanya = frame terakhir `6-berikutnya`:** simpul dengan lengkungan
aktivasi, lalu potong keras ke kartu penutup.

## Catatan

- **Sambungan ke sini memang menganga — `jahitan: menganga`.** Kartu penutup
  memang layar lain; `npm run jahit` tidak memeriksanya.
