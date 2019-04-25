import { UserPart } from './UserPart';

export interface DollConfiguration {
  id: string;
  height: number | null;
  scale: string | null;
  hybridType: string;
  head: UserPart | null;
  upperBody: UserPart | null;
  lowerBody: UserPart | null;
  rightUpperArm: UserPart | null;
  rightLowerArm: UserPart | null;
  rightHand: UserPart | null;
  leftUpperArm: UserPart | null;
  leftLowerArm: UserPart | null;
  leftHand: UserPart | null;
  rightUpperLeg: UserPart | null;
  rightLowerLeg: UserPart | null;
  rightFoot: UserPart | null;
  leftUpperLeg: UserPart | null;
  leftLowerLeg: UserPart | null;
  leftFoot: UserPart | null;
  accessories: UserPart[];
}
