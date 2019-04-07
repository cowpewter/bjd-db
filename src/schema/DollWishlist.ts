import { getRepository } from 'typeorm';
import { GQLContext } from '.';
import { Doll } from '../entity/Doll';
import { DollWishlist } from '../entity/DollWishlist';
import { User } from '../entity/User';
import { IdArgs } from './args';

export const typeDef = `
extend type Query {
  dollWishlist(id: ID!): DollWishlist
}

type DollWishlist {
  id: ID!
  name: String!
  user: User!
  dolls: [Doll!]
}
`;

export const resolver = {
  DollWishlist: {
    user: (parent: DollWishlist) =>
      getRepository(User)
        .findOne({ where: { dollWishlist: parent } }),

    dolls: async (parent: DollWishlist, _: any, ctx: GQLContext) => {
      const user = await getRepository(User)
        .findOne({ where: { dollWishlist: parent } });
      const where = user && ctx.koaCtx.user.id === user.id ?
        { dollWishlist: parent } :
        { dollWishlist: parent, isPrivate: false };
      return getRepository(Doll)
        .find({ where });
    },
  },

  Query: {
    dollWishlist: async (_: any, args: IdArgs, ctx: GQLContext) => {
      const wishlist = await getRepository(DollWishlist)
        .findOne(args.id, { relations: ['user'] });

      if (!wishlist) {
        return null;
      }
      if (wishlist.isPrivate && wishlist.user.id !== ctx.koaCtx.user.id) {
        return null;
      }
      return wishlist;
    },
  },
};
