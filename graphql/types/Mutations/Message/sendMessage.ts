import { extendType, inputObjectType } from 'nexus';
import { Context } from '../../../context';

const InputType = inputObjectType({
  name: 'SendMessageInput',
  description: 'Message input',
  definition(t) {
    t.nonNull.string('senderId');
    t.nonNull.string('recieverId');
    t.nonNull.string('messageContent');
  },
});

export const sendMessage = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('sendMessage', {
      type: 'Message',
      description: 'Send a message to a contact',
      args: { InputType },
      resolve: async (_, args, ctx: Context) => {
        args = args.InputType;
        let message;

        const senderData = await ctx.prisma.contact.findUnique({
          where: { id: args.senderId },
        });

        if (senderData) {
          const payload = {
            data: {
              senderId: args.senderId,
              recieverId: args.recieverId,
              messageContent: args.messageContent,
            },
          };
          message = await ctx.prisma.message.create(payload);

          return message;
        } else {
          return { message: 'Something went wrong' };
        }
      },
    });
  },
});
