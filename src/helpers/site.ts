type Fields = Record<string, unknown> | undefined;

export const counterApi = (fields: Fields): string | null => {
  const api = fields?.COUNTTY_URL;

  return fields?.showViewsCounter === true &&
    typeof api === 'string' &&
    api !== ''
    ? api
    : null;
};
