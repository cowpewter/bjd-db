import { getRepository } from 'typeorm';
import { DollPart } from '../entity/DollPart';
import { FaceupArtist } from '../entity/FaceupArtist';
import { ResinColor } from '../entity/ResinColor';
import { User } from '../entity/User';
import { UserPart } from '../entity/UserPart';

export const typeDef = `
type UserPart {
  id: ID!
  user: User!
  part: DollPart!
  artist: FaceupArtist
  resinColor: ResinColor!
  isWishlist: Boolean
}
`;

// default resolvers are sufficient
export const resolver = {
  UserPart: {
    user: (parent: UserPart) =>
      getRepository(User)
        .findOne({ where: { userPart: parent } }),

    part: (parent: UserPart) =>
      getRepository(DollPart)
        .findOne({ where: { userPart: parent } }),

    artist: (parent: UserPart) =>
      getRepository(FaceupArtist)
        .findOne({ where: { userPart: parent } }),

    resinColor: (parent: UserPart) =>
      getRepository(ResinColor)
        .findOne({ where: { userPart: parent } }),
  },
};
