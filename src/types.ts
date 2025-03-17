import type { GluegunToolbox } from 'gluegun'
import type * as lib from '../src/lib'

export type ExtendedToolbox = GluegunToolbox & {
  // db: BetterSQLite3Database
  lib: typeof lib
}
