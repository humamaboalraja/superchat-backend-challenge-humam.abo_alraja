import { objectType } from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.string('id');
    t.string('messageContent');
    t.string('senderId');
    t.string('createdAt');
    t.string('updatedAt');
  },
});
