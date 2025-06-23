import { expect } from 'vitest'
import {
  exeCmdWithOutput,
  runFromPromiseWithErrorHandlerWrapper,
} from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')

describe('[sandbox] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./sandbox.service')
    expect(mod).toBeDefined()

    const result = await runFromPromiseWithErrorHandlerWrapper(
      mod.makePythonSandbox(),
    )
    if (result.isErr()) {
      throw result.error
    }
    const out = result.value
    expect(out).toEqual('uv venv && source .venv/bin/activate && uv pip install nbdime matplotlib pillow jupyterlab && touch sandbox.ipynb && pycharm . &')
  })
})
