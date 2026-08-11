import type { FC, ImgHTMLAttributes } from 'react';
import variants from '@site/src/helpers/variants.json';

type Entry = {
  widths: number[];
  width: number;
  height: number;
};

export type PictureOptions = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

const FORMATS = ['avif', 'webp'] as const;

const catalog: Record<string, Entry> = variants;

const sourceSet = (src: string, widths: number[], format: string): string => {
  const stem = src.slice(0, src.lastIndexOf('.'));

  return widths
    .map((width) => `${stem}-${width}.${format} ${width}w`)
    .join(', ');
};

export const Picture: FC<PictureOptions> = ({ src, sizes, ...image }) => {
  const entry = catalog[src];

  if (!entry) return <img src={src} {...image} />;

  return (
    <picture className='contents'>
      {FORMATS.map((format) => (
        <source
          key={format}
          type={`image/${format}`}
          srcSet={sourceSet(src, entry.widths, format)}
          sizes={sizes}
        />
      ))}
      <img src={src} {...image} />
    </picture>
  );
};
