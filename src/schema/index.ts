import { makeExecutableSchema } from 'graphql-tools';
import * as Koa from 'koa';

import { resolver as AlbumResolver, typeDef as AlbumType }  from './Album';
import { resolver as CommentResolver, typeDef as CommentType } from './Comment';
import { resolver as CommentSourceResolver, typeDef as CommentSourceType } from './CommentSource';
import { resolver as CompanyResolver, typeDef as CompanyType } from './Company';
import { resolver as DollResolver, typeDef as DollType } from './Doll';
import {
  resolver as DollConfigurationResolver,
  typeDef as DollConfigurationType,
} from './DollConfiguration';
import { resolver as DollPartResolver, typeDef as DollPartType } from './DollPart';
import { resolver as DollWishlistResolver, typeDef as DollWishlistType } from './DollWishlist';
import { resolver as FaceupArtistResolver, typeDef as FaceupArtistType } from './FaceupArtist';
import { resolver as ImageResolver, typeDef as ImageType } from './Image';
import { resolver as InputOutputResolver, typeDef as InputOutputType } from './InputOutput';
import { resolver as MutationResolver, typeDef as MutationType } from './Mutation';
import { resolver as QueryResolver, typeDef as QueryType } from './Query';
import { resolver as ResinColorResolver, typeDef as ResinColorType } from './ResinColor';
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
  ResinColorType,
  SubscriptionsType,
  UserType,
  UserPartType,
];

const resolvers: any[] = [
  QueryResolver,
  MutationResolver,
  AlbumResolver,
  CommentResolver,
  CommentSourceResolver,
  CompanyResolver,
  DollResolver,
  DollConfigurationResolver,
  DollPartResolver,
  DollWishlistResolver,
  FaceupArtistResolver,
  ImageResolver,
  InputOutputResolver,
  ResinColorResolver,
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
