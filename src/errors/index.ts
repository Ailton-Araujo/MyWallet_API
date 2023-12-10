import { ApplicationError } from '@/utils';

export function schemaError(message: string): ApplicationError {
  return {
    name: 'SchemaError',
    message,
  };
}

export function unauthorizedError(message: string): ApplicationError {
  return {
    name: 'Unauthorized',
    message,
  };
}

export function conflictError(message: string): ApplicationError {
  return {
    name: 'ConflictError',
    message,
  };
}

export function notFoundError(message: string): ApplicationError {
  return {
    name: 'NotFoundError',
    message,
  };
}

export function forbiddenError(message: string): ApplicationError {
  return {
    name: 'ForbiddenError',
    message,
  };
}
