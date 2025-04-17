import { filesystem, print } from 'gluegun'
import { applyEdits, modify, parse } from 'jsonc-parser'
import { bgRed } from 'kolorist'
import { KnownError } from '../../errors'

import { exeCmdWithOutput } from '../../lib'

export async function addVitestDeps() {
  return exeCmdWithOutput('ni -D vitest msw@latest @faker-js/faker')
}

export async function addVitestReactTypesToTsconfig(tsconfigPath: string) {
  if (filesystem.isNotFile(tsconfigPath)) {
    // eslint-disable-next-line ts/no-unsafe-call
    throw new KnownError([bgRed('tsconfigPath does not exist'), tsconfigPath])
  }
  const data = filesystem.read(tsconfigPath)
  const tsconfig: TsconfigContent = parse(data) as TsconfigContent
  const types = tsconfig.compilerOptions?.types || []

  const newTypes = ['@testing-library/jest-dom']

  // Prepare the edits to add the new property
  const edits = modify(data, ['compilerOptions', 'types'], [...types, ...newTypes], {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  })
  // Apply the edits to the original JSONC data
  const updatedData = applyEdits(data, edits)
  filesystem.write(tsconfigPath, updatedData)
}

export async function addVitestWithReactTesting() {
  await exeCmdWithOutput('ni -D vitest @testing-library/user-event @testing-library/react @testing-library/dom @types/react @types/react-dom msw@latest @faker-js/faker @testing-library/jest-dom')

  // todo
  // /// <reference types="vitest" />
  //
  // import { defineConfig } from "vitest/config";
  //
  // export default defineConfig({
  //   test: {
  //     globals: true,
  //     environment: "jsdom",
  //     setupFiles: "./vitest.setup.ts",
  //   },
  // });
  // root file ./vitest.setup.ts
  // import "@testing-library/jest-dom/vitest";
  // import { afterEach } from "vitest";
  // import { cleanup } from "@testing-library/react";
  //
  // // runs a clean after each test case (e.g. clearing jsdom)
  // afterEach(() => {
  //   cleanup();
  // });
  // app.test.tsx
  // import { render, screen } from "@testing-library/react";
  // import App from "./App";
  //
  // describe("App", () => {
  //   it("renders the App component", () => {
  //     render(<App />);
  //
  //     screen.debug(); // prints out the jsx in the App component unto the command line
  //   });
  // });
  print.info('done')
  const out = 'out'
  return out
}
