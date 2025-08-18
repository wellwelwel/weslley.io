import { useEffect } from 'react';

declare global {
  interface Window {
    CREDLY_EMBED_JS_LOADER_VERSION?: string;
  }
}

const host = 'https://www.credly.com';
const width = 150;
const height = 270;

const Badge = ({ badge }: { badge: string }) => (
  <div
    data-share-badge-host={host}
    data-iframe-width={width}
    data-iframe-height={height}
    data-share-badge-id={badge}
  />
);

export const Credly = ({ badges }: { badges: string[] }) => {
  const SCRIPT_ATTR = 'data-credly-loader';
  const SCRIPT_SELECTOR = `script[${SCRIPT_ATTR}="true"]`;
  const SCRIPT_SRC = 'https://cdn.credly.com/assets/utilities/embed.js';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.src = SCRIPT_SRC;
    script.setAttribute(SCRIPT_ATTR, 'true');

    document.body.appendChild(script);

    return () => {
      const current =
        document.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);

      if (current && current.parentNode)
        current.parentNode.removeChild(current);

      if ('CREDLY_EMBED_JS_LOADER_VERSION' in window)
        window.CREDLY_EMBED_JS_LOADER_VERSION = undefined;
    };
  }, [badges]);

  return (
    <div className='credly-badges'>
      {badges.map((badge) => (
        <Badge key={badge} badge={badge} />
      ))}
    </div>
  );
};
