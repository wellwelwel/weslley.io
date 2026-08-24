import type { Count } from '@site/src/components/Talks/views';
import type { ReactNode } from 'react';
import { Eye } from 'lucide-react';

type ViewsOptions = {
  count: Count;
};

const NUMBER = new Intl.NumberFormat('pt-BR');

export const Views = ({ count }: ViewsOptions): ReactNode => {
  if (count === 'unavailable') return null;

  return (
    <span className='inline-flex items-center gap-1 tabular-nums'>
      <Eye className='size-3 shrink-0' aria-hidden='true' />
      {count === 'pending' ? (
        <span
          aria-label='Carregando visualizações'
          className='inline-block h-2.5 w-32 animate-pulse rounded-sm bg-line'
        />
      ) : (
        `${NUMBER.format(count)} ${count === 1 ? 'visualização' : 'visualizações'}`
      )}
    </span>
  );
};
