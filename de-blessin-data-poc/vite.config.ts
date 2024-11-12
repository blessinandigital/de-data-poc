import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  base: '', // relative paths
  server: {
    port: 3001,
  },
  plugins: [react()],
  test: {
    environment: 'happy-dom',
  },
}));
