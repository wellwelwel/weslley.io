import { resolve } from 'node:path';

type Resource = {
  request: string;
  context?: string;
};

export const STYLESHEET = /\.(css|scss|sass)$/i;

export const UTILS_COMMON = /^@docusaurus\/utils-common$/;

/** Registered from src/theme/CodeBlock instead, off the entry bundle. */
export const PRISM_REGISTER =
  /theme-classic[\\/]lib[\\/]prism-include-languages(\.js)?$/;

/** Animates a stylesheet this config strips. */
export const NPROGRESS = /theme-classic[\\/]lib[\\/]nprogress(\.js)?$/;

const SITE = '@site/';

export const ROOT = resolve(__dirname, '../..');

const home = resolve(ROOT, 'src/css/tailwind.css');
const empty = resolve(__dirname, 'reset/empty.ts');
const utilsCommon = resolve(__dirname, 'reset/utils-common.ts');

const chained = (request: string) => request.includes('!');

const locate = ({ request, context = ROOT }: Resource) =>
  request.startsWith(SITE)
    ? resolve(ROOT, request.slice(SITE.length))
    : resolve(context, request);

export const strip = (resource: Resource) => {
  if (chained(resource.request) || locate(resource) === home) return;

  resource.request = empty;
};

export const silence = (resource: Resource) => {
  resource.request = empty;
};

/* The package's ESM deep files carry no tslib. */
export const lighten = (resource: Resource) => {
  resource.request = utilsCommon;
};
