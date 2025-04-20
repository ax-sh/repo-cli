import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[zustand] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./zustand.service')
    expect(mod).toBeDefined()

    const out = await mod.addZustand()
    expect(out).toEqual('ni zustand immer')
  });
});
