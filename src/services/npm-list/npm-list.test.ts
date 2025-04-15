import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[npm-list] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./npm-list.service')
    expect(mod).toBeDefined()
    //
    // const out = await mod.run()
    // console.warn(out)
  });
});
