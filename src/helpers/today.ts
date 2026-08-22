let formatter: Intl.DateTimeFormat | undefined;

/* en-CA prints dates as YYYY-MM-DD, the same shape the agenda slots carry. */
export const todayInBrazil = (): string =>
  (formatter ??= new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })).format(new Date());
