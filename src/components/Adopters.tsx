import type { Vars } from '@site/src/helpers/vars';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import clsx from 'clsx';
import Amazon from 'devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg';
import Cloudflare from 'devicon/icons/cloudflare/cloudflare-original.svg';
import Google from 'devicon/icons/google/google-original.svg';
import Nest from 'devicon/icons/nestjs/nestjs-original.svg';
import Vercel from 'devicon/icons/vercel/vercel-original.svg';
import { SiLangchain, SiN8N, SiStrapi } from 'react-icons/si';
import { Microsoft } from '@site/src/components/icons/Microsoft';
import { Tooltip } from '@site/src/components/Tooltip';
import { motion } from '@site/src/helpers/reduced-motion';
import { useReveal } from '@site/src/hooks/useReveal';

type Adopter = {
  name: string;
  Logo: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: string;
};

type ListStyle = Vars<'--ticker-travel'>;

const ADOPTERS: Adopter[] = [
  { name: 'Google', Logo: Google },
  { name: 'Microsoft', Logo: Microsoft },
  { name: 'Amazon Web Services', Logo: Amazon },
  { name: 'Cloudflare', Logo: Cloudflare },
  { name: 'Vercel', Logo: Vercel },
  { name: 'n8n', Logo: SiN8N, tone: 'text-[#ea4b71]' },
  { name: 'NestJS', Logo: Nest },
  { name: 'Strapi', Logo: SiStrapi, tone: 'text-[#4945ff]' },
  { name: 'LangChain', Logo: SiLangchain, tone: 'text-[#1c3c3c]' },
];

const POP = {
  full: '0.75rem',
  reduced: '0.5rem',
};

const LEAD = 420;
const STEP = 40;

const CHIP =
  'group relative flex size-[clamp(2.5rem,6.67svh-0.5rem,3.5rem)] cursor-pointer animate-ticker appearance-none items-center justify-center rounded-2xl border-0 bg-[#ffffffbd] p-0 shadow-[0_1px_2px_var(--shade-soft),0_4px_10px_-4px_var(--shade-deep)] transition-[scale] duration-250 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95';

const LOGO =
  'size-[45%] transition-[scale] duration-250 ease-swift group-hover:scale-110 group-data-revealed:scale-115';

export const Adopters = (): ReactNode => {
  const { container, revealed, toggle } = useReveal<HTMLUListElement>();

  const style: ListStyle = {
    '--ticker-travel': motion(POP),
  };

  return (
    <div
      style={style}
      className='flex flex-col items-center gap-[clamp(0.5rem,1.5svh,0.875rem)]'
    >
      <ul
        ref={container}
        aria-label='Quem usa o MySQL2'
        className='m-0 flex list-none flex-wrap items-center justify-center gap-3 p-0'
      >
        {ADOPTERS.map(({ name, Logo, tone }, index) => (
          <li key={name}>
            <button
              type='button'
              data-revealed={revealed === name || undefined}
              onPointerDown={({ pointerType }) =>
                pointerType !== 'mouse' && toggle(name)
              }
              style={{ animationDelay: `${LEAD + index * STEP}ms` }}
              className={clsx(CHIP, tone)}
            >
              <Logo aria-hidden className={LOGO} />
              <span className='sr-only'>{name}</span>
              <Tooltip label={name} />
            </button>
          </li>
        ))}
      </ul>

      <p
        style={{ animationDelay: `${LEAD + ADOPTERS.length * STEP}ms` }}
        className='m-0 max-w-[52ch] animate-ticker text-[0.625rem]/[1.4] font-medium text-ink/45 text-balance'
      >
        All product names, trademarks, and registered trademarks mentioned are
        the property of their respective owners.
      </p>
    </div>
  );
};
