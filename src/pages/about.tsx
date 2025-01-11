import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Admonition from '@theme/Admonition';
import { SafeLink } from '../components/SafeLink';

export default (): ReactNode => {
  return (
    <Layout title='Sobre' description='Conheça um pouco sobre mim.'>
      <div id='contacts'>
        <main>
          <header>
            <h1>Sobre</h1>
            <img loading='lazy' src='/img/about.svg' alt='' />
          </header>
          <nav>
            <section>
              <h2>Prazer!</h2>
              <p>
                👋🏻 Me chamo <strong>Weslley</strong>, mas você pode me chamar de
                "<strong>Well</strong>".
              </p>
            </section>
            <section>
              <h2>O que eu faço?</h2>
              <div>
                ✨ Sou um desenvolvedor ponta-a-ponta, somando mais de{' '}
                <strong>10 milhões de downloads mensais</strong> em projetos{' '}
                <em>open-source</em> autorais:
                <br />
                <br />
                <SafeLink to='https://www.npmjs.com/~weslley.io'>
                  <img
                    loading='eager'
                    src='https://img.shields.io/npm-stat/dm/weslley.io?style=flat-square&color=6c5ce7&logo=npm&logoColor=white&label=My%20NPM%20packages%20have%20been%20downloaded'
                    alt='NPM Downloads by package author'
                  />
                </SafeLink>
                <br />
                <br />
                🚀 Contribuo ativamente em diversos projetos de alto impacto
                que, juntos, somam mais de{' '}
                <strong>550 milhões de downloads mensais</strong>. Alguns deles
                são:
                <br />
                <br />
                <div className='container'>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/sidorares/node-mysql2/pulls?q=is:merged+author:wellwelwel'>
                            MySQL2
                          </SafeLink>{' '}
                          ➕
                        </td>
                        <td width='117'>
                          <SafeLink to='https://www.npmjs.com/package/mysql2'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/mysql2.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>
                          ⚡️ Fast <b>mysqljs/mysql</b> compatible <b>MySQL</b>{' '}
                          driver for <b>Node.js</b>.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/mysqljs/aws-ssl-profiles/pulls?q=is:merged+author:wellwelwel'>
                            AWS SSL Profiles
                          </SafeLink>{' '}
                          ➕
                        </td>
                        <td>
                          <SafeLink to='https://www.npmjs.com/package/aws-ssl-profiles'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/aws-ssl-profiles.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>
                          📜 AWS RDS SSL certificates bundles{' '}
                          <i>
                            (created under{' '}
                            <SafeLink to='https://github.com/mysqljs'>
                              mysqljs
                            </SafeLink>{' '}
                            organization)
                          </i>
                          .
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/wellwelwel/lru.min/pulls?q=is:merged+author:wellwelwel'>
                            lru.min
                          </SafeLink>{' '}
                          ➕
                        </td>
                        <td>
                          <SafeLink to='https://www.npmjs.com/package/lru.min'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/lru.min.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>
                          🔥 An extremely fast and efficient <b>LRU</b> cache
                          for <b>JavaScript</b>.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/DefinitelyTyped/DefinitelyTyped/pulls?q=is:merged+author:wellwelwel'>
                            @types/node
                          </SafeLink>{' '}
                          ➗
                        </td>
                        <td>
                          <SafeLink to='https://www.npmjs.com/package/@types/node'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/@types/node.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>🐢 Node.js JavaScript runtime.</td>
                      </tr>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/mysqljs/named-placeholders/pulls?q=is:merged+author:wellwelwel'>
                            named-placeholders
                          </SafeLink>{' '}
                          ➗
                        </td>
                        <td>
                          <SafeLink to='https://www.npmjs.com/package/named-placeholders'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/named-placeholders.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>
                          🐬 PDO-style SQL named placeholders to unnamed
                          compiler.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/testdouble/quibble/pulls?q=is:merged+author:wellwelwel'>
                            quibble
                          </SafeLink>{' '}
                          ➗
                        </td>
                        <td>
                          <SafeLink to='https://www.npmjs.com/package/quibble'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/quibble.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>
                          🃏 Makes it easy to replace require'd dependencies.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/BrasilAPI/cep-promise/pulls?q=is:merged+author:wellwelwel'>
                            CEP Promise
                          </SafeLink>{' '}
                          ➗
                        </td>
                        <td>
                          <SafeLink to='https://www.npmjs.com/package/cep-promise'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/cep-promise.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>
                          📪 ZIP code search integrated directly with Correios,
                          ViaCEP, and other services.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <SafeLink to='https://github.com/aashutoshrathi/word-wrap/pulls?q=is:merged+author:wellwelwel'>
                            word-wrap
                          </SafeLink>{' '}
                          ➗
                        </td>
                        <td>
                          <SafeLink to='https://www.npmjs.com/package/@aashutoshrathi/word-wrap'>
                            <img
                              loading='lazy'
                              src='https://img.shields.io/npm/dm/@aashutoshrathi/word-wrap.svg?style=flat-square&color=6c5ce7&label=&logo=npm&logoColor=white'
                              alt='Downloads'
                            />
                          </SafeLink>
                        </td>
                        <td>🅰 Wrap words to a specified length.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <small>
                  ➕ Projetos que mantenho ou co-mantenho.
                  <br />➗ Os números dessas contribuições podem não ser
                  diretamente meus, mas é fascinante tentar medir o impacto que
                  minhas contribuições podem ter direta e indiretamente.
                </small>
              </div>
              <div>
                <br />
                <Admonition type='tip'>
                  Ao clicar no nome de cada projeto da tabela, você vai direto
                  para as minhas contribuições em cada um deles 👨🏻‍💻
                </Admonition>
              </div>
            </section>
            <section>
              <h2>MySQL2</h2>
              <p>
                🐬 Tenho orgulho de ser co-mantenedor do <strong>MySQL2</strong>
                , o driver <strong>MySQL</strong> mais performático e baixado
                para <strong>Node.js</strong>, <strong>Bun</strong> e{' '}
                <strong>Deno</strong>, utilizado por{' '}
                <SafeLink to='https://github.com/sidorares/node-mysql2/network/dependents'>
                  mais de 880 mil projetos públicos
                </SafeLink>{' '}
                no <strong>GitHub</strong>.
              </p>
            </section>
            <section>
              <h2>Poku</h2>
              <p>
                🐷 Também sou o criador do{' '}
                <SafeLink to='https://github.com/wellwelwel/poku'>
                  Poku
                </SafeLink>
                , um executor de testes de alta performance que simplifica a
                forma como você testa seu código com <strong>JavaScript</strong>
                .
              </p>
            </section>
            <section>
              <h2>Impacto</h2>
              <p>
                🌎 Direta ou indiretamente, meu trabalho na comunidade{' '}
                <em>open-source</em> impacta e apoia milhões de desenvolvedores
                globalmente, especialmente no ecossistema{' '}
                <strong>JavaScript</strong>.
                <br />
                <br />
                🧠 Meu objetivo é compartilhar conhecimento de forma única,
                participando de conferências e encontros (meetups), palestrando
                e até em um simples bate-papo casual.
                <br />
                <br />
                🤝 Fique à vontade para entrar em contato e me acompanhar nas
                redes sociais. Estou sempre disposto a discutir maneiras
                criativas de tornar a vida dos desenvolvedores mais fácil e
                segura.
              </p>
            </section>
          </nav>
        </main>
      </div>
    </Layout>
  );
};
