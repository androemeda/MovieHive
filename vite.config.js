import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or another plugin if using Vue/Svelte

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
});
