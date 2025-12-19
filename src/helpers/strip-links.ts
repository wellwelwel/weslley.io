export const stripLinks = (content: string): string => {
  const result: string[] = [];
  let index = 0;

  while (index < content.length) {
    if (content[index] === '[') {
      const textStart = index + 1;
      let textEnd = textStart;

      while (textEnd < content.length && content[textEnd] !== ']') textEnd++;

      if (textEnd < content.length && content[textEnd] === ']') {
        const urlStart = textEnd + 1;

        if (urlStart < content.length && content[urlStart] === '(') {
          let urlEnd = urlStart + 1;

          while (urlEnd < content.length && content[urlEnd] !== ')') urlEnd++;

          if (urlEnd < content.length) {
            result.push(content.slice(textStart, textEnd));
            index = urlEnd + 1;
            continue;
          }
        }
      }
    }

    result.push(content[index]);
    index++;
  }

  return result.join('');
};
