const removeHtmlTags = (text: string): string => {
  let insideTag = false;

  const result: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '<') {
      insideTag = true;
      continue;
    }

    if (char === '>') {
      insideTag = false;
      continue;
    }

    if (!insideTag) result.push(char);
  }

  return result.join('');
};

export const calculateReadingTime = (
  text: string,
  wordsPerMinute: number = 200
): number => {
  const withoutCodeBlocks = text.replace(/```[\s\S]*?```/g, '');
  const withoutImports = withoutCodeBlocks.replace(/^import\s+.*$/gm, '');
  const withoutHtml = removeHtmlTags(withoutImports);
  const cleanText = withoutHtml.replace(/[#*_\[\]()]/g, '').trim();

  const words = cleanText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, minutes);
};
