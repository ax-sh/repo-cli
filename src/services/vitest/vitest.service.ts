import { print } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'

export async function addVitestDeps() {
  return exeCmdWithOutput('ni -D vitest msw@latest @faker-js/faker')
}

export async function addVitestWithReactTesting() {
  await exeCmdWithOutput('ni -D vitest @testing-library/react @testing-library/dom @types/react @types/react-dom msw@latest @faker-js/faker @testing-library/jest-dom')

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
