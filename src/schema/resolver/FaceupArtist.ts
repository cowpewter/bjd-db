import { FaceupArtist } from '@entity/FaceupArtist';
import { Like } from '@entity/Like';
import { SocialMediaLink, sortLinks } from '@entity/SocialMediaLink';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { getRepository } from 'typeorm';

const resolver = {
  FaceupArtist: {
    socialLinks: async (parent: FaceupArtist) => {
      const links = await getRepository(SocialMediaLink)
        .find({ where: { artist: parent } });
      return links.sort(sortLinks);
    },

    addedBy: async (parent: FaceupArtist, _: any, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      if (!user || !user.isMod || !user.isAdmin) {
        return null;
      }
      return getRepository(User)
        .findOne({ where: { addedFaceupArtists: parent } });
    },

    likes: (parent: Comment) =>
      getRepository(Like)
        .find({ where: { faceupArtist: parent } }),
  },

  Query: {
    faceupArtist: (_: any, args: IdArgs) =>
      getRepository(FaceupArtist).findOne(args.id),
  },
};

export default resolver;
