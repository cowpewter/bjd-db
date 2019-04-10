import { Image } from './Image';

export interface User {
  id: string;
  username: string;
  emailAddress: string;
  profileImage: Image;
}
