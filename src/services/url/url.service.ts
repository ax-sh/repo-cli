import { exeCmdWithOutput } from '../../lib'

export async function getRepoUrl() {
  const out = await exeCmdWithOutput('git remote get-url origin')
  return out
}
