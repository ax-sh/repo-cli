import { filesystem } from 'gluegun'
import { exeCmdWithOutput } from '../../lib';

vi.mock('gluegun', { spy: true }) // mocks every export with spying for mocking
vi.mock('../../lib/helpers/cmd/cli')

describe('[vitest] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./vitest.service')
    expect(mod).toBeDefined()
    const tsconfig = {
      compilerOptions: { types: [
        // 'vitest/globals',
        '___test_type',
      ] },
    }

    // eslint-disable-next-line ts/unbound-method
    vi.mocked(filesystem.read).mockReturnValue(JSON.stringify(tsconfig))
    // eslint-disable-next-line ts/unbound-method
    const write = vi.mocked(filesystem.write).mockReturnThis()

    const out = await mod.addVitestWithReactTesting()
    expect(out).toEqual('Added types and deps for addVitestWithReactTesting')

    const a = `{"compilerOptions":{"types":[
      "___test_type",
      "@testing-library/jest-dom",
      "vitest/globals"
    ]}}`

    expect(write).toBeCalledWith('tsconfig.app.json', a)

    expect(fn).toBeCalled()
    expect(fn).toHaveResolvedWith('ni -D vitest @testing-library/user-event @testing-library/react @testing-library/dom @types/react @types/react-dom msw@latest @faker-js/faker @testing-library/jest-dom')
  });
});
