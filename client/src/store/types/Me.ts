import { Image } from './Image';

export interface Subscriptions {
  security: boolean;
  newsletter: boolean;
  dollComment: boolean;
  albumComment: boolean;
}

export interface Me {
  id: string;
  username: string;
  emailAddress: string;
  isAdmin: boolean;
  isMod: boolean;
  profileImage: Image;
  subscriptions: Subscriptions;
}

export interface MeData {
  me: Me;
}
