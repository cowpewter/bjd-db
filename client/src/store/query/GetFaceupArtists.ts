import { Query } from 'react-apollo';

import { MinimalFaceupArtist } from '@store/type/FaceupArtist';
const GQL_GET_FACEUP_ARTISTS = require('@store/graphql/GetFaceupArtists.gql');

export interface GetFaceupArtistsOutput {
  getFaceupArtists: MinimalFaceupArtist[];
}

export { GQL_GET_FACEUP_ARTISTS };
export class GetFaceupArtistsQuery extends Query<GetFaceupArtistsOutput> {}
