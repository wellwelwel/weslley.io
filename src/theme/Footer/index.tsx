import Link from '@docusaurus/Link';
import { Github, Instagram, Linkedin } from 'lucide-react';
import React, { type ReactNode } from 'react';

function Footer(): ReactNode {
  return (
    <footer>
      <aside className='left'>
        <img src='/img/osi.svg' alt='' />
        <section>
          <p>
            <strong>
              <Link to='/'>
                <strong>weslley.io</strong>
              </Link>
            </strong>{' '}
            é um site{' '}
            <Link
              target='_blank'
              rel='noopener noreferrer'
              to='https://github.com/wellwelwel/weslley.io'
            >
              <strong>open-source</strong>
            </Link>{' '}
            sob a licença{' '}
            <Link
              target='_blank'
              rel='noopener noreferrer'
              to='https://github.com/wellwelwel/weslley.io/blob/main/LICENSE'
            >
              <strong className='underline'>AGPL-3.0</strong> (GNU Affero
              General Public License)
            </Link>
            .
          </p>
          <p>
            Direitos Reservados © 2024-present{' '}
            <Link
              target='_blank'
              rel='noopener noreferrer'
              to='https://github.com/wellwelwel'
            >
              <strong className='feat'>Weslley Araújo</strong>
            </Link>
            .
          </p>
        </section>
      </aside>
      <aside className='right'>
        <Link
          target='_blank'
          rel='noopener noreferrer'
          to='https://www.linkedin.com/in/wellwelwel/'
          className='underline'
        >
          <Linkedin />
        </Link>
        <Link
          target='_blank'
          rel='noopener noreferrer'
          to='https://github.com/wellwelwel'
          className='underline'
        >
          <Github />
        </Link>
        <Link
          target='_blank'
          rel='noopener noreferrer'
          to='https://www.instagram.com/wellwelwel/'
          className='underline'
        >
          <Instagram />
        </Link>
      </aside>
    </footer>
  );
}

export default React.memo(Footer);
