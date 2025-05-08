import { exeCmdWithOutput } from '../../lib'

export async function installBiomeLinter() {
  const out = await exeCmdWithOutput(
    'bun add --dev --exact @biomejs/biome && bunx biome init --jsonc',
  )
  return out
}

export async function runMigrate() {
  let out: string
  out = await exeCmdWithOutput(
    'eslint --print-config eslint.config.mjs > .eslintrc.json && bunx rimraf eslint.config.mjs',
  )
  out = await exeCmdWithOutput(
    'bunx biome migrate eslint --write --include-inspired',
  )
  return out
}
