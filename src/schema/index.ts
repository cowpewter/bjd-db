import { makeExecutableSchema } from 'graphql-tools';
import * as Koa from 'koa';

import { typeDef as AlbumType }  from './Album';
import { typeDef as CommentType } from './Comment';
import { typeDef as CommentSourceType } from './CommentSource';
import { typeDef as CompanyType } from './Company';
import { typeDef as DollType } from './Doll';
import { typeDef as DollConfigurationType } from './DollConfiguration';
import { typeDef as DollPartType } from './DollPart';
import { typeDef as DollWishlistType } from './DollWishlist';
import { typeDef as FaceupArtistType } from './FaceupArtist';
import { resolver as ImageResolver, typeDef as ImageType } from './Image';
import { resolver as InputOutputResolver, typeDef as InputOutputType } from './InputOutput';
import { resolver as MutationResolver, typeDef as MutationType } from './Mutation';
import { resolver as QueryResolver, typeDef as QueryType } from './Query';
import { resolver as SubscriptionResolver, typeDef as SubscriptionsType } from './Subscriptions';
import { resolver as UserResolver, typeDef as UserType } from './User';
import { resolver as UserPartResolver, typeDef as UserPartType } from './UserPart';

const typeDefs: string[] = [
  QueryType,
  MutationType,
  AlbumType,
  CommentType,
  CommentSourceType,
  CompanyType,
  DollType,
  DollConfigurationType,
  DollPartType,
  DollWishlistType,
  FaceupArtistType,
  ImageType,
  InputOutputType,
  SubscriptionsType,
  UserType,
  UserPartType,
];

const resolvers: any[] = [
  QueryResolver,
  MutationResolver,
  ImageResolver,
  InputOutputResolver,
  SubscriptionResolver,
  UserResolver,
  UserPartResolver,
];

export interface GQLContext {
  koaCtx: Koa.Context;
  jwt: string;
  user: { id: string };
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
