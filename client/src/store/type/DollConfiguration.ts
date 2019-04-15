import { UserPart } from './UserPart';

export interface DollConfiguration {
  id: string;
  height: number | null;
  scale: string | null;
  hybridType: string;
  head: UserPart | null;
  upperBody: UserPart | null;
  lowerBody: UserPart | null;
  upperRightArm: UserPart | null;
  lowerRightArm: UserPart | null;
  rightHand: UserPart | null;
  upperLeftArm: UserPart | null;
  lowerLeftArm: UserPart | null;
  leftHand: UserPart | null;
  upperRightLeg: UserPart | null;
  lowerRightLeg: UserPart | null;
  rightFoot: UserPart | null;
  upperLeftLeg: UserPart | null;
  lowerLeftLeg: UserPart | null;
  leftFoot: UserPart | null;
  extraParts: UserPart[];
}
