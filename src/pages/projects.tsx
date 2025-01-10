import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Portfolio from '../projects/Portfolio';
import LRU_Min from '../projects/LRU_Min';
import MySQL2 from '../projects/MySQL2';
import Poku from '../projects/Poku';
import SVPS from '../projects/SVPS';
import AWS_SSL_Profiles from '../projects/AWS_SSL_Profiles';
import WIP from '../projects/WIP';

export default (): ReactNode => {
  return (
    <Layout
      title='Projetos'
      description='Lista com a maioria dos projetos que mantenho e co-mantenho com a iniciativa open-source.'
    >
      <div id='projects'>
        <main>
          <header>
            <h1>Projetos</h1>
            <img src='/img/projects.svg' alt='' />
            <small>
              Aqui você vai conhecer um pouquinho da história de cada projeto
              que eu mantenho ou co-mantenho.
            </small>
          </header>
          <div className='container'>
            <Portfolio />
            <LRU_Min />
            <MySQL2 />
            <Poku />
            <SVPS />
            <AWS_SSL_Profiles />
            <WIP />
          </div>
        </main>
      </div>
    </Layout>
  );
};
