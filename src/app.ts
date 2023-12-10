import express, { Express, json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleApplicationErrors } from '@/middlewares';

const app = express();

app.use(cors()).use(json()).use(handleApplicationErrors);

export function init(): Promise<Express> {
  return Promise.resolve(app);
}

export { app };
