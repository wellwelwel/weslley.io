export type Count = number | 'pending' | 'unavailable';

const isViews = (value: unknown): value is { views: number } =>
  typeof value === 'object' &&
  value !== null &&
  'views' in value &&
  typeof value.views === 'number';

export const countView = async (
  api: string,
  counter: string
): Promise<Count> => {
  const url = new URL('/views', api);

  url.searchParams.set('slug', counter);

  try {
    const data: unknown = await fetch(url, { cache: 'no-store' }).then(
      (response) => response.json()
    );

    return isViews(data) ? data.views : 'unavailable';
  } catch {
    return 'unavailable';
  }
};
