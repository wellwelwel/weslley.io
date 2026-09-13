import type { ReactNode } from 'react';
import { memo } from 'react';
import { Figure } from '@site/src/components/Figure';
import { Stream } from '@site/src/components/Stream';
import { useDownloads } from '@site/src/hooks/useDownloads';
import { useShown } from '@site/src/hooks/usePeriod';

const STAGE = 'grid h-[calc(var(--row)*3)] place-content-center gap-2';
const BOX = 'mx-auto h-[calc(var(--row)*2-0.5rem)] w-75 max-w-full sm:w-125';

const labelOf = (year: number): ReactNode => (
  <>
    <span className='max-sm:hidden'>desde {year}</span>
    <span className='sm:hidden'>{year}+</span>
  </>
);

export const Lifetime = memo((): ReactNode => {
  const { lifetime, timeline, since, source, year } = useDownloads();
  const shown = useShown('lifetime');
  const from = since ?? year;

  return (
    <div className={STAGE}>
      <div className={BOX}>
        {timeline && <Stream chart={timeline} reveal={shown} />}
      </div>

      <Figure
        title={`Linha do tempo, desde ${from}`}
        label={since ? labelOf(from) : 'linha do tempo'}
        value={lifetime}
        href={source}
      />

      {timeline && (
        <p className='sr-only'>Evolução mensal dos downloads desde {from}.</p>
      )}
    </div>
  );
});
