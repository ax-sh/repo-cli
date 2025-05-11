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

type MiscErrorMap = Error & {
  stderr: string
  stdout: string
  cmd: string
  killed: string
  [key: string]: string
}
export class RuntimeAppError extends Error {
  cause: MiscErrorMap
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code ?? 'UNKNOWN'
  }
}

// Default error mapper with better type checking and preservation
function defaultErrorMapper(e: unknown): RuntimeAppError {
  if (e instanceof RuntimeAppError) {
    return e // Return custom errors as-is to preserve their specific type
  } else if (e instanceof Error) {
    const error = new RuntimeAppError(e.message) // Capture stack trace and message from standard errors
    // (error as RuntimeAppError & { cause: unknown }).cause = e;

    error.cause = e as MiscErrorMap
    return error
  }

  return new RuntimeAppError(String(e)) // Handle non-Error objects
}

// Improved function to convert promises to ResultAsync
export function runFromPromiseWithErrorHandlerWrapper<
  T,
  E extends Error = RuntimeAppError,
>(
  p: Promise<T>,
  errorMapper: (e: unknown) => E = defaultErrorMapper as (e: unknown) => E,
): ResultAsync<T, E> {
  return ResultAsync.fromPromise(p, errorMapper)
}
