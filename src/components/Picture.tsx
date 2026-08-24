import type { ImgHTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import variants from '@site/src/data/variants.json';

type Entry = {
  widths: number[];
  stamp: string;
  width: number;
  height: number;
};

export type PictureOptions = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  /** Keeps the box but withholds the fetch until after hydration. */
  deferred?: boolean;
};

const FORMATS = ['avif', 'webp'] as const;

const catalog: Record<string, Entry> = variants;

const sourceSet = (src: string, entry: Entry, format: string): string => {
  const stem = src.slice(0, src.lastIndexOf('.'));

  return entry.widths
    .map((width) => `${stem}-${width}.${entry.stamp}.${format} ${width}w`)
    .join(', ');
};

export const srcset = (src: string, format: string): string | undefined => {
  const entry = catalog[src];

  return entry ? sourceSet(src, entry, format) : undefined;
};

export const Picture = memo(
  ({ src, sizes, deferred = false, ...image }: PictureOptions): ReactNode => {
    const settled = useIsBrowser();
    const entry = catalog[src];
    const withheld = deferred && !settled;

    if (!entry)
      return (
        <img decoding='async' src={withheld ? undefined : src} {...image} />
      );

    return (
      <picture className='contents'>
        {FORMATS.map((format) => (
          <source
            key={format}
            hidden
            type={`image/${format}`}
            srcSet={withheld ? undefined : sourceSet(src, entry, format)}
            sizes={sizes}
          />
        ))}
        <img decoding='async' src={withheld ? undefined : src} {...image} />
      </picture>
    );
  }
);
