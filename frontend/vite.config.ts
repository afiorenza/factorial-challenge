import 'dotenv/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const PORT = Number(process.env.PORT);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@test-utils': path.resolve(__dirname, './test-utils')
    }
  },
  server: {
    port: PORT
  }
});
