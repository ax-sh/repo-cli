/// <reference types="vitest" />
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  console.info('Vitest running=>', mode)
  return {
    plugins: [tsconfigPaths()],
    test: {
      environment: 'node',
      globals: true,
      // include: [
      //   './{src,__tests__}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      // ],
      exclude: [...configDefaults.exclude],
      env: loadEnv(mode, process.cwd(), ''),
    },
  }
})
