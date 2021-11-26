import { extendType, inputObjectType } from 'nexus';
import { Context } from '../../../context';
import getBTCData from '../../../../utils/application/BitcoinData';
import replaceStringWithArrayValues from '../../../../utils/application/Strings';
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

          // Fetch Bitcoin latest price
          const bitcoinPrice = await getBTCData();

          // Find contact details that matches `args.recieverId`
          const contactData = await ctx.prisma.contact.findMany({
            where: {
              id: args.recieverId,
            },
          });

          const substitutedMessageContents = replaceStringWithArrayValues(
            args.messageContent,
            {
              bitcoin: bitcoinPrice,
              name: contactData[0].name,
              email: contactData[0].email,
            }
          );

          const payload = {
            data: {
              senderId: args.senderId,
              recieverId: args.recieverId,
              messageContent: substitutedMessageContents,
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
