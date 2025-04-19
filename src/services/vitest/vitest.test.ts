import { expect } from 'vitest'
import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')

describe('[vitest] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./vitest.service')
    expect(mod).toBeDefined()

    const out = await mod.addVitestWithReactTesting()
    expect(fn).toBeCalled()
    expect(fn).toHaveResolvedWith('ni -D vitest @testing-library/user-event @testing-library/react @testing-library/dom @types/react @types/react-dom msw@latest @faker-js/faker @testing-library/jest-dom')
  });
});
