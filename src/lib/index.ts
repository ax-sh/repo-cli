import appRootPath from 'app-root-path'

export { appRootPath }

export function generateNewCmdPath(name: string) {
  return {
    command: appRootPath.resolve(`src/commands/${name}.ts`),
    service: appRootPath.resolve(`src/services/${name}.service.ts`),
  }
}

export async function appRootPathLazy() {
  const appRootPathModule = await import('app-root-path')
  return appRootPathModule.default
}

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
