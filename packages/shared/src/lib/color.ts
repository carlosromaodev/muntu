/** Contraste (WCAG) para a cor de destaque escolhida pelo ginásio. */
export const okHex = (h: string) => /^#[0-9a-f]{6}$/i.test(h);

export function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!;
}

/** Tinta legível por cima da cor (escura ou papel). */
export function inkFor(hex: string) {
  const L = luminance(hex);
  return (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? '#1d1c1a' : '#fbfaf7';
}

/** Melhor razão de contraste entre a cor e o texto (claro ou escuro). */
export function contrast(hex: string) {
  const L = luminance(hex);
  return Math.max(1.05 / (L + 0.05), (L + 0.05) / 0.0565);
}
