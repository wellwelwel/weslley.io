import type { FC, ReactNode } from 'react';
import { cloneElement, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Github } from 'lucide-react';
import { Parallax } from '@site/src/components/Parallax';
import { SafeLink } from '@site/src/components/SafeLink';
import { useScroll } from '@site/src/hooks/useScroll';
import { skills } from './Skill';

export type ProjectOptions = {
  name: string;
  children?: ReactNode;
  license?: string;
  npm?: string;
  githubStars?: boolean;
  docker?: string;
  vsMarketplaceId?: string;
  /** For **GitHub** only.
   *
   * If the link is not from a **GitHub** repository, use the `url` property instead.
   */
  organization?: string;
  /** For **GitHub** only.
   *
   * If the link is not from a **GitHub** repository, use the `url` property instead.
   */
  repository?: string;
  /**
   * Use this otpion will replace the mounted URL:
   *
   * @default `https://github.com/${organization}/${repository}`
   */
  url?: string;
  icon?: ReactNode;
  image?: string;
  skills?: (keyof typeof skills)[];
};

/**
 * Describe your project here. It expects a sequence of paragraphs, but you can use it any way you like.
 *
 * ---
 *
 * ### Examples
 *
 * - `.tsx` files:
 *
 * > ```tsx
 * > <p>
 * >   Something.
 * > </p>
 * > <p>
 * >   Something more.
 * > </p>
 * > ```
 *
 * - `.mdx` files
 *
 * > ```mdx
 * >   Something.
 * >
 * >   Something more.
 * > ```
 */
export const Project: FC<ProjectOptions> = ({
  name,
  children = null,
  license,
  organization,
  repository,
  githubStars,
  npm,
  docker,
  vsMarketplaceId,
  url,
  icon,
  image,
  skills: currentSkills,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';

  useScroll(ref, (isVisible, target) => {
    if (!isVisible) return;

    target.classList.add('show');
  });

  const hasURL = typeof url === 'string';
  const hasRepository =
    typeof organization === 'string' && typeof repository === 'string';
  const link = (() => {
    if (hasURL) return url;
    if (hasRepository)
      return `https://github.com/${organization}/${repository}`;

    return undefined;
  })();

  return (
    <nav ref={ref} className={image ? 'large' : undefined}>
      <main>
        <section>
          <h2>{name}</h2>
          {children}

          {githubStars || npm || docker || vsMarketplaceId ? (
            <div className='social'>
              {npm ? (
                <p>
                  <SafeLink
                    to={`https://www.npmjs.com/package/${npm}`}
                    title='NPM Downloads per year'
                  >
                    <img
                      loading='lazy'
                      src={`https://img.shields.io/npm/dy/${npm}.svg?color=6c5ce7&label=&logo=npm&logoColor=white`}
                      alt='NPM Downloads per year'
                    />
                  </SafeLink>
                </p>
              ) : null}

              {githubStars ? (
                <p>
                  <SafeLink
                    to={`https://github.com/${organization}/${repository}`}
                    title='GitHub Starts'
                  >
                    <img
                      loading='lazy'
                      src={`https://img.shields.io/github/stars/${organization}/${repository}.svg?style=flat&color=6c5ce7&label=&logo=github&logoColor=white`}
                      alt='GitHub Starts'
                    />
                  </SafeLink>
                </p>
              ) : null}

              {docker ? (
                <p>
                  <SafeLink
                    to={`https://hub.docker.com/r/${organization}/${docker}`}
                    title='Docker Hub Downloads'
                  >
                    <img
                      loading='lazy'
                      src={`https://img.shields.io/docker/pulls/${organization}/${docker}.svg?color=6c5ce7&label=&logo=docker&logoColor=white`}
                      alt='Docker Hub Downloads'
                    />
                  </SafeLink>
                </p>
              ) : null}

              {vsMarketplaceId ? (
                <p>
                  <SafeLink
                    to={`https://marketplace.visualstudio.com/items?itemName=${vsMarketplaceId}`}
                    title='Visual Studio Marketplace Installs'
                  >
                    <img
                      loading='lazy'
                      src={`https://img.shields.io/visual-studio-marketplace/i/${vsMarketplaceId}.svg?color=6c5ce7&logo=dailydotdev&label=&logoColor=white`}
                      alt='Visual Studio Marketplace Installs'
                    />
                  </SafeLink>
                </p>
              ) : null}
            </div>
          ) : null}

          {link ? (
            <footer>
              <SafeLink
                to={
                  url ? url : `https://github.com/${organization}/${repository}`
                }
              >
                {(() => {
                  if (icon) return icon;
                  if (hasRepository) return <Github />;
                  return null;
                })()}

                {hasRepository ? (
                  <p>
                    {`${organization}/${repository}`}
                    <br />
                    {license ? (
                      <>
                        {isPtBr ? 'Licença' : 'License'}:{' '}
                        <strong>{license}</strong>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </SafeLink>
            </footer>
          ) : null}
        </section>
        {image ? (
          <Parallax
            className='banner'
            scale={1.1}
            tiltMaxAngleX={2.5}
            tiltMaxAngleY={2.5}
          >
            <SafeLink to={link}>
              <img src={image} loading='lazy' alt={`${name} banner`} />
            </SafeLink>
          </Parallax>
        ) : null}
      </main>
      {currentSkills ? (
        <footer>
          {currentSkills.map((current) =>
            cloneElement(skills[current](), {
              key: `${name}:${current}`,
            })
          )}
        </footer>
      ) : null}
    </nav>
  );
};
