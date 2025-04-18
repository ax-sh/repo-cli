import { exeCmdWithOutput } from '../../lib'

export async function run() {
  const out = await exeCmdWithOutput('ni three @types/three @react-three/fiber @react-three/drei leva')
  return out
}
