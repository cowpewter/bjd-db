import { DollPart } from './DollPart';
import { FaceupArtist } from './FaceupArtist';
import { ResinColor } from './ResinColor';
import { User } from './User';

export interface UserPart {
  id: string;
  user: User;
  part: DollPart;
  resinColor: ResinColor;
  isWishlist: boolean;
  artist: FaceupArtist | null;
}
