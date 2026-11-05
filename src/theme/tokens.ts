// Mahanaim oxblood + gold, taken from the logo's cross and flame but muted so the
// red reads as a warm, quiet ground rather than a shout. Oxblood carries the chrome
// (header, footer, banners) and gold is the mark of light on it. Gold is too pale to
// read as text on light surfaces, so `accent` is a deep amber ink for those and
// `gold` is the bright tone reserved for oxblood surfaces and filled buttons.
export const ink = '#4B1E26';
export const wineDeep = '#2A1115';
export const wineMid = '#7A3440';
export const inkSurfaceDark = '#33161B';
export const cream = '#FFFFFF';
export const blush = '#F8F3EF';
export const paperLight = '#FFFFFF';
export const creamText = '#FBF4EF';
export const textInk = '#2A1418';
export const gold = '#F2B705';
export const goldHover = '#FFC929';
export const accent = '#9A6400';
export const accentDark = '#7A4F00';
export const accentLight = '#F2B705';
export const lineLight = '#EBE1DC';
export const lineDark = 'rgba(251, 244, 239, 0.14)';
export const textSecondaryLight = '#6B5A5D';
export const textSecondaryDark = '#DCCBC6';
export const onWineMuted = 'rgba(251, 244, 239, 0.72)';

export const wineShadow = '0 18px 40px -18px rgba(75, 30, 38, 0.3)';

// Fine film grain, tiled. Black specks at low alpha, so it darkens whatever it sits on.
export const grainUrl =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Hairline diagonal ruling, echoing the reference's loading screen.
const hairlines = 'repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.028) 0 1px, transparent 1px 16px)';

// Oxblood field with grain, hairlines, a soft lift of light top-right and a warm
// ember bottom-left. Used for the footer, page banners and the prayer panel.
export const wineGlowBg = [
  grainUrl,
  hairlines,
  'radial-gradient(60% 80% at 92% 0%, rgba(160, 82, 92, 0.28) 0%, transparent 60%)',
  'radial-gradient(45% 70% at 0% 100%, rgba(242, 160, 80, 0.1) 0%, transparent 70%)',
  `linear-gradient(160deg, ${ink} 0%, ${wineDeep} 100%)`,
].join(', ');

export const displayFontStack = 'var(--font-display), "Segoe UI", sans-serif';
export const bodyFontStack = 'var(--font-body), "Segoe UI", sans-serif';
export const malayalamFontStack = 'var(--font-malayalam), "Noto Sans Malayalam", sans-serif';
