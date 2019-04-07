import { getRepository } from 'typeorm';
import { DollPart } from '../entity/DollPart';
import { FaceupArtist } from '../entity/FaceupArtist';
import { User } from '../entity/User';

export const typeDef = `
type UserPart {
  id: ID!
  user: User!
  part: DollPart!
  artist: FaceupArtist
  isWishlist: Boolean
}
`;

export const resolver = {
  UserPart: {
    user(userPart: any) {
      return getRepository(User)
        .findOne(userPart.userId);
    },
    part(userPart: any) {
      return getRepository(DollPart)
        .findOne(userPart.partId);
    },
    artist(userPart: any) {
      return getRepository(FaceupArtist)
        .findOne(userPart.artistId);
    },
  },
};
