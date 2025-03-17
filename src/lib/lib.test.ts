import appRootPath from 'app-root-path'
import { generateNewCmdPath } from './index'

describe('lib test', () => {
  // Restore mocks after each test
  afterEach(() => {
    vi.restoreAllMocks()
  })
  // it('should get path', async () => {
  //   const lib = await import('./index')
  //   expect(lib).toMatchObject({})
  // })

  it('should generate correct paths for a simple name', () => {
    const name = 'user'
    const expectedCommand = 'src/commands/user.ts'
    const expectedService = 'src/services/user.service.ts'

    // Mock resolve to return the path it receives

    const resolveSpy = vi
      .spyOn(appRootPath, 'resolve')
      .mockImplementation((path: string) => path)

    const result = generateNewCmdPath(name)

    expect(result.command).toBe(expectedCommand)
    expect(result.service).toBe(expectedService)
    expect(resolveSpy).toHaveBeenCalledWith(expectedCommand)
    expect(resolveSpy).toHaveBeenCalledWith(expectedService)
  })
})
