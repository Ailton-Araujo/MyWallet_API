import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { signInUserBody, signUpUserBody } from '@/utils';

export function signIn(req: Request, res: Response) {
  const { email, password } = req.body as signInUserBody;

  res.status(httpStatus.OK).send('ok');
}

export function signUp(req: Request, res: Response) {
  const { email, password, name } = req.body as signUpUserBody;

  res.status(httpStatus.CREATED).send('ok');
}

export function signOut(req: Request, res: Response) {
  const { userInfo } = res.locals;

  res.status(httpStatus.OK).send('Usuário deslogado com sucesso');
}
