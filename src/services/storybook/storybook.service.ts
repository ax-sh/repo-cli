import { exeCmdWithOutput } from '../../lib'

export async function addStorybookToRepo() {
  const out = await exeCmdWithOutput('bun create storybook@latest --package-manager bun --disable-telemetry --builder vite  --yes')

  return out
}
