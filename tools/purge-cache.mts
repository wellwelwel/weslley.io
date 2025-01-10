import { env, exit } from 'node:process';

const {
  CF_ZONE_ID,
  CF_TOKEN,
  CI,
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  INTERVAL,
  ATTEMPTS,
} = env;

if (!CF_ZONE_ID || !CF_TOKEN) {
  console.log('Skipping: Cloudflare not set.');
  exit(0);
}

const interval: number = (() => {
  const original = Number(INTERVAL);
  const isValid = Number.isSafeInteger(original) && original > 0;

  if (isValid) return original;
  return 15000;
})();

const attempts: number = (() => {
  const original = Number(ATTEMPTS);
  const isValid = Number.isSafeInteger(original) && original > 0;

  if (isValid) return original;
  return 30;
})();

const waitForDeployment = async (): Promise<void | never> => {
  if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
    console.error('GitHub environment not set.');
    exit(1);
  }

  console.log('Waiting for GitHub Pages deployment...');
  const url = `https://api.github.com/repos/${GITHUB_REPOSITORY}/pages/deployment/latest`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN.trim()}`,
    'Content-Type': 'application/json',
  };

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        console.error(
          `Failed to fetch deployment status: ${response.statusText}`
        );
        exit(1);
      }

      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
      console.log(`Rate limit remaining: ${rateLimitRemaining}`);

      const { status } = await response.json();
      console.log(`Current Status: ${status}`);

      if (status === 'active') {
        console.log('Deployment is active!');
        return;
      }
    } catch (error) {
      console.error('Error fetching deployment status:', error);
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  console.error('Deployment did not complete in time.');
  exit(1);
};

const purgeCache = async (): Promise<void | never> => {
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
        `Failed to purge cache: ${error.errors?.[0]?.message || response.statusText}`
      );
    }

    await response.json();
    console.log('Cache purged successfully');
  } catch (error) {
    console.error('Error purging cache.');

    if (!CI) throw error;
    else exit(1);
  }
};

if (GITHUB_TOKEN) await waitForDeployment();
await purgeCache();
