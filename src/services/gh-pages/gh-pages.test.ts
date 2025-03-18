import * as ts from '@ax-sh/ts-morph-kit'

describe('gh-pages', () => {
  const code = `
        import { defineConfig } from 'vite';
        // https://vite.dev/config/
        export default defineConfig({
        plugins:[foo()],
        base:"test"
        });
  `;
  it('should load modules', async () => {
    // const ts = await import('@ax-sh/ts-morph-kit')
    const sourceFile = await ts.createTestSourceFile(code)
    // console.log(sourceFile/);
    ts.addImportsToTsFile(file, [{ imports: 'React', from: 'react' }])
    sourceFile.formatText()
    console.debug(sourceFile.getText())
    // expect(a).toBeDefined()
    // const sf = ts.openAsSourceFile('gh-pages.test.ts')
    // console.log(sf.getText());
  })
})
