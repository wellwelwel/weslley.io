import CodeBlock from '@theme-original/CodeBlock';
import prismIncludeLanguages from '@theme/prism-include-languages';
import { Prism } from 'prism-react-renderer';

/* The entry bundle no longer registers the extra Prism languages (see
   webpack.config.ts), so the register runs here, before any block renders. */
prismIncludeLanguages(Prism);

export default CodeBlock;
