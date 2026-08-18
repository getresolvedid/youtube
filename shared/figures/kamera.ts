/* Transform kamera untuk panggung SVG.
 *
 * Ketiga panggung menulis fungsi yang bentuknya sama persis dan cuma berbeda
 * titik tumpu bawaannya. Bedanya memang harus per topik — yang tetap di tempat
 * saat kamera mendekat adalah benda utama episode itu — jadi yang dibagi di
 * sini pabriknya, bukan fungsinya.
 */

export type Kamera = (o: {
  /** Titik yang TETAP di tempatnya saat diperbesar. Bawaannya titik tumpu topik. */
  x?: number;
  y?: number;
  /** Pengali. > 1 mendekat, < 1 menjauh. */
  skala?: number;
  /** Geser sesudah pembesaran, px frame. */
  dx?: number;
  dy?: number;
}) => string;

/** Bikin fungsi kamera satu topik, dengan titik tumpu bawaannya sendiri.
 *
 * ```ts
 * export const kamera = buatKamera({ x: X_LOKET, y: Y_LANTAI });
 * // di scene:
 * <g transform={kamera({ skala: t(d, { dari: 1, ke: 1.4, ... }) })}>
 * ```
 *
 * Urutannya mengikat: geser → pindah ke tumpu → besarkan → pindah balik.
 * Membalik dua yang terakhir membuat `dx/dy` ikut terkali skala, dan
 * pergeseran yang ditulis dalam px frame diam-diam berubah artinya tiap kali
 * skalanya berubah.
 *
 * Alasan ia satu fungsi untuk semua scene: kamera yang ditulis ulang tiap scene
 * cepat atau lambat memakai titik tumpu yang berbeda, dan panggungnya melompat
 * tepat di potongan keras — persis tempat penonton paling mudah melihatnya.
 */
export const buatKamera = (tumpu: { x: number; y: number }): Kamera => (o) => {
  const x = o.x ?? tumpu.x;
  const y = o.y ?? tumpu.y;
  const s = o.skala ?? 1;
  return `translate(${o.dx ?? 0} ${o.dy ?? 0}) translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;
};
