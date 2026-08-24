import type { ReactNode } from 'react';
import { useState } from 'react';
import clsx from 'clsx';

type CoverOptions = {
  src: string;
  alt: string;
};

export const Cover = ({ src, alt }: CoverOptions): ReactNode => {
  const [shown, setShown] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      decoding='async'
      draggable={false}
      onLoad={() => setShown(true)}
      className={clsx(
        'size-full object-cover transition-opacity duration-500 ease-swift',
        shown ? 'opacity-100' : 'opacity-0'
      )}
    />
  );
};
