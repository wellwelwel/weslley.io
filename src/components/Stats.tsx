import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';
import { abbreviate } from '@site/src/helpers/abbreviate';
import { statsUrl, useStats } from '@site/src/hooks/useStats';

const DownloadsPerYear = (): ReactNode => {
  const stats = useStats();
  if (!stats) return null;

  const { value } = stats.author.downloadsPerYear;

  return (
    <span>
      {value.toLocaleString('pt-BR')} ({abbreviate(value)})
    </span>
  );
};

const DownloadsPerMonth = (): ReactNode => {
  const stats = useStats();
  if (!stats) return null;

  const { value } = stats.author.downloadsPerMonth;

  return (
    <span>
      {value.toLocaleString('pt-BR')} ({abbreviate(value)})
    </span>
  );
};

const LastUpdated = (): ReactNode => {
  const stats = useStats();
  if (!stats) return null;

  return (
    <span>
      <SafeLink to={statsUrl}>
        {new Date(stats.fetched).toLocaleDateString('pt-BR')}
        <ExternalLink
          style={{ marginLeft: 5, width: 12, transform: 'translateY(5px)' }}
        />
      </SafeLink>
    </span>
  );
};

export const Stats = {
  downloadsPerYear: DownloadsPerYear,
  downloadsPerMonth: DownloadsPerMonth,
  lastUpdated: LastUpdated,
};
