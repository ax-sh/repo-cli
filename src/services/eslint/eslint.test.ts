import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[eslint] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./eslint.service')
    expect(mod).toBeDefined()

    const out = await mod.addEslint()
    console.warn(out)
  });
});
