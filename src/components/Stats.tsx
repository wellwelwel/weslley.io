import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SafeLink } from './SafeLink';

type MediaKitStats = {
  packages: string[];
  downloadsPerMonth: {
    value: number;
    label: string;
  };
  downloadsPerYear: {
    value: number;
    label: string;
  };
  fetched: string;
};

const base = 'https://wellwelwel.github.io/wellwelwel/stats.json';

export const setLabel = (
  value: number,
  locale: 'en' | 'pt-BR' = 'pt-BR',
  fractionDigits: number = 1
): string => {
  const suffixes = {
    'pt-BR': {
      billion: ' bilhões',
      million: ' milhões',
      thousand: ' mil',
      decimal: ',',
    },
    en: {
      billion: ' billion',
      million: ' million',
      thousand: ' thousand',
      decimal: '.',
    },
  };

  const localeSuffixes = suffixes[locale];

  const thresholds = [
    {
      limit: 1_000_000_000,
      suffix: localeSuffixes.billion,
      divisor: 1_000_000_000,
    },
    { limit: 1_000_000, suffix: localeSuffixes.million, divisor: 1_000_000 },
    { limit: 1_000, suffix: localeSuffixes.thousand, divisor: 1_000 },
  ];

  const threshold = thresholds.find((t) => value >= t.limit);

  return threshold
    ? (value / threshold.divisor)
        .toFixed(fractionDigits)
        .replace('.', localeSuffixes.decimal) + threshold.suffix
    : value.toLocaleString(locale);
};

export const useStats = () => {
  const [stats, setStats] = useState<MediaKitStats>();

  useEffect(() => {
    fetch(base)
      .then((res) => res.json())
      .catch(() => {})
      .then((data: unknown) => setStats(data as MediaKitStats));
  }, []);

  return stats;
};

const DownloadsPerYear = () => {
  const stats = useStats();
  if (!stats) return null;

  const { value } = stats.downloadsPerYear;
  const label = setLabel(value);

  return (
    <span>
      {value.toLocaleString('pt-BR')} ({label})
    </span>
  );
};

const DownloadsPerMonth = () => {
  const stats = useStats();
  if (!stats) return null;

  const { value } = stats.downloadsPerMonth;
  const label = setLabel(value);

  return (
    <span>
      {value.toLocaleString('pt-BR')} ({label})
    </span>
  );
};

const LastUpdated = () => {
  const stats = useStats();
  if (!stats) return null;

  return (
    <span>
      <SafeLink to={base}>
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
