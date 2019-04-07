import { Album } from '../entity/Album';
import { Doll } from '../entity/Doll';

export const typeDef = `
union CommentSource = Comment | Album | Doll
`;

export const resolver = {
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
