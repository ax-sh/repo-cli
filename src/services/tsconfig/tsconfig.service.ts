import type { ParseError } from 'jsonc-parser'
import { applyEdits, modify, parse } from 'jsonc-parser'

// More complete type definition with optional fields
export interface TsconfigContent {
  readonly compilerOptions?: {
    readonly types?: string[]
    [key: string]: unknown
  }
  readonly [key: string]: unknown
}

/**
 * Parses a tsconfig JSON string into a typed object
 * @param rawJsonString The raw tsconfig JSON string
 * @returns The parsed tsconfig object
 * @throws Error if parsing fails
 */
export function parseTsconfigJsonc(rawJsonString: string): TsconfigContent {
  const errors: ParseError[] = []
  const tsconfig = parse(rawJsonString, errors) as TsconfigContent

  if (errors.length > 0) {
    throw new Error(
      `Failed to parse tsconfig: ${errors.map(e => e.error).join(', ')}`,
    )
  }

  return tsconfig
}

/**
 * Extracts compiler options types from tsconfig
 * @param rawJsonString The raw tsconfig JSON string
 * @returns Array of type names
 * @throws Error if parsing fails
 */
export function parseCompilerOptionsTypes(
  rawJsonString: string,
): readonly string[] {
  const tsconfig = parseTsconfigJsonc(rawJsonString)

  // Safely access possibly undefined properties
  return tsconfig.compilerOptions?.types || []
}

/**
 * Creates edits to modify compiler options types
 * @param rawJsonString The raw tsconfig JSON string
 * @param types The new types array to set
 * @returns The edit operations to apply
 */
export function modifyCompilerOptionsTypes(
  rawJsonString: string,
  types: readonly string[],
) {
  const jsonPath = ['compilerOptions', 'types'] as const
  return modify(rawJsonString, jsonPath, [...types], {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  })
}

/**
 * Adds Vitest React types to tsconfig
 * @param rawJsonString The raw tsconfig JSON string
 * @returns Updated tsconfig JSON string
 * @throws Error if parsing fails
 */
export async function addVitestReactTypesToTsconfig(
  rawJsonString: string,
): Promise<string> {
  const existingTypes = parseCompilerOptionsTypes(rawJsonString)

  const newTypesToAdd: readonly string[] = [
    '@testing-library/jest-dom',
    'vitest/globals',
  ]

  // Filter out duplicates by creating a Set
  const uniqueTypes = [...new Set([...existingTypes, ...newTypesToAdd])]

  // Prepare the edits
  const edits = modifyCompilerOptionsTypes(rawJsonString, uniqueTypes)

  // Apply the edits to the original JSONC data
  return applyEdits(rawJsonString, edits)
}
