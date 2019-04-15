import { Album } from '@entity/Album';
import { Comment } from '@entity/Comment';
import { Company } from '@entity/Company';
import { Doll } from '@entity/Doll';
import { FaceupArtist } from '@entity/FaceupArtist';

const resolver = {
  LikeSource: {
    // tslint:disable-next-line:function-name
    __resolveType(obj: any) {
      if (obj instanceof Album) {
        return 'Album';
      }
      if (obj instanceof Comment) {
        return 'Comment';
      }
      if (obj instanceof Company) {
        return 'Company';
      }
      if (obj instanceof Doll) {
        return 'Doll';
      }
      if (obj instanceof FaceupArtist) {
        return 'FaceupArtist';
      }
      return null;
    },
  },
};

export default resolver;
