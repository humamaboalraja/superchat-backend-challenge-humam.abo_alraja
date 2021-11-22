import { booleanArg, extendType, stringArg } from 'nexus';
import { Contact } from '.prisma/client';
import { Context } from '../../../context';

export const ListContacts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('listContacts', {
      type: 'Contact',
      description: 'List all contacts',
      resolve: async (_, _args, ctx: Context) => {
        let res: Contact[];
        res = await ctx.prisma.contact.findMany({});
        return res;
        if (res) {
        } else {
          return {
            message: 'Error fetching the contacts',
          };
        }
      },
    });
  },
});
