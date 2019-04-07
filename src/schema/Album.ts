import { getRepository } from 'typeorm';
import { Album } from '../entity/Album';
import { IdArgs } from './args';

export const typeDef = `
extend type Query {
  album(id: ID!): Album
}

type Album {
  id: ID!
  name: String!
  user: User!
  images: [Image!]
  comments: [Comment!]
}
`;

export const resolver = {
  Query: {
    album: (_: any, args: IdArgs) => {
      return getRepository(Album).findOne(args.id);
    },
  },
};
