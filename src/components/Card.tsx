import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, ExternalLink, Rocket, Star } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';
import { useScroll } from '@site/src/hooks/useScroll';

type Metric = {
  value?: number;
  label?: string;
};

type Awesome = {
  stats: {
    npm: Metric;
    stars: Metric;
    repositoryDependents: Metric;
  };
};

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
      .then((data: unknown) => {
        const { stats } = data as Awesome;
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
