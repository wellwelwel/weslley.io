import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    CREDLY_EMBED_JS_LOADER_VERSION?: string;
  }
}

type CredlyBadgeProps = {
  badgeId: string;
  width?: number;
  height?: number;
};

export const Credly = ({
  badgeId,
  width = 150,
  height = 250,
}: CredlyBadgeProps) => {
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const host = 'https://www.credly.com';
  const SCRIPT_ATTR = 'data-credly-loader';
  const SCRIPT_SELECTOR = `script[${SCRIPT_ATTR}="true"]`;
  const SCRIPT_SRC = 'https://cdn.credly.com/assets/utilities/embed.js';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    placeholder.setAttribute('data-iframe-width', String(width));
    placeholder.setAttribute('data-iframe-height', String(height));
    placeholder.setAttribute('data-share-badge-id', badgeId);
    placeholder.setAttribute('data-share-badge-host', host);

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

      while (placeholder.firstChild)
        placeholder.removeChild(placeholder.firstChild);
    };
  }, [badgeId, width, height, host]);

  return <div ref={placeholderRef} />;
};
