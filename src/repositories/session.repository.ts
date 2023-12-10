import { prisma } from '@/configs';

async function addSession(userId: string, token: string) {
  return prisma.session.create({ data: { userId, token } });
}

async function findSession(userId: string, token: string) {
  return prisma.session.findFirst({ where: { userId, token } });
}

async function endSession(id: string) {
  return prisma.session.update({
    where: { id },
    data: { signOut: true },
  });
}

export const sessionRepository = { addSession, findSession, endSession };
