import { FaceupArtist } from '@entity/FaceupArtist';
import { SocialMediaLink, sortLinks } from '@entity/SocialMediaLink';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

const resolver = {
  FaceupArtist: {
    socialLinks: async (parent: FaceupArtist) => {
      const links = await getRepository(SocialMediaLink)
        .find({ where: { artist: parent } });
      return links.sort(sortLinks);
    },
  },

  Query: {
    faceupArtist: (_: any, args: IdArgs) =>
      getRepository(FaceupArtist).findOne(args.id),
  },
};

export default resolver;
