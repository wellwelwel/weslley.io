import Project from '../components/Project';

const SVPS = () => (
  <Project
    name='SVPS: Simplifying VPS'
    organization='wellwelwel'
    repository='svps'
    npm='svps'
    license='MIT'
  >
    <p>
      🚀 A ideia original era apenas automatizar algumas tarefas pessoais quando
      eu comprava <strong>VPS</strong> ou <strong>EC2</strong> "zeradas", mas
      acabou virando um <strong>ORM</strong>
      completo e robusto para servidores <strong>Ubuntu</strong>. Mesmo sendo
      pouco popular, esse projeto é uma fonte majoriataria do lucro da minha
      empresa.
    </p>
    <p>
      Além de reparar, instalar de forma granular as ferramentas mais usadas em
      servidores, o <strong>SVPS</strong> também permite criar <em>proxies</em>{' '}
      automaticamente, direcionando portas para qualquer domínio ou{' '}
      <em>CNAME</em> que você quiser.
    </p>
  </Project>
);

export default SVPS;
