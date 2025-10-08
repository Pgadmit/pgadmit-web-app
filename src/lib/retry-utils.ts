interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (isNonRetryableError(error)) {
        throw error;
      }

      // If this is the last attempt, throw the error
      if (attempt === maxAttempts) {
        console.error(`Operation failed after ${maxAttempts} attempts:`, error);
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        baseDelay * Math.pow(backoffFactor, attempt - 1),
        maxDelay
      );

      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms:`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

function isNonRetryableError(error: any): boolean {
  // Don't retry on authentication errors, validation errors, etc.
  const nonRetryableCodes = [
    'PGRST301', // Not authenticated
    'PGRST302', // Not authorized
    'PGRST116', // No rows returned (profile doesn't exist)
    '23505', // Unique constraint violation
    '23503', // Foreign key constraint violation
  ];

  return nonRetryableCodes.some(
    code => error?.code === code || error?.message?.includes(code)
  );
}

export async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  return withRetry(fetchFn, {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 5000,
    backoffFactor: 1.5,
    ...options,
  });
}
