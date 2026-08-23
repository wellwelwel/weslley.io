import CodeBlock from '@theme-original/CodeBlock';
import prismIncludeLanguages from '@theme/prism-include-languages';
import { Prism } from 'prism-react-renderer';

/* webpack.config.ts drops this register from the entry bundle. */
prismIncludeLanguages(Prism);

export default CodeBlock;
