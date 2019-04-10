import { Doll } from '@entity/Doll';
import { DollConfiguration } from '@entity/DollConfiguration';
import { Image } from '@entity/Image';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

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
      getRepository(Doll)
        .find({ where: { doll: parent } }),
  },
  Query: {
    doll: (_: any, args: IdArgs) =>
      getRepository(Doll).findOne(args.id),
  },
};

export default resolver;
