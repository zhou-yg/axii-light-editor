import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ViteTips } from 'vite-plugin-tips'

const curDirname = dirname(fileURLToPath(import.meta.url))
/**
 * @type {import('vite').UserConfig}
 */
const config = {
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
    rollupOptions: {
      input: {
        index: resolve(curDirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].js'
      },
      minified: false
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