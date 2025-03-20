import type { JSONValue } from '../../../types'
import { system } from 'gluegun'
import { KnownError } from '../../../errors'

export function packageJsonScript(
  commandName: string,
  // setting default as npm because pnpm modifies the package.json
  // for itself as the package manager making it annoying when using bun using nr
  pm: 'npm' | 'pnpm' = 'npm',
) {
  async function set(cmd: string): Promise<string> {
    return getTrimmedFromCmdOutput(
      `${pm} pkg set scripts.${commandName}="${cmd}"`,
    )
  }
  async function get(): Promise<string> {
    return getTrimmedFromCmdOutput(`${pm} pkg get scripts.${commandName}`)
  }
  async function remove(): Promise<string> {
    switch (pm) {
      case 'npm':
        return getTrimmedFromCmdOutput(
          `${pm} pkg delete scripts.${commandName}`,
        )
      case 'pnpm':
        return getTrimmedFromCmdOutput(
          `${pm} pkg remove scripts.${commandName}`,
        )
      default:
        throw new KnownError('Not implemented')
    }
  }
  async function isAvailable(): Promise<boolean> {
    const result = await get()
    return Promise.resolve(result !== '{}')
  }
  return { set, get, remove, isAvailable }
}

export async function addScriptToPackageJson(scriptName: string, cmd: string) {
  const script = packageJsonScript(scriptName)
  const hasScript = await script.isAvailable()
  if (hasScript) {
    throw new KnownError(`script [${scriptName}] already defined Exiting`)
  }

  return script.set(cmd)
}
export async function getTrimmedFromCmdOutput(cmd: string): Promise<string> {
  return system.run(cmd, { trim: true })
}

export async function getJsonFromCmd<T = JSONValue>(cmd: string) {
  const data = await system.run(cmd, { trim: true })
  const json = JSON.parse(data) as T
  return json
}
