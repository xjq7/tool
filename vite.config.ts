import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? './' : 'https://static.xjq.icu/tool/',
  plugins: [react()],
  root: '',
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './', 'src/'),
      '@pages': path.resolve(__dirname, './', 'src/pages'),
      '@utils': path.resolve(__dirname, './', 'src/utils'),
      '@services': path.resolve(__dirname, './', 'src/services'),
      '@hooks': path.resolve(__dirname, './', 'src/hooks'),
      '@components': path.resolve(__dirname, './', 'src/components'),
      '@constant': path.resolve(__dirname, './', 'src/constant'),
    },
  },
  // 配置less
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#ff4a4a',
          'text-color-dark': '#333333',
        },
        javascriptEnabled: true,
      },
    },
  },
});
