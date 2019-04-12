import { FaceupArtist } from '@entity/FaceupArtist';
import { SocialMediaLink } from '@entity/SocialMediaLink';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

const resolver = {
  FaceupArtist: {
    socialLinks: (parent: FaceupArtist) =>
      getRepository(SocialMediaLink)
        .find({ where: { artist: parent } }),
  },

  Query: {
    faceupArtist: (_: any, args: IdArgs) =>
      getRepository(FaceupArtist).findOne(args.id),
  },
};

export default resolver;
