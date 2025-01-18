import type { ReactNode } from 'react';
import { memo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { SafeLink } from '@site/src/components/SafeLink';
import { socials } from '@site/src/helpers/get-contents';

const footers: Record<string, ReactNode> = {
  'pt-BR': (
    <p>
      Direitos Reservados © {new Date().getFullYear()}{' '}
      <SafeLink to='https://github.com/wellwelwel'>
        <strong className='feat'>Weslley Araújo</strong>
      </SafeLink>{' '}
      sob a licença{' '}
      <SafeLink to='https://github.com/wellwelwel/weslley.io/blob/main/LICENSE'>
        <strong className='underline'>
          GNU Affero General Public License v3.0
        </strong>
      </SafeLink>
      .
    </p>
  ),
  en: (
    <p>
      Copyright © {new Date().getFullYear()}{' '}
      <SafeLink to='https://github.com/wellwelwel'>
        <strong className='feat'>Weslley Araújo</strong>
      </SafeLink>{' '}
      under the{' '}
      <SafeLink to='https://github.com/wellwelwel/weslley.io/blob/main/LICENSE'>
        <strong className='underline'>
          GNU Affero General Public License v3.0
        </strong>
      </SafeLink>{' '}
      license.
    </p>
  ),
};

const Footer = (): ReactNode => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const Socials = socials(currentLocale);

  return (
    <footer>
      <aside className='left'>
        <section>{footers[currentLocale]}</section>
      </aside>
      <aside className='right'>
        {Socials.map((Social, i) => (
          <Social key={`card:${i}`} />
        ))}
      </aside>
    </footer>
  );
};

export default memo(Footer);
