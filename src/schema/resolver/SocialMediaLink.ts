import { Company } from '@entity/Company';
import { FaceupArtist } from '@entity/FaceupArtist';
import { SocialMediaLink, SocialMediaLinkService } from '@entity/SocialMediaLink';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { getRepository } from 'typeorm';
import { GQLContext } from '..';

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
  Mutation: {
    addSocialMediaLink: async (_: any, args: AddSocialLinkArgs, ctx: GQLContext) => {
      if (args.ownerType === 'user' && args.ownerId !== ctx.koaCtx.user.id) {
        throw new AuthenticationError("You cannot edit another user's links");
      }

      const link = new SocialMediaLink();
      link.service = args.service;
      link.url = args.url;

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
      const link = await getRepository(SocialMediaLink)
        .findOne(args.id, { relations: ['user', 'artist', 'company'] });

      if (!link) {
        throw new UserInputError('Link does not exist');
      }
      if (link.user && link.user.id !== ctx.koaCtx.user.id) {
        throw new AuthenticationError("You cannot edit another user's links");
      }
      link.url = args.url;
      await getRepository(SocialMediaLink).save(link);
      return link;
    },

    deleteSocialMediaLink: async (_: any, args: IdArgs, ctx: GQLContext) => {
      const link = await getRepository(SocialMediaLink)
        .findOne(args.id, { relations: ['user'] });

      if (!link) {
        throw new UserInputError('Link does not exist');
      }
      if (link.user && link.user.id !== ctx.koaCtx.user.id) {
        throw new AuthenticationError("You cannot edit another user's links");
      }

      await getRepository(SocialMediaLink).remove(link);
      return { success: true };
    },
  },
};

export default resolver;
