import { Project } from '../components/Project';

export const SVPS = () => (
  <Project
    name='SVPS: Simplifying VPS'
    organization='wellwelwel'
    repository='svps'
    npm='svps'
    license='MIT'
  >
    <p>
      🚀 A ideia original era apenas automatizar algumas tarefas pessoais quando
      comprava uma <strong>VPS</strong> ou <strong>EC2</strong> "zeradas", mas
      acabou virando um <strong>ORM</strong> extremamente robusto para
      servidores <strong>Ubuntu</strong>.
    </p>
    <p>
      Além de reparar e instalar as ferramentas mais usadas em servidores de
      forma granular e modular, o <strong>SVPS</strong> também permite criar{' '}
      <em>proxies</em> automaticamente, direcionando portas para qualquer
      domínio ou subdomínio que você quiser.
    </p>
    <p>
      Atualmente, esse projeto é uma das fonte majoritárias do lucro da minha
      empresa.
    </p>
  </Project>
);
