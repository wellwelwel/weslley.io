import AboutResumeEn from '@site/i18n/en/about/headline.mdx';
import AboutPageEn from '@site/i18n/en/about/page.mdx';
import AboutProjectsEn from '@site/i18n/en/about/projects.mdx';
import AboutResume from '@site/i18n/pt-BR/about/headline.mdx';
import AboutPage from '@site/i18n/pt-BR/about/page.mdx';
import AboutProjects from '@site/i18n/pt-BR/about/projects.mdx';
import { dynamicRequire } from '@site/src/helpers/dynamic-require';

export const socials = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/i18n/pt-BR/social', false, /\.(tsx|jsx|mdx)$/)
      : require.context('@site/i18n/en/social', false, /\.(tsx|jsx|mdx)$/)
  );

export const anchors = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/i18n/pt-BR/anchors', false, /\.(tsx|jsx|mdx)$/)
      : require.context('@site/i18n/en/anchors', false, /\.(tsx|jsx|mdx)$/)
  );

export const cards = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/i18n/pt-BR/cards', false, /\.(tsx|jsx|mdx)$/)
      : require.context('@site/i18n/en/cards', false, /\.(tsx|jsx|mdx)$/)
  );

export const projects = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/i18n/pt-BR/projects', false, /\.(tsx|jsx|mdx)$/)
      : require.context('@site/i18n/en/projects', false, /\.(tsx|jsx|mdx)$/)
  );

export const MDXImports = {
  AboutResume: {
    'pt-BR': AboutResume,
    en: AboutResumeEn,
  },
  AboutPage: {
    'pt-BR': AboutPage,
    en: AboutPageEn,
  },
  AboutProjects: {
    'pt-BR': AboutProjects,
    en: AboutProjectsEn,
  },
};
