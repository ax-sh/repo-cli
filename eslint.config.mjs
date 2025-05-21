import * as path from "node:path";
import antfu from "@antfu/eslint-config";
import "eslint-plugin-only-warn"

/** @type {import('eslint').Linter.Config} */
const globalConfig = {
  rules: {
    "style/semi": ["off", "never"],
    "toml/array-bracket-newline": "off",
    "ts/no-misused-promises": ["off"],


    "style/brace-style": "off",
    "style/operator-linebreak": "off",
    "ts/restrict-template-expressions": ["off"],
    "no-console": ["warn", {
      allow: [
        'table',
        "debug",
        "warn",
        "error",
        "info",
        "time",
        "timeEnd",
        "dir",
      ],
    }],
  },
};

/** @type {import('eslint').Linter.Config} */
const testLinterRules = {
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.m?ts", "__tests__/cli-integration.test.ts"],
      },
      project: path.resolve("tsconfig.tests.json"),
    },
  },
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "node/prefer-global/process": "off",
  },
};

export default antfu(
  {
    typescript: { tsconfigPath: "tsconfig.json" },
    stylistic: { semi: false },
    test: false,
    // ignore files
    ignores: ["vitest.config.ts", "build/**", "knip.config.ts", "cliff.toml"],
  },
  //
  globalConfig,
  testLinterRules, // test specific config
);

// /** @type {import('eslint').Linter.Config} */
// const prettierLinterRules = {
//   extends: ['prettier', "plugin:prettier/recommended"],
// };
// /** @type {import('eslint').Linter.Config} */
// const defaultLinterConfig = {
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
