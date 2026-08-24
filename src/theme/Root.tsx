import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

type RootOptions = {
  children: ReactNode;
};

const OFFSET = 50;

const toTop = (element: Element) => {
  element.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
};

const Root = ({ children }: RootOptions): ReactNode => {
  const location = useLocation();

  useEffect(() => {
    const doc = document.querySelector('#__docusaurus');
    if (!doc) return;

    if (!location.hash) {
      toTop(doc);
      return;
    }

    try {
      const anchor = document.querySelector(location.hash);
      if (!anchor) {
        toTop(doc);
        return;
      }

      const top = anchor.getBoundingClientRect().top + window.scrollY - OFFSET;

      doc.scrollTo({
        top,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(error);
    }
  }, [location.key]);

  return children;
};

export default Root;
