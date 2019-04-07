import { getRepository } from 'typeorm';
import { DollConfiguration } from '../entity/DollConfiguration';
import { UserPart } from '../entity/UserPart';

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

export const resolver = {
  DollConfiguration: {
    head: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { head: parent } }),

    upperBody: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { upperBody: parent } }),

    lowerBody: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { lowerBody: parent } }),

    upperRightArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { upperRightArm: parent } }),

    lowerRightArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { lowerRightArm: parent } }),

    rightHand: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightHand: parent } }),

    upperLeftArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { upperLeftArm: parent } }),

    lowerLeftArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { lowerLeftArm: parent } }),

    leftHand: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftHand: parent } }),

    upperRightLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { upperRightLeg: parent } }),

    lowerRightLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { lowerRightLeg: parent } }),

    rightFoot: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightFoot: parent } }),

    upperLeftLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { upperLeftLeg: parent } }),

    lowerLeftLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { lowerLeftLeg: parent } }),

    leftFoot: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftFoot: parent } }),

    extraParts: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .find({ where: { extraPart: parent } }),
  },
};
