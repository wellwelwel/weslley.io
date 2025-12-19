import type {
  Matter,
  MatterOptions,
  MatterResult,
} from '../src/@types/front-matter';
import { parse } from 'yaml';

const DEFAULT_OPTIONS: Required<MatterOptions> = {
  delimiters: ['---', '---'],
};

const createEmptyResult = <T>(content: string): MatterResult<T> => ({
  data: Object.create(null),
  content,
  isEmpty: true,
  matter: '',
});

const stripNewlinePrefix = (str: string): string => {
  if (str.startsWith('\r\n')) return str.slice(2);
  if (str.startsWith('\n')) return str.slice(1);

  return str;
};

const findCloseDelimiterIndex = (
  str: string,
  closeDelimiter: string
): number => {
  const withNewline = str.indexOf('\n' + closeDelimiter);
  if (withNewline !== -1) return withNewline + 1;

  const withCarriageReturn = str.indexOf('\r\n' + closeDelimiter);
  if (withCarriageReturn !== -1) return withCarriageReturn + 2;

  return -1;
};

export const matter: Matter = <T>(input: string, options?: MatterOptions) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const [openDelimiter, closeDelimiter] = opts.delimiters;

  if (!input || input === '') return createEmptyResult<T>(input);
  if (!input.startsWith(openDelimiter)) return createEmptyResult<T>(input);

  const afterOpenDelimiter = stripNewlinePrefix(
    input.slice(openDelimiter.length)
  );

  const closeIndex = findCloseDelimiterIndex(
    afterOpenDelimiter,
    closeDelimiter
  );

  if (closeIndex === -1) return createEmptyResult<T>(input);

  const matterContent = afterOpenDelimiter.slice(0, closeIndex - 1);
  const isEmpty = !matterContent.trim();
  const data: T = isEmpty ? Object.create(null) : parse(matterContent);
  const bodyContent = afterOpenDelimiter
    .slice(closeIndex + closeDelimiter.length)
    .replace(/^(\r\n|\n)/, '');

  return {
    data,
    content: bodyContent,
    isEmpty,
    matter: matterContent,
  };
};
