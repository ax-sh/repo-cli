import { createTestSourceFile, openAsSourceFile } from '@ax-sh/ts-morph-kit'
import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')
vi.mock('@ax-sh/ts-morph-kit', { spy: true })
const code = `export default defineConfig({
  plugins:[foo()],
  base:"test",
  ___test___: true
});`

describe('[vite-plugin-pages] service test', () => {
  it('should return results', async () => {
    const mockedOpenAsSourceFile = vi.mocked(openAsSourceFile)
    mockedOpenAsSourceFile.mockReturnValue(await createTestSourceFile(code))
    console.log(mockedOpenAsSourceFile.mock.calls)
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./vite-plugin-pages.service')
    expect(mod).toBeDefined()

    const out = await mod.addVitePluginPages()
    console.warn(out)
  });
});
