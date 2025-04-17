import { addVitestReactTypesToTsconfig, parseCompilerOptionsTypes } from './tsconfig.service'

describe('', () => {
  it('should parse tsconfig', async () => {
    // const path = appRootPath.resolve('./tsconfig.json')

    const data = `{
      "compilerOptions": {
        "types":["foo"]
      }
    }`
    const updated = parseCompilerOptionsTypes(data)
    expect(updated).toEqual(['foo'])
  })
  it('should be empty types array', async () => {
    const data = `{
      "compilerOptions": {
        // "types":[]
      }
    }`
    const updated = parseCompilerOptionsTypes(data)

    expect(updated).toEqual([])
  })
  it('should add new types to compilerOptions', async () => {
    const data = `{
      "compilerOptions": {
        "types":["foo"]
      }
    }`
    const updated = await addVitestReactTypesToTsconfig(data)
    const json = parseCompilerOptionsTypes(updated)

    expect(json).toEqual(['foo', '@testing-library/jest-dom', 'vitest/globals'])
  })
})
