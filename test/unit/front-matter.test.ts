import { describe, it, strict } from 'poku';
import { matter } from '../../tools/front-matter';

describe('matter', () => {
  it(() => {
    const result = matter('');

    strict.deepEqual(
      result,
      {
        data: Object.create(null),
        content: '',
        isEmpty: true,
        matter: '',
      },
      'should return empty result for empty string'
    );
  });

  it(() => {
    const content = 'Just some regular content without front matter';
    const result = matter(content);

    strict.deepEqual(
      result,
      {
        data: Object.create(null),
        content,
        isEmpty: true,
        matter: '',
      },
      'should return empty result for content without front matter'
    );
  });

  it('should parse valid front matter with LF newlines', () => {
    const content = `---
title: Test Article
author: John Doe
tags:
  - test
  - unit
---
This is the content`;

    const result = matter<{
      title: string;
      author: string;
      tags: string[];
    }>(content);

    strict.equal(result.isEmpty, false, 'isEmpty should be false');
    strict.equal(
      result.data.title,
      'Test Article',
      'should parse title correctly'
    );
    strict.equal(
      result.data.author,
      'John Doe',
      'should parse author correctly'
    );
    strict.deepEqual(
      result.data.tags,
      ['test', 'unit'],
      'should parse tags array correctly'
    );
    strict.equal(
      result.content,
      'This is the content',
      'should extract content correctly'
    );
  });

  it('should parse valid front matter with CRLF newlines', () => {
    const content = '---\r\ntitle: Test\r\n---\r\nContent';
    const result = matter(content);

    strict.equal(result.isEmpty, false, 'isEmpty should be false');
    strict.equal(result.data.title, 'Test\r', 'should parse title with CRLF');
    strict.equal(result.content, 'Content', 'should extract content correctly');
  });

  it('should handle empty front matter delimiters', () => {
    const content = '---\n---\nContent here';

    const result = matter(content);

    strict.equal(result.isEmpty, true, 'isEmpty should be true');
    strict.deepEqual(
      result.data,
      Object.create(null),
      'data should be empty object with null prototype'
    );
    strict.equal(
      result.content,
      '---\n---\nContent here',
      'should return original content'
    );
  });

  it('should handle front matter with only whitespace', () => {
    const content = `---

---
Content`;

    const result = matter(content);

    strict.equal(result.isEmpty, true, 'isEmpty should be true');
    strict.equal(result.content, 'Content', 'should extract content correctly');
  });

  it(() => {
    const content = `---
title: No closing delimiter
This continues as content`;

    const result = matter(content);

    strict.deepEqual(
      result,
      {
        data: Object.create(null),
        content,
        isEmpty: true,
        matter: '',
      },
      'should return empty result when close delimiter is missing'
    );
  });

  it('should handle custom delimiters', () => {
    const content = `+++
title: Custom Delimiters
+++
Content`;

    const result = matter<{ title: string }>(content, {
      delimiters: ['+++', '+++'],
    });

    strict.equal(result.isEmpty, false, 'isEmpty should be false');
    strict.equal(
      result.data.title,
      'Custom Delimiters',
      'should parse title correctly'
    );
    strict.equal(result.content, 'Content', 'should extract content correctly');
  });

  it(() => {
    const content = '---\ntitle: Test\n---\n\nContent with leading newline';

    const result = matter(content);

    strict.equal(
      result.content,
      '\nContent with leading newline',
      'should strip leading newline from content'
    );
  });

  it(() => {
    const content = '---\ntitle: Test\n---\n\n\nMultiple newlines preserved';

    const result = matter(content);

    strict.equal(
      result.content,
      '\n\nMultiple newlines preserved',
      'should preserve multiple newlines in content after first'
    );
  });

  it('should handle complex YAML structures', () => {
    const content = `---
title: Complex
meta:
  description: A test
  keywords:
    - one
    - two
enabled: true
count: 42
---
Content`;

    const result = matter<{
      title: string;
      meta: { description: string; keywords: string[] };
      enabled: boolean;
      count: number;
    }>(content);

    strict.equal(result.data.title, 'Complex', 'should parse title correctly');
    strict.equal(
      result.data.meta.description,
      'A test',
      'should parse nested meta description'
    );
    strict.deepEqual(
      result.data.meta.keywords,
      ['one', 'two'],
      'should parse nested keywords array'
    );
    strict.equal(result.data.enabled, true, 'should parse boolean value');
    strict.equal(result.data.count, 42, 'should parse number value');
  });

  it(() => {
    const matterContent = `title: Test
author: John`;
    const content = `---
${matterContent}
---
Body`;

    const result = matter(content);

    strict.equal(
      result.matter,
      matterContent,
      'should preserve matter content as string'
    );
  });

  it('should handle content with delimiter-like strings in body', () => {
    const content = `---
title: Test
---
This content has --- in it
And more --- text`;

    const result = matter<{ title: string }>(content);

    strict.equal(result.data.title, 'Test', 'should parse title correctly');
    strict.equal(
      result.content,
      'This content has --- in it\nAnd more --- text',
      'should preserve delimiter-like strings in content'
    );
  });

  it(() => {
    const result = matter(null as unknown as string);

    strict.deepEqual(
      result,
      {
        data: Object.create(null),
        content: null,
        isEmpty: true,
        matter: '',
      },
      'should handle null or undefined input gracefully'
    );
  });

  it(() => {
    const content = 'No front matter';
    const result = matter(content);

    strict.equal(
      Object.getPrototypeOf(result.data),
      null,
      'should create data object with null prototype when empty'
    );
  });

  it(() => {
    const content = '---\n\n---\nContent';
    const result = matter(content);

    strict.equal(
      Object.getPrototypeOf(result.data),
      null,
      'should parse data object with null prototype'
    );
  });

  it('should handle front matter at start with no leading newline after open delimiter', () => {
    const content = `---title: No Newline
---
Content`;

    const result = matter<{ title: string }>(content);

    strict.equal(
      result.data.title,
      'No Newline',
      'should parse title without newline after delimiter'
    );
    strict.equal(result.content, 'Content', 'should extract content correctly');
  });
});
