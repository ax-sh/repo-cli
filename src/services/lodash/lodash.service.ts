import { exeCmdWithOutput } from '../../lib'

export async function addLodash() {
  await exeCmdWithOutput('ni -D @types/lodash')
  const out = await exeCmdWithOutput('ni lodash')
  return out
}
