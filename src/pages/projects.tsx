/**
 * Projects are automatically loaded from `src/projects` and use the `default` exported component.
 */

import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import { ProjectsProvider } from '@site/src/contexts/Projects';
import { projects } from '@site/src/helpers/get-contents';
import About from '@site/content/about/projects.mdx';

export default (): ReactNode => {
  return (
    <Layout
      title='Projetos'
      description='Lista com a maioria dos projetos que mantenho e co-mantenho através da iniciativa open-source.'
    >
      <div id='projects'>
        <main>
          <header>
            <h1>Projetos</h1>
            <img loading='lazy' src='/img/projects.svg' alt='' />
            <small>
              <About />
            </small>
          </header>
          <ProjectsProvider>
            <div className='container'>
              {projects.map((Project, i) => (
                <Project key={`project:${i}`} />
              ))}
            </div>
          </ProjectsProvider>
        </main>
      </div>
    </Layout>
  );
};
