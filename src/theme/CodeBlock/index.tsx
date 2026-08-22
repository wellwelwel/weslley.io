import CodeBlock from '@theme-original/CodeBlock';
import prismIncludeLanguages from '@theme/prism-include-languages';
import { Prism } from 'prism-react-renderer';

/* The entry bundle skips this register (webpack.config.ts), so it runs here. */
prismIncludeLanguages(Prism);

export default CodeBlock;
