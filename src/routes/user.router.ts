import { Router } from 'express';
import { signIn, signUp, signOut } from '@/controllers';
import { validateAuth, validateBody } from '@/middlewares';
import { signInSchema, signUpSchema } from '@/schemas';

export const userRouter = Router();

userRouter
  .post('/sign-in', validateBody(signInSchema), signIn)
  .post('/sign-up', validateBody(signUpSchema), signUp)
  .all('/*', validateAuth)
  .put('/sign-out', signOut);

export default userRouter;
