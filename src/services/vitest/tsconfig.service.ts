import { applyEdits, modify, parse } from 'jsonc-parser'

export interface TsconfigContent { compilerOptions: { types: string[] } }

export function parseCompilerOptionsTypes(rawJsonString: string) {
  const tsconfig: TsconfigContent = parse(rawJsonString) as TsconfigContent
  const types = tsconfig.compilerOptions?.types || []
  return types
}
export function modifyCompilerOptionsTypes(rawJsonString: string, types: string[]) {
  const jsonPath = ['compilerOptions', 'types'] as const
  return modify(rawJsonString, jsonPath, types, {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  })
}

export async function addVitestReactTypesToTsconfig(rawJsonString: string): Promise<string> {
  const types = parseCompilerOptionsTypes(rawJsonString)

  const newTypes = ['@testing-library/jest-dom', 'vitest/globals']

  // // Prepare the edits to add the new property
  const edits = modifyCompilerOptionsTypes(rawJsonString, [...types, ...newTypes])

  // Apply the edits to the original JSONC data
  const updatedData = applyEdits(rawJsonString, edits)
  return updatedData
}
