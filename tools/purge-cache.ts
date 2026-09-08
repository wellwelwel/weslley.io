const { CF_ZONE_ID, CF_TOKEN, CI } = Bun.env;

const messageOf = (error: unknown, fallback: string): string =>
  typeof error === 'object' &&
  error !== null &&
  'errors' in error &&
  Array.isArray(error.errors) &&
  error.errors[0]?.message
    ? error.errors[0].message
    : fallback;

export const purgeCache = async (): Promise<void> => {
  if (!CF_ZONE_ID || !CF_TOKEN) {
    console.log('Skipping: Cloudflare not set.');
    return;
  }

  const url = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID.trim()}/purge_cache`;
  const body = { purge_everything: true };
  const headers = {
    Authorization: `Bearer ${CF_TOKEN.trim()}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(
        `Failed to purge cache: ${messageOf(error, response.statusText)}`
      );
    }

    await response.json();
    console.log('Cache purged successfully');
  } catch (error) {
    console.error('Error purging cache.');

    if (!CI) throw error;
    else process.exit(1);
  }
};

if (import.meta.main) purgeCache();
