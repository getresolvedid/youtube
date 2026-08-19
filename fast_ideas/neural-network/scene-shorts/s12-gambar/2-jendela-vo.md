# 2-jendela · rencana VO

## VO

Bukan tiap titik dibaca sendiri-sendiri.
Satu jendela kecil menyapu gambarnya, sepetak demi sepetak.

## Sinkron

| Beat | Yang jatuh bersamaan |
|---|---|
| 0 | Satu titik disorot sendirian, lalu sorotannya dibatalkan. |
| 1 | Kotak jendela 3x3 menyapu kisi dari kiri atas ke kanan bawah. |

## Catatan

- **Sapuannya harus terlihat SEPETAK DEMI SEPETAK**, bukan meluncur mulus: yang dijelaskan justru bahwa ia membaca daerah kecil satu per satu.
- Langkah jendelanya `Math.floor` dari detik — fungsi murni, tanpa state.
