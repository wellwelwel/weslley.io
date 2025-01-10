import Link from '@docusaurus/Link';
import SafeLink from '@site/src/components/SafeLink';
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
}

export default React.memo(Footer);
