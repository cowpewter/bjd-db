import { Doll } from '@entity/Doll';
import { DollWishlist } from '@entity/DollWishlist';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { AuthenticationError } from 'apollo-server';
import { getRepository } from 'typeorm';

interface CreateDollWishlistArgs {
  name: string;
  isPrivate: boolean;
}

const resolver = {
  DollWishlist: {
    user: (parent: DollWishlist) =>
      getRepository(User)
        .findOne({ where: { dollWishlist: parent } }),

    dolls: async (parent: DollWishlist, _: any, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne({ where: { dollWishlist: parent } });
      const where = user && userId === user.id ?
        { dollWishlist: parent } :
        { dollWishlist: parent, isPrivate: false };
      return getRepository(Doll)
        .find({ where });
    },
  },

  Query: {
    dollWishlist: async (_: any, args: IdArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const wishlist = await getRepository(DollWishlist)
        .findOne(args.id, { relations: ['user'] });

      if (!wishlist) {
        return null;
      }
      if (wishlist.isPrivate && wishlist.user.id !== userId) {
        return null;
      }
      return wishlist;
    },
  },

  Mutation: {

    createDollWishlist: async (_: any, args: CreateDollWishlistArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;

      if (userId === '0') {
        throw new AuthenticationError('You must be logged in!');
      }

      const user = new User();
      user.id = userId;
      const wishlist = new DollWishlist();
      wishlist.name = args.name;
      wishlist.isPrivate = args.isPrivate;
      wishlist.user = user;

      await getRepository(DollWishlist).save(wishlist);
      return wishlist;
    },
  },
};

export default resolver;
