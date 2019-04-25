import { FaceupArtist } from '@entity/FaceupArtist';
import { Like } from '@entity/Like';
import { SocialMediaLink, sortLinks } from '@entity/SocialMediaLink';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { AuthenticationError } from 'apollo-server';
import { getRepository } from 'typeorm';

interface CreateArtistArgs {
  name: string;
  country?: string;
  website?: string;
}

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

    getFaceupArtists: () =>
      getRepository(FaceupArtist).find({
        order: {
          name: 'ASC',
        },
      }),
  },

  Mutation: {
    createFaceupArtist: async (_: any, args: CreateArtistArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const addedBy = await getRepository(User)
        .findOne(userId, { relations: ['createBan'] });
      if (!addedBy) {
        throw new AuthenticationError('You must be logged in');
      }
      if (addedBy.createBan) {
        throw new AuthenticationError(`You cannot create artists: ${addedBy.createBan.reason}`);
      }

      const existing = await getRepository(FaceupArtist)
        .findOne({ where: { name: args.name } });
      if (existing) {
        return existing;
      }

      const artist = new FaceupArtist();
      artist.name = args.name;
      artist.addedBy = addedBy;
      artist.vetted = addedBy.isMod || addedBy.isAdmin;
      if (args.country) {
        artist.country = args.country;
      }

      await getRepository(FaceupArtist).save(artist);

      if (args.website) {
        const websiteLink = new SocialMediaLink();
        websiteLink.artist = artist;
        websiteLink.addedBy = addedBy;
        websiteLink.service = 'website';
        websiteLink.url = args.website;

        await getRepository(SocialMediaLink).save(websiteLink);
      }

      return artist;
    },
  },
};

export default resolver;
