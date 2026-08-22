import { usePluginData } from '@docusaurus/useGlobalData';
import { downloadsLabel } from '@site/src/helpers/downloads';

type Downloads = {
  year: number;
  source: string;
  total?: number;
  rolling?: number;
};

export const useDownloads = (): string => {
  const { rolling } = usePluginData('downloads') as Downloads;

  return downloadsLabel(rolling);
};

export const useYear = (): Downloads => usePluginData('downloads') as Downloads;
