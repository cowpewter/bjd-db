import { Doll } from '@entity/Doll';
import { DollWishlist } from '@entity/DollWishlist';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { getRepository } from 'typeorm';

const resolver = {
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

export default resolver;
