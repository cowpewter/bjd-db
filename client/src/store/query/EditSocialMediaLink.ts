import { Mutation } from 'react-apollo';

const GQL_EDIT_SOCIAL_MEDIA_LINK = require('@store/graphql/EditSocialMediaLink.gql');
import { SocialLink } from '@store/type/SocialLink';

export { GQL_EDIT_SOCIAL_MEDIA_LINK };
export class EditSocialMediaLinkMutation extends Mutation<SocialLink> {}
