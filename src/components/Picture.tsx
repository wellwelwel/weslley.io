import type { ImgHTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';
import variants from '@site/src/helpers/variants.json';

type Entry = {
  widths: number[];
  stamp: string;
  width: number;
  height: number;
};

export type PictureOptions = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

const FORMATS = ['avif', 'webp'] as const;

const catalog: Record<string, Entry> = variants;

const sourceSet = (src: string, entry: Entry, format: string): string => {
  const stem = src.slice(0, src.lastIndexOf('.'));

  return entry.widths
    .map((width) => `${stem}-${width}.${entry.stamp}.${format} ${width}w`)
    .join(', ');
};

export const Picture = memo(
  ({ src, sizes, ...image }: PictureOptions): ReactNode => {
    const entry = catalog[src];

    if (!entry) return <img src={src} {...image} />;

    return (
      <picture className='contents'>
        {FORMATS.map((format) => (
          <source
            key={format}
            hidden
            type={`image/${format}`}
            srcSet={sourceSet(src, entry, format)}
            sizes={sizes}
          />
        ))}
        <img src={src} {...image} />
      </picture>
    );
  }
);
