import { describe, it, strict } from 'poku';
import { extractSummary } from '../../tools/extract-summary';

describe('extractSummary', () => {
  it(() => {
    const content = 'This is just plain text without any headings.';
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [],
      'should return empty array for content without headings'
    );
  });

  it(() => {
    const content = '# Main Title';
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'Main Title',
          level: 1,
          items: [],
        },
      ],
      'should extract single heading'
    );
  });

  it(() => {
    const content = `# First Heading
# Second Heading
# Third Heading`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'First Heading',
          level: 1,
          items: [],
        },
        {
          text: 'Second Heading',
          level: 1,
          items: [],
        },
        {
          text: 'Third Heading',
          level: 1,
          items: [],
        },
      ],
      'should extract multiple headings at same level'
    );
  });

  it(() => {
    const content = `# Main Title
## Subtitle 1
## Subtitle 2`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'Main Title',
          level: 1,
          items: [
            {
              text: 'Subtitle 1',
              level: 2,
              items: [],
            },
            {
              text: 'Subtitle 2',
              level: 2,
              items: [],
            },
          ],
        },
      ],
      'should create nested structure for different heading levels'
    );
  });

  it(() => {
    const content = `# Level 1
## Level 2
### Level 3
#### Level 4`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'Level 1',
          level: 1,
          items: [
            {
              text: 'Level 2',
              level: 2,
              items: [
                {
                  text: 'Level 3',
                  level: 3,
                  items: [
                    {
                      text: 'Level 4',
                      level: 4,
                      items: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      'should handle deeply nested headings'
    );
  });

  it(() => {
    const content = `# Introduction
## Getting Started
### Prerequisites
### Installation
## Configuration
### Basic Setup
### Advanced Options
# Conclusion`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'Introduction',
          level: 1,
          items: [
            {
              text: 'Getting Started',
              level: 2,
              items: [
                {
                  text: 'Prerequisites',
                  level: 3,
                  items: [],
                },
                {
                  text: 'Installation',
                  level: 3,
                  items: [],
                },
              ],
            },
            {
              text: 'Configuration',
              level: 2,
              items: [
                {
                  text: 'Basic Setup',
                  level: 3,
                  items: [],
                },
                {
                  text: 'Advanced Options',
                  level: 3,
                  items: [],
                },
              ],
            },
          ],
        },
        {
          text: 'Conclusion',
          level: 1,
          items: [],
        },
      ],
      'should handle complex hierarchy with multiple branches'
    );
  });

  it(() => {
    const content = '#     Title with spaces     ';
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'Title with spaces',
          level: 1,
          items: [],
        },
      ],
      'should trim whitespace from heading text'
    );
  });

  it(() => {
    const content = `# What is Node.js?
## Features & Benefits
### Performance (1/2)`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'What is Node.js?',
          level: 1,
          items: [
            {
              text: 'Features & Benefits',
              level: 2,
              items: [
                {
                  text: 'Performance (1/2)',
                  level: 3,
                  items: [],
                },
              ],
            },
          ],
        },
      ],
      'should handle headings with special characters'
    );
  });

  it(() => {
    const content = `# H1
## H2
### H3
#### H4
##### H5
###### H6`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'H1',
          level: 1,
          items: [
            {
              text: 'H2',
              level: 2,
              items: [
                {
                  text: 'H3',
                  level: 3,
                  items: [
                    {
                      text: 'H4',
                      level: 4,
                      items: [
                        {
                          text: 'H5',
                          level: 5,
                          items: [
                            {
                              text: 'H6',
                              level: 6,
                              items: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      'should handle all six heading levels'
    );
  });

  it(() => {
    const content = `# Main
## Sub 1
### Deep 1
## Sub 2
### Deep 2`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'Main',
          level: 1,
          items: [
            {
              text: 'Sub 1',
              level: 2,
              items: [
                {
                  text: 'Deep 1',
                  level: 3,
                  items: [],
                },
              ],
            },
            {
              text: 'Sub 2',
              level: 2,
              items: [
                {
                  text: 'Deep 2',
                  level: 3,
                  items: [],
                },
              ],
            },
          ],
        },
      ],
      'should reset nesting when returning to lower level'
    );
  });

  it(() => {
    const content = `Some text before

# First Heading

Paragraph here

## Second Heading

More content

### Third Heading

Final text`;
    const result = extractSummary(content);

    strict.deepEqual(
      result,
      [
        {
          text: 'First Heading',
          level: 1,
          items: [
            {
              text: 'Second Heading',
              level: 2,
              items: [
                {
                  text: 'Third Heading',
                  level: 3,
                  items: [],
                },
              ],
            },
          ],
        },
      ],
      'should handle headings with mixed content'
    );
  });
});
