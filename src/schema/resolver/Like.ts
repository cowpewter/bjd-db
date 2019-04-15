import { Album } from '@entity/Album';
import { Comment } from '@entity/Comment';
import { Company } from '@entity/Company';
import { Doll } from '@entity/Doll';
import { FaceupArtist } from '@entity/FaceupArtist';
import { Like } from '@entity/Like';
import { User } from '@entity/User';
import { getManager, getRepository } from 'typeorm';

const resolver = {
  Like: {
    user: (parent: Like) =>
      getRepository(User)
        .find({ where: { userLikes: parent } }),

    source: async (parent: Like) => {
      // @fixme is there a better way to do this in Typeorm?
      const query = await getManager().query(
        `SELECT albumId, commentId, companyId, dollId, faceupArtistId
          FROM like
          WHERE id = ?
        `,
        [parent.id],
      );
      const rawComment = query.length && query[0];
      if (!rawComment) {
        return null;
      }
      if (rawComment.albumId) {
        return getRepository(Album)
          .findOne(rawComment.albumId);
      }
      if (rawComment.commentId) {
        return getRepository(Comment)
          .findOne(rawComment.commentId);
      }
      if (rawComment.companyId) {
        return getRepository(Company)
          .findOne(rawComment.companyId);
      }
      if (rawComment.dollId) {
        return getRepository(Doll)
          .findOne(rawComment.dollId);
      }
      if (rawComment.faceupArtistId) {
        return getRepository(FaceupArtist)
          .findOne(rawComment.faceupArtistId);
      }
      return null;
    },
  },
};

export default resolver;
