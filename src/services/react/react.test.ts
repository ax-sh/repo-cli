import {
  exeCmdWithOutput,
  runFromPromiseWithErrorHandlerWrapper,
} from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')

describe('[react] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./react.service')
    expect(mod).toBeDefined()

    const result = await runFromPromiseWithErrorHandlerWrapper(
      mod.makeReactProject('foo'),
    )
    if (result.isErr()) {
      throw result.error
    }
    const out = result.value
    expect(out).toEqual(
      'bun create vite --template react-swc-ts foo && cd foo && bun create storybook@latest',
    )
  })
})
