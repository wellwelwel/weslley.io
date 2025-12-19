import type { ReactNode } from 'react';
import Admonition from '@theme/Admonition';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseAdmonitionBlocks } from '@site/src/helpers/admonition';

const parseAdmonitions = (content: string): ReactNode[] => {
  const parts: ReactNode[] = [];
  const matches = parseAdmonitionBlocks(content);

  if (matches.length === 0) {
    return [
      <ReactMarkdown key='md-full' remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>,
    ];
  }

  let lastIndex = 0;

  for (const match of matches) {
    if (match.start > lastIndex) {
      const textBefore = content.slice(lastIndex, match.start);
      if (textBefore.trim()) {
        parts.push(
          <ReactMarkdown key={`md-${lastIndex}`} remarkPlugins={[remarkGfm]}>
            {textBefore}
          </ReactMarkdown>
        );
      }
    }

    parts.push(
      <Admonition
        key={`adm-${match.start}`}
        type={match.type}
        title={match.title}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{match.body}</ReactMarkdown>
      </Admonition>
    );

    lastIndex = match.end;
  }

  if (lastIndex < content.length) {
    const remaining = content.slice(lastIndex);
    if (remaining.trim()) {
      parts.push(
        <ReactMarkdown key={`md-${lastIndex}`} remarkPlugins={[remarkGfm]}>
          {remaining}
        </ReactMarkdown>
      );
    }
  }

  return parts;
};

export const MarkdownWithAdmonitions = ({ content }: { content: string }) =>
  parseAdmonitions(content);
