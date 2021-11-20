import { makeSchema } from 'nexus';
import * as NexusPrismaScalarTypes from 'nexus-prisma/scalars';
import * as path from 'path';
import * as types from './types';

export const schema = makeSchema({
  prettierConfig:
    process.env.STAGE != 'test'
      ? path.join(__dirname, '../.prettierrc')
      : undefined,
  types: [types, NexusPrismaScalarTypes],
  features: {
    abstractTypeStrategies: {
      isTypeOf: true,
    },
  },
  nonNullDefaults: {
    output: true,
  },
  outputs: {
    schema: path.join(
      __dirname,
      '../node_modules/@types/nexus-typegen/index.d.ts'
    ),
    typegen: path.join(__dirname, '/generated/schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: path.join(__dirname, '/context.ts'),
  },
  sourceTypes: {
    modules: [{ module: '.prisma/client', alias: 'PrismaClient' }],
  },
});
