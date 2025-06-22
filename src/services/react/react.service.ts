import { exeCmdWithOutput } from '../../lib'

export async function makeReactProject(projectName?: unknown) {
  const cmd = `bun create vite --template react-swc-ts ${projectName} && cd ${projectName} && bun create storybook@latest`
  const out = await exeCmdWithOutput(cmd)
  return out
}
