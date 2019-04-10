import { Album } from '@entity/Album';
import { Doll } from '@entity/Doll';

const resolver = {
  CommentSource: {
    // tslint:disable-next-line:function-name
    __resolveType(obj: any) {
      if (obj instanceof Doll) {
        return 'Doll';
      }
      if (obj instanceof Album) {
        return 'Album';
      }
      return 'Comment';
    },
  },
};

export default resolver;
