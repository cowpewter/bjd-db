import { Company } from '@entity/Company';
import { FaceupArtist } from '@entity/FaceupArtist';
import { SocialMediaLink, SocialMediaLinkService } from '@entity/SocialMediaLink';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { getRepository } from 'typeorm';

interface AddSocialLinkArgs {
  service: SocialMediaLinkService;
  url: string;
  ownerType: string;
  ownerId: string;
}

interface EditSocialLinkArgs {
  id: string;
  url: string;
}

const resolver = {
  SocialMediaLink: {
    addedBy: async (parent: SocialMediaLink, _: any, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      if (!user || !user.isMod || !user.isAdmin) {
        return null;
      }
      return getRepository(User)
        .findOne({ where: { socialLink: parent } });
    },
  },

  Mutation: {
    addSocialMediaLink: async (_: any, args: AddSocialLinkArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      if (args.ownerType === 'user' && args.ownerId !== userId) {
        throw new AuthenticationError("You cannot edit another user's links");
      }
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const link = new SocialMediaLink();
      link.service = args.service;
      link.url = args.url;
      link.addedBy = user;

      if (user.isMod || user.isAdmin) {
        link.vetted = true;
      }

      switch (args.ownerType) {
        case 'user':
          link.user = new User();
          link.user.id = args.ownerId;
          break;
        case 'faceupArtst':
          link.artist = new FaceupArtist();
          link.artist.id = args.ownerId;
          break;
        case 'company':
          link.company = new Company();
          link.company.id = args.ownerId;
          break;
        default:
          throw new UserInputError('ownerType must be one of: "user", "faceupArtist", "company"');
      }
      await getRepository(SocialMediaLink).save(link);
      return link;
    },

    editSocialMediaLink: async (_: any, args: EditSocialLinkArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      const link = await getRepository(SocialMediaLink)
        .findOne(args.id, { relations: ['user', 'artist', 'company'] });

      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      if (!link) {
        throw new UserInputError('Link does not exist');
      }
      if (link.user && link.user.id !== userId) {
        throw new AuthenticationError("You cannot edit another user's links");
      }

      if (user && (user.isAdmin || user.isMod)) {
        link.vetted = true;
      }
      link.url = args.url;
      await getRepository(SocialMediaLink).save(link);
      return link;
    },

    deleteSocialMediaLink: async (_: any, args: IdArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      const link = await getRepository(SocialMediaLink)
        .findOne(args.id, { relations: ['user'] });

      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (!link) {
        throw new UserInputError('Link does not exist');
      }
      if (link.user && link.user.id !== userId) {
        throw new AuthenticationError("You cannot edit another user's links");
      }

      // Hard delete if mod or editing own links
      if (user.isMod || user.isAdmin || (link.user && link.user.id === userId)) {
        await getRepository(SocialMediaLink).remove(link);
      } else {
        link.deleteTimestamp = new Date();
        await getRepository(SocialMediaLink).save(link);
      }

      return { success: true };
    },
  },
};

export default resolver;
