import { constants } from 'node:fs';
import { access, copyFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import config from '../docusaurus.config';

if (
  !config?.i18n?.defaultLocale ||
  !config?.i18n?.locales ||
  config.i18n.locales.length < 2
) {
  process.exit(0);
}

const I18N_DIR = './i18n';
const SOURCE_LOCALE = config.i18n.defaultLocale;
const TARGET_LOCALES = config.i18n.locales.filter(
  (locale): locale is string => !!locale && locale !== SOURCE_LOCALE
);

const getAllFiles = async (
  dir: string,
  files: string[] = []
): Promise<string[]> => {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await getAllFiles(fullPath, files);
        continue;
      }

      if (entry.isFile()) files.push(fullPath);
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return files;
};

const ensureDirectoryExists = async (dirPath: string): Promise<void> => {
  await mkdir(dirPath, { recursive: true }).catch(() => {});
};

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const syncI18nArticles = async (): Promise<void> => {
  console.log('Starting i18n structure synchronization...\n');

  // Ensure all target locale directories exist first
  for (const targetLocale of TARGET_LOCALES) {
    const targetBaseDir = join(I18N_DIR, targetLocale, 'articles');
    await ensureDirectoryExists(targetBaseDir);
  }

  const sourceDir = join(I18N_DIR, SOURCE_LOCALE, 'articles');
  const sourceFiles = await getAllFiles(sourceDir);

  let totalCopied = 0;
  let totalSkipped = 0;

  for (const targetLocale of TARGET_LOCALES) {
    console.log(`\n🌍 Syncing to locale: ${targetLocale}`);
    const targetBaseDir = join(I18N_DIR, targetLocale, 'articles');

    let copiedCount = 0;
    let skippedCount = 0;

    for (const sourcePath of sourceFiles) {
      const relativePath = relative(sourceDir, sourcePath);
      const targetPath = join(targetBaseDir, relativePath);
      const ext = extname(sourcePath);

      // Skip non-article and non-asset files
      if (
        ![
          '.md',
          '.mdx',
          '.yml',
          '.yaml',
          '.png',
          '.jpg',
          '.jpeg',
          '.gif',
          '.svg',
          '.webp',
        ].includes(ext)
      )
        continue;

      // NEVER overwrite existing files
      if (await fileExists(targetPath)) {
        console.log(`⏭️  Skipped (already exists): ${relativePath}`);
        skippedCount++;
        continue;
      }

      const targetDir = dirname(targetPath);
      await ensureDirectoryExists(targetDir);

      await copyFile(sourcePath, targetPath);
      console.log(`📄 Copied: ${relativePath}`);
      copiedCount++;
    }

    totalCopied += copiedCount;
    totalSkipped += skippedCount;

    console.log(`\n   Locale ${targetLocale}:`);
    console.log(`   - Copied: ${copiedCount}`);
    console.log(`   - Skipped: ${skippedCount}`);
  }

  console.log(`\n✅ Synchronization complete!`);
  console.log(`   Total copied: ${totalCopied}`);
  console.log(`   Total skipped: ${totalSkipped}`);
  console.log(`   Total files: ${totalCopied + totalSkipped}`);
  console.log(`\nNow you can manually translate the files in:`);

  for (const targetLocale of TARGET_LOCALES) {
    console.log(`   - ${join(I18N_DIR, targetLocale, 'articles')}`);
  }
};

if (require.main === module) syncI18nArticles();
