import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[vite-plugin-pages] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./vite-plugin-pages.service')
    expect(mod).toBeDefined()

    const out = await mod.addVitePluginPages()
    console.warn(out)
  });
});
