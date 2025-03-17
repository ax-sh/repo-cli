import * as appRootPath from 'app-root-path'

export { appRootPath }
export function enableConsoleDepth() {
  // eslint-disable-next-line no-console
  globalThis.console = new console.Console({
    inspectOptions: {
      depth: null,
    },
    // eslint-disable-next-line node/prefer-global/process
    stdout: process.stdout,
    // eslint-disable-next-line node/prefer-global/process
    stderr: process.stderr,
  })
}
