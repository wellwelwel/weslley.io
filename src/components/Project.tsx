import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { Github } from 'lucide-react';
// import Parallax from './Parallax';

type ProjectOptions = {
  icon: string;
  name: string;
  description: ReactNode;
  href: string;
  alt?: string;
};

const Project: React.FC<ProjectOptions> = ({
  name,
  icon,
  alt = name,
  href,
  description,
}) => {
  return (
    <nav data-lrumin>
      <section>
        <h2>lru.min</h2>
        <p>
          🔥 Um estudo de performance que resultou no projeto de cache baseado
          em LRU{' '}
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
  );
};

export default Project;
