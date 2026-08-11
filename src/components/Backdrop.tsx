import type { ReactNode } from 'react';
import { Picture } from '@site/src/components/Picture';

export type BackdropOptions = {
  sources: string[];
  /** Undefined leaves every layer hidden. */
  active: string | undefined;
  /** Positioning and treatment, since the layers stack over their own container. */
  className: string;
  opacity?: number;
};

export const Backdrop = ({
  sources,
  active,
  className,
  opacity = 1,
}: BackdropOptions): ReactNode =>
  sources.map((src) => (
    <Picture
      key={src}
      src={src}
      alt=''
      aria-hidden='true'
      sizes='100vw'
      decoding='async'
      fetchPriority={src === active ? 'high' : 'low'}
      draggable={false}
      style={{ opacity: src === active ? opacity : 0 }}
      className={`pointer-events-none inset-0 size-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${className}`}
    />
  ));
