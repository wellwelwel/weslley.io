import { extname, join, relative } from 'node:path';
import config from '../docusaurus.config';
import { walk } from './walk';

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

const EXTENSIONS = new Set([
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
]);

export const syncI18nArticles = async (): Promise<void> => {
  console.log('Starting i18n structure synchronization...\n');

  const sourceDir = join(I18N_DIR, SOURCE_LOCALE, 'articles');
  const sourceFiles = await walk(sourceDir, (name) =>
    EXTENSIONS.has(extname(name))
  ).catch(() => []);

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

      if (await Bun.file(targetPath).exists()) {
        console.log(`⏭️  Skipped (already exists): ${relativePath}`);
        skippedCount++;
        continue;
      }

      await Bun.write(targetPath, Bun.file(sourcePath));
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

if (import.meta.main) syncI18nArticles();
