import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ApplicationError } from '@/utils';

export function handleApplicationErrors(err: ApplicationError, _req: Request, res: Response, _next: NextFunction) {
  console.log(err);
  if (err.code === 'P2023') {
    return res.status(httpStatus.BAD_REQUEST).send(err?.meta?.message);
  }
  switch (err.name) {
    case 'SchemaError':
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);
    case 'NotFoundError':
      return res.status(httpStatus.NOT_FOUND).send(err.message);
    case 'ConflictError':
      return res.status(httpStatus.CONFLICT).send(err.message);
    case 'Forbidden':
      return res.status(httpStatus.FORBIDDEN).send(err.message);
    case 'Unauthorized':
      return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    case 'JsonWebTokenError':
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    case 'SyntaxError':
      return res.status(httpStatus.BAD_REQUEST).send(err.message);
    default:
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'InternalServerError',
        message: 'Internal Server Error',
      });
  }
}
