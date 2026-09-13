import type { Chart, Downloads, Milestone } from '../src/@types/downloads';
import type { Stats } from '../src/helpers/stats';
import { curveBasis, line } from 'd3-shape';
import { isCount, isDay, isRecord, isStats } from '../src/helpers/stats';
import { HEIGHT, INSET, WIDTH } from '../src/helpers/stream';
import { yearOf } from '../src/helpers/year';

type Days = Record<string, number>;

type Package = {
  since: string;
  days: Days;
};

type History = Record<string, Package>;

type Bounds = {
  from: string;
  to: string;
};

type Within = (day: string) => boolean;

type Yearly = {
  year: number;
  downloads: number;
};

type Reading = {
  label: string;
  downloads: number;
  bridged?: boolean;
};

type Point = [number, number];

const REPO = 'wellwelwel/wellwelwel';
const DOCS = `https://raw.githubusercontent.com/${REPO}/refs/heads/main/docs`;

const HISTORY = `${DOCS}/downloads-history.json`;
const STATS = `${DOCS}/stats.json`;
const SOURCE = `https://github.com/${REPO}/blob/main/docs/downloads-history.json`;

const TIMEOUT = 10_000;

const WINDOW_DAYS = 30;
const DAY = 86_400_000;

const LOCALE = 'pt-BR';
const RUNNING = 'em curso';

const format = {
  count: new Intl.NumberFormat(LOCALE),
  date: new Intl.DateTimeFormat(LOCALE, { timeZone: 'UTC' }),
  day: new Intl.DateTimeFormat(LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }),
  month: new Intl.DateTimeFormat(LOCALE, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }),
};

const shape = line<Point>().curve(curveBasis);

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

const isDays = (value: unknown): value is Days =>
  isRecord(value) &&
  Object.entries(value).every(([day, count]) => isDay(day) && isCount(count));

const isPackage = (value: unknown): value is Package => {
  if (!isRecord(value)) return false;

  const entry: Partial<Record<keyof Package, unknown>> = value;

  return isDay(entry.since) && isDays(entry.days);
};

const isHistory = (value: unknown): value is History =>
  isRecord(value) && Object.values(value).every(isPackage);

const readHistory = async (): Promise<History | undefined> => {
  const history = await fetchJson(HISTORY);

  return isHistory(history) ? history : undefined;
};

const readStats = async (): Promise<Stats | undefined> => {
  const stats = await fetchJson(STATS);

  return isStats(stats) ? stats : undefined;
};

/* Every later reading walks the authored packages alone. */
const ownedBy = (history: History, names: Set<string>): History =>
  Object.fromEntries(
    Object.entries(history).filter(([name]) => names.has(name))
  );

const sum = (history: History, within: Within): number => {
  let total = 0;

  for (const { since, days } of Object.values(history))
    for (const [day, count] of Object.entries(days))
      if (day >= since && within(day)) total += count;

  return total;
};

const isoDate = (time: number): string =>
  new Date(time).toISOString().slice(0, 10);

const boundsOf = (history: History): Bounds | undefined => {
  const entries = Object.values(history);
  const from = entries
    .map(({ since }) => since)
    .sort()
    .at(0);
  const to = entries
    .flatMap(({ days }) => Object.keys(days))
    .sort()
    .at(-1);

  return from && to ? { from, to } : undefined;
};

const dayBefore = (to: string, count: number): string =>
  isoDate(Date.parse(to) - count * DAY);

const lastDays = (to: string, days: number): Within => {
  const from = dayBefore(to, days - 1);

  return (day) => day >= from && day <= to;
};

const daysUntil = (to: string, count: number): string[] =>
  Array.from({ length: count }, (_, index) => dayBefore(to, count - 1 - index));

const dayAfter = (day: string): string => isoDate(Date.parse(day) + DAY);

const monthOf = (day: string): string => day.slice(0, 7);

/* A month counts once its last day has settled. */
const monthsUntil = (from: string, settled: string): string[] => {
  const start = new Date(from);
  const end = new Date(dayAfter(settled));
  const count =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth();

  return Array.from({ length: count }, (_, index) =>
    monthOf(
      isoDate(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + index))
    )
  );
};

/* A day no package reports is a collection gap, not a zero. */
const reported = (history: History, day: string): number | undefined => {
  let total: number | undefined;

  for (const { since, days } of Object.values(history)) {
    if (day < since) continue;

    const count = days[day];
    if (count === undefined) continue;

    total = (total ?? 0) + count;
  }

  return total;
};

const between = (
  counts: number[],
  before: number | undefined,
  after: number | undefined,
  index: number
): number => {
  if (before === undefined) return after === undefined ? 0 : counts[after];
  if (after === undefined) return counts[before];

  const share = (index - before) / (after - before);

  return Math.round(counts[before] + (counts[after] - counts[before]) * share);
};

const bridge = (counts: (number | undefined)[]): number[] => {
  const known = counts.flatMap((count, index) =>
    count === undefined ? [] : [index]
  );
  const filled = counts.map((count) => count ?? 0);

  return filled.map((count, index) =>
    counts[index] === undefined
      ? between(
          filled,
          known.findLast((at) => at < index),
          known.find((at) => at > index),
          index
        )
      : count
  );
};

const dailyOf = (history: History, days: string[]): Reading[] => {
  const reports = days.map((day) => reported(history, day));
  const counts = bridge(reports);

  return days.map((day, index) => ({
    label: format.day.format(new Date(day)),
    downloads: counts[index],
    bridged: reports[index] === undefined,
  }));
};

const yearsOf = (history: History, from: number, to: number): Yearly[] =>
  Array.from({ length: to - from + 1 }, (_, index) => {
    const year = from + index;
    const prefix = String(year);

    return {
      year,
      downloads: sum(history, (day) => day.startsWith(prefix)),
    };
  });

const monthsOf = (history: History, months: string[]): Reading[] =>
  months.map((month) => ({
    label: format.month.format(new Date(month)),
    downloads: sum(history, (day) => day.startsWith(month)),
  }));

/* The busiest sample reaches the top. */
const pathOf = (readings: Reading[]): string => {
  const step = WIDTH / (readings.length - 1);
  const peak = Math.max(1, ...readings.map(({ downloads }) => downloads));
  const unit = (HEIGHT - INSET) / peak;

  return (
    shape(
      readings.map(({ downloads }, index): Point => [
        index * step,
        HEIGHT - downloads * unit,
      ])
    ) ?? ''
  );
};

const chartOf = (readings: Reading[]): Chart | undefined => {
  if (readings.length < 2) return undefined;

  return {
    path: pathOf(readings),
    samples: readings.map(({ label, downloads, bridged }) => ({
      label,
      value: format.count.format(downloads),
      ...(bridged && { bridged }),
    })),
  };
};

const openOf = (year: number): Milestone[] => [
  { year, value: '', running: true, reading: `${year}: ${RUNNING}` },
];

const milestonesOf = (
  years: Yearly[],
  year: number,
  from: number,
  settled: string
): Milestone[] => {
  const until = format.date.format(new Date(settled));

  return years
    .filter((yearly) => yearly.year >= from)
    .map(({ year: counted, downloads }) => {
      const value = format.count.format(downloads);
      const running = counted === year;
      const note = running ? `, ${RUNNING} até ${until}` : '';

      return {
        year: counted,
        value,
        running,
        reading: `${counted}: ${value} downloads${note}`,
      };
    });
};

const measure = (
  history: History | undefined,
  year: number,
  since: number | undefined
): Partial<Downloads> => {
  const bounds = history && boundsOf(history);
  if (!history || !bounds) return {};

  return {
    milestones: milestonesOf(
      yearsOf(history, yearOf(bounds.from), year),
      year,
      since ?? 0,
      bounds.to
    ),
    daily: chartOf(dailyOf(history, daysUntil(bounds.to, WINDOW_DAYS))),
    timeline: chartOf(monthsOf(history, monthsUntil(bounds.from, bounds.to))),
    monthly: format.count.format(
      sum(history, lastDays(bounds.to, WINDOW_DAYS))
    ),
  };
};

const read = async (): Promise<Downloads> => {
  const year = new Date().getFullYear();
  const [history, stats] = await Promise.all([readHistory(), readStats()]);

  if (!stats) return { year, source: SOURCE, milestones: openOf(year) };

  const authored = new Set(Object.keys(stats.author.packages));
  const since = stats.author.since ? yearOf(stats.author.since) : undefined;

  return {
    year,
    source: SOURCE,
    since,
    rolling: stats.author.downloadsPerYear.value,
    lifetime: format.count.format(stats.author.downloadsTotal.value),
    milestones: openOf(year),
    ...measure(history && ownedBy(history, authored), year, since),
  };
};

let pending: Promise<Downloads> | undefined;

export const downloads = (): Promise<Downloads> => (pending ??= read());
