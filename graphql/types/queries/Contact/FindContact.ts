import { extendType, stringArg } from 'nexus';
import { Context } from '../../../context';

export const FindContact = extendType({
  type: 'Query',
  definition(t) {
    t.field('findContact', {
      type: 'Contact',
      description: 'Find a Contact given their email',
      args: { email: stringArg() },
      resolve: async (_, args, ctx: Context) => {
        if (!args.email) {
          return {
            message: `Please specify a contact email`,
          };
        }
        const contactResult = await ctx.prisma.contact.findUnique({
          where: {
            email: args.email,
          },
        });

        if (args.email && !contactResult) {
          return { message: 'Contact does not exist' };
        } else {
          return contactResult;
        }
      },
    });
  },
});
