import getGlobalData from '../../utils/getGlobalData';
import reset from '../../utils/reset';
import seed from '../../utils/seed';
import server from '../server';

beforeAll(async () => {
  await reset();
  await seed();
  global.testData = await getGlobalData();
});

const FIND_CONTACT_QUERY = `
  query FindContact($email: String) {
   findContact(email: $email) {
     name
     email
   }
 }
  `;

describe('Test find contact query', () => {
  it('should find a contact given their email', async () => {
    const res = await server.executeOperation({
      query: FIND_CONTACT_QUERY,
      variables: { email: global.testData.contacts[0].email },
    });
    console.log(global.testData.contacts[0].email);
    expect(res).toMatchSnapshot();
  });

  it('should not find a contact if no arguments are passed in', async () => {
    const res = await server.executeOperation({
      query: FIND_CONTACT_QUERY,
      variables: {},
    });
    expect(res).toMatchSnapshot();
  });

  it('should not find a user by email if it does not exist', async () => {
    const res = await server.executeOperation({
      query: FIND_CONTACT_QUERY,
      variables: { email: 'fghjkbnjyghm' },
    });
    expect(res).toMatchSnapshot();
  });
});

export {};
