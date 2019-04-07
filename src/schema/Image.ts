import { getRepository } from 'typeorm';
import { baseUserImageUrl, Image } from '../entity/Image';

export const typeDef = `
type Image {
  id: ID!
  url: String!
  thumbnail: String!
  user: User!
}
`;

export const resolver = {
  Image: {
    url: async (image: Image) => {
      const user = await getRepository(Image)
        .createQueryBuilder('image')
        .innerJoinAndSelect('image.user', 'user')
        .getOne();
      if (!user) {
        return null;
      }
      return `${baseUserImageUrl}/${user.id}/${image.filename}`;
    },
    thumbnail: async (image: Image) => {
      const user = await getRepository(Image)
        .createQueryBuilder('image')
        .innerJoinAndSelect('image.user', 'user')
        .getOne();
      if (!user) {
        return null;
      }
      const filenameSplit = image.filename.split('.');
      const extension = filenameSplit.pop();
      const nameNoExt = filenameSplit.join('.');
      const filename = [nameNoExt, '_thumbnail.', extension].join('');
      return `${baseUserImageUrl}/${user.id}/${filename}`;
    },
  },
};
