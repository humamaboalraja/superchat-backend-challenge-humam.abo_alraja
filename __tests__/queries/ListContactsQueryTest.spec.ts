import getGlobalData from '../../utils/getGlobalData';
import reset from '../../utils/reset';
import seed from '../../utils/seed';
import server from '../server';

beforeAll(async () => {
  await reset();
  await seed();
  global.testData = await getGlobalData();
});

describe('Test Contact queries', () => {
  const CONTACTS_QUERY = `
  query Query {
   listContacts {
     name
     email
   }
 }
`;

  it('should list all contacts ', async () => {
    const res = await server.executeOperation({
      query: CONTACTS_QUERY,
    });
    expect(res).toMatchSnapshot();
  });
});
