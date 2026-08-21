import { usePluginData } from '@docusaurus/useGlobalData';
import { abbreviate } from '@site/src/helpers/abbreviate';

type Downloads = {
  year: number;
  total?: number;
  rolling?: number;
};

const FALLBACK = '700 milhões';

export const useDownloads = (): string => {
  const { rolling } = usePluginData('downloads') as Downloads;

  return rolling ? abbreviate(rolling, 'pt-BR', 0) : FALLBACK;
};

export const useYear = (): Downloads => usePluginData('downloads') as Downloads;
