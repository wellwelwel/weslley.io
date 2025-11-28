import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  Box,
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  Rocket,
  Star,
  TicketPercent,
} from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';
import { useScroll } from '@site/src/hooks/useScroll';

export type CardOptions = {
  name: string;
  imageSrc: string;
  children: ReactNode;
  url: string;
  alt?: string;
  npm?: string;
  repo?: string;
  className?: string;
};

export type TalkCardOptions = CardOptions & {
  date?: string;
  location?: string;
  coupon?: {
    code?: string;
    url?: string;
  };
};

export const Card: FC<CardOptions> = ({
  name,
  imageSrc,
  alt,
  url,
  repo,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<{
    downloads?: string;
    stars?: string;
    repositoryDependents?: string;
  }>(Object.create(null));

  useScroll(ref, (isVisible, target) => {
    if (!isVisible) return;

    target.classList.add('show');
  });

  useEffect(() => {
    if (!repo) return;

    const controller = new AbortController();

    fetch(`https://awesomeyou.io/assets/json/projects/${repo}.json`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then(({ stats }) => {
        setStats({
          downloads: stats.npm.value ? stats.npm.label : undefined,
          stars: stats.stars.label,
          repositoryDependents: stats.repositoryDependents.label,
        });
      });

    return () => controller.abort();
  }, [repo]);

  return (
    <div ref={ref} {...props}>
      <SafeLink
        to={url}
        title={alt}
        className={repo ? 'has-footer' : undefined}
      >
        <img loading='lazy' decoding='async' src={imageSrc} alt={alt} />
        <div>
          <header>{name}</header>
          <main>{children}</main>
        </div>
        <ExternalLink />
      </SafeLink>
      {repo && (
        <footer>
          <img loading='lazy' decoding='async' src={imageSrc} alt={alt} />
          {stats?.downloads && (
            <div className='group'>
              <Rocket />
              <span>
                <strong>{stats.downloads}</strong>{' '}
                {stats.downloads?.includes('milh') ? 'de' : ''} downloads
                mensais
              </span>
            </div>
          )}
          <div className='group'>
            <Box />
            <span>
              <strong>{stats?.repositoryDependents}</strong>{' '}
              {stats?.repositoryDependents?.includes('milh') ? 'de' : ''}{' '}
              repositórios públicos dependentes
            </span>
          </div>
          <div className='group'>
            <Star />
            <span>
              <strong>{stats?.stars}</strong> estrelas
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export const TalkCard: FC<TalkCardOptions> = ({
  name,
  imageSrc,
  alt,
  url,
  children,
  date: datetime,
  location,
  coupon,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';
  const hasFooter = datetime || location || coupon;
  const date = datetime
    ? new Date(datetime).toLocaleDateString(isPtBr ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : undefined;
  const time = datetime
    ? (() => {
        const dateObj = new Date(datetime);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();

        if (hours === 0 && minutes === 0) return undefined;

        return dateObj.toLocaleTimeString(isPtBr ? 'pt-BR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      })()
    : undefined;

  const isPast = Boolean(datetime && new Date() > new Date(datetime));

  const LinkContent = () => (
    <>
      <img loading='lazy' decoding='async' src={imageSrc} alt={alt} />
      <div>
        <header>{name}</header>
        <main>{children}</main>
      </div>
      <ExternalLink />
    </>
  );

  useScroll(ref, (isVisible, target) => {
    if (!isVisible) return;

    target.classList.add('show');
  });

  return (
    <div
      ref={ref}
      className={(() => {
        const classes: string[] = [];

        if (isPast) classes.push('past');
        if (className) classes.push(className);

        return classes.join(' ');
      })()}
    >
      {url.startsWith('http') ? (
        <SafeLink
          to={url}
          title={alt}
          className={hasFooter ? 'has-footer' : undefined}
        >
          <LinkContent />
        </SafeLink>
      ) : (
        <Link
          to={url}
          title={alt}
          className={hasFooter ? 'has-footer' : undefined}
        >
          <LinkContent />
        </Link>
      )}
      {hasFooter && (
        <footer>
          <img loading='lazy' decoding='async' src={imageSrc} alt={alt} />
          {(datetime || coupon) && (
            <div className='groups'>
              {datetime && (
                <>
                  <div className='group'>
                    <CalendarDays />
                    <time>{date}</time>
                  </div>
                  {time && (
                    <div className='group'>
                      <Clock />
                      <time dateTime={time}>
                        {time}
                        {`${isPtBr ? 'h' : ''}`}
                      </time>
                    </div>
                  )}
                </>
              )}
              {coupon && (
                <div className='group'>
                  <TicketPercent />
                  <SafeLink to={coupon.url} title={isPtBr ? 'Cupom' : 'Coupon'}>
                    {coupon.code}
                    <ExternalLink />
                  </SafeLink>
                </div>
              )}
            </div>
          )}
          {location && (
            <div className='group'>
              <MapPin />
              <address>{location}</address>
            </div>
          )}
        </footer>
      )}
    </div>
  );
};
