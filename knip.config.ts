import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  $schema: 'https://unpkg.com/knip@5/schema.json',
  entry: ['index.{js,ts}', 'src/**/*.{ts,js,mjs,cjs}'],
  project: [
    'src/**/*.ts',
    'tsconfig.base.json', // Essential for resolving path aliases
  ],
  prettier: true,
  storybook: false,
  lefthook: false,
  drizzle: false,
  playwright: false,
  'graphql-codegen': false,
  nx: false,
  prisma: false,
  msw: false,
  tsx: false,
  tsup: false,
  unocss: false,
  tailwind: false,
  typescript: true,
  vite: true,
  vitest: true,
  eslint: true,
  'release-it': true,
  ignore: ['**/fixtures', './public'],
  ignoreBinaries: [
    'nr',
    'rimraf',
    'gh',
    // CLI is often a dev dependency used in scripts
  ],
  ignoreDependencies: [
    // Add other dev tools or type packages here if Knip reports them as unused,
    // but they are necessary for your development workflow.
    'tsx',
    '@typescript-eslint/*',
    '@release-it/*',
    'eslint-*',
    'vite',
    'oxlint',
    'is-ci',
    'git-cliff',
  ],
}
export default config
