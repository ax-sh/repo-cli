import { expect } from 'vitest'
import { runFromPromiseWithErrorAppErrorHandling } from '../../errors'
import { exeCmdWithOutput } from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')

describe('[url] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./url.service')
    expect(mod).toBeDefined()

    const result = await runFromPromiseWithErrorAppErrorHandling(
      mod.getRepoUrl(),
    )
    if (result.isErr()) {
      throw result.error
    }
    const value = result.value
    expect(value).toBe('git remote get-url origin')
  })
})
