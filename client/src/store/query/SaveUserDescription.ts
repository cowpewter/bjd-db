import { Mutation, OperationVariables } from 'react-apollo';

const GQL_SAVE_USER_DESC = require('@store/graphql/SaveUserDescription.gql');
import { UserProfile } from '@store/type/UserProfile';

export interface SaveUserDescriptionOutput {
  saveUserDescription: UserProfile;
}

export { GQL_SAVE_USER_DESC };
export class SaveUserDescription
  extends Mutation<SaveUserDescriptionOutput, OperationVariables> {}
