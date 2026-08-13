import type { ReactNode } from 'react';

type TintOptions = {
  tones: string[];
  active: string | undefined;
};

export const Tint = ({ tones, active }: TintOptions): ReactNode =>
  tones.map((tone) => (
    <div
      key={tone}
      aria-hidden='true'
      style={{ backgroundColor: tone, opacity: tone === active ? 1 : 0 }}
      className='pointer-events-none fixed inset-0 transition-opacity duration-700 ease-swift'
    />
  ));
