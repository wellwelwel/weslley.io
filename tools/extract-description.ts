export const extractDescription = (content: string): string | null => {
  const truncateRegex = /\{\/\*\s*truncate\s*\*\/\}|<!--\s*truncate\s*-->/;

  const match = content.match(truncateRegex);
  if (!match) return null;

  const textBeforeTruncate = content.slice(0, match.index).trim();
  if (!textBeforeTruncate) return null;

  const removeFrontMatter = (text: string): string => {
    if (!text.startsWith('---')) return text;

    const endIndex = text.indexOf('---', 3);
    if (endIndex === -1) return text;

    return text.slice(endIndex + 3).trimStart();
  };

  const removeComments = (text: string): string => {
    let result = '';
    let i = 0;

    while (i < text.length) {
      // JSX comment {/* */}
      if (text[i] === '{' && text[i + 1] === '/' && text[i + 2] === '*') {
        i += 3;

        while (i < text.length - 2) {
          if (text[i] === '*' && text[i + 1] === '/' && text[i + 2] === '}') {
            i += 3;
            break;
          }

          i++;
        }

        continue;
      }

      // HTML comment <!-- -->
      if (
        text[i] === '<' &&
        text[i + 1] === '!' &&
        text[i + 2] === '-' &&
        text[i + 3] === '-'
      ) {
        i += 4;

        while (i < text.length - 2) {
          if (text[i] === '-' && text[i + 1] === '-' && text[i + 2] === '>') {
            i += 3;
            break;
          }

          i++;
        }

        continue;
      }

      result += text[i];
      i++;
    }

    return result;
  };

  const markdownText = removeComments(
    removeFrontMatter(textBeforeTruncate)
  ).trim();

  return markdownText || null;
};
