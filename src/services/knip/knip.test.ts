import {
  exeCmdWithOutput,
  runFromPromiseWithErrorHandlerWrapper,
} from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')
vi.mock('gluegun')

describe('[knip] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./knip.service')
    expect(mod).toBeDefined()

    const result = await runFromPromiseWithErrorHandlerWrapper(mod.addKnip())
    if (result.isErr()) {
      throw result.error
    }
    const out = result.value
    console.warn(out)
  })
})
