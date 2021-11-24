import { extendType, stringArg } from 'nexus';
import { Context } from '../../../context';

export const ListPreviousMessages = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('listPreviousMessages', {
      type: 'Message',
      description: 'List all previous conversations between contact [one, two]',
      args: { one: stringArg(), two: stringArg() },
      resolve: async (_, args, ctx: Context) => {
        const res = await ctx.prisma.message.findMany({
          where: {
            senderId: args.one,
            recieverId: args.two,
          },
          orderBy: {
            id: 'asc',
          },
        });
        if (res) {
          return res;
        } else {
          return {
            message: 'Error fetching the contacts',
          };
        }
      },
    });
  },
});
