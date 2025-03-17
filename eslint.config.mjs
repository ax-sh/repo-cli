import * as path from 'node:path';
import antfu from '@antfu/eslint-config'

export default antfu({ typescript: { tsconfigPath: 'tsconfig.json' }, stylistic: { semi: false }, test: false, ignores: ['vitest.config.ts', 'build/**'] },
  // Below is the eslint flat config
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['off', 'never'],
      'ts/no-misused-promises': ['off'],
    },
  }, {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.m?ts', '__tests__/cli-integration.test.ts'],
        },
        project: path.resolve('tsconfig.tests.json'),
      },
    },
  })
// /**
//  * @type {import("eslint").Linter.Config}
//  */
// module.exports = {
//   parser: '@typescript-eslint/parser',
//
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//   },
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//
//     'prettier',
//     'plugin:prettier/recommended',
//   ],
//   rules: {},
//   ignorePatterns: ['build'],
// }
