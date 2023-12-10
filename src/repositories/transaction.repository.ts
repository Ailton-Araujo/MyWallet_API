import { prisma } from '@/configs';
import { TransactionCreateInput } from '@/utils';

async function listTransactions(userId: string) {
  return await prisma.transaction.findMany({
    where: { userId },
    orderBy: { id: 'desc' },
  });
}

async function addTransaction(data: TransactionCreateInput) {
  return await prisma.transaction.create({
    data,
  });
}

async function findTransactionById(id: string) {
  return await prisma.transaction.findUnique({ where: { id } });
}

async function deleteTransaction(id: string) {
  return await prisma.transaction.delete({ where: { id } });
}

async function editTransaction(id: string, data: TransactionCreateInput) {
  return await prisma.transaction.update({ where: { id }, data });
}

export const transactionRepository = {
  listTransactions,
  addTransaction,
  findTransactionById,
  deleteTransaction,
  editTransaction,
};
