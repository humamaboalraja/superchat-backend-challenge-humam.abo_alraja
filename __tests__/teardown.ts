import { prisma } from '../singletons/prisma';
import server from './server';

export default async function teardown(): Promise<void> {
  try {
    server.stop();
    prisma.$disconnect();
    process.exit(0);
  } catch (e) {
    throw new Error('Issue tearing down test');
  }
}
