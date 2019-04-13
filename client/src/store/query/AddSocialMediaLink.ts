import { Mutation } from 'react-apollo';

const GQL_ADD_SOCIAL_MEDIA_LINK = require('@store/graphql/AddSocialMediaLink.gql');
import { SocialLink } from '@store/type/SocialLink';

export { GQL_ADD_SOCIAL_MEDIA_LINK };
export class AddSocialMediaLinkMutation extends Mutation<SocialLink> {}
