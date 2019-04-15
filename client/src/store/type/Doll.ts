import { DollConfiguration } from './DollConfiguration';
import { Image } from './Image';
import { UserProfile } from './UserProfile';

export interface Doll {
  id: string;
  name: string;
  profileImage: Image;
  sex: string | null;
  gender: string | null;
  isSold: boolean;
  isWishlist: boolean;
  isPrivate: boolean;
  user: UserProfile;
  description: string;
  configurations: DollConfiguration[];
}
