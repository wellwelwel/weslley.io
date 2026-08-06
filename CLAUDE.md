# weslley.io

## Rules

### Types

- Type declarations belong at the top of the file that uses them, always before any variable or constant. Declare a type where it is consumed instead of importing it from a central definitions file.
  - This rule outranks any type organization convention a skill brings in, so follow it whenever the two disagree.

### Imports

- Barrel files are forbidden, both as imports and as exports. Import every module straight from the file that defines it, never through an index that re-exports a folder.

### Styling

- Pages are styled with Tailwind. New pages never use plain CSS or SCSS, and the home page is the reference for how that looks in practice.

### Animation

- Prefer Native CSS for handling animation by default. Reach for JavaScript only when CSS cannot do the job for a reason you can name, and use GSAP when that happens.

### Reduced motion

- Reduced motion softens an animation, it never turns one off. Every animation that reacts to the preference keeps a reduced variant between 50% and 75% of its full travel, so nothing disappears and no element lands without moving.
- Durations are shared across both variants, since the discomfort comes from the distance covered, not from the time it takes.
- Each animated component declares its full and reduced values together, and a single shared check picks between them at runtime. No media query duplicates that decision in CSS.
