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
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// export function runFromPromise<T>(p: Promise<T>) {
//   return ResultAsync.fromPromise<T, AppError>(p, e =>
//     e instanceof Error ? e : new AppError(String(e)))
// }

// Default error mapper with better type checking and preservation
function defaultErrorMapper(e: unknown): AppError {
  if (e instanceof AppError) {
    // Return custom errors as-is to preserve their specific type
    return e
  } else if (e instanceof Error) {
    // Capture stack trace and message from standard errors
    return new AppError(e.message)
  } else {
    // Handle non-Error objects
    return new AppError(String(e))
  }
}

// Improved function to convert promises to ResultAsync
export function runFromPromiseWithErrorAppErrorHandling<
  T,
  E extends Error = AppError,
>(
  p: Promise<T>,
  errorMapper: (e: unknown) => E = defaultErrorMapper as (e: unknown) => E,
): ResultAsync<T, E> {
  return ResultAsync.fromPromise(p, errorMapper)
}
