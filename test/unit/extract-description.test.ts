import { describe, it, strict } from 'poku';
import { extractDescription } from '../../tools/extract-description.js';

describe('extractDescription', () => {
  it(() => {
    const content = 'Some content without truncate marker';
    const result = extractDescription(content);

    strict.equal(
      result,
      null,
      'should return null when no truncate marker is found'
    );
  });

  it(() => {
    const content = '{/* truncate */}';
    const result = extractDescription(content);

    strict.equal(
      result,
      null,
      'should return null when content before truncate is empty'
    );
  });

  it(() => {
    const content = `This is a description
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is a description',
      'should extract description with JSX truncate marker'
    );
  });

  it(() => {
    const content = `This is a description
<!-- truncate -->
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is a description',
      'should extract description with HTML truncate marker'
    );
  });

  it(() => {
    const content = `This is a description
{/*  truncate  */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is a description',
      'should extract description with JSX truncate marker with spaces'
    );
  });

  it(() => {
    const content = `This is a description
<!--  truncate  -->
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is a description',
      'should extract description with HTML truncate marker with spaces'
    );
  });

  it(() => {
    const content = `---
title: Test Article
author: John Doe
---

This is the description
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is the description',
      'should remove front matter from description'
    );
  });

  it(() => {
    const content = `---
title: Test Article

This is the description
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      `---
title: Test Article

This is the description`,
      'should handle front matter without closing delimiter'
    );
  });

  it(() => {
    const content = `This is {/* comment */} a description
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is  a description',
      'should remove JSX comments from description'
    );
  });

  it(() => {
    const content = `This is <!-- comment --> a description
<!-- truncate -->
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is  a description',
      'should remove HTML comments from description'
    );
  });

  it(() => {
    const content = `This {/* first */} is {/* second */} a description
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This  is  a description',
      'should remove multiple JSX comments from description'
    );
  });

  it(() => {
    const content = `This <!-- first --> is <!-- second --> a description
<!-- truncate -->
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This  is  a description',
      'should remove multiple HTML comments from description'
    );
  });

  it(() => {
    const content = `This {/* JSX comment */} is <!-- HTML comment --> a description
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This  is  a description',
      'should remove mixed JSX and HTML comments from description'
    );
  });

  it(() => {
    const content = `This is a description
{/*
  Multiline
  comment
*/}
with text after
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      `This is a description

with text after`,
      'should handle multiline JSX comments'
    );
  });

  it(() => {
    const content = `This is a description
<!--
  Multiline
  comment
-->
with text after
<!-- truncate -->
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      `This is a description

with text after`,
      'should handle multiline HTML comments'
    );
  });

  it(() => {
    const content = `{/* comment */}
{/* truncate */}`;
    const result = extractDescription(content);

    strict.equal(
      result,
      null,
      'should return null when only whitespace remains after processing'
    );
  });

  it(() => {
    const content = `---
title: Complex Article
tags: [test, example]
---

# Introduction

This is {/* inline comment */} the description.

<!-- Another comment -->

{/* truncate */}

## Rest of Content

More content here.`;
    const result = extractDescription(content);

    strict.equal(
      result,
      `# Introduction

This is  the description.`,
      'should handle complex markdown with front matter and comments'
    );
  });

  it(() => {
    const content = `

    This is the description

    {/* truncate */}
    Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is the description',
      'should trim whitespace from final result'
    );
  });

  it(() => {
    const content = `---
title: Only Front Matter
---
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      null,
      'should handle content with only front matter before truncate'
    );
  });

  it(() => {
    const content = `**Bold** and *italic* text with [links](https://example.com)
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      '**Bold** and *italic* text with [links](https://example.com)',
      'should preserve markdown formatting in description'
    );
  });

  it(() => {
    const content = `Code example: {/* not a comment in code block */}
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'Code example:',
      'should handle nested comment-like syntax in description'
    );
  });

  it(() => {
    const content = `This is {/* incomplete
{/* truncate */}
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is te',
      'should handle edge case with incomplete JSX comment before truncate'
    );
  });

  it(() => {
    const content = `This is <!-- incomplete
<!-- truncate -->
Rest of the content`;
    const result = extractDescription(content);

    strict.equal(
      result,
      'This is te',
      'should handle edge case with incomplete HTML comment before truncate'
    );
  });
});
