import ts from '@ax-sh/ts-morph-kit'

describe('gh-pages', () => {
  it('should load modules', async () => {
    // const ts = await import('@ax-sh/ts-morph-kit')
    const file = '/Users/axm/Desktop/monorepo-nx/repo-cli/src/services/gh-pages/gh-pages.test.ts'
    const sourceFile = ts.openAsSourceFile(file)

    console.debug(sourceFile.getText())
    expect(a).toBeDefined()
    // const sf = ts.openAsSourceFile('gh-pages.test.ts')
    // console.log(sf.getText());
  })
})
