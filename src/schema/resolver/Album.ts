import { Album } from '@entity/Album';
import { Comment } from '@entity/Comment';
import { Image } from '@entity/Image';
import { Like } from '@entity/Like';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

const resolver = {
  Album: {
    user: (parent: Album) =>
      getRepository(User)
        .findOne({ where: { album: parent } }),

    images: (parent: Album) =>
      getRepository(Image)
        .find({ where: { album: parent } }),

    comments: (parent: Album) =>
      getRepository(Comment)
        .find({ where: { album: parent } }),

    likes: (parent: Album) =>
      getRepository(Like)
        .find({ where: { album: parent } }),
  },
  Query: {
    album: (_: any, args: IdArgs) =>
      getRepository(Album).findOne(args.id),
  },
};

export default resolver;
