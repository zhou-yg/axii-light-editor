import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ViteTips } from 'vite-plugin-tips'

const curDirname = dirname(fileURLToPath(import.meta.url))
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  server: {
    port: 3009
  },
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment'
  },
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true }
    }
  },
  build: {
    lib: {
      entry: './lib/index.js',
      name: 'axii-light-editor'
    },
    rollupOptions: {
      minified: false,
      external: ['axii'],
      plugins: [
      ],
    }
  },
  plugins: [
    ViteTips()
  ],
  define: {
    __DEV__: true
  }
}

export default config
