import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Link } from 'lucide-react';

type SocialShareProps = {
  url: string;
  title: string;
  author: string;
};

const shareText = (title: string, author: string, locale: string) =>
  locale === 'en' ? `"${title}" by ${author}:` : `"${title}" por ${author}:`;

const copyToClipboard = async (text: string, locale: string) => {
  await navigator.clipboard.writeText(text);
  const message =
    locale === 'en'
      ? 'Link copied to clipboard!'
      : 'Link copiado para a área de transferência!';
  alert(message);
};

export const SocialShare = ({ url, title, author }: SocialShareProps) => {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(
    shareText(title, author, currentLocale)
  );

  const translations = {
    shareLinkedIn:
      currentLocale === 'en' ? 'Share on LinkedIn' : 'Compartilhar no LinkedIn',
    shareX: currentLocale === 'en' ? 'Share on X' : 'Compartilhar no X',
    shareThreads:
      currentLocale === 'en' ? 'Share on Threads' : 'Compartilhar no Threads',
    shareWhatsApp:
      currentLocale === 'en' ? 'Share on WhatsApp' : 'Compartilhar no WhatsApp',
    shareReddit:
      currentLocale === 'en' ? 'Share on Reddit' : 'Compartilhar no Reddit',
    shareFacebook:
      currentLocale === 'en' ? 'Share on Facebook' : 'Compartilhar no Facebook',
    copyLink: currentLocale === 'en' ? 'Copy link' : 'Copiar link',
    share: currentLocale === 'en' ? 'Share' : 'Compartilhe',
  };

  const links = [
    {
      name: 'LinkedIn',
      ariaLabel: translations.shareLinkedIn,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
      icon: (
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
    },
    {
      name: 'X',
      ariaLabel: translations.shareX,
      href: `https://twitter.com/intent/tweet?text=${encodedText}%20${encodedUrl}`,
      icon: (
        <svg viewBox='0 0 1226.37 1226.37' xmlns='http://www.w3.org/2000/svg'>
          <path d='m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z' />
        </svg>
      ),
    },
    {
      name: 'Threads',
      ariaLabel: translations.shareThreads,
      href: `https://threads.net/intent/post?text=${encodedText}%20${encodedUrl}`,
      icon: (
        <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
          <path d='m259.965 512h-.147c-76.391-.518-135.117-25.703-174.575-74.879-35.125-43.755-53.232-104.638-53.84-180.936v-.37c.609-76.316 18.715-137.182 53.84-180.936 39.439-49.176 98.184-74.363 174.556-74.879h.295c58.56.387 107.551 15.451 145.626 44.732 35.789 27.529 60.977 66.766 74.879 116.642l-43.514 12.133c-23.545-84.467-83.138-127.65-177.138-128.332-62.064.442-108.99 19.95-139.505 57.971-28.58 35.605-43.349 87.03-43.884 152.836.553 65.825 15.322 117.25 43.884 152.837 30.516 38.019 77.441 57.526 139.505 57.969 55.941-.405 92.967-13.44 123.76-43.606 35.143-34.426 34.498-76.649 23.25-102.333-6.619-15.139-18.643-27.75-34.85-37.302-4.073 28.802-13.239 52.181-27.399 69.791-18.882 23.508-45.653 36.361-79.544 38.185-25.648 1.382-50.355-4.682-69.531-17.092-22.68-14.677-35.955-37.136-37.375-63.244-1.383-25.389 8.685-48.733 28.34-65.734 18.789-16.244 45.211-25.776 76.427-27.528 23.011-1.291 44.528-.276 64.424 3.042-2.637-15.839-7.983-28.395-15.949-37.467-10.953-12.483-27.898-18.862-50.337-19.01h-.627c-18.014 0-42.482 4.941-58.081 28.137l-37.485-25.205c20.872-31.032 54.781-48.106 95.548-48.106h.922c68.167.424 108.751 42.113 112.789 114.926 2.321.979 4.591 1.991 6.84 3.043 31.807 14.954 55.057 37.597 67.263 65.476 17.001 38.867 18.568 102.205-33.041 152.725-39.422 38.609-87.289 56.034-155.197 56.496h-.147l.018.019zm21.389-249.418c-5.163 0-10.4.147-15.748.461-39.181 2.213-63.594 20.154-62.211 45.709 1.457 26.773 30.995 39.218 59.372 37.689 26.127-1.403 60.129-11.562 65.825-79.158-14.42-3.078-30.275-4.701-47.239-4.701z' />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      ariaLabel: translations.shareWhatsApp,
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16.21 4.41C9.973 4.41 4.917 9.465 4.917 15.7c0 2.134.592 4.13 1.62 5.832L4.5 27.59l6.25-2.002a11.241 11.241 0 0 0 5.46 1.404c6.234 0 11.29-5.055 11.29-11.29 0-6.237-5.056-11.292-11.29-11.292zm0 20.69c-1.91 0-3.69-.57-5.173-1.553l-3.61 1.156 1.173-3.49a9.345 9.345 0 0 1-1.79-5.512c0-5.18 4.217-9.4 9.4-9.4 5.183 0 9.397 4.22 9.397 9.4 0 5.188-4.214 9.4-9.398 9.4zm5.293-6.832c-.284-.155-1.673-.906-1.934-1.012-.265-.106-.455-.16-.658.12s-.78.91-.954 1.096c-.176.186-.345.203-.628.048-.282-.154-1.2-.494-2.264-1.517-.83-.795-1.373-1.76-1.53-2.055-.158-.295 0-.445.15-.584.134-.124.3-.326.45-.488.15-.163.203-.28.306-.47.104-.19.06-.36-.005-.506-.066-.147-.59-1.587-.81-2.173-.218-.586-.46-.498-.63-.505-.168-.007-.358-.038-.55-.045-.19-.007-.51.054-.78.332-.277.274-1.05.943-1.1 2.362-.055 1.418.926 2.826 1.064 3.023.137.2 1.874 3.272 4.76 4.537 2.888 1.264 2.9.878 3.43.85.53-.027 1.734-.633 2-1.297.266-.664.287-1.24.22-1.363-.07-.123-.26-.203-.54-.357z'
          />
        </svg>
      ),
    },
    {
      name: 'Reddit',
      ariaLabel: translations.shareReddit,
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title="${encodedTitle}"%20${currentLocale === 'en' ? 'by' : 'por'}%20${encodeURIComponent(author)}`,
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
          <path d='M28.543 15.774a2.953 2.953 0 0 0-2.951-2.949 2.882 2.882 0 0 0-1.9.713 14.075 14.075 0 0 0-6.85-2.044l1.38-4.349 3.768.884a2.452 2.452 0 1 0 .24-1.176l-4.274-1a.6.6 0 0 0-.709.4l-1.659 5.224a14.314 14.314 0 0 0-7.316 2.029 2.908 2.908 0 0 0-1.872-.681 2.942 2.942 0 0 0-1.618 5.4 5.109 5.109 0 0 0-.062.765c0 4.158 5.037 7.541 11.229 7.541s11.22-3.383 11.22-7.541a5.2 5.2 0 0 0-.053-.706 2.963 2.963 0 0 0 1.427-2.51zm-18.008 1.88a1.753 1.753 0 0 1 1.73-1.74 1.73 1.73 0 0 1 1.709 1.74 1.709 1.709 0 0 1-1.709 1.711 1.733 1.733 0 0 1-1.73-1.711zm9.565 4.968a5.573 5.573 0 0 1-4.081 1.272h-.032a5.576 5.576 0 0 1-4.087-1.272.6.6 0 0 1 .844-.854 4.5 4.5 0 0 0 3.238.927h.032a4.5 4.5 0 0 0 3.237-.927.6.6 0 1 1 .844.854zm-.331-3.256a1.726 1.726 0 1 1 1.709-1.712 1.717 1.717 0 0 1-1.712 1.712z' />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      ariaLabel: translations.shareFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      icon: (
        <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
          <path d='M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm5.204 4.911h-3.546c-2.103 0-4.443.885-4.443 3.934.01 1.062 0 2.08 0 3.225h-2.433v3.872h2.509v11.147h4.61v-11.22h3.042l.275-3.81h-3.397s.007-1.695 0-2.187c0-1.205 1.253-1.136 1.329-1.136h2.054V4.911z' />
        </svg>
      ),
    },
  ];

  const copyLink = {
    name: 'Copy Link',
    ariaLabel: translations.copyLink,
    onClick: () => copyToClipboard(url, currentLocale),
  };

  return (
    <div className='social-share'>
      <h4>
        {translations.share}{' '}
        <svg
          viewBox='0 0 24 24'
          height='20'
          width='20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='m23.79 6.98-6.5-6.75c-.212-.221-.537-.29-.82-.176-.284.115-.47.39-.47.696v3.25h-.25c-5.376 0-9.75 4.374-9.75 9.75v1.5c0 .348.245.638.584.717.055.013.11.02.165.02.284 0 .555-.166.685-.426 1.406-2.813 4.233-4.561 7.378-4.561h1.188v3.25c0 .306.186.581.47.696.281.113.608.045.82-.176l6.5-6.75c.28-.29.28-.75 0-1.04z'
            fill='#2196f3'
          />
          <path d='m21.25 24h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-14.5c0-1.517 1.233-2.75 2.75-2.75h3.5c.414 0 .75.336.75.75s-.336.75-.75.75h-3.5c-.689 0-1.25.561-1.25 1.25v14.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-8.5c0-.414.336-.75.75-.75s.75.336.75.75v8.5c0 1.517-1.233 2.75-2.75 2.75z' />
          <path d='m6.75 15.987c-.056 0-.111-.007-.166-.02-.339-.079-.584-.369-.584-.717v-1.5c0-5.376 4.374-9.75 9.75-9.75h.25v-3.25c0-.306.186-.581.47-.695.283-.114.608-.045.82.175l6.5 6.75c.28.291.28.75 0 1.041l-6.5 6.75c-.212.22-.539.29-.82.175-.284-.115-.47-.39-.47-.696v-3.25h-1.188c-3.146 0-5.973 1.748-7.379 4.561-.129.26-.4.426-.683.426zm9-10.487c-4.2 0-7.677 3.155-8.186 7.22 1.815-2.027 4.424-3.22 7.248-3.22h1.938c.414 0 .75.336.75.75v2.14l4.709-4.89-4.709-4.89v2.14c0 .414-.336.75-.75.75z' />
        </svg>
      </h4>
      <div className='share-buttons'>
        {links.map(({ name, ariaLabel, href, icon }) => (
          <a
            key={name}
            href={href}
            target='_blank'
            rel='noopener noreferrer nofollow external'
            aria-label={ariaLabel}
            title={ariaLabel}
          >
            <div className='icon-wrapper'>{icon}</div>
          </a>
        ))}
        <button
          type='button'
          onClick={copyLink.onClick}
          aria-label={copyLink.ariaLabel}
          title={copyLink.ariaLabel}
        >
          <div className='icon-wrapper'>
            <Link />
          </div>
        </button>
      </div>
    </div>
  );
};
