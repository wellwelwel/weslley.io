/* Browser shim for `@docusaurus/utils-common`. Its package entry carries
   tslib, its deep ESM files do not. */
type Common = typeof import('@docusaurus/utils-common');

export const blogPostContainerID =
  '__blog-post-container' satisfies Common['blogPostContainerID'];

export {
  addLeadingSlash,
  addTrailingSlash,
  default as applyTrailingSlash,
  removeTrailingSlash,
} from '@docusaurus/utils-common/lib/applyTrailingSlash';
export {
  addPrefix,
  addSuffix,
  removePrefix,
  removeSuffix,
} from '@docusaurus/utils-common/lib/stringUtils';
export { getErrorCausalChain } from '@docusaurus/utils-common/lib/errorUtils';
