/** Year of an ISO day, such as `2024-02-13`. */
export const yearOf = (day: string): number => Number(day.slice(0, 4));
