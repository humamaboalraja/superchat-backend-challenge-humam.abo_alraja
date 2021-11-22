import { prisma } from '../../singletons/prisma';
import getGlobalData from '../../utils/getGlobalData';
import reset from '../../utils/reset';
import seed from '../../utils/seed';
import server from '../server';
describe('Test contact mutations', () => {
  beforeAll(async () => {
    await reset();
    await seed();
    global.testData = await getGlobalData();
  });

  const ADD_CONTACT_MUTATION = `
  mutation AddContact($createContactInputType: CreateContactInput) {
    addContact(InputType: $createContactInputType) {
      name
      email
    }
  }`;

  const exampleArgs = {
    name: 'Placeholder',
    email: 'placeholdertotestwith@service.com',
  };

  it('should create an contact', async () => {
    const res = await server.executeOperation({
      query: ADD_CONTACT_MUTATION,
      variables: {
        createContactInputType: {
          ...exampleArgs,
          name: 'Placeholder1',
          email: 'placeholder@service.com',
        },
      },
    });
    const contact = await prisma.contact.findUnique({
      where: {
        email: 'placeholder@service.com',
      },
    });
    if (!contact) throw new Error('Error fetching the created contact');
    expect(res).toMatchSnapshot();
  });
});

export {};
