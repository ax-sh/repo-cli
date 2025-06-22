import { ok } from 'neverthrow'
import { exeCmdWithOutput } from '../../lib'

export async function makeReactProject(projectName?: unknown) {
  const cmd = `bun create vite --template react-swc-ts ${projectName} && cd ${projectName}`
  const out = await exeCmdWithOutput(cmd)
  return ok(out)
}
