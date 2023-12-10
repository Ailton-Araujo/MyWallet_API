import { ApplicationError } from '@/utils';

export function schemaError(message: string): ApplicationError {
  return {
    name: 'SchemaError',
    message,
  };
}

export function unauthorizedError(message: string): ApplicationError {
  return {
    name: 'AuthenticationError',
    message,
  };
}
