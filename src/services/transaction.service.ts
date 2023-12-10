import { forbiddenError, notFoundError } from '@/errors';
import { transactionRepository } from '@/repositories';
import { TransactionCreateInput, TransactionCreateOrUpdateBody, sanitizeEntries } from '@/utils';

async function listTransactions(userId: string) {
  return await transactionRepository.listTransactions(userId);
}

async function addTransaction(userId: string, data: TransactionCreateOrUpdateBody) {
  const sanitizeData = sanitizeEntries(data);
  const newData = formatData(sanitizeData, userId);
  return await transactionRepository.addTransaction(newData);
}

async function deleteTransaction(id: string, userId: string) {
  const transaction = await transactionRepository.findTransactionById(id);
  if (!transaction) throw notFoundError('Transação não encontrada');
  if (transaction.userId !== userId) throw forbiddenError('Você não pode deletar essa transação');
  return await transactionRepository.deleteTransaction(id);
}

async function editTransaction(id: string, userId: string, data: TransactionCreateOrUpdateBody) {
  const sanitizeData = sanitizeEntries(data);
  const newData = formatData(sanitizeData, userId);
  const transaction = await transactionRepository.findTransactionById(id);
  if (!transaction) throw notFoundError('Transação não encontrada');
  if (transaction.userId !== userId) throw forbiddenError('Você não pode deletar essa transação');
  return await transactionRepository.editTransaction(id, newData);
}

function formatData(data: TransactionCreateOrUpdateBody, userId: string): TransactionCreateInput {
  return {
    ...data,
    userId,
    amount: Number(
      data.amount
        .toFixed(2)
        .toString()
        .replace(/[.]|[,]$/, ''),
    ),
  };
}

export const transactionService = {
  listTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
};
