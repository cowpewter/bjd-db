import { SocialLink } from './SocialLink';
import { User } from './User';

export interface FaceupArtist {
  id: string;
  name: string;
  country?: string;
  socialLinks: SocialLink[];
  addedBy?: User;
  vetted?: boolean;
}

export interface MinimalFaceupArtist {
  id: string;
  name: string;
  vetted: boolean;
}
