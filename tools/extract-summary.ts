import type { SummaryItem } from '../src/@types/article';

export const extractSummary = (content: string): SummaryItem[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { level: number; text: string }[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    headings.push({ level, text });
  }

  const result: SummaryItem[] = [];
  const stack: {
    item: SummaryItem;
    level: number;
  }[] = [];

  for (const heading of headings) {
    const item: SummaryItem = {
      text: heading.text,
      level: heading.level,
      items: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level)
      stack.pop();

    if (stack.length === 0) result.push(item);
    else stack[stack.length - 1].item.items.push(item);

    stack.push({ item, level: heading.level });
  }

  return result;
};
