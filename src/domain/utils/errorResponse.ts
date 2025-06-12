export function errorResponse(
  message: string,
  statusCode: number = 500
): {
  statusCode: number;
  message: string;
} {
  return {
    statusCode,
    message: message,
  };
}
