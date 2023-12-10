import Joi from 'joi';
import { TransactionCreateOrUpdateBody, transactionParams } from '@/utils';

const transactionSchema = Joi.object<TransactionCreateOrUpdateBody>({
  description: Joi.string().required(),
  amount: Joi.number().precision(2).greater(0).required(),
  type: Joi.string().valid('entrada', 'saida').required(),
});

export const transactionIdSchema = Joi.object<transactionParams>({
  id: Joi.string().required(),
});

export { transactionSchema };
