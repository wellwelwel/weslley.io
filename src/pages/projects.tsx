import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Github } from 'lucide-react';

export default (): ReactNode => {
  return (
    <Layout
      title='Projetos'
      description='Lista com a maioria dos projetos que mantenho e co-mantenho com a iniciativa open-source.'
    >
      <div id='projects'>
        <main>
          <header>
            <h1>Projetos (open-source)</h1>
            <img src='/img/projects.svg' alt='' />
            <small>
              Aqui você vai conhecer um pouquinho da história de cada projeto
              que eu mantenho ou co-mantenho.
            </small>
          </header>
          <div className='container'>
            <nav data-website>
              <section>
                <h2>Esse site aqui (esse mesmo)</h2>
                <p>
                  👨🏻‍🎨 Já viu aquele portfólio dahora, mas não tem ideia de como o
                  programador fez? Meu portfólio é <em>open-source</em> e você
                  pode não só olhar, como criar um <em>fork</em> e adaptar para
                  usar no seu próprio portfólio.
                  <br />
                  <br />
                  Ele também serve como uma amostra da minha atuação no{' '}
                  <em>frontend</em>, visto que a maioria dos meus projetos são
                  focados no <em>backend</em>.
                </p>
                <footer>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/wellwelwel/weslley.io'
                  >
                    <Github />
                    <p>
                      wellwelwel/weslley.io
                      <br />
                      Licença: <strong>AGPL-3.0</strong>
                    </p>
                  </Link>
                </footer>
              </section>
            </nav>

            <nav data-lrumin>
              <section>
                <h2>lru.min</h2>
                <p>
                  🔥 Um estudo de performance que resultou no projeto de cache
                  baseado em LRU{' '}
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/wellwelwel/lru.min/blob/main/benchmark/README.md'
                  >
                    mais performático e consistente
                  </Link>{' '}
                  de todo o ecossistema <strong>JavaScript</strong>.
                  <br />
                  <br />
                  Atualmente, ele é usado por{' '}
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/wellwelwel/lru.min/network/dependents'
                  >
                    mais de 60 mil repositórios
                  </Link>{' '}
                  públicos no <strong>GitHub</strong>.
                  <br />
                  <br />
                  <img src='https://img.shields.io/npm/dy/lru.min.svg?color=6c5ce7&label=&logo=npm&logoColor=white' />
                </p>
                <footer>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/wellwelwel/lru.min'
                  >
                    <Github />
                    <p>
                      wellwelwel/lru.min
                      <br />
                      Licença: <strong>MIT</strong>
                    </p>
                  </Link>
                </footer>
              </section>
            </nav>

            <nav data-mysql2>
              <section>
                <h2>MySQL2</h2>
                <p>
                  🐬 Tenho orgulho de ser co-mantenedor do{' '}
                  <strong>MySQL2</strong>, o cliente <strong>MySQL</strong> mais
                  performático e baixado para <strong>Node.js</strong>,{' '}
                  <strong>Bun</strong> e <strong>Deno</strong>, utilizado por{' '}
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/sidorares/node-mysql2/network/dependents'
                  >
                    mais de 880 mil repositórios públicos
                  </Link>{' '}
                  no GitHub.
                  <br />
                  <br />
                  Ele é o principal componente por traz de projetos como{' '}
                  <strong>Sequelize</strong>, <strong>Drizzle ORM</strong>,{' '}
                  <strong>TypeORM</strong>, <strong>Knex</strong>, entre outros{' '}
                  <em>frameworks (ORM)</em> para conexõeds{' '}
                  <strong>MySQL</strong>.
                  <br />
                  <br />
                  Em 24 de março de 2024, migrei todo o conjunto de testes do{' '}
                  <strong>MySQL2</strong> para o <strong>Poku</strong>,
                  garantindo a compatibilidade entre <strong>Node.js</strong>,{' '}
                  <strong>Bun</strong> e <strong>Deno</strong>, o que nos leva
                  para o próximo projeto.
                  <br />
                  <br />
                  <img src='https://img.shields.io/npm/dy/mysql2.svg?color=6c5ce7&label=&logo=npm&logoColor=white' />
                </p>
                <footer>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/sidorares/node-mysql2'
                  >
                    <Github />
                    <p>
                      sidorares/node-mysql2
                      <br />
                      Licença: <strong>MIT</strong>
                    </p>
                  </Link>
                </footer>
              </section>
            </nav>

            <nav data-poku>
              <section>
                <h2>Poku</h2>
                <p>
                  🐷 Como criador de dependências, a ideia inicial era criar um{' '}
                  <em>test runner</em> que garantisse de forma fiel se meus
                  projetos funcionavam para <strong>Node.js</strong>,{' '}
                  <strong>Deno</strong> e <strong>Bun</strong> ao mesmo tempo,
                  usando a mesma suíte de testes para isso. Então surgiu uma
                  ideia: <strong>E se eu tornasse os testes fáceis?</strong>
                  <br />
                  <br />
                  Como resultado, surgiu um <em>test runner</em> com zero
                  configurações e que vai nas origens do{' '}
                  <strong>JavaScript</strong> e traz de volta a sintaxe nativa
                  para os testes, performando até{' '}
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/wellwelwel/poku/blob/main/benchmark/README.md'
                  >
                    5 vezes mais
                  </Link>{' '}
                  que o <strong>Jest</strong>, o <em>test runner</em> mais
                  popular de todo ecossistema <strong>JavaScript</strong> em
                  testes simples.
                  <br />
                  <br />
                  <img src='https://img.shields.io/npm/dy/poku.svg?color=6c5ce7&label=&logo=npm&logoColor=white' />
                </p>
                <footer>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/wellwelwel/poku'
                  >
                    <Github />
                    <p>
                      wellwelwel/poku
                      <br />
                      Licença: <strong>MIT</strong>
                    </p>
                  </Link>
                </footer>
              </section>
            </nav>

            <nav data-svps>
              <section>
                <h2>SVPS: Simplifying VPS</h2>
                <p>
                  🚀 A ideia original era apenas automatizar algumas tarefas
                  pessoais quando eu comprava <strong>VPS</strong> ou{' '}
                  <strong>EC2</strong> "zeradas", mas acabou virando um{' '}
                  <strong>ORM</strong>
                  completo e robusto para servidores <strong>Ubuntu</strong>.
                  Mesmo sendo pouco popular, esse projeto é uma fonte
                  majoriataria do lucro da minha empresa.
                  <br />
                  <br />
                  Além de reparar, instalar de forma granular as ferramentas
                  mais usadas em servidores, o <strong>SVPS</strong> também
                  permite criar <em>proxies</em> automaticamente, direcionando
                  portas para qualquer domínio ou <em>CNAME</em> que você
                  quiser.
                  <br />
                  <br />
                  <img src='https://img.shields.io/npm/dy/svps.svg?color=6c5ce7&label=&logo=npm&logoColor=white' />
                </p>
                <footer>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/wellwelwel/svps'
                  >
                    <Github />
                    <p>
                      wellwelwel/poku
                      <br />
                      Licença: <strong>MIT</strong>
                    </p>
                  </Link>
                </footer>
              </section>
            </nav>

            <nav data-awssslprofiles>
              <section>
                <h2>AWS SSL Profiles</h2>
                <p>
                  📜 Originado de uma confusão após a <strong>AWS</strong> mudar
                  todos seus certificados de autenticação segura dos serviços{' '}
                  <strong>RDS</strong>, quebrando diversos projetos que
                  funcionavam perfeitamente há anos, esse projeto veio para
                  unificar os certificados em um único lugar.
                  <br />
                  <br />
                  Dessa forma, qualquer mantenedor de um projeto que dependa
                  desses certificados (<code>mysql</code>, <code>mysql2</code> e{' '}
                  <code>pg</code>, em especial), não precisa mais se preocupar
                  com atualizações inesperadas.
                  <br />
                  <br />
                  <img src='https://img.shields.io/npm/dy/aws-ssl-profiles.svg?color=6c5ce7&label=&logo=npm&logoColor=white' />
                </p>
                <footer>
                  <Link
                    target='_blank'
                    rel='noopener noreferrer'
                    to='https://github.com/mysqljs/aws-ssl-profiles'
                  >
                    <Github />
                    <p>
                      mysqljs/aws-ssl-profiles
                      <br />
                      Licença: <strong>MIT</strong>
                    </p>
                  </Link>
                </footer>
              </section>
            </nav>
            <small>
              São MUITOS projetos e com o tempo prometo colocar cada um deles
              aqui, mas é só você olhar meu{' '}
              <Link
                target='_blank'
                rel='noopener noreferrer'
                to='https://github.com/wellwelwel'
              >
                GitHub
              </Link>{' '}
              que tem tudo lá 💡
            </small>
          </div>
        </main>
      </div>
    </Layout>
  );
};
