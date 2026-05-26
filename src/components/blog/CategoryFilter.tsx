'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { BlogCategory, BlogPostMeta, CategorySummary } from '@/lib/blog';
import { cn, formatDate } from '@/lib/utils';

export type CategoryFilterProps = {
  posts: BlogPostMeta[];
  categories: CategorySummary[];
};

type FilterValue = 'All' | BlogCategory;

const CATEGORY_TONE: Record<BlogCategory, string> = {
  'Industry Data': 'text-primary-700 bg-primary-50 border-primary-100',
  Comparison: 'text-accent-700 bg-accent-50 border-accent-100',
  Playbook: 'text-success-700 bg-success-50 border-success-100',
  Product: 'text-primary-700 bg-primary-50 border-primary-100',
  Announcements: 'text-premium-700 bg-premium-50 border-premium-200',
  'Research Paper': 'text-warning-700 bg-warning-50 border-warning-100',
};

/**
 * Interactive client island: pill tabs on top, filtered card grid below.
 * Animation is pure CSS transition (no framer-motion — keeps the island small).
 */
export function CategoryFilter({
  posts,
  categories,
}: CategoryFilterProps): JSX.Element {
  const [active, setActive] = useState<FilterValue>('All');

  const filtered = useMemo(() => {
    if (active === 'All') return posts;
    return posts.filter((post) => post.category === active);
  }, [posts, active]);

  return (
    <>
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter posts by category"
        className="flex flex-wrap gap-2.5"
      >
        <FilterPill
          label="All"
          count={posts.length}
          isActive={active === 'All'}
          onClick={() => setActive('All')}
        />
        {categories.map((item) => (
          <FilterPill
            key={item.category}
            label={item.category}
            count={item.count}
            isActive={active === item.category}
            onClick={() => setActive(item.category)}
          />
        ))}
      </div>

      {/* Posts grid */}
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-neutral-200 bg-surface transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover"
            >
              {post.cardImage ?? post.coverImage ? (
                <div className="relative aspect-[1200/630] overflow-hidden bg-neutral-100">
                  <Image
                    src={(post.cardImage ?? post.coverImage)!}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
                      CATEGORY_TONE[post.category],
                    )}
                  >
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
                    {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="font-display text-[18px] font-semibold leading-tight tracking-tight text-obsidian transition-colors group-hover:text-primary-600 md:text-xl">
                  {post.title}
                </h2>
                <p className="line-clamp-3 text-[13.5px] leading-relaxed text-subtle">
                  {post.description}
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-neutral-100 pt-4 text-[11.5px] font-medium text-subtle">
                  <span className="truncate text-obsidian">{post.author}</span>
                  <span aria-hidden="true" className="text-neutral-300">
                    ·
                  </span>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 bg-surface p-10 text-center">
          <p className="font-display text-[16px] font-semibold text-obsidian">
            No posts in this category yet.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-subtle">
            Try another tab — or subscribe on WhatsApp to get the next one
            when it ships.
          </p>
        </div>
      ) : null}
    </>
  );
}

type FilterPillProps = {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
};

function FilterPill({
  label,
  count,
  isActive,
  onClick,
}: FilterPillProps): JSX.Element {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-all duration-200',
        isActive
          ? 'border-obsidian bg-obsidian text-surface'
          : 'border-neutral-200 bg-surface text-obsidian hover:border-primary-300 hover:text-primary-700',
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          'inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-semibold',
          isActive
            ? 'bg-surface/15 text-surface'
            : 'bg-neutral-100 text-subtle group-hover:bg-primary-100 group-hover:text-primary-700',
        )}
      >
        {count}
      </span>
    </button>
  );
}
