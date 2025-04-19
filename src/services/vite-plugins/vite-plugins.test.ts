import {
  createTestSourceFile,
  getDefaultViteConfig,
  objectLiteralExpressionToJson,
  openAsSourceFile,
} from '@ax-sh/ts-morph-kit'

import { expect } from 'vitest'
import { exeCmdWithOutput } from '../../lib';

vi.mock('../../lib/helpers/cmd/cli')
vi.mock('@ax-sh/ts-morph-kit', { spy: true })
const code = `
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins:[foo()],
  base:"test",
  ___test___: true
});
`

describe('[vite-plugins] service test', () => {
  beforeEach(async () => {
    const mocked = vi.mocked(openAsSourceFile)
    expect(mocked).toHaveProperty('mock')

    mocked.mockReturnValue(
      await createTestSourceFile(code),
    );
  });
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./vite-plugins.service')
    expect(mod).toBeDefined()

    const out = await mod.addDefaultVitePlugins()
    const sf = await createTestSourceFile(out)
    const viteDefaultConfigJson = objectLiteralExpressionToJson(getDefaultViteConfig(sf))

    expect(viteDefaultConfigJson).toEqual({ plugins: ['foo()', 'qrcode()'], base: 'test', ___test___: true })
  });
});
