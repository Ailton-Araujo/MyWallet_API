import express, { Express, json } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { connectDb } from '@/configs';
import { handleApplicationErrors } from '@/middlewares';
import { userRouter, transactionRouter } from '@/routes';

const app = express();

app
  .use(cors())
  .use(json())
  .use('/health', (_req, res) => res.send('OK!'))
  .use('/', userRouter)
  .use('/', transactionRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export { app };
