import { SocialLink } from './SocialLink';
import { User } from './User';

export interface Company {
  id: string;
  name: string;
  country: string;
  socialLinks: SocialLink[];
  addedBy: User;
  vetted: boolean;
}

export interface MinimalCompany {
  id: string;
  name: string;
  vetted: boolean;
}
