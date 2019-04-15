import { User } from './User';

export interface SocialLink {
  id: string;
  url: string;
  service: string;
  addedBy: User | null;
  vetted: boolean;
}
