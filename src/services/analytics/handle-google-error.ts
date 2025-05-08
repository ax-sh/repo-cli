import { GoogleError, Status } from 'google-gax'
import { ResultAsync } from 'neverthrow'

export function handleGoogleError(error: unknown): Error {
  if (error instanceof GoogleError) {
    switch (error.code) {
      case Status.PERMISSION_DENIED:
        return new Error(
          '🔒 Permission denied. Check your service account or OAuth token.',
          { cause: error },
        )
      case Status.INVALID_ARGUMENT:
        return new Error(
          '⚠️ Invalid argument. Invalid request. Check input parameters.',
          { cause: error },
        )
      case Status.NOT_FOUND:
        return new Error('📭 Not found.  Resource not found.', { cause: error })
      case undefined:
        return new Error('❓ GoogleError with undefined code', { cause: error })
      case Status.OK: {
        throw new Error('Not implemented yet: Status.OK case')
      }
      case Status.CANCELLED: {
        throw new Error('Not implemented yet: Status.CANCELLED case')
      }
      case Status.UNKNOWN: {
        throw new Error('Not implemented yet: Status.UNKNOWN case')
      }
      case Status.DEADLINE_EXCEEDED: {
        throw new Error('Not implemented yet: Status.DEADLINE_EXCEEDED case')
      }
      case Status.ALREADY_EXISTS: {
        throw new Error('Not implemented yet: Status.ALREADY_EXISTS case')
      }
      case Status.RESOURCE_EXHAUSTED: {
        throw new Error('Not implemented yet: Status.RESOURCE_EXHAUSTED case')
      }
      case Status.FAILED_PRECONDITION: {
        throw new Error('Not implemented yet: Status.FAILED_PRECONDITION case')
      }
      case Status.ABORTED: {
        throw new Error('Not implemented yet: Status.ABORTED case')
      }
      case Status.OUT_OF_RANGE: {
        throw new Error('Not implemented yet: Status.OUT_OF_RANGE case')
      }
      case Status.UNIMPLEMENTED: {
        throw new Error('Not implemented yet: Status.UNIMPLEMENTED case')
      }
      case Status.INTERNAL: {
        throw new Error('Not implemented yet: Status.INTERNAL case')
      }
      case Status.UNAVAILABLE: {
        throw new Error('🌐 Network/server issue. Retry might help.')
      }
      case Status.DATA_LOSS: {
        throw new Error('Not implemented yet: Status.DATA_LOSS case')
      }
      case Status.UNAUTHENTICATED: {
        throw new Error('Not implemented yet: Status.UNAUTHENTICATED case')
      }
      default:
        return new Error(
          `🧨 Unhandled GoogleError [${error.code}]: ${error.message}`,
          { cause: error },
        )
    }
  }

  if (error instanceof Error) {
    return new Error(`General Error: ${error.message}`, { cause: error })
  }

  return new Error(`🧨 Unknown Error: ${JSON.stringify(error)}`, {
    cause: error,
  })
}

export function executeGooglePromise<T>(call: Promise<T>) {
  return ResultAsync.fromPromise<T, GoogleError>(call, handleGoogleError)
}
