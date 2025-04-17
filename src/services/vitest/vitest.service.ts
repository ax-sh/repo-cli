import { filesystem, print } from 'gluegun'

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

export async function addVitestWithReactTesting() {
  await exeCmdWithOutput('ni -D vitest @testing-library/user-event @testing-library/react @testing-library/dom @types/react @types/react-dom msw@latest @faker-js/faker @testing-library/jest-dom')

  // modify tsconfig for react and vite
  const tsconfigPath = 'tsconfig.app.json'
  const currentData = filesystem.read(tsconfigPath)!
  const updatedData = await addVitestReactTypesToTsconfig(currentData)
  filesystem.write(tsconfigPath, updatedData)

  // todo type can be omitted as the above adds it on tsconfig
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
