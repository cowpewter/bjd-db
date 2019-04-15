import { SocialLink } from './SocialLink';
import { User } from './User';

export interface FaceupArtist {
  id: string;
  name: string;
  country: string | null;
  socialLinks: SocialLink[];
  addedBy: User | null;
  vetted: boolean;
}
