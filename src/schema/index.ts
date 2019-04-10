import { makeExecutableSchema } from 'graphql-tools';
import * as Koa from 'koa';

import resolvers from '@schema/resolver';
import typeDefs from '@schema/typedef';

export interface GQLContext {
  koaCtx: Koa.Context;
  jwt: string;
  user: { id: string };
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
