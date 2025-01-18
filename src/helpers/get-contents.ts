import AboutResume from '@site/content/about/headline.mdx';
import AboutPage from '@site/content/about/page.mdx';
import AboutProjects from '@site/content/about/projects.mdx';
import AboutResumeEn from '@site/i18n/en/content/about/headline.mdx';
import AboutPageEn from '@site/i18n/en/content/about/page.mdx';
import AboutProjectsEn from '@site/i18n/en/content/about/projects.mdx';
import { dynamicRequire } from '@site/src/helpers/dynamic-require';

export const socials = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/content/social', false, /\.(tsx|jsx|mdx)$/)
      : require.context(
          '@site/i18n/en/content/social',
          false,
          /\.(tsx|jsx|mdx)$/
        )
  );

export const anchors = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/content/anchors', false, /\.(tsx|jsx|mdx)$/)
      : require.context(
          '@site/i18n/en/content/anchors',
          false,
          /\.(tsx|jsx|mdx)$/
        )
  );

export const cards = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/content/cards', false, /\.(tsx|jsx|mdx)$/)
      : require.context(
          '@site/i18n/en/content/cards',
          false,
          /\.(tsx|jsx|mdx)$/
        )
  );

export const projects = (locate: string) =>
  dynamicRequire(
    locate === 'pt-BR'
      ? require.context('@site/content/projects', false, /\.(tsx|jsx|mdx)$/)
      : require.context(
          '@site/i18n/en/content/projects',
          false,
          /\.(tsx|jsx|mdx)$/
        )
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
