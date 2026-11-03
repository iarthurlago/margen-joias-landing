import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  // O workflow define o subdiretório do GitHub Pages; localmente a aplicação usa a raiz.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: { target: 'es2022', copyPublicDir: !isSsrBuild },
}));
