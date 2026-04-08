import Image from 'next/image';

export type BlogImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

/**
 * Captioned image for blog posts — respects the 720px content column and
 * renders an italic editorial caption underneath.
 */
export function BlogImage({
  src,
  alt,
  caption,
  width = 1440,
  height = 900,
}: BlogImageProps): JSX.Element {
  return (
    <figure className="my-10 md:my-12">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(min-width: 768px) 720px, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-serif text-[13px] italic leading-relaxed text-subtle">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
