import { exeCmdWithOutput } from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')

describe('[lodash] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./lodash.service')
    expect(mod).toBeDefined()

    const out = await mod.addLodash()
    console.warn(out)
  })
})
