import Project from '../components/Project';
import SafeLink from '../components/SafeLink';

const MySQL2 = () => (
  <Project
    name='MySQL2'
    organization='sidorares'
    repository='node-mysql2'
    npm='mysql2'
    license='MIT'
  >
    <p>
      🐬 Tenho orgulho de ser co-mantenedor do <strong>MySQL2</strong>, o
      cliente <strong>MySQL</strong> mais performático e baixado para{' '}
      <strong>Node.js</strong>, <strong>Bun</strong> e <strong>Deno</strong>,
      utilizado por{' '}
      <SafeLink to='https://github.com/sidorares/node-mysql2/network/dependents'>
        mais de 880 mil repositórios públicos
      </SafeLink>{' '}
      no GitHub.
    </p>
    <p>
      Ele é o principal componente por traz de projetos como{' '}
      <strong>Sequelize</strong>, <strong>Drizzle ORM</strong>,{' '}
      <strong>TypeORM</strong>, <strong>Knex</strong>, entre outros{' '}
      <em>frameworks (ORM)</em> para conexõeds <strong>MySQL</strong>.
    </p>
    <p>
      Em 24 de março de 2024, migrei todo o conjunto de testes do{' '}
      <strong>MySQL2</strong> para o <strong>Poku</strong>, garantindo a
      compatibilidade entre <strong>Node.js</strong>, <strong>Bun</strong> e{' '}
      <strong>Deno</strong>, o que nos leva para o próximo projeto.
    </p>
  </Project>
);

export default MySQL2;
