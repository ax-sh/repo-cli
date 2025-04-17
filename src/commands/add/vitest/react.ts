import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'react',
  run: async (toolbox) => {
    const { print } = toolbox
    const spinner = print.spin('Adding vitest')

    const mod = await import('../../../services/vitest/vitest.service')
    const out = await mod.addVitestWithReactTesting();
    print.highlight(`Run Out vitest ${out}`)
    await mod.writeVitestConfig()

    spinner.succeed('Added vitest')

    // root file ./vitest.setup.ts
    // import "@testing-library/jest-dom/vitest";
    // import { afterEach } from "vitest";
    // import { cleanup } from "@testing-library/react";
    //
    // // runs a clean after each test case (e.g. clearing jsdom)
    // afterEach(() => {
    //   cleanup();
    // });
    // -________
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
  },
}

export default command;
