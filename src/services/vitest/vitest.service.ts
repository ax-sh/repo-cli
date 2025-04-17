import { filesystem } from 'gluegun'

import { addScriptToPackageJson, exeCmdWithOutput } from '../../lib'
import { addVitestReactTypesToTsconfig } from '../tsconfig/tsconfig.service'

export async function addVitestDeps() {
  const out = await exeCmdWithOutput('ni -D vitest msw@latest @faker-js/faker')
  await addScriptToPackageJson('test', 'dotenv -- vitest run')
  // await toolbox.addScriptToPackageJson('test', 'vitest run')
  await addScriptToPackageJson('test:watch', 'vitest')
  await addScriptToPackageJson('test:snapupdate', 'vitest -u')
  await addScriptToPackageJson('coverage', 'vitest run --coverage')
  return out
}

async function modifyTsconfigForViteReactProject() {
  const tsconfigPath = 'tsconfig.app.json'
  const currentData = filesystem.read(tsconfigPath)!
  const updatedData = await addVitestReactTypesToTsconfig(currentData)
  filesystem.write(tsconfigPath, updatedData)
}

export async function addVitestWithReactTesting() {
  await exeCmdWithOutput('ni -D vitest @testing-library/user-event @testing-library/react @testing-library/dom @types/react @types/react-dom msw@latest @faker-js/faker @testing-library/jest-dom')

  // modify tsconfig for react and vite
  await modifyTsconfigForViteReactProject()

  return 'added types and deps'
}

// export function formatTsFile(script: string) {
//   // eslint-disable-next-line ts/no-unsafe-return
//   return prettier.format(script, {
//     parser: 'typescript',
//   })
// }

export const vitestReactConfigContent = `
/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
`
