import { defineConfig } from 'tsup'
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'normalization/index': 'src/normalization/index.ts',
    'analysis/index': 'src/analysis/index.ts',
    'search/index': 'src/search/index.ts',
    'numbers/index': 'src/numbers/index.ts',
    'tokenization/index': 'src/tokenization/index.ts',
    'string-utils/index': 'src/string-utils/index.ts',
    'encoding/index': 'src/encoding/index.ts',
    'sorting/index': 'src/sorting/index.ts',
    'transliteration/index': 'src/transliteration/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
})
