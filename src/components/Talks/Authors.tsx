import type { Author } from '@site/src/@types/article';
import type { MouseEvent, ReactNode } from 'react';
import { ExternalLink, Mic } from 'lucide-react';
import { Picture } from '@site/src/components/Picture';
import { SafeLink } from '@site/src/components/SafeLink';
import { EYEBROW } from '@site/src/components/Talks/styles';
import { Tooltip } from '@site/src/components/Tooltip';
import { canHover } from '@site/src/helpers/hover';
import { useReveal } from '@site/src/hooks/useReveal';

type AuthorsOptions = {
  authors: Author[];
};

export const Authors = ({ authors }: AuthorsOptions): ReactNode => {
  const heading = authors.length > 1 ? 'Palestrantes' : 'Palestrante';
  const { container, revealed, toggle } = useReveal<HTMLDivElement>();

  const press = (event: MouseEvent<HTMLElement>, name: string) => {
    if (canHover()) return;

    if (revealed !== name) event.preventDefault();

    toggle(name);
  };

  return (
    <section
      aria-label={heading}
      className='flex animate-ticker flex-col gap-2.5'
    >
      <p className={`${EYEBROW} flex items-center gap-1.5`}>
        <Mic className='size-3 shrink-0' aria-hidden='true' />
        {heading}
      </p>

      <div ref={container} className='flex flex-wrap gap-3'>
        {authors.map(({ name, title, url, image_url }) => (
          <SafeLink
            key={name}
            to={url}
            draggable={false}
            aria-label={`${name}, ${title}`}
            data-revealed={revealed === name || undefined}
            onClick={(event) => press(event, name)}
            className='group relative block size-14 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
          >
            <span className='relative block size-full transition-[scale,translate] duration-250 ease-swift group-hover:-translate-y-0.5 group-hover:scale-110 group-focus-visible:scale-110 group-data-revealed:scale-110'>
              <Picture
                src={image_url}
                alt=''
                sizes='3.5rem'
                decoding='async'
                draggable={false}
                className='size-full rounded-2xl object-cover shadow-[0_1px_2px_rgb(14_9_39_/_0.12),0_10px_20px_-12px_rgb(14_9_39_/_0.5)]'
              />

              <span
                aria-hidden='true'
                className='absolute inset-0 flex items-center justify-center rounded-2xl bg-ink/45 opacity-0 transition-opacity duration-250 ease-swift group-hover:opacity-100 group-focus-visible:opacity-100 group-data-revealed:opacity-100'
              >
                <ExternalLink className='size-5 scale-25 text-paper opacity-0 blur-xs transition-[opacity,scale,filter] duration-300 ease-swift group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-focus-visible:scale-100 group-focus-visible:opacity-100 group-focus-visible:blur-none group-data-revealed:scale-100 group-data-revealed:opacity-100 group-data-revealed:blur-none' />
              </span>
            </span>

            <Tooltip label={name} detail={title} />
          </SafeLink>
        ))}
      </div>
    </section>
  );
};
