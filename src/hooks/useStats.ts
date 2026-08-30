import type { Stats } from '@site/src/helpers/stats';
import { useEffect, useState } from 'react';
import { isStats } from '@site/src/helpers/stats';

export const statsUrl = 'https://wellwelwel.github.io/wellwelwel/stats.json';

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
