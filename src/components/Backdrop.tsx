import type { ReactNode } from 'react';
import { memo } from 'react';
import { Picture } from '@site/src/components/Picture';

export type BackdropOptions = {
  sources: string[];
  /** Undefined leaves every layer hidden. */
  active: string | undefined;
  /** The layers fill their own container only. */
  className: string;
  opacity?: number;
  /** Fetch priority of the active layer. */
  priority?: 'high' | 'low' | 'auto';
  /** Forwarded as `sizes`. */
  sizes?: string;
};

const HIDDEN = { opacity: 0 };

export const Backdrop = memo(
  ({
    sources,
    active,
    className,
    opacity = 1,
    priority = 'high',
    sizes = '100vw',
  }: BackdropOptions): ReactNode => {
    const shown = { opacity };

    return sources.map((src) => (
      <Picture
        key={src}
        src={src}
        alt=''
        aria-hidden='true'
        sizes={sizes}
        decoding='async'
        fetchPriority={src === active ? priority : 'low'}
        deferred={src !== active}
        draggable={false}
        style={src === active ? shown : HIDDEN}
        className={`pointer-events-none inset-0 size-full object-cover transition-opacity duration-700 ease-swift ${className}`}
      />
    ));
  }
);
