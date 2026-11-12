import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` -> normal multi-file build in dist/
// SINGLE=1 npm run build -> one self-contained HTML (used only for the hosted preview)
const single = process.env.SINGLE === '1';

export default defineConfig({
  plugins: [react(), ...(single ? [viteSingleFile()] : [])],
  define: { __HASH_ROUTER__: JSON.stringify(single) },
  build: single ? { outDir: 'dist-single' } : { outDir: 'dist' },
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000', '/uploads': 'http://localhost:5000' },
  },
});
