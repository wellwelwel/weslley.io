export type Sample = {
  label: string;
  /** Formatted count. */
  value: string;
  /** True when the count is bridged over a collection gap. */
  bridged?: boolean;
};

export type Chart = {
  /** Ready `d`, drawn at full height. */
  path: string;
  samples: Sample[];
};

export type Milestone = {
  year: number;
  /** Formatted count, empty when the year has no count yet. */
  value: string;
  running: boolean;
  /** Ready reading for assistive technology. */
  reading: string;
};

export type Downloads = {
  /** Running year, the fallback when the stats are unreachable. */
  year: number;
  /** Link to the file the numbers were read from. */
  source: string;
  /** First year the count starts from, absent when the stats are unreachable. */
  since?: number;
  /** One row per year, from `since` to the running one. */
  milestones: Milestone[];
  /** Last 30 settled days, absent when the history is unreachable. */
  daily?: Chart;
  /** Every closed month since `since`, absent when the history is unreachable. */
  timeline?: Chart;
  /** Formatted total of the last 30 settled days, absent when the history is unreachable. */
  monthly?: string;
  /** Formatted total since the first counted day, absent when the stats are unreachable. */
  lifetime?: string;
  /** Downloads of the last 365 days. */
  rolling?: number;
};
