import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/urdu-tools/',
  resolve: {
    alias: {
      '@iamahsanmehmood/urdu-tools': path.resolve(
        __dirname,
        '../packages/urdu-js/dist/index.js'
      ),
    },
  },
  esbuild: { target: 'es2022' },
  build: { outDir: 'dist' },
})
