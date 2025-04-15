import type { GluegunToolbox } from 'gluegun'
import type { GluegunError } from 'gluegun/build/types/toolbox/system-types';
import type * as lib from '../src/lib'

export type ExtendedToolbox = GluegunToolbox & {
  // db: BetterSQLite3Database
  lib: typeof lib
}

// For unknown/dynamic JSON structure, use these types:
type JSONPrimitive = string | number | boolean | null
type JSONArray = JSONValue[]
interface JSONObject {
  [key: string]: JSONValue
}
// use this for json
export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export interface CommandError extends GluegunError { cmd: string }
// export interface GluegunError extends Error {
//   stdout?: StringOrBuffer;
//   stderr?: StringOrBuffer;
// }

// Maps a union of string literals (e.g., 'url' | 'name') to an object with keys of those strings.
export type MappedString<T extends string> = {
  [K in T]: string // Iterate over each member of the union `T`
}
