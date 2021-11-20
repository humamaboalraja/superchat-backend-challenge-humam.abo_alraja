import cryptoRandomString from 'crypto-random-string';
import { prisma } from '../singletons/prisma';

export default async function seed() {
  try {
    const contact1 = await prisma.contact.create({
      data: {
        name: 'Humam Abo Alraja',
        email: 'humam@company.com',
      },
    });
    const contact2 = await prisma.contact.create({
      data: {
        name: 'John',
        email: 'john@company.com',
      },
    });

    const contact3 = await prisma.contact.create({
      data: {
        name: 'Emma Mockassin',
        email: 'emma@company.com',
      },
    });

    const contact4 = await prisma.contact.create({
      data: {
        name: 'Alex Smith',
        email: 'alex@company.com',
      },
    });

    if (!contact1 || !contact2 || !contact3 || !contact4)
      throw new Error('no contacts');

    const one = await prisma.message.create({
      data: {
        messageContent: 'Hey Emma, How is it going?!',
        sender: {
          connect: {
            id: contact1.id,
          },
        },
        reciever: {
          connect: {
            id: contact3.id,
          },
        },
      },
    });

    const two = await prisma.message.create({
      data: {
        messageContent: "Hi Humam, it's going great! How about you?",
        sender: {
          connect: {
            id: contact3.id,
          },
        },
        reciever: {
          connect: {
            id: contact1.id,
          },
        },
      },
    });

    const three = await prisma.message.create({
      data: {
        messageContent:
          'Hey Alex, do you mind sending me the pitch ASAP? Thanks in advance!',
        sender: {
          connect: {
            id: contact3.id,
          },
        },
        reciever: {
          connect: {
            id: contact4.id,
          },
        },
      },
    });

    const four = await prisma.message.create({
      data: {
        messageContent: 'Hi Emma, Definitely!',
        sender: {
          connect: {
            id: contact4.id,
          },
        },
        reciever: {
          connect: {
            id: contact3.id,
          },
        },
      },
    });
  } catch (e) {
    throw new Error(`${e}`);
  }
}
