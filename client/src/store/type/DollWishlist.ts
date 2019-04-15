import { Doll } from './Doll';
import { User } from './User';

export interface MinimalDollWishlist {
  id: string;
  name: string;
  isPrivate: boolean;
}

export interface DollWishlist extends MinimalDollWishlist {
  user: User;
  dolls: Doll[];
}

export interface MyWishlistsOutput {
  me: {
    id: string;
    dollWishlists: MinimalDollWishlist[];
  };
}
