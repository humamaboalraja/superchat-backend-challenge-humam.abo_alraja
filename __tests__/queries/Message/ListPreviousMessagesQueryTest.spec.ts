import getGlobalData from '../../../utils/database/getGlobalData';
import reset from '../../../utils/database/reset';
import seed from '../../../utils/database/seed';
import server from '../../server';

beforeAll(async () => {
  await reset();
  await seed();
  global.testData = await getGlobalData();
});

const LIST_PREVIOUS_MESSAGES_QUERY = `
query ListPreviousMessages($senderId: String, $recieverId: String) {
   listPreviousMessages(one: $senderId, two: $recieverId) {
     senderId
     recieverId
     messageContent
   }
 }
  `;

describe('Test find contact query', () => {
  it('should list previous messages between two contacts', async () => {
    const res = await server.executeOperation({
      query: LIST_PREVIOUS_MESSAGES_QUERY,
      variables: {
        one: global.testData.contacts[1].id,
        two: global.testData.contacts[2].id,
      },
    });
    expect(res).toMatchSnapshot();
  });

  it('should not find previous messages between two contacts if no arguments are passed in', async () => {
    const res = await server.executeOperation({
      query: LIST_PREVIOUS_MESSAGES_QUERY,
      variables: {
        one: '',
        two: '',
      },
    });
    expect(res).toMatchSnapshot();
  });
});

export {};
