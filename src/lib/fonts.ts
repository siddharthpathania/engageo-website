import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * ─── Engageo font stack ──────────────────────────────────────────
 * Plus Jakarta Sans    → display + body UI (premium, techy, distinctive)
 * Instrument Serif     → editorial italic accents ("losing...", numerals)
 * JetBrains Mono       → section labels, metadata, code chips
 * ────────────────────────────────────────────────────────────────
 *
 * Variables (used in tailwind.config.ts fontFamily):
 *   --font-sans    (body)
 *   --font-display (headings)
 *   --font-serif   (editorial accents)
 *   --font-mono    (labels / metadata)
 *
 * Plus Jakarta Sans fills both sans + display slots — the weight
 * difference alone creates the hierarchy without introducing a
 * second sans-serif family (fewer font files, faster LCP).
 */

export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: true,
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
  adjustFontFallback: true,
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
  adjustFontFallback: true,
  preload: false,
  fallback: ['ui-serif', 'Georgia', 'serif'],
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
