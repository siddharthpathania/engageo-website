'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CTA, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

type HeaderLink = { label: string; href: string };

const HEADER_NAV: readonly HeaderLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Clinics', href: '/clinics' },
  { label: 'Hospitals', href: '/hospitals' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll(): void {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-neutral-200/70 bg-surface/80 shadow-subtle backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent backdrop-blur-0',
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${SITE_CONFIG.name} — home`}
            className="group flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="rounded-lg transition-transform group-hover:scale-105"
              priority
            />
            <span className="font-display text-[17px] font-semibold tracking-tight text-obsidian">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {HEADER_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors',
                      active
                        ? 'text-obsidian'
                        : 'text-subtle hover:text-obsidian',
                    )}
                  >
                    {item.label}
                  </Link>
                  {active ? (
                    <motion.span
                      layoutId="header-nav-indicator"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-500"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* CTA + mobile trigger */}
          <div className="flex items-center gap-2">
            <Link
              href={CTA.book.href}
              className="group hidden items-center gap-1.5 rounded-full bg-obsidian px-4 py-2 text-[13px] font-medium text-surface shadow-subtle transition-all hover:shadow-card md:inline-flex"
            >
              Book a Demo
              <ChevronRight
                size={14}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <MobileMenu nav={HEADER_NAV} />
          </div>
        </div>
      </div>
    </header>
  );
}
