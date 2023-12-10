import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { transactionService } from '@/services';
import { TransactionCreateOrUpdateBody, transactionParams, UserInfo } from '@/utils';

export async function listTransactions(req: Request, res: Response) {
  const userInfo = res.locals as UserInfo;
  const response = await transactionService.listTransactions(userInfo.userId);
  res.status(httpStatus.OK).send(response);
}

export async function addTransactions(req: Request, res: Response) {
  const data = req.body as TransactionCreateOrUpdateBody;
  const userInfo = res.locals as UserInfo;
  const response = await transactionService.addTransaction(userInfo.userId, data);
  res.status(httpStatus.CREATED).send(response);
}

export async function deleteTransactions(req: Request, res: Response) {
  const { id } = req.params as transactionParams;
  const userInfo = res.locals as UserInfo;
  const response = await transactionService.deleteTransaction(id, userInfo.userId);
  res.sendStatus(httpStatus.NO_CONTENT);
}

export async function editTransactions(req: Request, res: Response) {
  const { id } = req.params as transactionParams;
  const data = req.body as TransactionCreateOrUpdateBody;
  const userInfo = res.locals as UserInfo;
  const response = await transactionService.editTransaction(id, userInfo.userId, data);
  res.status(httpStatus.CREATED).send(response);
}
