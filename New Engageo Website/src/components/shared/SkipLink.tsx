/**
 * Keyboard-accessible skip link. Hidden until focused via Tab.
 * Jumps the user past the header straight to main content.
 *
 * - Brand-coloured: matches the primary-500 focus ring.
 * - `z-[100]` ensures it renders above the sticky header.
 * - Pairs with `<main id="main-content">` in layout.tsx.
 */
export function SkipLink(): JSX.Element {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-lg focus:bg-primary-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-surface focus:shadow-glow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
}
