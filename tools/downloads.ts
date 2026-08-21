export type Downloads = {
  year: number;
  /** Downloads of the running year, absent when the history is unreachable. */
  total?: number;
  /** Downloads of the last 365 days, the window the history itself covers. */
  rolling?: number;
};

const HISTORY =
  'https://raw.githubusercontent.com/wellwelwel/wellwelwel/refs/heads/main/docs/downloads-history.json';

const TIMEOUT = 10_000;

export const downloads = async (): Promise<Downloads> => {
  const year = new Date().getFullYear();

  try {
    const response = await fetch(HISTORY, {
      signal: AbortSignal.timeout(TIMEOUT),
    });

    if (!response.ok) return { year };

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

    return { year, total, rolling };
  } catch {
    return { year };
  }
};
