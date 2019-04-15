import { readFileSync } from 'fs';
const path = require('path');

const files = [
  'Query.gql',
  'Mutation.gql',
  'Album.gql',
  'Comment.gql',
  'CommentSource.gql',
  'Company.gql',
  'CreateBan.gql',
  'Doll.gql',
  'DollConfiguration.gql',
  'DollPart.gql',
  'DollWishlist.gql',
  'EditBan.gql',
  'FaceupArtist.gql',
  'Image.gql',
  'InputOutput.gql',
  'Like.gql',
  'LikeSource.gql',
  'Purchase.gql',
  'ResinColor.gql',
  'SocialMediaLink.gql',
  'Subscriptions.gql',
  'User.gql',
  'UserPart.gql',
];

const typeDefs: string[] = files.map((filename) => {
  return readFileSync(
    path.resolve(__dirname, '../../../src/schema/typedef', filename),
  ).toString('utf-8');
});

export default typeDefs;
