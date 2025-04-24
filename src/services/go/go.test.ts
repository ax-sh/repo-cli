import { filesystem } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')
// @ts-expect-error not a error
vi.mock('gluegun', { filesystem: { isFile: vi.fn() } })

describe('[go] service test', () => {
  it('should check if filesystem has been mocked properly', () => {
    // eslint-disable-next-line ts/unbound-method
    const fn = vi.mocked(filesystem.isFile)

    expect(fn).toHaveProperty('mock')
  })
  it('should addCodeQualityTools', async () => {
    const mod = await import('./go.service')
    expect(mod).toBeDefined()
    // eslint-disable-next-line ts/unbound-method
    vi.mocked(filesystem.isFile).mockReturnValue(true)

    const fn = vi.mocked(exeCmdWithOutput)
    expect(fn).toHaveProperty('mock')
    fn.mockImplementation(async (args: string) => args)
    const out = await mod.addCodeQualityTools()
    expect(fn).toBeCalled()
    expect(fn).toHaveBeenCalledTimes(4)
    expect(fn).toHaveResolved()
    expect(out).toMatchSnapshot()
  })
})
