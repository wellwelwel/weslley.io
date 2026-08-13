import { useEffect, useState } from 'react';

type Metric = {
  value: number;
  label: string;
};

export type Stats = {
  packages: string[];
  downloadsPerMonth: Metric;
  downloadsPerYear: Metric;
  fetched: string;
};

export const statsUrl = 'https://wellwelwel.github.io/wellwelwel/stats.json';

const isMetric = (value: unknown): value is Metric => {
  if (typeof value !== 'object' || value === null) return false;

  const metric: Partial<Record<keyof Metric, unknown>> = value;

  return typeof metric.value === 'number' && typeof metric.label === 'string';
};

const isStats = (value: unknown): value is Stats => {
  if (typeof value !== 'object' || value === null) return false;

  const stats: Partial<Record<keyof Stats, unknown>> = value;

  return (
    Array.isArray(stats.packages) &&
    isMetric(stats.downloadsPerMonth) &&
    isMetric(stats.downloadsPerYear) &&
    typeof stats.fetched === 'string'
  );
};

let cache: Stats | undefined;
let pending: Promise<Stats | undefined> | undefined;

const load = (): Promise<Stats | undefined> =>
  (pending ??= fetch(statsUrl)
    .then((response) => response.json())
    .then((data: unknown) => (cache = isStats(data) ? data : undefined))
    .catch(() => {
      pending = undefined;

      return undefined;
    }));

export const useStats = (): Stats | undefined => {
  const [stats, setStats] = useState(cache);

  useEffect(() => {
    if (cache) return;

    let alive = true;

    load().then((data) => {
      if (alive && data) setStats(data);
    });

    return () => {
      alive = false;
    };
  }, []);

  return stats;
};
