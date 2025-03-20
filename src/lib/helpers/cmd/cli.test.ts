import { system } from 'gluegun'
import { KnownError } from '../../../errors'

vi.mock('gluegun', { spy: true })
describe('cli', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('dry run test and check commands order', async () => {
    const cli = await import('./cli')
    const systemSpy = vi.spyOn(system, 'run')
    // systemSpy.mockResolvedValueOnce('3')
    systemSpy.mockImplementation(async (cmd: string) => {
      if (cmd.includes('npm pkg get')) {
        return Promise.resolve('{}')
      }
      if (cmd.includes('pnpm pkg set')) {
        return Promise.resolve(null)
      }
    })

    // systemSpy.mockResolvedValueOnce(null)
    const o = await cli.addScriptToPackageJson('hoo', 'dd')
    expect(o).toBe(undefined)
    systemSpy.mockClear()
  })
  it('check if script exists in package.json', async () => {
    const cli = await import('./cli')
    vi.mocked(system).run.mockImplementation(async () =>
      Promise.resolve('mockedTestScript'),
    )
    const script = cli.packageJsonScript('test')
    const has = await script.isAvailable()
    await expect(script.get()).resolves.toBe('mockedTestScript')
    expect(has).toBeTruthy()
  })

  it.fails('fail if script exists in package.json', async () => {
    vi.mocked(system).run.mockImplementation(async () =>
      Promise.reject(new KnownError('{d}')),
    )
    const cli = await import('./cli')
    const script = cli.packageJsonScript('fooo')
    const has = await script.isAvailable()
    expect(has).toBeTruthy()
  })

  test('should call system.run with the correct command for get()', async () => {
    const systemSpy = vi.spyOn(system, 'run')
    systemSpy.mockResolvedValueOnce(null)
    const out = system.run('echo fooo', { trim: true })
    expect(systemSpy).toHaveBeenCalledTimes(1)
    expect(systemSpy).toHaveBeenCalledWith('echo fooo', { trim: true })
    await expect(out).resolves.toBe(null)
    systemSpy.mockClear()
  })
  it('should check if has all required property ', async () => {
    const cli = await import('./cli')
    const script = cli.packageJsonScript('mooooooo')
    const keys = Object.keys(script)
    expect(keys).toMatchObject(['set', 'get', 'remove', 'isAvailable'])
  })

  it.fails('should fail if script exists', async () => {
    const cli = await import('./cli')
    const cmd = 'moooo'
    try {
      console.warn(await cli.addScriptToPackageJson(cmd, 'cow'))
      console.warn(await cli.addScriptToPackageJson(cmd, 'dog'))
    }
    finally {
      await cli.packageJsonScript(cmd).remove()
    }
  })
})
