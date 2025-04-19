import { filesystem, print } from 'gluegun'
import { addScriptToPackageJson, exeCmdWithOutput } from '../../lib'

const code = `
import antfu from '@antfu/eslint-config'

const globalConfig = {
  rules: {
    'style/semi': ['off', 'never'],
    'toml/array-bracket-newline': 'off',
    'ts/no-misused-promises': ['off'],
    'ts/restrict-template-expressions': ['off'],
    'no-console': ['warn', { allow: ['table', 'debug', 'warn', 'error'] }],
  },
};
export default antfu(
  { type: 'app', test: true, typescript: { tsconfigPath: 'tsconfig.json' } },
  globalConfig,
  {},
)


`
export async function addEslint() {
  print.info('done')
  const out = await exeCmdWithOutput('ni -D eslint @antfu/eslint-config')
  filesystem.write('./eslint.config.mjs', code)
  await addScriptToPackageJson('lint', 'eslint')
  await addScriptToPackageJson('lint:fix', 'eslint --fix')

  return out
}
