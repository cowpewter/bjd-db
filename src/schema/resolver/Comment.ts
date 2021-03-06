import { Album } from '@entity/Album';
import { Comment } from '@entity/Comment';
import { Doll } from '@entity/Doll';
import { Like } from '@entity/Like';
import { User } from '@entity/User';
import { getManager, getRepository } from 'typeorm';

const resolver = {
  Comment: {
    author: (parent: Comment) =>
      getRepository(User)
        .find({ where: { comment: parent } }),

    source: async (parent: Comment) => {
      // @fixme is there a better way to do this in Typeorm?
      const query = await getManager().query(
        `SELECT albumId, dollId, commentId
          FROM comment
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
      if (rawComment.dollId) {
        return getRepository(Doll)
          .findOne(rawComment.dollId);
      }
      return null;
    },

    replies: async (parent: Comment) =>
      getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.commentId = :id', { id: parent.id })
        .getMany(),

    likes: (parent: Comment) =>
      getRepository(Like)
        .find({ where: { comment: parent } }),
  },
};

export default resolver;
