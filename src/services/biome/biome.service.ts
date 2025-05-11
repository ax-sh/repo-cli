import { addScriptToPackageJson, exeCmdWithOutput } from '../../lib'

export async function installBiomeLinter() {
  const out = await exeCmdWithOutput(
    'bun add --dev --exact @biomejs/biome && bunx biome init --jsonc',
  )
  await addScriptToPackageJson('format', 'nlx @biomejs/biome format --write')
  // for linting
  //  nlx @biomejs/biome lint --apply ./src
  // biome migrate prettier --write
  // biome migrate eslint --write
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
