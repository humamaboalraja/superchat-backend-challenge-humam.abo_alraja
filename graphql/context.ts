import { PrismaClient } from '@prisma/client';
import { prisma } from '../singletons/prisma';

export type Context = {
  req: any;
  user: any;
  prisma: PrismaClient;
};
// Req will be of type Next request
export async function createContext(req): Promise<Context> {
  return {
    req: req,
    user: req.user,
    prisma,
  };
}
