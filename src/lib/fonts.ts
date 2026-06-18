import localFont from 'next/font/local';

/**
 * ─── Engageo font stack (self-hosted) ────────────────────────────
 * Plus Jakarta Sans    → display + body UI (premium, techy, distinctive)
 * Instrument Serif     → editorial italic accents ("losing...", numerals)
 * JetBrains Mono       → section labels, metadata, code chips
 * ────────────────────────────────────────────────────────────────
 *
 * Files live in public/fonts/ as woff2. Self-hosting via next/font/local
 * means zero runtime fetches to Google Fonts — works offline in dev,
 * survives Google Fonts outages, identical rendering everywhere.
 *
 * Variables (used in tailwind.config.ts fontFamily):
 *   --font-sans    (body)
 *   --font-display (headings, same family as sans, weight does the work)
 *   --font-serif   (editorial accents)
 *   --font-mono    (labels / metadata)
 */

export const fontSans = localFont({
  src: [
    {
      path: '../../public/fonts/plus-jakarta-sans-variable.woff2',
      weight: '200 800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/plus-jakarta-sans-italic-variable.woff2',
      weight: '200 800',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: 'Arial',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

export const fontDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/plus-jakarta-sans-variable.woff2',
      weight: '200 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-display',
  adjustFontFallback: 'Arial',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const fontSerif = localFont({
  src: [
    {
      path: '../../public/fonts/instrument-serif.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/instrument-serif-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-serif',
  adjustFontFallback: 'Times New Roman',
  preload: false,
  fallback: ['ui-serif', 'Georgia', 'serif'],
});

export const fontMono = localFont({
  src: [
    {
      path: '../../public/fonts/jetbrains-mono-variable.woff2',
      weight: '400 600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-mono',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
});

/**
 * Composite variable string — apply to <html> or <body>.
 *
 * @example
 * <html className={fontVariables}>
 */
export const fontVariables: string = [
  fontSans.variable,
  fontDisplay.variable,
  fontSerif.variable,
  fontMono.variable,
].join(' ');

/**
 * Named className map — useful if you want to apply a single font
 * to a specific element rather than rely on the CSS variable.
 */
export const fontClassNames = {
  sans: fontSans.className,
  display: fontDisplay.className,
  serif: fontSerif.className,
  mono: fontMono.className,
} as const;
