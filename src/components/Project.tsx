import { useContext, type FC, type ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { Github } from 'lucide-react';
import { SafeLink } from './SafeLink';
import { Parallax } from './Parallax';
import { ProjectsContext } from '@site/src/contexts/Projects';

export type ProjectOptions = {
  name: string;
  children?: ReactNode;
  license?: string;
  npm?: string;
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
  npm,
  url,
  icon,
}) => {
  const { getCounter } = useContext(ProjectsContext);
  const counter = getCounter(name);
  const isFirstOnes = counter <= 2;

  const { ref, inView } = isFirstOnes
    ? {}
    : useInView({
        threshold: 0,
        triggerOnce: true,
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
    <nav
      ref={ref}
      className={(() => {
        if (isFirstOnes) return undefined;
        return inView ? 'show' : 'hide';
      })()}
      data-counter={counter}
    >
      <section>
        <h2>{name}</h2>
        {children}
        {npm ? (
          <p>
            <SafeLink to={`https://www.npmjs.com/package/${npm}`}>
              <img
                loading={isFirstOnes ? 'eager' : 'lazy'}
                src={`https://img.shields.io/npm/dy/${npm}.svg?color=6c5ce7&label=&logo=npm&logoColor=white`}
              />
            </SafeLink>
          </p>
        ) : null}

        {link ? (
          <footer>
            <Parallax>
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
                        Licença: <strong>{license}</strong>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </SafeLink>
            </Parallax>
          </footer>
        ) : null}
      </section>
    </nav>
  );
};
