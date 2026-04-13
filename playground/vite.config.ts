import { defineConfig } from 'vite'

export default defineConfig({
  base: '/urdu-tools/playground/',
  esbuild: { target: 'es2022' },
  build: { outDir: 'dist' },
})
