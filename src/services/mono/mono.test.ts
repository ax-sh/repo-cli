import {
  exeCmdWithOutput,
  runFromPromiseWithErrorHandlerWrapper,
} from '../../lib'
import { batchCreateLibs } from './mono.service'

vi.mock('../../lib/helpers/cmd/cli')

describe('[mono] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./mono.service')
    expect(mod).toBeDefined()

    const result = await runFromPromiseWithErrorHandlerWrapper(
      mod.makeDefaultMonoRepoWorkspace(),
    )
    if (result.isErr()) {
      throw result.error
    }
    const out = result.value
    console.warn(out)
  })
  it('should return results without error', async () => {
    const projectWorkspaceName = 'projectWorkspaceName'
    const cmds = batchCreateLibs([
      { projectWorkspaceName, libraryName: 'core' },
      { projectWorkspaceName, libraryName: 'database' },
      { projectWorkspaceName, libraryName: 'logging' },
    ])
    expect(cmds).toMatchSnapshot()
  })
})
