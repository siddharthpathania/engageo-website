import type { Config } from 'tailwindcss';

/**
 * Engageo design system.
 *
 * Brand DNA: warm handcrafted neutrals (canvas / obsidian) + deep iris-indigo
 * primary + rust micro-accents. Built for B2B SaaS serving Indian medical clinics —
 * feels editorial, confident, clinical-precise. Deliberately NOT template-y.
 */
const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem', // 20px — mobile
        sm: '1.5rem',       // 24px
        md: '2rem',         // 32px
        lg: '3rem',         // 48px
        xl: '4rem',         // 64px
        '2xl': '5rem',      // 80px
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px', // cap at 1280 — no wider containers
      },
    },
    extend: {
      colors: {
        // ─── Surfaces (warm, handcrafted — not cold digital) ────────
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        sand: 'rgb(var(--color-sand) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        obsidian: 'rgb(var(--color-obsidian) / <alpha-value>)',
        charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',

        // ─── Semantic aliases (mapped via CSS vars for dark mode) ───
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        foreground: 'rgb(var(--color-fg) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--color-card-fg) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        input: 'rgb(var(--color-input) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted-fg) / <alpha-value>)',

        // ─── Primary: electric brand blue (matches engageoagency.digital)
        primary: {
          50:  '#EEF1FF',
          100: '#DDE3FF',
          200: '#BCC8FF',
          300: '#94A5FF',
          400: '#6B80FF',
          500: '#3D5AFE', // core brand — pure electric blue
          600: '#2D48E8',
          700: '#2339C4',
          800: '#1C2E9A',
          900: '#172577',
          950: '#0D1546',
          DEFAULT: '#3D5AFE',
          foreground: '#FEFCFA',
        },

        // ─── Secondary: warm ink (depth / contrast surfaces) ────────
        secondary: {
          50:  '#F7F5F2',
          100: '#EDE8E0',
          200: '#D9D2C6',
          300: '#BFB5A4',
          400: '#A09890',
          500: '#6B6560',
          600: '#4A4440',
          700: '#2E2A26',
          800: '#1E1A16',
          900: '#0F0D0B',
          950: '#070604',
          DEFAULT: '#1E1A16',
          foreground: '#FEFCFA',
        },

        // ─── Accent: terracotta rust (editorial micro-highlights) ───
        accent: {
          50:  '#FDF4F1',
          100: '#FBE5DE',
          200: '#F6C7B7',
          300: '#F09E83',
          400: '#EC7550',
          500: '#E8552A', // core accent
          600: '#D03E15',
          700: '#A72F10',
          800: '#7E2512',
          900: '#5F1F12',
          950: '#330B05',
          DEFAULT: '#E8552A',
          foreground: '#FEFCFA',
        },

        // ─── Neutrals (warm grey scale aligned with canvas/obsidian)
        neutral: {
          50:  '#F9F7F4',
          100: '#F3EFEA',
          200: '#E4DDD5',
          300: '#CABFB0',
          400: '#A09890',
          500: '#7A736D',
          600: '#5A534E',
          700: '#3E3834',
          800: '#26211E',
          900: '#15120F',
          950: '#0A0807',
        },

        // ─── Semantic status colors ─────────────────────────────────
        success: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          DEFAULT: '#10B981',
          foreground: '#FEFCFA',
        },
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          DEFAULT: '#F59E0B',
          foreground: '#1E1A16',
        },
        error: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          DEFAULT: '#EF4444',
          foreground: '#FEFCFA',
        },
        info: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          DEFAULT: '#3B82F6',
          foreground: '#FEFCFA',
        },

        // ─── WhatsApp brand (primary contact channel in India) ──────
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
          foreground: '#FFFFFF',
        },

        // ─── Premium gold (for Dominate tier + premium moments) ─────
        premium: {
          50:  '#FBF8F0',
          100: '#F5EDD6',
          200: '#EBD9A7',
          300: '#DFC178',
          400: '#D4AB52',
          500: '#C9A961', // core gold
          600: '#A88842',
          700: '#826831',
          800: '#5D4A22',
          900: '#3D3016',
          DEFAULT: '#C9A961',
          foreground: '#0F0D0B',
        },

        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FEFCFA',
        },
      },

      fontFamily: {
        // Variables injected by next/font in lib/fonts.ts
        sans:    ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      // ─── Type scale — tight tracking, generous line-heights ──────
      fontSize: {
        '2xs': ['0.6875rem',  { lineHeight: '1rem',     letterSpacing: '0.02em' }],   // 11
        xs:    ['0.75rem',    { lineHeight: '1.125rem', letterSpacing: '0.01em' }],   // 12
        sm:    ['0.875rem',   { lineHeight: '1.375rem', letterSpacing: '0'       }],  // 14
        base:  ['1rem',       { lineHeight: '1.625rem', letterSpacing: '0'       }],  // 16
        lg:    ['1.125rem',   { lineHeight: '1.75rem',  letterSpacing: '-0.005em' }], // 18
        xl:    ['1.25rem',    { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],  // 20
        '2xl': ['1.5rem',     { lineHeight: '2.125rem', letterSpacing: '-0.015em' }], // 24
        '3xl': ['1.875rem',   { lineHeight: '2.375rem', letterSpacing: '-0.02em' }],  // 30
        '4xl': ['2.25rem',    { lineHeight: '2.625rem', letterSpacing: '-0.025em' }], // 36
        '5xl': ['3rem',       { lineHeight: '3.25rem',  letterSpacing: '-0.03em' }],  // 48
        '6xl': ['3.75rem',    { lineHeight: '4rem',     letterSpacing: '-0.035em' }], // 60

        // Display scale — for heroes / editorial moments
        'display-xs': ['2.5rem',  { lineHeight: '2.75rem', letterSpacing: '-0.03em', fontWeight: '600' }],  // 40
        'display-sm': ['3rem',    { lineHeight: '3.25rem', letterSpacing: '-0.035em', fontWeight: '600' }], // 48
        'display-md': ['3.75rem', { lineHeight: '4rem',    letterSpacing: '-0.04em',  fontWeight: '600' }], // 60
        'display-lg': ['4.5rem',  { lineHeight: '4.75rem', letterSpacing: '-0.04em',  fontWeight: '700' }], // 72
        'display-xl': ['5.625rem',{ lineHeight: '5.75rem', letterSpacing: '-0.045em', fontWeight: '700' }], // 90
        'display-2xl':['7rem',    { lineHeight: '7rem',    letterSpacing: '-0.05em',  fontWeight: '700' }], // 112
      },

      letterSpacing: {
        tightest: '-0.05em',
        tighter:  '-0.04em',
        tight:    '-0.02em',
        snug:     '-0.01em',
        normal:   '0',
        wide:     '0.02em',
        wider:    '0.04em',
        widest:   '0.12em',
      },

      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
        extrabold:'800',
      },

      // ─── Spacing scale with section-padding tokens ───────────────
      spacing: {
        '0.5': '0.125rem',  // 2
        '1.5': '0.375rem',  // 6
        '2.5': '0.625rem',  // 10
        '3.5': '0.875rem',  // 14
        '4.5': '1.125rem',  // 18
        '13':  '3.25rem',   // 52
        '15':  '3.75rem',   // 60
        '17':  '4.25rem',   // 68
        '18':  '4.5rem',    // 72
        '22':  '5.5rem',    // 88
        '26':  '6.5rem',    // 104
        '30':  '7.5rem',    // 120
        '34':  '8.5rem',    // 136
        '38':  '9.5rem',    // 152
        // Section padding tokens (per breakpoint) — use as py-section / md:py-section-md etc.
        'section-sm': '5rem',     // 80px  mobile
        'section':    '6.25rem',  // 100px tablet
        'section-md': '7.5rem',   // 120px desktop
        'section-lg': '9rem',     // 144px large desktop
      },

      // ─── Border radius (incl. pill) ──────────────────────────────
      borderRadius: {
        none:  '0',
        xs:    '0.25rem',   // 4
        sm:    '0.375rem',  // 6
        DEFAULT: '0.5rem',  // 8
        md:    '0.625rem',  // 10
        lg:    '0.75rem',   // 12
        xl:    '1rem',      // 16
        '2xl': '1.25rem',   // 20
        '3xl': '1.75rem',   // 28
        '4xl': '2.5rem',    // 40 — feature card feel
        pill:  '9999px',
        full:  '9999px',
      },

      // ─── Box shadows ─────────────────────────────────────────────
      boxShadow: {
        'subtle':     '0 1px 2px rgba(15,13,11,0.03), 0 2px 8px -2px rgba(15,13,11,0.04)',
        'warm':       '0 2px 12px rgba(15,13,11,0.06)',
        DEFAULT:      '0 1px 3px rgba(15,13,11,0.04), 0 8px 24px -6px rgba(15,13,11,0.08)',
        'card':       '0 1px 3px rgba(15,13,11,0.04), 0 8px 24px -6px rgba(15,13,11,0.08)',
        'card-hover': '0 8px 32px -4px rgba(15,13,11,0.14), 0 0 0 1px rgba(61,71,232,0.12)',
        'medium':     '0 4px 8px rgba(15,13,11,0.04), 0 16px 36px -8px rgba(15,13,11,0.10)',
        'large':      '0 12px 24px -8px rgba(15,13,11,0.12), 0 24px 56px -12px rgba(15,13,11,0.16)',
        'xl':         '0 24px 60px -12px rgba(15,13,11,0.22), 0 8px 24px -6px rgba(15,13,11,0.10)',
        'inner-warm': 'inset 0 1px 0 rgba(255,255,255,0.9)',

        // Colored glows
        'glow':         '0 0 0 1px rgba(61,90,254,0.14), 0 8px 32px -4px rgba(61,90,254,0.35)',
        'glow-sm':      '0 4px 20px rgba(61,90,254,0.25)',
        'glow-lg':      '0 0 24px rgba(61,90,254,0.30), 0 0 60px rgba(61,90,254,0.12)',
        'glow-accent':  '0 8px 32px -4px rgba(232,85,42,0.35)',
        'glow-success': '0 8px 32px -4px rgba(16,185,129,0.28)',
        'glow-premium': '0 8px 32px -4px rgba(201,169,97,0.32)',

        // Product surface (hero dashboards)
        'dark': '0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -12px rgba(0,0,0,0.6), 0 8px 24px -6px rgba(0,0,0,0.4)',
      },

      // ─── Animations & keyframes ──────────────────────────────────
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(61,71,232,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(61,71,232,0)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':      { transform: 'scale(1.5)', opacity: '0.5' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        'fade-up':      'fadeUp 0.7s cubic-bezier(0.25,1,0.5,1) both',
        'fade-in':      'fadeIn 0.5s ease-out both',
        'fade-in-down': 'fadeInDown 0.5s cubic-bezier(0.25,1,0.5,1) both',
        'slide-left':   'slideLeft 0.6s cubic-bezier(0.25,1,0.5,1) both',
        'slide-right':  'slideRight 0.6s cubic-bezier(0.25,1,0.5,1) both',
        'scale-in':     'scaleIn 0.5s cubic-bezier(0.25,1,0.5,1) both',
        'float':        'float 6s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
        'pulse-dot':    'pulse-dot 2s ease-in-out infinite',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'shimmer':      'shimmer 1.8s cubic-bezier(0.4,0,0.2,1) infinite',
        'marquee':      'marquee 24s linear infinite',
        'caret-blink':  'caret-blink 1s steps(2) infinite',
      },

      transitionTimingFunction: {
        'out-expo':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-smooth':  'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
      },

      maxWidth: {
        '8xl': '88rem',
        'site': '1280px',
      },

      backgroundImage: {
        'gradient-radial':     'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':      'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand':      'linear-gradient(135deg, #3D5AFE 0%, #6B80FF 100%)',
        'gradient-brand-deep': 'linear-gradient(135deg, #3D5AFE 0%, #7A3DE8 100%)',
        'gradient-premium':    'linear-gradient(135deg, #D4AB52 0%, #C9A961 50%, #A88842 100%)',
        'gradient-warm':       'radial-gradient(ellipse 80% 45% at 50% -10%, rgba(245,238,225,0.9) 0%, transparent 70%), radial-gradient(ellipse 50% 30% at 15% 10%, rgba(61,90,254,0.025) 0%, transparent 60%)',
      },

      backdropBlur: {
        xs: '2px',
      },

      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

export default config;
