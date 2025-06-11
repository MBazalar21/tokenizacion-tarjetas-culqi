export function errorResponse(
  message: string,
  statusCode: number = 500
): {
  statusCode: number;
  error: string;
} {
  return {
    statusCode,
    error: message,
  };
}
