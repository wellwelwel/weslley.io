import type { Downloads } from '@site/src/@types/downloads';
import { usePluginData } from '@docusaurus/useGlobalData';
import { downloadsLabel } from '@site/src/helpers/downloads';

export const useDownloads = (): Downloads =>
  usePluginData('downloads') as Downloads;

export const useDownloadsLabel = (): string =>
  downloadsLabel(useDownloads().rolling);
