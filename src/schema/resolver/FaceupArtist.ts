import { FaceupArtist } from '@entity/FaceupArtist';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

const resolver = {
  Query: {
    faceupArtist: (_: any, args: IdArgs) =>
      getRepository(FaceupArtist).findOne(args.id),
  },
};

export default resolver;
