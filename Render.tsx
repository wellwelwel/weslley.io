import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdir, writeFile } from 'node:fs/promises';
import { App } from './src/App.js';

const app = renderToStaticMarkup(<App />);
const html = `<!DOCTYPE html>${app}`;

await mkdir('dist', { recursive: true });
await writeFile('dist/index.html', html, 'utf-8');
