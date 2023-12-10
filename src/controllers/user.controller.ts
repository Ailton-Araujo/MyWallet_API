import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { userService } from '@/services';
import { signInUserBody, signUpUserBody, UserInfo } from '@/utils';

export async function signIn(req: Request, res: Response) {
  const data = req.body as signInUserBody;

  const response = await userService.signInUser(data);

  res.status(httpStatus.OK).send(response);
}

export async function signUp(req: Request, res: Response) {
  const data = req.body as signUpUserBody;
  const response = await userService.createUser(data);

  res.status(httpStatus.CREATED).send(response);
}

export async function signOut(req: Request, res: Response) {
  const userInfo = res.locals as UserInfo;
  const response = await userService.signOut(userInfo.sessionId);

  res.sendStatus(httpStatus.NO_CONTENT);
}
