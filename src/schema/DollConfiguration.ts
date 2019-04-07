export const typeDef = `
type DollConfiguration {
  id: ID!
  height: Int
  scale: String
  hybridType: String
  head: UserPart
  upperBody: UserPart
  lowerBody: UserPart
  upperRightArm: UserPart
  lowerRightArm: UserPart
  rightHand: UserPart
  upperLeftArm: UserPart
  lowerLeftArm: UserPart
  leftHand: UserPart
  upperRightLeg: UserPart
  lowerRightLeg: UserPart
  rightFoot: UserPart
  upperLeftLeg: UserPart
  lowerLeftLeg: UserPart
  leftFoot: UserPart
  extraParts: [UserPart!]
}
`;
