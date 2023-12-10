import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userRepository } from '@/repositories';
import { sanitizeEntries, signInUserBody, signUpUserBody } from '@/utils';
import { conflictError, unauthorizedError, notFoundError } from '@/errors';
import { sessionRepository } from '@/repositories/session.repository';

async function createUser(data: signUpUserBody) {
  const sanitizeData = sanitizeEntries(data);
  const user = await userRepository.findUserByEmail(sanitizeData.email);
  if (user) throw conflictError('Email já cadastrado');

  const hash = bcrypt.hashSync(sanitizeData.password, 10);

  await userRepository.createUser({ ...sanitizeData, password: hash });
  return 'Usuário criado com sucesso!';
}

async function signInUser(data: signInUserBody) {
  const sanitizeData = sanitizeEntries(data);

  const user = await userRepository.findUserByEmail(sanitizeData.email);
  if (!user) throw notFoundError('Usuário não cadastrado');

  await checkUserPassword(sanitizeData.password, user.password);

  const token = await addUserSession(user.id);

  return { name: user.name, token };
}

async function signOut(sessionId: string) {
  await sessionRepository.endSession(sessionId);
  return 'Usuário deslogado com sucesso.';
}

async function checkUserPassword(inputPassword: string, userPassword: string) {
  const correctPassword = bcrypt.compareSync(inputPassword, userPassword);
  if (!correctPassword) throw unauthorizedError('Senha Incorreta.');
}

async function addUserSession(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || '');
  await sessionRepository.addSession(userId, token);
  return token;
}

export const userService = { createUser, signInUser, signOut };
