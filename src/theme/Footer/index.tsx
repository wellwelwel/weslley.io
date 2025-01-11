import Link from '@docusaurus/Link';
import { memo, type ReactNode } from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';

const Footer = (): ReactNode => {
  return (
    <footer>
      <aside className='left'>
        <img loading='lazy' src='/img/osi.svg' alt='' />
        <section>
          <p>
            <strong>
              <Link to='/'>
                <strong>weslley.io</strong>
              </Link>
            </strong>{' '}
            é um site que serve como um template{' '}
            <SafeLink to='https://github.com/wellwelwel/weslley.io'>
              <strong>open-source</strong>
            </SafeLink>{' '}
            sob a licença{' '}
            <SafeLink to='https://github.com/wellwelwel/weslley.io/blob/main/LICENSE'>
              <strong className='underline'>AGPL-3.0</strong> (GNU Affero
              General Public License)
            </SafeLink>
            .
          </p>
          <p>
            Direitos Reservados © 2024-present{' '}
            <SafeLink to='https://github.com/wellwelwel'>
              <strong className='feat'>Weslley Araújo</strong>
            </SafeLink>
            .
          </p>
        </section>
      </aside>
      <aside className='right'>
        <SafeLink
          to='https://www.linkedin.com/in/wellwelwel/'
          className='underline'
        >
          <Linkedin />
        </SafeLink>
        <SafeLink to='https://github.com/wellwelwel' className='underline'>
          <Github />
        </SafeLink>
        <SafeLink
          to='https://www.instagram.com/wellwelwel/'
          className='underline'
        >
          <Instagram />
        </SafeLink>
      </aside>
    </footer>
  );
};

export default memo(Footer);
