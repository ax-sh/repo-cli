import { print } from 'gluegun'
import { ResultAsync } from 'neverthrow'

export class KnownError extends Error {
  constructor(message: string | string[]) {
    if (Array.isArray(message)) {
      message = message.join('\n')
    }

    print.error(`KNOWN ERROR: ${message}`)
    super(message)
  }
}
export class AppError extends Error {}

export function runFromPromise<T>(p: Promise<T>) {
  return ResultAsync.fromPromise<T, AppError>(p, e =>
    e instanceof Error ? e : new AppError(String(e)))
}
