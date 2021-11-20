import { objectType } from 'nexus';

export const Contact = objectType({
  name: 'Contact',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('createdAt');
    t.string('updatedAt');
  },
});
