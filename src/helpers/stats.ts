type Metric = {
  value: number;
  label: string;
};

type PackageStats = {
  downloadsPerMonth: Metric;
  downloadsPerYear: Metric;
};

type GroupStats = PackageStats & {
  packages: Record<string, PackageStats>;
};

export type Stats = {
  author: GroupStats;
  coMaintained: GroupStats;
  fetched: string;
};

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

const isMetric = (value: unknown): value is Metric => {
  if (!isRecord(value)) return false;

  const metric: Partial<Record<keyof Metric, unknown>> = value;

  return isCount(metric.value) && typeof metric.label === 'string';
};

const isPackageStats = (value: unknown): value is PackageStats => {
  if (!isRecord(value)) return false;

  const stats: Partial<Record<keyof PackageStats, unknown>> = value;

  return isMetric(stats.downloadsPerMonth) && isMetric(stats.downloadsPerYear);
};

const isGroupStats = (value: unknown): value is GroupStats => {
  if (!isPackageStats(value)) return false;

  const group: Partial<Record<keyof GroupStats, unknown>> = value;

  return (
    isRecord(group.packages) &&
    Object.values(group.packages).every(isPackageStats)
  );
};

export const isStats = (value: unknown): value is Stats => {
  if (!isRecord(value)) return false;

  const stats: Partial<Record<keyof Stats, unknown>> = value;

  return (
    isGroupStats(stats.author) &&
    isGroupStats(stats.coMaintained) &&
    typeof stats.fetched === 'string'
  );
};
