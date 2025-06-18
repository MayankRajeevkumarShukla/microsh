import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['bin/microsh.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist',
  splitting: false,
  clean: true,
  dts: false,
})
