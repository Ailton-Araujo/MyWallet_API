import { User, Transaction } from '@prisma/client';

type SystemInfo = 'createdAt' | 'updatedAt';

export type ApplicationError = {
  name: string;
  message: string;
  code?: string | number;
  meta?: { target: string; cause: string };
};

export type signInUserBody = Pick<User, 'email' | 'password'>;
export type signUpUserBody = Pick<User, 'email' | 'name' | 'password'>;

export type TransactionCreateOrUpdateBody = Pick<Transaction, 'description' | 'amount' | 'type'>;

export type transactionParams = {
  id: string;
};

export type UserInfo = { userId: string; sessionId: string };
