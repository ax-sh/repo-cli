import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[url] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./url.service')
    expect(mod).toBeDefined()

    const out = await mod.run()
    console.warn(out)
  });
});
