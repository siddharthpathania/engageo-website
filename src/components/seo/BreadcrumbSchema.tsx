import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { absoluteUrl, cn } from '@/lib/utils';
import { JsonLd } from './StructuredData';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
  /** Hide the visual trail (schema-only). Default: false. */
  hideVisual?: boolean;
  className?: string;
};

/**
 * BreadcrumbList — renders both the JSON-LD structured data and a visual
 * breadcrumb trail. Items should be ordered root → current page. The last
 * item is treated as the current page (not a link, aria-current="page").
 */
export function BreadcrumbSchema({
  items,
  hideVisual = false,
  className,
}: BreadcrumbSchemaProps): JSX.Element {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <>
      <JsonLd data={data} />
      {hideVisual ? null : (
        <nav
          aria-label="Breadcrumb"
          className={cn('container pt-6 md:pt-8', className)}
        >
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium tracking-wide text-subtle md:text-[13px]">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-2">
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="text-obsidian"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-subtle transition-colors hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  )}
                  {isLast ? null : (
                    <ChevronRight
                      size={10}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-neutral-300"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
