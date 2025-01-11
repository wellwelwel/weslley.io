/**
 * Projects are automatically loaded from `src/projects` and use the `default` exported component.
 */

import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import { ProjectsProvider } from '../contexts/Projects';
import { dynamicRequire } from '../helpers/dynamic-require';

export default (): ReactNode => {
  const context = require.context('@site/projects', false, /\.(tsx|jsx|mdx)$/);
  const projects = dynamicRequire(context);

  return (
    <Layout
      title='Projetos'
      description='Lista com a maioria dos projetos que mantenho e co-mantenho com a iniciativa open-source.'
    >
      <div id='projects'>
        <main>
          <header>
            <h1>Projetos</h1>
            <img loading='lazy' src='/img/projects.svg' alt='' />
            <small>
              Aqui você vai conhecer um pouquinho da história de cada projeto
              que eu mantenho ou co-mantenho.
              <br />
              <strong>OSI:</strong> Open Source Initiative.
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
