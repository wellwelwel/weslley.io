# weslley.io

Personal site built with Docusaurus and TypeScript. Content is authored in Portuguese (pt-BR) and English (en-US), while all code and commit messages are always written in English.

## Commands

- `npm run typecheck` checks the TypeScript build.
- `npm run lint` checks formatting, and `npm run lint:fix` applies it.
- `npm test` runs the test suite.

## Structure

- Build scripts and anything that needs backend resources live in `tools/`.
- Docusaurus plugins live in `plugins/`.
- Frontend utilities live in `src/helpers/`, pages in `src/pages/`, and components in `src/components/`.
- Articles and talks live under `i18n/`, with no fixed hierarchy below the locale, so directories are organized freely.
- Tests live in `test/`.

## Skills

- `/lagune` guards security while the work happens, so reach for it whenever you build or change code.
- `/engineering` holds the code conventions, and the rules below only record what this project decides differently.
- `/ui` holds the visual and interaction principles, from surfaces and typography to enter and exit animations.
- `/writer` holds the prose conventions for documents, comments, and anything a person reads.

## Rules

### Types

- Type declarations belong at the top of the file that uses them, always before any variable or constant. Declare a type where it is consumed instead of importing it from a central definitions file.
  - This rule outranks any type organization convention a skill brings in, so follow it whenever the two disagree.
  - Articles and front matter are the exception, since those contracts are shared across the whole site and already live in `src/@types/`.

### Imports

- Barrel files are forbidden, both as imports and as exports. Import every module straight from the file that defines it, never through an index that re-exports a folder.

### Styling

- Pages are styled with Tailwind. New pages never use plain CSS or SCSS, and the home page is the reference for how that looks in practice.
- Older pages still carry native SCSS in `src/css`, which stays as it is. CSS modules are not used.

### Animation

- Prefer Native CSS for handling animation by default. Reach for JavaScript only when CSS cannot do the job for a reason you can name, and use GSAP when that happens.

### Reduced motion

- Reduced motion softens an animation, it never turns one off. Every animation that reacts to the preference keeps a reduced variant between 50% and 75% of its full travel, so nothing disappears and no element lands without moving.
- Durations are shared across both variants, since the discomfort comes from the distance covered, not from the time it takes.
- Each animated component declares its full and reduced values together, and a single shared check picks between them at runtime. No media query duplicates that decision in CSS.

### Naming

- Prefer a single descriptive word, or camel case with two when one is not enough. Past three words, consider turning the value into an object.

### Code style

- Omit braces when a function, loop, or conditional body is a single line.
- Build strings with template literals or `Array.join`, never by appending to a `let` or concatenating with `+`.
- Convert values through global functions such as `String()` instead of prototype methods such as `.toString()`.
- Create objects with dynamic properties through `Object.create(null)`.

### Testing

- Tests run on the Poku runner and cover the helpers and the tooling. Do not test or import `.tsx` files.
- Use `test` for standalone cases, and `describe` with `it` for groups. Poku preserves `async/await`, so await the test blocks.
- Assert through Poku's `strict`, giving every assertion its own descriptive message. When a block holds a single assertion, the description of the block itself can be omitted.
- Ask before creating a test, and ask for a run once it is written.

### Articles

- Articles are MDX or MD with front matter, processed by the utilities in `tools/`.
- Imports inside an `.mdx` article go after the truncate marker.

### Documentation

- Do not write documentation for the project unless it is asked for.
