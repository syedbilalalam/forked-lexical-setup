import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    include: [
      // 'lexical',
      // '@lexical/react',
      // '@lexical/rich-text',
      // '@lexical/table',
      // '@lexical/list',
      // '@lexical/code',
      // '@lexical/link',
      // '@lexical/hashtag',
      // '@lexical/mark',
      // '@lexical/overflow',
      // '@lexical/plain-text',
      // '@lexical/selection',
      // '@lexical/utils',
      // '@lexical/clipboard',
      // '@lexical/file',
      // '@lexical/history',
      // '@lexical/headless',
      // '@lexical/html',
      // '@lexical/offset',
      // '@lexical/yjs',
      'yjs',
      'y-websocket'
    ]
  },
  define: {
    global: 'globalThis',
  }
})
