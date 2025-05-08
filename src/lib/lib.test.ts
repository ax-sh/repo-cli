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
    const expectedService = 'src/services/user/user.service.ts'
    const expectedTest = 'src/services/user/user.test.ts'

    // Mock resolve to return the path it receives

    const resolveSpy = vi
      .spyOn(appRootPath, 'resolve')
      .mockImplementation((path: string) => path)

    const result = generateNewCmdPath(name)

    expect(result.command).toBe(expectedCommand)
    expect(result.service).toBe(expectedService)
    expect(result.test).toEqual(expectedTest)
    expect(resolveSpy).toHaveBeenCalledWith(expectedCommand)
    expect(resolveSpy).toHaveBeenCalledWith(expectedService)
    expect(resolveSpy).toHaveBeenCalledWith(expectedTest)
  })
  it('should handle complex names with special characters', () => {
    const name = 'create-user_v2'
    const expectedCommand = 'src/commands/create-user_v2.ts'
    const expectedService
      = 'src/services/create-user_v2/create-user_v2.service.ts'
    const expectedTest = 'src/services/create-user_v2/create-user_v2.test.ts'

    const resolveSpy = vi
      .spyOn(appRootPath, 'resolve')
      .mockImplementation((path: string) => path)

    const result = generateNewCmdPath(name)

    expect(result.command).toBe(expectedCommand)
    expect(result.service).toBe(expectedService)
    expect(result.test).toBe(expectedTest)
    expect(resolveSpy).toHaveBeenCalledWith(expectedCommand)
    expect(resolveSpy).toHaveBeenCalledWith(expectedService)
  })

  it('should validate multiple path calls with correct arguments', () => {
    const name = 'auth'
    const mockResolve = vi
      .spyOn(appRootPath, 'resolve')
      .mockImplementation((path: string) => path)

    generateNewCmdPath(name)

    expect(mockResolve).toHaveBeenCalledTimes(3)
    expect(mockResolve).toHaveBeenNthCalledWith(1, 'src/commands/auth.ts')
    expect(mockResolve.mock.calls).toEqual([
      ['src/commands/auth.ts'],
      ['src/services/auth/auth.service.ts'],
      ['src/services/auth/auth.test.ts'],
    ])
    expect(mockResolve).toHaveBeenNthCalledWith(
      3,
      'src/services/auth/auth.test.ts',
    )
  })
})
