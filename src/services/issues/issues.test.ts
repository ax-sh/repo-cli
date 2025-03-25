import g from 'gluegun'
import { exeCmdWithOutput } from '../../lib'
import { createIssue } from './issues.service'

vi.mock('gluegun', { spy: true })
vi.mock('../../lib/helpers/cmd/cli', async () => {
  return {
    exeCmdWithOutput: vi.fn(),
    getJsonFromCmd: vi.fn(),
  }
})
describe('[issues] service test', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Restore mocks after each test
    vi.restoreAllMocks()
  })
  it('should work', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args) => {
      return Promise.resolve(args)
    })
    const out = await createIssue('test_title', 'test_body')
    expect(fn).toBeCalled()
    expect(out).toEqual('gh issue create -a @me -t test_title -b test_body ')
  })
  it('should ', async () => {
    const mod = await import('./issues.service')
    expect(mod).toBeDefined()

    const out = await mod.listIssues()
    console.warn(out)
  })
  it.todo('should create issues', async () => {
    const cmd = 'gh issue create -a @me -t test_title -b test_body '
    // eslint-disable-next-line ts/unbound-method
    const fn = vi.mocked(g.system.run)
    fn.mockImplementation(async (args) => {
      expect(args).toEqual(cmd)
      return 'https://github.com/user/repo/issues/mocked'
    })
    const mod = await import('./issues.service')

    const out = await mod.createIssue('test_title', 'test_body')
    expect(out).toEqual('https://github.com/user/repo/issues/mocked')
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(cmd, {
      trim: true,
    })

    // console.log(fn.mock.calls);
  })
})
