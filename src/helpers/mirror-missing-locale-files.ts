import { copyFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { listFiles } from 'poku';
import { websiteConfigs } from '@site/website.config';

const filter =
  /\.(md(x)?|(j|t)s(x)?|jp(e)?g|png|gif|svg|webp|json(c)?|y(a)?ml)$/;

const resolveMappedFile = (
  file: string,
  localeMapping: Record<string, string>
): string | null => {
  for (const [sourceDir, mappedDir] of Object.entries(localeMapping)) {
    if (!file.startsWith(sourceDir)) continue;

    return file.replace(sourceDir, mappedDir);
  }

  return null;
};

export const mirrorMissingLocaleFiles = async (
  locale: string,
  source = 'content'
) => {
  const copyFiles = async (file: string, destination: string) => {
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(file, destination);

    console.log(`Mirroring missing ${locale} file: ${file} → ${destination}`);
  };

  const files = await listFiles(source, {
    filter,
    exclude: /content\/assets/,
  });

  const localeFiles = await listFiles(`i18n/${locale}`, {
    filter,
  });

  const locales = new Map<string, Record<string, string>>();

  const blogs = websiteConfigs.blogs
    ?.flatMap((blog) => blog && blog.path?.replace(/^\.\//, ''))
    .filter((blog) => typeof blog === 'string');

  locales.set(
    locale,
    blogs
      ? {
          'content/articles': `i18n/${locale}/docusaurus-plugin-content-blog-articles`,
          'content/talks': `i18n/${locale}/docusaurus-plugin-content-blog-talks`,
        }
      : Object.create(null)
  );

  const localeMapping = locales.get(locale)!;

  const unmappedMissingFiles = files.filter((file) => {
    const isMapped = Object.keys(locales.get(locale)!).some((sourceDir) =>
      file.startsWith(sourceDir)
    );

    if (!isMapped) return !localeFiles.includes(`i18n/${locale}/${file}`);
    return false;
  });

  const mappedMissingFiles = files.filter((file) => {
    const mappedFile = resolveMappedFile(file, localeMapping);

    return mappedFile ? !localeFiles.includes(mappedFile) : false;
  });

  const missingEnFiles = [...unmappedMissingFiles, ...mappedMissingFiles];

  for (const file of missingEnFiles) {
    const mappedDestination = resolveMappedFile(file, localeMapping);

    copyFiles(
      file,
      mappedDestination ? mappedDestination : `i18n/${locale}/${file}`
    );
  }
};
