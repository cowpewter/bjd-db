import { Mutation } from 'react-apollo';

const GQL_DELETE_SOCIAL_MEDIA_LINK = require('@store/graphql/DeleteSocialMediaLink.gql');
import { Success } from '@store/type/Success';

export { GQL_DELETE_SOCIAL_MEDIA_LINK };
export class DeleteSocialMediaLinkMutation extends Mutation<Success> {}
