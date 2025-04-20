import { exeCmdWithOutput } from '../../lib'

export async function addZustand() {
  const out = await exeCmdWithOutput('ni zustand immer')

  return out
}
