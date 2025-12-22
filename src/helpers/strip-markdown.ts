import removeMd from 'remove-markdown';

export const stripMarkdown = (md: string): string => {
  const stripped = removeMd(md, {
    gfm: false,
    useImgAltText: false,
  });

  return stripped
    .replace(/:::(.+)?/g, '')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
};
