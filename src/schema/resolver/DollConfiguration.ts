import { DollConfiguration } from '@entity/DollConfiguration';
import { UserPart } from '@entity/UserPart';
import { getRepository } from 'typeorm';

const resolver = {
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

    rightUpperArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightUpperArm: parent } }),

    rightLowerArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightLowerArm: parent } }),

    rightHand: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightHand: parent } }),

    leftUpperArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftUpperArm: parent } }),

    leftLowerArm: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftLowerArm: parent } }),

    leftHand: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftHand: parent } }),

    rightUpperLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightUpperLeg: parent } }),

    rightLowerLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightLowerLeg: parent } }),

    rightFoot: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { rightFoot: parent } }),

    leftUpperLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftUpperLeg: parent } }),

    leftLowerLeg: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftLowerLeg: parent } }),

    leftFoot: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .findOne({ where: { leftFoot: parent } }),

    extraParts: (parent: DollConfiguration) =>
      getRepository(UserPart)
        .find({ where: { extraPart: parent } }),
  },
};

export default resolver;
