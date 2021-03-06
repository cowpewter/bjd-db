import { Album } from '@entity/Album';
import { Comment } from '@entity/Comment';
import { Doll } from '@entity/Doll';

const resolver = {
  CommentSource: {
    // tslint:disable-next-line:function-name
    __resolveType(obj: any) {
      if (obj instanceof Album) {
        return 'Album';
      }
      if (obj instanceof Comment) {
        return 'Comment';
      }
      if (obj instanceof Doll) {
        return 'Doll';
      }
      return null;
    },
  },
};

export default resolver;
