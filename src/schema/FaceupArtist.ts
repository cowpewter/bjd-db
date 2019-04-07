import { getRepository } from 'typeorm';
import { FaceupArtist } from '../entity/FaceupArtist';
import { IdArgs } from './args';

export const typeDef = `
extend type Query {
  faceupArtist(id: ID!): FaceupArtist
}

type FaceupArtist {
  id: ID!
  name: String!
  country: String
  website: String
}
`;

export const resolver = {
  Query: {
    faceupArtist: (_: any, args: IdArgs) =>
      getRepository(FaceupArtist).findOne(args.id),
  },
};
