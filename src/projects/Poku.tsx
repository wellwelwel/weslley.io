import { Project } from '../components/Project';
import { SafeLink } from '../components/SafeLink';

export const Poku = () => (
  <Project
    name='Poku'
    organization='wellwelwel'
    repository='poku'
    npm='poku'
    license='MIT'
  >
    <p>
      🐷 Como criador de dependências, a ideia inicial era criar um{' '}
      <em>test runner</em> que garantisse de forma fiel se meus projetos
      funcionavam para <strong>Node.js</strong>, <strong>Deno</strong> e{' '}
      <strong>Bun</strong> ao mesmo tempo, usando a mesma suíte de testes para
      isso. Então surgiu uma ideia no caminho:{' '}
      <strong>E se eu tornasse os testes fáceis?</strong>
    </p>
    <p>
      Como resultado, surgiu um <em>test runner</em> com zero configurações, que
      vai nas origens do <strong>JavaScript</strong> e traz de volta a sintaxe
      nativa para os testes, performando até{' '}
      <SafeLink to='https://github.com/wellwelwel/poku/blob/main/benchmark/README.md'>
        5 vezes mais
      </SafeLink>{' '}
      que o <strong>Jest</strong>, o <em>test runner</em> mais popular de todo
      ecossistema <strong>JavaScript</strong> em um <em>benchmark</em> simples.
    </p>
  </Project>
);
