import { Message } from '.prisma/client';
import { prisma } from '../../../singletons/prisma';
import getGlobalData from '../../../utils/database/getGlobalData';
import reset from '../../../utils/database/reset';
import seed from '../../../utils/database/seed';
import server from '../../server';
describe('Sending a message mutations Tests', () => {
  beforeAll(async () => {
    await reset();
    await seed();
    global.testData = await getGlobalData();
  });

  const SEND_MESSAGE_MUTATION = `
  mutation SendMessage($inputType: SendMessageInput) {
    sendMessage(InputType: $inputType) {
      senderId
      recieverId
      messageContent
    }
  }`;

  const exampleArgs = {
    senderId: 'ckwcm9hzq0007y5hfzz0g4tcj',
    recieverId: 'ckwcm9hzf0000y5hfp8p74h7e',
    messageContent: 'Placeholderfff',
  };

  it('should send a message', async () => {
    const contact = global.testData.contacts.filter(
      c => c.id === 'ckwc2uheg0000ithfmy9079g0'
    );

    const res = await server.executeOperation({
      query: SEND_MESSAGE_MUTATION,
      variables: {
        inputType: {
          ...exampleArgs,
          senderId: 'ckwcm9hzf0000y5hfp8p74h7e',
          recieverId: 'ckwcm9hzq0007y5hfzz0g4tcj',
          messageContent: 'sdfadsfs',
        },
      },
    });
    console.log(res);
    const message = await prisma.message.findMany({
      where: {
        senderId: 'ckwcm9hzf0000y5hfp8p74h7e',
      },
    });
    if (!message) throw new Error('Error fetching the sent message');
    expect(res).toMatchSnapshot();
  });
});

export {};
