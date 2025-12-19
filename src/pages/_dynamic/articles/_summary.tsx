import type { SummaryItem } from '../../../@types/article';
import { useContext, useEffect, useMemo, useState } from 'react';
import GithubSlugger from 'github-slugger';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SideContext } from '../../../components/Side/context';

const regex = /[_*:"'?]/g;

const filterVisibleHeadings = (items: SummaryItem[]): SummaryItem[] => {
  const slugger = new GithubSlugger();

  const filterList = (list: SummaryItem[]): SummaryItem[] =>
    list
      .map((item) => {
        const anchor = slugger.slug(item.text.replace(regex, ''));
        const element = document.getElementById(anchor);

        if (!element) return null;

        const filteredChildren =
          item.items.length > 0 ? filterList(item.items) : [];

        return {
          ...item,
          items: filteredChildren,
        };
      })
      .filter((item): item is SummaryItem => item !== null);

  return filterList(items);
};

export const Summary = ({ items }: { items: SummaryItem[] }) => {
  const context = useContext(SideContext);
  const [visibleItems, setVisibleItems] = useState<SummaryItem[]>(items);

  const activeId = context?.activeId ?? null;

  useEffect(() => {
    if (!context) {
      setVisibleItems(items);
      return;
    }

    const filtered = filterVisibleHeadings(items);
    setVisibleItems(filtered);
  }, [activeId, items, context]);

  const markdown = useMemo(() => {
    const slugger = new GithubSlugger();

    const generateList = (list: SummaryItem[]): string =>
      list
        .map((item) => {
          const anchor = slugger.slug(item.text.replace(regex, ''));
          const parts = [`- [${item.text}](#${anchor})`];

          if (item.items.length > 0) {
            const nestedList = generateList(item.items);
            const indentedNested = nestedList
              .split('\n')
              .map((line) => `  ${line}`)
              .join('\n');

            parts.push(indentedNested);
          }

          return parts.join('\n');
        })
        .join('\n');

    return generateList(visibleItems);
  }, [visibleItems]);

  if (!markdown) return null;

  return (
    <details>
      <summary>
        <strong>Sumário</strong>
      </summary>

      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </details>
  );
};
