import type { Shape } from '../src/@types/image';
import { createHash } from 'node:crypto';
import { readFile, stat, unlink, writeFile } from 'node:fs/promises';
import { extname, relative, resolve, sep } from 'node:path';
import { argv, cwd, exit } from 'node:process';
import { format, resolveConfig } from 'prettier';
import sharp from 'sharp';
import { measureImage } from './measure-image';
import { walk } from './walk';

type Quality = {
  avif: number;
  webp: number;
};

type Group = {
  widths: number[];
  files: string[];
  quality?: Partial<Quality>;
  lossless?: boolean;
};

type Manifest = {
  quality?: Partial<Quality>;
  groups: Group[];
};

type Plan = {
  master: string;
  widths: number[];
  quality: Quality;
  lossless: boolean;
};

type Locked = {
  hash: string;
  recipe: string;
  variants: string[];
};

type Entry = Shape & {
  widths: number[];
  stamp: string;
};

type Verdict = 'ok' | 'stale' | 'missing' | 'orphan';

const FORMATS = ['avif', 'webp'] as const;
const QUALITY: Quality = { avif: 55, webp: 80 };
const RASTERS = new Set(['.png', '.jpg', '.jpeg']);
const STATIC_BASE = 'src/assets';

const MANIFEST = 'tools/images.json';
const LOCK = 'tools/images-lock.json';
const CATALOG = 'src/data/variants.json';

const root = resolve(cwd());

const contain = (path: string): string => {
  const full = resolve(root, path);

  if (full !== root && !full.startsWith(`${root}${sep}`))
    throw new Error(`Path escapes the project root: ${path}`);

  return full;
};

const option = (flag: string, fallback: string): string => {
  const index = argv.indexOf(flag);

  return index === -1 ? fallback : (argv[index + 1] ?? fallback);
};

const posix = (path: string): string => path.split(sep).join('/');

const stem = (path: string): string =>
  path.slice(0, path.length - extname(path).length);

const variantPath = (
  master: string,
  width: number,
  stamp: string,
  format: string
): string => `${stem(master)}-${width}.${stamp}.${format}`;

const publicPath = (master: string): string => {
  const path = posix(relative(root, contain(master)));

  if (!path.startsWith(`${STATIC_BASE}/`))
    throw new Error(`Master must live under ${STATIC_BASE}: ${master}`);

  return path.slice(STATIC_BASE.length);
};

const exists = async (path: string): Promise<boolean> => {
  try {
    await stat(path);

    return true;
  } catch {
    return false;
  }
};

const hashFile = async (path: string): Promise<string> =>
  createHash('sha256')
    .update(await readFile(path))
    .digest('hex');

const sorted = <Value>(
  record: Record<string, Value>
): Record<string, Value> => {
  const output: Record<string, Value> = Object.create(null);

  for (const key of Object.keys(record).sort()) output[key] = record[key]!;

  return output;
};

const readJson = async <Value>(
  path: string,
  fallback: Value
): Promise<Value> => {
  if (!(await exists(path))) return fallback;

  const parsed: unknown = JSON.parse(await readFile(path, 'utf8'));

  return parsed as Value;
};

const writeJson = async (
  path: string,
  value: Record<string, unknown>
): Promise<void> => {
  const config = (await resolveConfig(path)) ?? {};
  const raw = JSON.stringify(value, null, 2);

  await writeFile(path, await format(raw, { ...config, parser: 'json' }));
};

const plans = async (): Promise<Plan[]> => {
  const manifestPath = contain(option('--manifest', MANIFEST));
  const manifest = await readJson<Manifest | undefined>(
    manifestPath,
    undefined
  );

  if (!manifest?.groups) throw new Error(`Missing manifest: ${manifestPath}`);

  const seen = new Set<string>();
  const output: Plan[] = [];

  for (const group of manifest.groups)
    for (const file of group.files) {
      const master = contain(file);

      if (!RASTERS.has(extname(master)))
        throw new Error(`Raster masters only: ${file}`);

      if (seen.has(master)) throw new Error(`Duplicated master: ${file}`);

      seen.add(master);
      output.push({
        master,
        widths: group.widths,
        quality: { ...QUALITY, ...manifest.quality, ...group.quality },
        lossless: group.lossless ?? false,
      });
    }

  return output;
};

const ladder = (widths: number[], master: Shape): number[] =>
  [...new Set(widths.map((width) => Math.min(width, master.width)))].sort(
    (left, right) => left - right
  );

const recipeOf = (plan: Plan, widths: number[]): string =>
  JSON.stringify({ widths, quality: plan.quality, lossless: plan.lossless });

const stampOf = (hash: string, recipe: string): string =>
  createHash('sha256')
    .update(hash + recipe)
    .digest('hex')
    .slice(0, 8);

const expected = (plan: Plan, widths: number[], stamp: string): string[] =>
  FORMATS.flatMap((format) =>
    widths.map((width) =>
      posix(relative(root, variantPath(plan.master, width, stamp, format)))
    )
  );

const matches = (left: string[], right: string[]): boolean =>
  left.length === right.length &&
  left.every((value, index) => value === right[index]);

const fresh = async (
  hash: string,
  recipe: string,
  variants: string[],
  locked?: Locked
): Promise<boolean> => {
  if (!locked || locked.recipe !== recipe || locked.hash !== hash) return false;
  if (!matches(locked.variants, variants)) return false;

  const checks = await Promise.all(
    variants.map((variant) => exists(contain(variant)))
  );

  return checks.every(Boolean);
};

const prune = async (
  locked: Locked | undefined,
  keep: string[]
): Promise<void> => {
  if (!locked) return;

  const kept = new Set(keep);

  await Promise.all(
    locked.variants
      .filter((variant) => !kept.has(variant))
      .map((variant) => unlink(contain(variant)).catch(() => {}))
  );
};

const encode = async (
  plan: Plan,
  widths: number[],
  stamp: string
): Promise<void> => {
  await Promise.all(
    widths.flatMap((width) => [
      sharp(plan.master)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .avif(
          plan.lossless ? { lossless: true } : { quality: plan.quality.avif }
        )
        .toFile(variantPath(plan.master, width, stamp, 'avif')),
      sharp(plan.master)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp(
          plan.lossless ? { lossless: true } : { quality: plan.quality.webp }
        )
        .toFile(variantPath(plan.master, width, stamp, 'webp')),
    ])
  );
};

const build = async (): Promise<void> => {
  const lockPath = contain(LOCK);
  const lock = await readJson<Record<string, Locked>>(lockPath, {});
  const nextLock: Record<string, Locked> = Object.create(null);
  const catalog: Record<string, Entry> = Object.create(null);

  for (const plan of await plans()) {
    const key = posix(relative(root, plan.master));
    const hash = await hashFile(plan.master);
    const shape = await measureImage(plan.master);
    const widths = ladder(plan.widths, shape);
    const recipe = recipeOf(plan, widths);
    const stamp = stampOf(hash, recipe);
    const variants = expected(plan, widths, stamp);
    const ready = await fresh(hash, recipe, variants, lock[key]);

    if (!ready) {
      await encode(plan, widths, stamp);
      await prune(lock[key], variants);
    }

    nextLock[key] = { hash, recipe, variants };
    catalog[publicPath(plan.master)] = { widths, stamp, ...shape };

    console.log(`${ready ? 'fresh' : 'built'}  ${key}`);
  }

  for (const key of Object.keys(lock))
    if (!(key in nextLock)) await prune(lock[key], []);

  await writeJson(lockPath, sorted(nextLock));
  await writeJson(contain(CATALOG), sorted(catalog));
};

const verify = async (): Promise<void> => {
  const lock = await readJson<Record<string, Locked>>(contain(LOCK), {});
  const catalog = await readJson<Record<string, Entry>>(contain(CATALOG), {});
  const managed = new Set<string>();
  const verdicts: [Verdict, string][] = [];

  for (const plan of await plans()) {
    const key = posix(relative(root, plan.master));
    const locked = lock[key];
    const hash = await hashFile(plan.master);
    const shape = await measureImage(plan.master);
    const widths = ladder(plan.widths, shape);
    const recipe = recipeOf(plan, widths);
    const variants = expected(plan, widths, stampOf(hash, recipe));

    managed.add(key);

    if (!locked || !catalog[publicPath(plan.master)])
      verdicts.push(['missing', key]);
    else if (!(await fresh(hash, recipe, variants, locked)))
      verdicts.push(['stale', key]);
    else verdicts.push(['ok', key]);
  }

  for (const key of Object.keys(lock))
    if (!managed.has(key)) verdicts.push(['orphan', key]);

  for (const [verdict, key] of verdicts) console.log(`${verdict}  ${key}`);

  if (verdicts.some(([verdict]) => verdict !== 'ok')) exit(1);
};

const scan = async (): Promise<void> => {
  const directory = contain(option('--dir', STATIC_BASE));
  const managed = new Set(
    (await plans()).map((plan) => posix(relative(root, plan.master)))
  );

  const rows = await Promise.all(
    (await walk(directory, (name) => RASTERS.has(extname(name)))).map(
      async (path) => {
        const key = posix(relative(root, path));
        const shape = await measureImage(path);
        const bytes = (await stat(path)).size;

        return { key, shape, bytes };
      }
    )
  );

  rows.sort((left, right) => right.bytes - left.bytes);

  for (const { key, shape, bytes } of rows) {
    const state = managed.has(key) ? 'managed' : 'unmanaged';
    const size = `${Math.round(bytes / 1024)}kB`;

    console.log(`${state}  ${size}  ${shape.width}x${shape.height}  ${key}`);
  }
};

const commands: Record<string, () => Promise<void>> = {
  scan,
  build,
  verify,
};

const command = commands[argv[2] ?? ''];

if (!command) {
  console.error('Usage: images.ts <scan|build|verify> [--manifest] [--dir]');
  exit(1);
}

command().catch((error: Error) => {
  console.error(error.message);
  exit(1);
});
