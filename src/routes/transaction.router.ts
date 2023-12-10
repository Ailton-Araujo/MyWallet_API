import { Router } from 'express';
import { listTransactions, addTransactions, deleteTransactions, editTransactions } from '@/controllers';
import { validateAuth, validateBody, validateParams } from '@/middlewares';
import { transactionIdSchema, transactionSchema } from '@/schemas';

const transactionRouter = Router();

transactionRouter
  .all('/*', validateAuth)
  .get('/transactions', listTransactions)
  .post('/addTransaction', validateBody(transactionSchema), addTransactions)
  .delete('/transaction/:id', validateParams(transactionIdSchema), deleteTransactions)
  .put('/transaction/:id', validateParams(transactionIdSchema), validateBody(transactionSchema), editTransactions);

export { transactionRouter };
