/**
 * Projects are automatically loaded from `src/projects` and use the `default` exported component.
 */

import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ProjectsProvider } from '@site/src/contexts/Projects';
import { MDXImports, projects } from '@site/src/helpers/get-contents';
import { dynamicImport } from '@site/src/helpers/dynamic-require';
import '@site/src/css/pages/projects.scss';

export default (): ReactNode => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const Projects = projects(currentLocale);
  const About = dynamicImport(currentLocale, MDXImports.AboutProjects);
  const isPtBr = currentLocale === 'pt-BR';
  const title = isPtBr ? 'Projetos' : 'Projects';

  return (
    <Layout
      title={title}
      description='Lista com a maioria dos projetos que mantenho e co-mantenho através da iniciativa open-source.'
    >
      <div id='projects'>
        <main>
          <header>
            <h1>{title}</h1>
            <img loading='lazy' src='/img/projects.svg' alt='' />
            <small>
              <About />
            </small>
          </header>
          <ProjectsProvider>
            <div className='container'>
              {Projects.map((Project, i) => (
                <Project key={`project:${i}`} />
              ))}
            </div>
          </ProjectsProvider>
        </main>
      </div>
    </Layout>
  );
};
