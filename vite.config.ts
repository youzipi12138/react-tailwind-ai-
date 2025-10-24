import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// 将 import.meta.url 转换为当前文件的目录路径
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
