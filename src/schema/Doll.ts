import { getRepository } from 'typeorm';
import { Doll } from '../entity/Doll';
import { DollConfiguration } from '../entity/DollConfiguration';
import { Image } from '../entity/Image';
import { User } from '../entity/User';
import { IdArgs } from './args';

export const typeDef = `
extend type Query {
  doll(id: ID!): Doll
}

type Doll {
  id: ID!
  name: String!
  profileImage: Image
  sex: String
  gender: String
  isSold: Boolean!
  isWishlist: Boolean!
  allowComments: Boolean!
  user: User!
  description: String
  configurations: [DollConfiguration!]
}
`;

export const resolver = {
  Doll: {
    profileImage: (parent: Doll) =>
      getRepository(Image)
        .findOne({ where: { doll: parent } }),

    user: (parent: Doll) =>
      getRepository(User)
        .findOne({ where: { doll: parent } }),

    description: (parent: Doll) =>
      getRepository(DollConfiguration)
        .findOne({ where: { doll: parent } }),

    configurations: (parent: Doll) =>
      getRepository(Doll)
        .find({ where: { doll: parent } }),
  },
  Query: {
    doll: (_: any, args: IdArgs) =>
      getRepository(Doll).findOne(args.id),
  },
};
