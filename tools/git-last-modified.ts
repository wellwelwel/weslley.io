import { spawn } from 'node:child_process';
import { isDevelopment } from './environment';

export const getGitLastModified = async (
  filePath: string
): Promise<string | null> => {
  if (isDevelopment) return new Date().toISOString();

  try {
    return await new Promise((resolve, reject) => {
      const git = spawn('git', ['log', '-1', '--format=%ct', '--', filePath]);
      const stdout: Buffer[] = [];
      const stderr: Buffer[] = [];

      git.stdout.on('data', (data) => {
        stdout.push(data);
      });

      git.stderr.on('data', (data) => {
        stderr.push(data);
      });

      git.on('close', (code) => {
        if (code !== 0) {
          reject(
            new Error(
              String(Buffer.concat(stderr)) ||
                `Unable to retrieve last modification date. Is "${filePath}" tracked in Git?`
            )
          );

          return;
        }

        const timestamp = String(Buffer.concat(stdout)).trim();
        if (!timestamp) {
          resolve(null);
          return;
        }

        const date = new Date(parseInt(timestamp, 10) * 1000);
        resolve(date.toISOString());
      });

      git.on('error', (error) => {
        reject(error);
      });
    });
  } catch {
    return null;
  }
};
