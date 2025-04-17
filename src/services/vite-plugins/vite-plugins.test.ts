import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[vite-plugins] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./vite-plugins.service')
    expect(mod).toBeDefined()

    const out = await mod.addDefaultVitePlugins()
    console.warn(out)
  });
});
