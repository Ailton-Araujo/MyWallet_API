import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '@/errors';
import {} from '@/repositories';

export async function validateAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw unauthorizedError('Token was not provided');

  const token = authHeader.split(' ')[1];
  if (!token) throw unauthorizedError('token was not provided in the');

  const { userId } = jwt.verify(token, process.env.JWT_SECRET || '') as JWTPayload;

  //   const session = await authenticationRepository.findSession(token);
  //   if (!session) throw unauthorizedError();
  req.userId = userId;
  next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
