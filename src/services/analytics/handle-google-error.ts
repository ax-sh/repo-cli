import type { GoogleError } from 'google-gax'
import { Status } from 'google-gax'
import { ResultAsync } from 'neverthrow'

function isLikelyGoogleError(err: unknown): err is GoogleError {
  return (
    typeof err === 'object'
    && err instanceof Error // At least ensure it's an Error
    && 'code' in err
  ) // Check for the 'code' property
  // && err.name === 'GoogleError' // GoogleError usually sets its name property
}
/**
 * Represents an error caused by another Google-related error.
 */
interface GoogleErrorWithCause extends Error {
  readonly cause: GoogleError
}

/**
 * Represents a runtime error that occurs while interacting with Google services.
 * This error wraps a lower-level Google-specific error (`cause`) for better context.
 */
class RuntimeGoogleError extends Error implements GoogleErrorWithCause {
  /**
   * The underlying error that caused this runtime error.
   */
  readonly cause: GoogleError;

  constructor(message: string, options: { cause: GoogleError }) {
    super(message, { cause: options.cause });

    // Set the prototype chain to ensure `instanceof` works correctly
    Object.setPrototypeOf(this, RuntimeGoogleError.prototype);

    // Set the error name explicitly for consistency and clarity
    this.name = 'RuntimeGoogleError';

    // Assign the cause for type safety and programmatic access
    this.cause = options.cause;
  }

  /**
   * Returns a JSON-serializable representation of the error.
   * This is particularly useful for logging or debugging.
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      cause: {
        name: this.cause.name,
        message: this.cause.message,
        stack: this.cause.stack,
      },
    };
  }
}

export function handleGoogleError(error: unknown): RuntimeGoogleError {
  if (isLikelyGoogleError(error)) {
    switch (error.code) {
      case Status.PERMISSION_DENIED:
        return new RuntimeGoogleError(
          '🔒 Permission denied. Check your service account or OAuth token.',
          { cause: error },
        )
      case Status.INVALID_ARGUMENT:
        throw new RuntimeGoogleError(
          '⚠️ Invalid argument. Invalid request. Check input parameters.',
          { cause: error },
        )
      case Status.NOT_FOUND:
        throw new RuntimeGoogleError('📭 Not found.  Resource not found.', { cause: error })
      case undefined:
        return new RuntimeGoogleError('❓ GoogleError with undefined code', { cause: error })
      case Status.OK: {
        throw new RuntimeGoogleError('Not implemented yet: Status.OK case', { cause: error })
      }
      case Status.CANCELLED: {
        throw new RuntimeGoogleError('Not implemented yet: Status.CANCELLED case', { cause: error })
      }
      case Status.UNKNOWN: {
        throw new RuntimeGoogleError('Not implemented yet: Status.UNKNOWN case', { cause: error })
      }
      case Status.DEADLINE_EXCEEDED: {
        throw new RuntimeGoogleError('Not implemented yet: Status.DEADLINE_EXCEEDED case', { cause: error })
      }
      case Status.ALREADY_EXISTS: {
        throw new RuntimeGoogleError('Not implemented yet: Status.ALREADY_EXISTS case', { cause: error })
      }
      case Status.RESOURCE_EXHAUSTED: {
        throw new RuntimeGoogleError('Not implemented yet: Status.RESOURCE_EXHAUSTED case', { cause: error })
      }
      case Status.FAILED_PRECONDITION: {
        throw new RuntimeGoogleError('Not implemented yet: Status.FAILED_PRECONDITION case', { cause: error })
      }
      case Status.ABORTED: {
        throw new RuntimeGoogleError('Not implemented yet: Status.ABORTED case', { cause: error })
      }
      case Status.OUT_OF_RANGE: {
        throw new RuntimeGoogleError('Not implemented yet: Status.OUT_OF_RANGE case', { cause: error })
      }
      case Status.UNIMPLEMENTED: {
        throw new RuntimeGoogleError('Not implemented yet: Status.UNIMPLEMENTED case', { cause: error })
      }
      case Status.INTERNAL: {
        throw new RuntimeGoogleError('Not implemented yet: Status.INTERNAL case', { cause: error })
      }
      case Status.UNAVAILABLE: {
        throw new RuntimeGoogleError('🌐 Network/server issue. Retry might help.', { cause: error })
      }
      case Status.DATA_LOSS: {
        throw new RuntimeGoogleError('Not implemented yet: Status.DATA_LOSS case', { cause: error })
      }
      case Status.UNAUTHENTICATED: {
        throw new RuntimeGoogleError('Not implemented yet: Status.UNAUTHENTICATED case', { cause: error })
      }
      default:
        return new RuntimeGoogleError(
          `🧨 Unhandled GoogleError [${error.code}]: ${error.message}`,
          { cause: error },
        )
    }
  }

  if (error instanceof Error) {
    throw new TypeError(`General Error: ${error.message}`, { cause: error })
  }

  throw new Error(`🧨 Unknown Error: ${JSON.stringify(error)}`, {
    cause: error,
  })
}

export function executeGooglePromise<T>(call: PromiseLike<T>) {
  return ResultAsync.fromPromise<T, RuntimeGoogleError>(call, e => handleGoogleError(e))
}
