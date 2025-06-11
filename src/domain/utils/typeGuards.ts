import { MongooseValidationError } from '../../core/interfaces/errors/ValidationError';

export function isMongooseValidationError(error: unknown): error is MongooseValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as MongooseValidationError).name === 'ValidationError'
  );
}