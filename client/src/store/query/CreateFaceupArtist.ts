import { Mutation } from 'react-apollo';

const GQL_CREATE_FACEUP_ARTIST = require('@store/graphql/CreateFaceupArtist.gql');
import { FaceupArtist } from '@store/type/FaceupArtist';

export interface CreateFaceupArtistOutput {
  createFaceupArtist: FaceupArtist;
}

export { GQL_CREATE_FACEUP_ARTIST };
export class CreateFaceupArtistMutation extends Mutation<CreateFaceupArtistOutput> {}
