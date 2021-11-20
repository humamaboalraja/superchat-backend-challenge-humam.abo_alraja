import { prisma } from '../singletons/prisma';

export default async function getGlobalData() {
  const messages = await prisma.message.findMany({});
  const contacts = await prisma.contact.findMany({});
  if (!messages || !contacts) throw new Error('Unable to set up global data');
  return { messages, contacts };
}
