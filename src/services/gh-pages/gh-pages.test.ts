import {
  addImportsToTsFile,
  createTestSourceFile,
  objectLiteralExpressionToJson,
  openAsSourceFile,
} from '@ax-sh/ts-morph-kit';
import { expect } from 'vitest';
import { configViteConfigForGhPages, getGithubPagesUrlForRepo } from './gh-pages.service';

const code = `
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins:[foo()],
  base:"test",
  ___test___: true
});
`
vi.mock('@ax-sh/ts-morph-kit', async () => {
  const actual = await vi.importActual('@ax-sh/ts-morph-kit');
  // const testSourceFile = await createTestSourceFile(code)

  return {
    ...actual,
    openAsSourceFile: vi.fn(),
  };
});

describe('gh-pages', () => {
  // Before your tests, make sure to resolve the mock
  beforeEach(async () => {
    const mocked = vi.mocked(openAsSourceFile)
    // this does not work for async return
    // mocked.mockImplementationOnce(async (fn) => {
    //   console.log(fn, '#33');
    //   return createTestSourceFile(code)
    // })
    expect(mocked).toHaveProperty('mock')

    mocked.mockReturnValue(
      await createTestSourceFile(code),
    );
  });
  it('should add new imports to a ts file', async () => {
    expect(addImportsToTsFile).toBeDefined()
    const sf = openAsSourceFile(code)

    sf.formatText()
    expect(sf.getText()).toBeDefined()
  })

  it('should add base on test vite.config', async () => {
    const result = openAsSourceFile('vitest.config.ts');

    result.formatText();
    // console.log(result.getText());

    const config = await configViteConfigForGhPages()

    const json = objectLiteralExpressionToJson(config)
    expect(json).toEqual({
      ___test___: true,
      base: '/repo-cli/',
      plugins: [
        'foo()',
      ],
    })
  });
  it('should make repo hosted gh-page url', async () => {
    const url = await getGithubPagesUrlForRepo('ax-sh/repo-cli')
    expect(url).toEqual('https://ax-sh.github.io/repo-cli');
  });
})
