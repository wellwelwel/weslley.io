import type { ReactNode } from 'react';
import { memo } from 'react';
import { Figure } from '@site/src/components/Figure';
import { Stream } from '@site/src/components/Stream';
import { useDownloads } from '@site/src/hooks/useDownloads';
import { useShown } from '@site/src/hooks/usePeriod';

const STAGE = 'grid h-[calc(var(--row)*3)] place-content-center gap-2';
const BOX = 'mx-auto h-[calc(var(--row)*2-0.5rem)] w-75 max-w-full sm:w-125';

export const Monthly = memo((): ReactNode => {
  const { daily, monthly, source } = useDownloads();
  const shown = useShown('monthly');

  return (
    <div className={STAGE}>
      <div className={BOX}>
        {daily && <Stream chart={daily} reveal={shown} />}
      </div>

      <Figure
        title='Últimos 30 dias'
        label='30 dias'
        value={monthly}
        href={source}
      />

      {daily && (
        <p className='sr-only'>
          Evolução diária dos downloads nos últimos 30 dias.
        </p>
      )}
    </div>
  );
});
