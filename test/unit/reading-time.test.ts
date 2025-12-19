import { describe, it, strict } from 'poku';
import { calculateReadingTime } from '../../tools/reading-time.js';

describe('calculateReadingTime', () => {
  it(() => {
    const text = 'This is a simple test with exactly ten words here now.';
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should return 1 minute for short text');
  });

  it(() => {
    const words = new Array(400).fill('word').join(' ');
    const result = calculateReadingTime(words, 200);

    strict.equal(result, 2, 'should return 2 minutes for 400 words at 200 wpm');
  });

  it(() => {
    const text =
      '<p>This is a <strong>test</strong> with <em>HTML</em> tags.</p>';
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should count only text without HTML tags');
  });

  it(() => {
    const text = `
      Some text before code.
      \`\`\`javascript
      const foo = 'bar';
      const baz = 'qux';
      \`\`\`
      Some text after code.
    `;
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should not count words inside code blocks');
  });

  it(() => {
    const text = '# Heading\n**bold** _italic_ [link](url) (parentheses)';
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should remove markdown formatting symbols');
  });

  it(() => {
    const text = '<div><span><strong>nested</strong> tags</span></div>';
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should handle nested HTML tags correctly');
  });

  it(() => {
    const result = calculateReadingTime('', 200);

    strict.equal(result, 1, 'should return minimum of 1 minute for empty text');
  });

  it(() => {
    const result = calculateReadingTime('   \n\n   \t\t   ', 200);

    strict.equal(
      result,
      1,
      'should return minimum of 1 minute for whitespace-only text'
    );
  });

  it(() => {
    const words = new Array(300).fill('word').join(' ');
    const result = calculateReadingTime(words, 100);

    strict.equal(
      result,
      3,
      'should calculate correctly with custom wpm (300 words at 100 wpm)'
    );
  });

  it(() => {
    const words = new Array(201).fill('word').join(' ');
    const result = calculateReadingTime(words, 200);

    strict.equal(result, 2, 'should round up 201 words to 2 minutes');
  });

  it(() => {
    const text = `
      # Title

      Some **introduction** text with [links](url).

      \`\`\`typescript
      const code = 'should be ignored';
      const more = 'code here';
      \`\`\`

      <div>
        <p>HTML content with <strong>tags</strong></p>
      </div>

      More plain text content here.
    `;
    const result = calculateReadingTime(text, 200);

    strict.ok(
      result >= 1,
      'should handle mixed content and return valid reading time'
    );
  });

  it(() => {
    const text = `
      Text before first block.
      \`\`\`
      code block one
      \`\`\`
      Text between blocks.
      \`\`\`
      code block two
      \`\`\`
      Text after last block.
    `;
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should remove all code blocks');
  });

  it(() => {
    const text = '<p>Unclosed paragraph with <strong>bold text';
    const result = calculateReadingTime(text, 200);

    strict.ok(result >= 1, 'should handle unclosed HTML tags without errors');
  });

  it(() => {
    const text = 'Text with special chars: @#$%^&*()_+-={}[]|:;"<>,.?/~`';
    const result = calculateReadingTime(text, 200);

    strict.ok(result >= 1, 'should handle special characters without errors');
  });

  it(() => {
    const words = new Array(200).fill('word').join(' ');
    const result = calculateReadingTime(words);

    strict.equal(
      result,
      1,
      'should use default 200 wpm when parameter is omitted'
    );
  });

  it(() => {
    const text = `
import React from 'react';
import { Component } from './Component';

This is content with ten words that should be counted.
    `;
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should not count import statements');
  });

  it(() => {
    const text = `
import React from 'react';
import { useState, useEffect } from 'react';
import Component from './Component';
import * as Utils from './utils';
import type { Props } from './types';

${new Array(400).fill('word').join(' ')}
    `;
    const result = calculateReadingTime(text, 200);

    strict.equal(
      result,
      2,
      'should ignore multiple import statements and count only content'
    );
  });

  it(() => {
    const text = `
Some text before imports.

import { Component } from './Component';

Some text after imports.
    `;
    const result = calculateReadingTime(text, 200);

    strict.equal(result, 1, 'should handle imports mixed with regular content');
  });

  it(() => {
    const text = `
\`\`\`typescript
import { Component } from './Component';
\`\`\`

import { RealComponent } from './RealComponent';

Regular text content here.
    `;
    const result = calculateReadingTime(text, 200);

    strict.equal(
      result,
      1,
      'should remove imports outside code blocks but keep code blocks removed'
    );
  });
});
