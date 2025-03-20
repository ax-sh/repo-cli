import type { GluegunToolbox } from 'gluegun'
import type * as lib from '../src/lib'

export type ExtendedToolbox = GluegunToolbox & {
  // db: BetterSQLite3Database
  lib: typeof lib
}

// For unknown/dynamic JSON structure, use these types:
type JSONPrimitive = string | number | boolean | null
type JSONArray = JSONValue[]
interface JSONObject { [key: string]: JSONValue }
// use this for json
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
