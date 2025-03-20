import { addImportsToTsFile, createTestSourceFile } from '@ax-sh/ts-morph-kit'
import { expect } from 'vitest'

describe('gh-pages', () => {
  const code = `
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        plugins:[foo()],
        base:"test"
        });
  `
  it('should add new imports to a ts file', async () => {
    expect(addImportsToTsFile).toBeDefined()
    // spy.mockReturnValue('dd')
    const sf = await createTestSourceFile(code)

    sf.formatText()
    expect(sf.getText()).toBeDefined()
  })
})
