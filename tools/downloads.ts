import type { Downloads } from '../src/@types/downloads';
import type { Stats } from '../src/helpers/stats';
import { isCount, isRecord, isStats } from '../src/helpers/stats';

const REPO = 'wellwelwel/wellwelwel';
const DOCS = `https://raw.githubusercontent.com/${REPO}/refs/heads/main/docs`;

const HISTORY = `${DOCS}/downloads-history.json`;
const STATS = `${DOCS}/stats.json`;
const SOURCE = `https://github.com/${REPO}/blob/main/docs/downloads-history.json`;

const TIMEOUT = 10_000;

const fetchJson = async (url: string): Promise<unknown> => {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT),
    });

    return response.ok ? await response.json() : undefined;
  } catch {
    return undefined;
  }
};

const readStats = async (): Promise<Stats | undefined> => {
  const stats = await fetchJson(STATS);

  return isStats(stats) ? stats : undefined;
};

const sumYear = (
  history: unknown,
  authored: Set<string>,
  year: number
): number | undefined => {
  if (!isRecord(history)) return undefined;

  const running = String(year);

  let total = 0;

  for (const [name, daily] of Object.entries(history)) {
    if (!authored.has(name) || !isRecord(daily)) continue;

    for (const [date, count] of Object.entries(daily))
      if (date.startsWith(running) && isCount(count)) total += count;
  }

  return total;
};

const read = async (): Promise<Downloads> => {
  const year = new Date().getFullYear();
  const [history, stats] = await Promise.all([fetchJson(HISTORY), readStats()]);

  if (!stats) return { year, source: SOURCE };

  const { author } = stats;
  const authored = new Set(Object.keys(author.packages));

  return {
    year,
    source: SOURCE,
    total: sumYear(history, authored, year),
    rolling: author.downloadsPerYear.value,
  };
};

let pending: Promise<Downloads> | undefined;

export const downloads = (): Promise<Downloads> => (pending ??= read());
