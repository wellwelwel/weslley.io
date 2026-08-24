import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';

export default defineConfig({
  input: 'worker/index.ts',
  output: {
    file: 'server/index.js',
    format: 'esm',
  },
  external: ['cloudflare:workers', /^node:/],
  plugins: [
    resolve(),
    commonjs(),
    json({ compact: true }),
    esbuild({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.tsx', 'node_modules'],
      target: 'esnext',
    }),
    terser({
      format: {
        comments: false,
        source_map: false,
      },
    }),
  ],
});
