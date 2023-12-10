import { Router } from 'express';
import {} from '@/controllers';
import { validateBody, validateParams } from '@/middlewares';
import {} from '@/schemas';
import { transactionIdSchema, transactionSchema } from '@/schemas/transaction.schema';

const transactionRouter = Router();

transactionRouter
  .get('/transactions')
  .post('/addTransaction/', validateBody(transactionSchema))
  .delete('/transaction/:id')
  .put('/transaction/:id', validateParams(transactionIdSchema), validateBody(transactionSchema));

export { transactionRouter };
