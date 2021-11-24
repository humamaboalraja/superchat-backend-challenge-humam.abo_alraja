import { extendType, inputObjectType } from 'nexus';
import { Context } from '../../../context';

const InputType = inputObjectType({
  name: 'CreateContactInput',
  description: 'Contact input',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('email');
  },
});

export const addContact = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addContact', {
      type: 'Contact',
      description: 'Add an contact given their name and email',
      args: { InputType },
      resolve: async (_, args, ctx: Context) => {
        args = args.InputType;
        let contact;

        const payload = {
          data: {
            name: args.name,
            email: args.email,
          },
        };
        contact = await ctx.prisma.contact.create(payload);
        return contact;
      },
    });
  },
});
