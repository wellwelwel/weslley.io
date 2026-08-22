export type Downloads = {
  year: number;
  /** The file these numbers were read from, so the site can point at it. */
  source: string;
  /** Downloads of the running year, absent when the history is unreachable. */
  total?: number;
  /** Downloads of the last 365 days, the window the history itself covers. */
  rolling?: number;
};

const REPO = 'wellwelwel/wellwelwel';
const FILE = 'docs/downloads-history.json';

const HISTORY = `https://raw.githubusercontent.com/${REPO}/refs/heads/main/${FILE}`;
const SOURCE = `https://github.com/${REPO}/blob/main/${FILE}`;

const TIMEOUT = 10_000;

const read = async (): Promise<Downloads> => {
  const year = new Date().getFullYear();
  const base = { year, source: SOURCE };

  try {
    const response = await fetch(HISTORY, {
      signal: AbortSignal.timeout(TIMEOUT),
    });

    if (!response.ok) return base;

    const history: Record<
      string,
      Record<string, number>
    > = await response.json();
    const running = String(year);

    let total = 0;
    let rolling = 0;

    for (const daily of Object.values(history))
      for (const [date, count] of Object.entries(daily)) {
        if (!Number.isFinite(count)) continue;

        rolling += count;

        if (date.startsWith(running)) total += count;
      }

    return { ...base, total, rolling };
  } catch {
    return base;
  }
};

let pending: Promise<Downloads> | undefined;

export const downloads = (): Promise<Downloads> => (pending ??= read());
