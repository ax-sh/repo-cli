import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  // "entry": ["src/index.ts", "scripts/{build,create}.js"],
  eslint: {
    config: ['eslint.config.mjs'],
  },
  ignore: ['.github/**/*', 'vitest.config.ts'],
  ignoreDependencies: [
    // Needed by eslint.
    '@typescript-eslint/.*',
    'eslint-.*',
    'git-cliff',
    'is-ci',

    'tsx',
  ],
  vitest: {
    config: [
      'vitest.config.{js,mjs,ts,cjs,mts,cts}',
      'vitest.{workspace,projects}.{js,mjs,ts,cjs,mts,cts,json}',
    ],
    entry: ['**/*.{bench,test,test-d,spec}.?(c|m)[jt]s?(x)'],
  },
  ignoreBinaries: ['rimraf', 'nr'],
  // ignoreBinaries: ['tsx','rimraf', 'nlx', 'nr', 'act', 'storybook'],
  entry: [
    // 'index.{js,ts}',
    // 'src/index.{js,ts}',
    'src/**/*.{js,ts}',
    // '**/*.{js,ts}'
  ],
  project: ['**/*.{js,ts}'],
}

export default config
