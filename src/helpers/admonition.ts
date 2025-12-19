type AdmonitionType =
  | 'note'
  | 'tip'
  | 'info'
  | 'warning'
  | 'danger'
  | 'caution';

const ADMONITION_TYPES = new Set<string>([
  'note',
  'tip',
  'info',
  'warning',
  'danger',
  'caution',
]);

interface AdmonitionMatch {
  type: AdmonitionType;
  title: string;
  body: string;
  start: number;
  end: number;
}

export const parseAdmonitionBlocks = (content: string): AdmonitionMatch[] => {
  const matches: AdmonitionMatch[] = [];
  const lines = content.split('\n');
  let lineStart = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const trimmedLine = line.trimStart();

    if (!trimmedLine.startsWith(':::')) {
      lineStart += line.length + 1;
      continue;
    }

    const afterColons = trimmedLine.slice(3);

    let typeEnd = 0;
    while (
      typeEnd < afterColons.length &&
      afterColons[typeEnd] !== '[' &&
      afterColons[typeEnd] !== ' ' &&
      afterColons[typeEnd] !== '\n'
    )
      typeEnd++;

    const type = afterColons.slice(0, typeEnd);

    if (!ADMONITION_TYPES.has(type)) {
      lineStart += line.length + 1;
      continue;
    }

    const remainder = afterColons.slice(typeEnd);
    let title = '';

    if (remainder.startsWith('[')) {
      const closeBracket = remainder.indexOf(']');
      if (closeBracket !== -1) title = remainder.slice(1, closeBracket);
    }

    if (!title && remainder.startsWith(' ')) title = remainder.slice(1).trim();
    if (!title) title = type.charAt(0).toUpperCase() + type.slice(1);

    const bodyLines: string[] = [];
    let closingLineIndex = lineIndex + 1;
    let found = false;

    while (closingLineIndex < lines.length) {
      const closingLine = lines[closingLineIndex].trimStart();
      if (closingLine === ':::') {
        found = true;
        break;
      }

      bodyLines.push(lines[closingLineIndex]);
      closingLineIndex++;
    }

    if (!found) {
      lineStart += line.length + 1;
      continue;
    }

    const start = lineStart;
    let end = lineStart;

    for (
      let blockLineIndex = lineIndex;
      blockLineIndex <= closingLineIndex;
      blockLineIndex++
    )
      end += lines[blockLineIndex].length + 1;

    if (end > content.length) end = content.length;

    matches.push({
      type: type as AdmonitionType,
      title,
      body: bodyLines.join('\n').trim(),
      start,
      end,
    });

    for (
      let skipLineIndex = lineIndex;
      skipLineIndex <= closingLineIndex;
      skipLineIndex++
    )
      lineStart += lines[skipLineIndex].length + 1;

    lineIndex = closingLineIndex;
  }

  return matches;
};
