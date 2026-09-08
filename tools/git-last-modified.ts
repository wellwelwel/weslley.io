import { isDevelopment } from '../src/helpers/environment';

export const getGitLastModified = async (
  filePath: string
): Promise<string | null> => {
  if (isDevelopment) return new Date().toISOString();

  try {
    const log = Bun.$`git log -1 --format=%ct -- ${filePath}`;
    const timestamp = (await log.text()).trim();

    return timestamp ? new Date(Number(timestamp) * 1000).toISOString() : null;
  } catch {
    return null;
  }
};
