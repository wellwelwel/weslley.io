import type { FC, ReactNode, ReactSVGElement } from 'react';
import { Github } from 'lucide-react';
import SafeLink from './SafeLink';
import Parallax from './Parallax';

type ProjectOptions = {
  name: string;
  /**
   * Describe your project here. It expects a sequence of paragraphs, but you can use it any way you like.
   *
   * ---
   *
   * ### Example:
   *
   * ```tsx
   * <p>
   *   Something.
   * </p>
   * <p>
   *   Something more.
   * </p>
   * ```
   */
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
  icon?: ReactSVGElement;
};

const Project: FC<ProjectOptions> = ({
  name,
  children = null,
  license,
  organization,
  repository,
  npm,
  url,
  icon,
}) => {
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
    <nav>
      <section>
        <h2>{name}</h2>
        {children}
        {npm ? (
          <Parallax>
            <p>
              <img
                src={`https://img.shields.io/npm/dy/${npm}.svg?color=6c5ce7&label=&logo=npm&logoColor=white`}
              />
            </p>
          </Parallax>
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
                      Licença: <strong>{license}</strong>
                    </>
                  ) : null}
                </p>
              ) : null}
            </SafeLink>
          </footer>
        ) : null}
      </section>
    </nav>
  );
};

export default Project;
