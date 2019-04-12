import { Image } from './Image';

export interface UserProfile {
  id: string;
  username: string;
  profileImage: Image;
  description: string;
}

export interface UserProfileByNameOutput {
  userByName: UserProfile;
}
