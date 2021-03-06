import { baseUserImageUrl, Image } from '@entity/Image';
import { User } from '@entity/User';
import { getRepository } from 'typeorm';

const resolver = {
  Image: {
    url: async (parent: Image) => {
      const user = await getRepository(User)
        .findOne({ where: { image: parent } });
      if (!user) {
        return null;
      }
      return `${baseUserImageUrl}/${user.id}/${parent.filename}`;
    },

    thumbnail: async (parent: Image) => {
      const user = await getRepository(User)
        .findOne({ where: { image: parent } });
      if (!user) {
        return null;
      }
      const filenameSplit = parent.filename.split('.');
      const extension = filenameSplit.pop();
      const nameNoExt = filenameSplit.join('.');
      const filename = [nameNoExt, '_thumbnail.', extension].join('');
      return `${baseUserImageUrl}/${user.id}/${filename}`;
    },
  },
};

export default resolver;
