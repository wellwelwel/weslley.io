import Project from '../components/Project';
import SafeLink from '../components/SafeLink';

const LRU_Min = () => (
  <Project
    name='lru.min'
    organization='wellwelwel'
    repository='lru.min'
    npm='lru.min'
    license='MIT'
  >
    <p>
      🔥 Um estudo de performance que resultou no projeto de cache baseado em
      LRU{' '}
      <SafeLink to='https://github.com/wellwelwel/lru.min/blob/main/benchmark/README.md'>
        mais performático e consistente
      </SafeLink>{' '}
      de todo o ecossistema <strong>JavaScript</strong>.
    </p>
    <p>
      Atualmente, ele é usado por{' '}
      <SafeLink to='https://github.com/wellwelwel/lru.min/network/dependents'>
        mais de 60 mil repositórios
      </SafeLink>{' '}
      públicos no <strong>GitHub</strong>.
    </p>
  </Project>
);

export default LRU_Min;
