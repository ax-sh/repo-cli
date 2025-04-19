import { filesystem } from 'gluegun'

import prettier from 'prettier'
import { KnownError } from '../../errors'
import { addScriptToPackageJson, exeCmdWithOutput } from '../../lib'
import { addVitestReactTypesToTsconfig } from '../tsconfig/tsconfig.service'

export const vitestReactConfigContent = `
/// <reference types="vitest" />
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()]
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
`

const vitestReactSetup = `import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});`

export async function writeVitestConfig() {
  const vitestConfigPath = 'vitest.config.ts'
  const setupFile = 'vitest.setup.ts'
  if (filesystem.isFile(vitestConfigPath)) {
    throw new KnownError('🚨 vite.config.ts already exists; not overwriting with default')
  }

  filesystem.write(vitestConfigPath, await formatTsFile(vitestReactConfigContent))
  filesystem.write(setupFile, await formatTsFile(vitestReactSetup))

  return true
}

export async function addVitestDeps() {
  const out = await exeCmdWithOutput('ni -D vitest msw@latest @faker-js/faker vite-tsconfig-paths')
  await addScriptToPackageJson('test', 'dotenv -- vitest run')
  // await toolbox.addScriptToPackageJson('test', 'vitest run')
  await addScriptToPackageJson('test:watch', 'vitest')
  await addScriptToPackageJson('test:snapupdate', 'vitest -u')
  await addScriptToPackageJson('coverage', 'vitest run --coverage')
  return out
}

export async function modifyTsconfigForViteReactProject() {
  const tsconfigPath = 'tsconfig.app.json'
  const currentData = filesystem.read(tsconfigPath)!
  const updatedData = await addVitestReactTypesToTsconfig(currentData)
  filesystem.write(tsconfigPath, updatedData)
}

export async function addVitestWithReactTesting() {
  await addVitestDeps()
  await exeCmdWithOutput('ni -D @testing-library/user-event @testing-library/react @testing-library/dom @types/react @types/react-dom @testing-library/jest-dom')

  // modify tsconfig for react and vite
  await modifyTsconfigForViteReactProject()

  return 'Added types and deps for addVitestWithReactTesting'
}

export async function formatTsFile(script: string) {
  return prettier.format(script, {
    parser: 'typescript',
  })
}
