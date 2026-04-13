import { defineConfig } from 'vite'

export default defineConfig({
  base: '/urdu-tools/',
  esbuild: { target: 'es2022' },
  build: { outDir: 'dist' },
})
