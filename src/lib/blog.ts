import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { readingTime, slugify } from './utils';

export type BlogCategory =
  | 'Industry Data'
  | 'Comparison'
  | 'Playbook'
  | 'Product'
  | 'Announcements';

export type BlogFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorRole?: string;
  authorInitials?: string;
  category: BlogCategory;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readingMinutes: number;
};

export type BlogPostMeta = Omit<BlogPost, 'content'>;

export type TocHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type CategorySummary = {
  category: BlogCategory;
  count: number;
};

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

const VALID_CATEGORIES: readonly BlogCategory[] = [
  'Industry Data',
  'Comparison',
  'Playbook',
  'Product',
  'Announcements',
];

function isValidCategory(value: unknown): value is BlogCategory {
  return typeof value === 'string' && (VALID_CATEGORIES as readonly string[]).includes(value);
}

/**
 * Read every MDX file in /src/content/blog and return their parsed frontmatter + content.
 * Silently returns an empty list if the directory does not exist (safe for first boot).
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'));

  const posts = files
    .map<BlogPost | null>((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      const frontmatter = data as Partial<BlogFrontmatter> & { cover?: string };

      if (!frontmatter.title || !frontmatter.publishedAt) return null;
      if (frontmatter.draft && process.env.NODE_ENV === 'production') return null;

      const slug = slugify(filename.replace(/\.(mdx|md)$/, ''));
      const category: BlogCategory = isValidCategory(frontmatter.category)
        ? frontmatter.category
        : 'Playbook';

      return {
        slug,
        title: frontmatter.title,
        description: frontmatter.description ?? '',
        publishedAt: frontmatter.publishedAt,
        updatedAt: frontmatter.updatedAt,
        author: frontmatter.author ?? 'Engageo Team',
        authorRole: frontmatter.authorRole,
        authorInitials: frontmatter.authorInitials,
        category,
        tags: frontmatter.tags ?? [],
        coverImage: frontmatter.coverImage ?? frontmatter.cover,
        draft: frontmatter.draft ?? false,
        content,
        readingMinutes: readingTime(content),
      };
    })
    .filter((post): post is BlogPost => post !== null);

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Retrieve a single post by its slug. Returns null when not found.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

/**
 * Lightweight list for index pages — strips the content body.
 */
export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

/**
 * Every unique tag used across all posts.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    (post.tags ?? []).forEach((tag) => tags.add(tag));
  }
  return Array.from(tags).sort();
}

/**
 * Posts filtered by a single tag.
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag));
}

/**
 * Posts filtered by category.
 */
export function getPostsByCategory(category: BlogCategory): BlogPostMeta[] {
  return getAllPostsMeta().filter((post) => post.category === category);
}

/**
 * Every category in use, with post counts — ordered by count desc.
 */
export function getAllCategories(): CategorySummary[] {
  const counts = new Map<BlogCategory, number>();
  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Related posts: same category first, then overlapping tags as a fallback.
 * Excludes the current post. Returns up to `limit` posts.
 */
export function getRelatedPosts(slug: string, limit: number = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const others = getAllPostsMeta().filter((post) => post.slug !== slug);

  const scored = others.map((post) => {
    let score = 0;
    if (post.category === current.category) score += 10;
    const currentTags = new Set(current.tags ?? []);
    for (const tag of post.tags ?? []) {
      if (currentTags.has(tag)) score += 2;
    }
    return { post, score };
  });

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
    })
    .slice(0, limit)
    .map((entry) => entry.post);
}

/**
 * Extract H2 + H3 headings from raw MDX source to build a table of contents.
 * Uses github-slugger so IDs match rehype-slug output on the rendered page.
 * Skips fenced code blocks so `## inside a ```block``` ` is ignored.
 */
export function extractToc(content: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  const lines = content.split('\n');
  let inFence = false;

  for (const line of lines) {
    const fence = line.match(/^```/);
    if (fence) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match || !match[1] || !match[2]) continue;

    const depth = match[1].length === 2 ? 2 : 3;
    const rawText = match[2]
      // strip inline code backticks and emphasis markers for cleaner TOC display
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .trim();

    headings.push({
      id: slugger.slug(rawText),
      text: rawText,
      depth: depth as 2 | 3,
    });
  }

  return headings;
}
