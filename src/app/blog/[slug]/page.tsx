import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/blog/MDXComponents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { CTASection } from '@/components/home/CTASection';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ArticleSchema } from '@/components/seo/StructuredData';
import {
  extractToc,
  getAllPostsMeta,
  getPostBySlug,
  getRelatedPosts,
  type BlogCategory,
} from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';
import { absoluteUrl, cn, formatDate } from '@/lib/utils';

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post not found' };
  }

  const url = `/blog/${post.slug}`;
  const ogImage = post.coverImage
    ? absoluteUrl(post.coverImage)
    : absoluteUrl(SITE_CONFIG.ogImage);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

const CATEGORY_TONE: Record<BlogCategory, string> = {
  'Industry Data': 'text-primary-700 bg-primary-50 border-primary-100',
  Comparison: 'text-accent-700 bg-accent-50 border-accent-100',
  Playbook: 'text-success-700 bg-success-50 border-success-100',
  Product: 'text-primary-700 bg-primary-50 border-primary-100',
  Announcements: 'text-premium-700 bg-premium-50 border-premium-200',
  'Research Paper': 'text-warning-700 bg-warning-50 border-warning-100',
};

export default function BlogPostPage({
  params,
}: BlogPostPageProps): JSX.Element {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const headings = extractToc(post.content);
  const related = getRelatedPosts(post.slug, 3);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={post.author}
        authorUrl={post.authorLinkedin}
        cover={post.coverImage}
      />

      {/* ─── Article header ──────────────────────────────────────── */}
      <header className="container pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-subtle transition-colors hover:text-primary-700"
          >
            <ChevronLeft size={12} strokeWidth={2} aria-hidden="true" />
            Back to all posts
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
                CATEGORY_TONE[post.category],
              )}
            >
              {post.category}
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
              {post.readingMinutes} min read
            </span>
          </div>

          <h1 className="mt-5 font-display text-[34px] font-semibold leading-[1.1] tracking-tighter text-obsidian md:text-[52px] lg:text-[60px]">
            {post.title}
          </h1>

          <p className="mt-5 text-[17px] leading-relaxed text-subtle md:text-[19px]">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-mono text-[12px] font-semibold text-primary-700"
              >
                {post.authorInitials ?? post.author.slice(0, 2).toUpperCase()}
              </span>
              <div className="leading-tight">
                <p className="flex items-center gap-2 text-[13.5px] font-semibold text-obsidian">
                  {post.author}
                  {post.authorLinkedin ? (
                    <a
                      href={post.authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${post.author} on LinkedIn (opens in new tab)`}
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-subtle transition-colors hover:text-primary-700"
                    >
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  ) : null}
                </p>
                {post.authorRole ? (
                  <p className="text-[11.5px] text-subtle">{post.authorRole}</p>
                ) : null}
              </div>
            </div>
            <span aria-hidden="true" className="text-neutral-300">
              ·
            </span>
            <time
              dateTime={post.publishedAt}
              className="text-[13px] text-subtle"
            >
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>

        {post.coverImage ? (
          <div className="mx-auto mt-10 max-w-5xl md:mt-14">
            {post.coverWidth && post.coverHeight ? (
              /* Natural-aspect render — no crop. Used when the post supplies
                 explicit pixel dimensions (e.g. a portrait scanned letter). */
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={post.coverWidth}
                  height={post.coverHeight}
                  priority
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <div className="relative aspect-[1200/630] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            )}
          </div>
        ) : null}
      </header>

      {/* ─── Article body + TOC sidebar ──────────────────────────── */}
      <div className="container mt-10 md:mt-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
          {/* Article */}
          <article className="mx-auto w-full max-w-[720px] lg:mx-0">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: 'wrap',
                        properties: {
                          className: [
                            'no-underline',
                            'hover:underline',
                            'decoration-primary-300',
                            'decoration-2',
                            'underline-offset-[6px]',
                          ],
                        },
                      },
                    ],
                  ],
                },
              }}
            />

            {/* Post footer: share + tags */}
            <div className="mt-14 border-t border-neutral-200 pt-8">
              <ShareButtons url={postUrl} title={post.title} />
              {post.tags && post.tags.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>

          {/* Sticky TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>

      {/* ─── Related posts ───────────────────────────────────────── */}
      {related.length > 0 ? (
        <section
          aria-label="Related posts"
          className="container mt-20 mb-20 md:mt-28 md:mb-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-4 border-b border-neutral-200 pb-5">
              <h2 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-obsidian md:text-[26px]">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle transition-colors hover:text-primary-700"
              >
                All posts →
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 md:grid-cols-3 lg:gap-6">
              {related.map((relatedPost) => (
                <li key={relatedPost.slug}>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex h-full flex-col gap-3.5 rounded-3xl border border-neutral-200 bg-surface p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover"
                  >
                    <span
                      className={cn(
                        'inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
                        CATEGORY_TONE[relatedPost.category],
                      )}
                    >
                      {relatedPost.category}
                    </span>
                    <h3 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-obsidian transition-colors group-hover:text-primary-600">
                      {relatedPost.title}
                    </h3>
                    <p className="line-clamp-2 text-[13px] leading-relaxed text-subtle">
                      {relatedPost.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-subtle">
                      <time dateTime={relatedPost.publishedAt}>
                        {formatDate(relatedPost.publishedAt)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{relatedPost.readingMinutes} min</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}
