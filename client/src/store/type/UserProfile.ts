import { Image } from './Image';
import { SocialLink } from './SocialLink';

export interface UserProfile {
  id: string;
  username: string;
  profileImage: Image;
  description: string;
  socialLinks: SocialLink[];
}

export interface UserProfileByNameOutput {
  userByName: UserProfile;
}
