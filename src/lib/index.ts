import appRootPath from 'app-root-path'

export { runFromPromiseWithErrorHandlerWrapper } from '../errors'

export { elapsedTime } from './date-utils'

export { addScriptToPackageJson, exeCmdWithOutput } from './helpers/cmd/cli'

export { appRootPath }

export async function execa() {
  const { execa } = await import('execa')
  return execa
}

export function generateNewCmdPath(name: string) {
  return {
    command: appRootPath.resolve(`src/commands/${name}.ts`),
    service: appRootPath.resolve(`src/services/${name}/${name}.service.ts`),
    test: appRootPath.resolve(`src/services/${name}/${name}.test.ts`),
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

    stdout: process.stdout,

    stderr: process.stderr,
  })
}
