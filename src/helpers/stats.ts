type Metric = {
  value: number;
  label: string;
};

type PackageStats = {
  since: string;
  downloadsPerMonth: Metric;
  downloadsPerYear: Metric;
  downloadsTotal: Metric;
};

type AuthorStats = Omit<PackageStats, 'since'> & {
  since: string | null;
  packages: Record<string, PackageStats>;
};

export type Stats = {
  author: AuthorStats;
  fetched: string;
};

export const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

export const isDay = (value: unknown): value is string =>
  typeof value === 'string' && ISO_DAY.test(value);

const isMetric = (value: unknown): value is Metric => {
  if (!isRecord(value)) return false;

  const metric: Partial<Record<keyof Metric, unknown>> = value;

  return isCount(metric.value) && typeof metric.label === 'string';
};

const hasMetrics = (
  value: Record<string, unknown>
): value is Record<string, unknown> & Omit<PackageStats, 'since'> => {
  const stats: Partial<Record<keyof PackageStats, unknown>> = value;

  return (
    isMetric(stats.downloadsPerMonth) &&
    isMetric(stats.downloadsPerYear) &&
    isMetric(stats.downloadsTotal)
  );
};

const isPackageStats = (value: unknown): value is PackageStats =>
  isRecord(value) && hasMetrics(value) && isDay(value.since);

const isAuthorStats = (value: unknown): value is AuthorStats => {
  if (!isRecord(value) || !hasMetrics(value)) return false;

  const author: Partial<Record<keyof AuthorStats, unknown>> = value;

  return (
    (author.since === null || isDay(author.since)) &&
    isRecord(author.packages) &&
    Object.values(author.packages).every(isPackageStats)
  );
};

export const isStats = (value: unknown): value is Stats => {
  if (!isRecord(value)) return false;

  const stats: Partial<Record<keyof Stats, unknown>> = value;

  return isAuthorStats(stats.author) && typeof stats.fetched === 'string';
};
