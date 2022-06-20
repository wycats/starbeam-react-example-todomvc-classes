import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@modules[/]/,
        replacement: resolve(root, 'node_modules') + '/',
      },
    ],
  },
  plugins: [react()],
});
