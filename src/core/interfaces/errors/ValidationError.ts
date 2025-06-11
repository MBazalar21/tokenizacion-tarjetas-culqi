export interface MongooseValidationError extends Error {
  name: 'ValidationError';
  errors: {
    [key: string]: {
      message: string;
    };
  };
}