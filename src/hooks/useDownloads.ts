import { abbreviate } from '@site/src/helpers/abbreviate';
import { useStats } from '@site/src/hooks/useStats';

const FALLBACK = '600 milhões';

export const useDownloads = (): string => {
  const stats = useStats();

  return stats
    ? abbreviate(stats.downloadsPerYear.value, 'pt-BR', 0)
    : FALLBACK;
};
