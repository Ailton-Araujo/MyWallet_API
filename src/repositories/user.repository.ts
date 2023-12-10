import { prisma } from '@/configs';
import { signUpUserBody } from '@/utils';

async function createUser(data: signUpUserBody) {
  return prisma.user.create({ data });
}

async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export const userRepository = { createUser, findUserByEmail, findUserById };
