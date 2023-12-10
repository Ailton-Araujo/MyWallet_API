import {} from '@prisma/client';

type SystemInfo = 'createdAt' | 'updatedAt';

export type ApplicationError = {
  name: string;
  message: string;
  code?: string | number;
  meta?: { target: string; cause: string };
};
