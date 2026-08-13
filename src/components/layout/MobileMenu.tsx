'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

type MobileNavLink = { label: string; href: string };

export function MobileMenu({ nav }: { nav: readonly MobileNavLink[] }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mark mounted so the portal only renders client-side (avoids SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus trap + ESC-close
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    // Focus the first link when the menu opens
    const focusables = panel.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    focusables[0]?.focus();

    function handleKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const items = panel.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  // Restore focus to trigger when closing
  useEffect(() => {
    if (!open) triggerRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-obsidian transition-colors hover:bg-sand md:hidden"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <div className="relative h-4 w-5" aria-hidden="true">
          <span
            className={cn(
              'absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300',
              open && 'translate-y-1.5 rotate-45',
            )}
          />
          <span
            className={cn(
              'absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-300',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'absolute left-0 top-3 h-0.5 w-5 bg-current transition-transform duration-300',
              open && '-translate-y-1.5 -rotate-45',
            )}
          />
        </div>
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  key="mobile-menu"
                  ref={panelRef}
                  id="mobile-menu-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile navigation"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  className="fixed inset-0 z-[60] flex flex-col bg-canvas/[0.98] backdrop-blur-2xl md:hidden"
                >
            <div className="flex h-16 items-center justify-between border-b border-neutral-200/70 px-5">
              <span className="font-display text-[17px] font-semibold tracking-tight text-obsidian">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-obsidian transition-colors hover:bg-sand"
              >
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="flex flex-col gap-1">
                {nav.map((item, index) => {
                  const active =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + index * 0.06,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-medium transition-all active:scale-[0.98]',
                          active
                            ? 'bg-sand text-obsidian'
                            : 'text-obsidian/85 hover:bg-sand hover:text-obsidian',
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronRight
                          size={16}
                          strokeWidth={1.75}
                          className="text-subtle"
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-neutral-200/70 bg-surface/80 px-5 py-6">
              <a
                href="/login"
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-obsidian px-4 py-3.5 text-[15px] font-medium text-surface shadow-subtle"
              >
                Login
                <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
