import { getRepository } from 'typeorm';
import { Album } from '../entity/Album';
import { Comment } from '../entity/Comment';
import { Image } from '../entity/Image';
import { User } from '../entity/User';
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
  Album: {
    user: (parent: Album) =>
      getRepository(User)
        .findOne({ where: { album: parent } }),

    images: (parent: Album) =>
      getRepository(Image)
        .find({ where: { album: parent } }),

    comments: (parent: Album) =>
      getRepository(Comment)
        .find({ where: { album: parent } }),
  },
  Query: {
    album: (_: any, args: IdArgs) =>
      getRepository(Album).findOne(args.id),
  },
};
