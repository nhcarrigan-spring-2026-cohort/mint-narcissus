/**
 * Normalizes any thrown value into the structured error shape
 * used by the logging contract: { name, message, stack, cause }.
 */
const normalizeError = (err) => {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      cause: err.cause ? normalizeError(err.cause) : undefined,
    };
  }

  // Handle non-Error throws (string, plain object, etc.)
  return {
    name: "UnknownError",
    message: String(err),
    stack: undefined,
    cause: undefined,
  };
};

module.exports = { normalizeError };
