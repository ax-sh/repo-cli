import { expect } from 'vitest'
import { exeCmdWithOutput } from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')

describe('[storybook] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./storybook.service')
    expect(mod).toBeDefined()

    const out = await mod.addStorybookToRepo()
    expect(out).toEqual(
      'bun create storybook@latest --package-manager bun --disable-telemetry --builder vite  --yes',
    )
  })
})
