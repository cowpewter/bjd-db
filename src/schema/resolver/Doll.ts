import { Doll, DollGender, DollSex } from '@entity/Doll';
import { DollConfiguration } from '@entity/DollConfiguration';
import { DollWishlist } from '@entity/DollWishlist';
import { Image } from '@entity/Image';
import { Like } from '@entity/Like';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { AuthenticationError } from 'apollo-server';
import { getRepository } from 'typeorm';

interface CreateDollArgs {
  data: {
    name: string;
    isPrivate: boolean;
    isWishlist: boolean;
    allowComments: boolean;
    sex?: DollSex;
    gender?: DollGender;
    profileImageId?: string;
    wishlistId?: string;
    wishlistName?: string;
    wishlistIsPrivate?: boolean;
  };
}

const resolver = {
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
      getRepository(DollConfiguration)
        .find({ where: { doll: parent } }),

    comments: (parent: Doll) =>
      getRepository(Comment)
        .find({ where: { doll: parent } }),

    likes: (parent: Doll) =>
      getRepository(Like)
        .find({ where: { doll: parent } }),
  },

  Query: {
    doll: (_: any, args: IdArgs) =>
      getRepository(Doll).findOne(args.id),
  },

  Mutation: {
    createDoll: async (_: any, args: CreateDollArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      if (userId === '0') {
        throw new AuthenticationError('You must be logged in!');
      }

      const user = new User();
      user.id = userId;

      const doll = new Doll();
      doll.name = args.data.name;
      doll.isPrivate = args.data.isPrivate;
      doll.isWishlist = args.data.isWishlist;
      doll.allowComments = args.data.allowComments;
      doll.user = user;
      if (args.data.sex) {
        doll.sex = args.data.sex;
      }
      if (args.data.gender) {
        doll.gender = args.data.gender;
      }
      if (args.data.profileImageId) {
        const image = new Image();
        image.id = args.data.profileImageId;
        doll.profileImage = image;
      }
      if (args.data.wishlistId) {
        const wishlist = new DollWishlist();
        if (args.data.wishlistId === 'new') {
          wishlist.name = args.data.wishlistName || 'New Wishlist';
          wishlist.isPrivate = !!args.data.wishlistIsPrivate;
          await getRepository(DollWishlist).save(wishlist);
        } else {
          wishlist.id = args.data.wishlistId;
        }
        doll.wishlist = wishlist;
      }

      await getRepository(Doll).save(doll);
      return doll;
    },
  },
};

export default resolver;
