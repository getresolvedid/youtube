/* Pemuatan font — dipanggil sekali oleh shared/Stage.tsx.

   Kenapa lewat @remotion/google-fonts dan bukan @import di CSS: loader ini
   mendaftarkan delayRender(), jadi Remotion menahan frame pertama sampai
   fontnya benar-benar terpasang. Dengan @import, render bisa menangkap frame
   sebelum font siap — layoutnya meleset dan hasilnya baru ketahuan setelah
   render enam menit selesai.

   Berat yang dimuat dibatasi pada yang benar-benar dipakai theme.css:
   400/500/600/800 untuk Manrope, 400/700 untuk JetBrains Mono. Memuat semua
   berat membengkakkan bundle tanpa mengubah apa pun di layar.
*/
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

loadManrope("normal", {
  weights: ["400", "500", "600", "800"],
  subsets: ["latin", "latin-ext"],
});

loadJetBrainsMono("normal", {
  weights: ["400", "700"],
  subsets: ["latin", "latin-ext"],
});
