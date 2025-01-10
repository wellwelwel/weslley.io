import type { FC, ReactNode } from 'react';
import { Github } from 'lucide-react';
import SafeLink from './SafeLink';
// import Parallax from './Parallax';

type ProjectOptions = {
  name: string;
  paragraphs: ReactNode[];
  license?: string;
  npm?: string;
  organization?: string;
  repository?: string;
};

const Project: FC<ProjectOptions> = ({ name }) => {
  return (
    <nav data-lrumin>
      <section>
        <h2>lru.min</h2>
        <p></p>
        <footer>
          <SafeLink to='https://github.com/wellwelwel/lru.min'>
            <Github />
            <p>
              wellwelwel/lru.min
              <br />
              Licença: <strong>MIT</strong>
            </p>
          </SafeLink>
        </footer>
      </section>
    </nav>
  );
};

export default Project;
