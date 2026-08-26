import type { Downloads } from '../src/@types/downloads';

const REPO = 'wellwelwel/wellwelwel';
const DOCS = `https://raw.githubusercontent.com/${REPO}/refs/heads/main/docs`;

const HISTORY = `${DOCS}/downloads-history.json`;
const STATS = `${DOCS}/stats.json`;
const SOURCE = `https://github.com/${REPO}/blob/main/docs/downloads-history.json`;

const TIMEOUT = 10_000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

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

const readTotal = async (year: number): Promise<number | undefined> => {
  const history = await fetchJson(HISTORY);

  if (!isRecord(history)) return undefined;

  const running = String(year);

  let total = 0;

  for (const daily of Object.values(history)) {
    if (!isRecord(daily)) continue;

    for (const [date, count] of Object.entries(daily))
      if (date.startsWith(running) && isCount(count)) total += count;
  }

  return total;
};

const readRolling = async (): Promise<number | undefined> => {
  const stats = await fetchJson(STATS);

  if (!isRecord(stats) || !isRecord(stats.downloadsPerYear)) return undefined;

  const { value } = stats.downloadsPerYear;

  return isCount(value) ? value : undefined;
};

const read = async (): Promise<Downloads> => {
  const year = new Date().getFullYear();
  const [total, rolling] = await Promise.all([readTotal(year), readRolling()]);

  return { year, source: SOURCE, total, rolling };
};

let pending: Promise<Downloads> | undefined;

export const downloads = (): Promise<Downloads> => (pending ??= read());
