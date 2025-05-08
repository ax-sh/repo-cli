import { filesystem } from 'gluegun'
import { addScriptToPackageJson, exeCmdWithOutput } from '../../lib'

const code = `
// https://github.com/antfu/eslint-config
import antfu from '@antfu/eslint-config'

// Without "files", they are general rules for all files
/** @type {import('eslint').Linter.Config} */
const globalConfig = {
  rules: {
    'style/semi': ['off', 'never'],
    'toml/array-bracket-newline': 'off',
    'ts/no-misused-promises': ['off'],
    'ts/restrict-template-expressions': ['off'],
    'no-console': ['warn', { allow: ['table', 'debug', 'warn', 'error', 'info', 'time', 'timeEnd', 'dir'] }],
  },
};
export default antfu(
  {
    type: 'app',
    test: true,
    typescript: { tsconfigPath: 'tsconfig.json' },
    // typescript: { parserOptions: { project: 'tsconfig.json' } },
    // \`.eslintignore\` is no longer supported in Flat config, use \`ignores\` instead
    ignores: [
      '**/fixtures',
      './public',
      './dist',
      // ...globs
    ],
  },
  globalConfig,
  {},
)
`
export async function addEslint() {
  const out = await exeCmdWithOutput(
    'ni -D eslint @antfu/eslint-config eslint-config-biome @biomejs/biome',
  )
  const eslintConfigFile = './eslint.config.mjs'
  filesystem.write(eslintConfigFile, code)
  await addScriptToPackageJson('lint', 'eslint')
  await addScriptToPackageJson('lint:fix', 'eslint --fix')

  return out
}
