import { exeCmdWithOutput } from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')
// @ts-expect-error weird error
vi.mock('gluegun', { filesystem: { write: vi.fn() } })

describe('[eslint] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./eslint.service')
    expect(mod).toBeDefined()

    const out = await mod.addEslint()
    expect(out).toEqual('ni -D eslint @antfu/eslint-config')
  })
})
