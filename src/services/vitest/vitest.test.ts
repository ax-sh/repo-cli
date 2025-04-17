import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[vitest] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./vitest.service')
    expect(mod).toBeDefined()

    const out = await mod.addVitestWithReactTesting()
    console.warn(out)
  });
});
