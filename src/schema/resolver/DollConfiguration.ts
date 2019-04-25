import { Doll } from '@entity/Doll';
import { DollConfiguration, DollHybridType, DollScaleType } from '@entity/DollConfiguration';
import { DollPart, DollPartType } from '@entity/DollPart';
import { DollWishlist } from '@entity/DollWishlist';
import { FaceupArtist } from '@entity/FaceupArtist';
import { ResinColor } from '@entity/ResinColor';
import { User } from '@entity/User';
import { UserPart } from '@entity/UserPart';
import { GQLContext } from '@schema/index';
import { AuthenticationError } from 'apollo-server';
import { clone } from 'lodash';
import { getRepository } from 'typeorm';

const bodyParts = [
  'upperBody',
  'lowerBody',
  'rightUpperArm',
  'rightLowerArm',
  'rightHand',
  'leftUpperArm',
  'leftLowerArm',
  'leftHand',
  'rightUpperLeg',
  'rightLowerLeg',
  'rightFoot',
  'leftUpperLeg',
  'leftLowerLeg',
  'leftFoot',
];

interface CreateDollConfigArgs {
  data: {
    dollId: string;
    height?: number;
    scale: DollScaleType;
    hybridType: DollHybridType;
    parts: {
      [key: string]: UserPartInput | UserPartInput[] | undefined;
      head: UserPartInput;
      body: UserPartInput;
      upperBody: UserPartInput;
      lowerBody: UserPartInput;
      rightUpperArm: UserPartInput;
      rightLowerArm: UserPartInput;
      rightHand: UserPartInput;
      leftUpperArm: UserPartInput;
      leftLowerArm: UserPartInput;
      leftHand: UserPartInput;
      rightUpperLeg: UserPartInput;
      rightLowerLeg: UserPartInput;
      rightFoot: UserPartInput;
      leftUpperLeg: UserPartInput;
      leftLowerLeg: UserPartInput;
      leftFoot: UserPartInput;
      extraParts: UserPartInput[];
    }
  };
}

interface UserPartInput {
  id?: string;
  dollPartId: string;
  resinColorId: string;
  artistId?: string;
  wishlistId?: string;
}

const makeUserPartFromData = (partData: UserPartInput, user: User): UserPart => {
  if (partData.id && partData.id !== 'new') {
    const existingPart = new UserPart();
    existingPart.id = partData.id;
    return existingPart;
  }
  const part = new DollPart();
  part.id = partData.dollPartId;
  const resinColor = new ResinColor();
  resinColor.id = partData.resinColorId;
  const userPart = new UserPart();
  userPart.part = part;
  userPart.resinColor = resinColor;
  if (partData.artistId && partData.artistId !== 'none') {
    const artist = new FaceupArtist();
    artist.id = partData.artistId;
    userPart.artist = artist;
  }
  if (partData.wishlistId) {
    const wishlist = new DollWishlist();
    wishlist.id = partData.wishlistId;
    userPart.wishlist = wishlist;
  }
  userPart.user = user;
  return userPart;
};

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

  Mutation: {
    createDollConfiguration: async (_: any, args: CreateDollConfigArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const doll = new Doll();
      doll.id = args.data.dollId;

      const config = new DollConfiguration();
      config.doll = doll;
      config.scale = args.data.scale;
      config.hybridType = args.data.hybridType;
      if (args.data.height) {
        config.height = args.data.height;
      }

      const partsToSave: UserPart[] = [];

      await Promise.all(Object.keys(args.data.parts).map(async (partType) => {
        if (partType === 'extraParts') {
          // Extra parts are straightforward, it's just an array
          args.data.parts.extraParts.forEach((partData) => {
            const userPart = makeUserPartFromData(partData, user);
            config.extraParts.push(userPart);
            if (!userPart.id) {
              partsToSave.push(userPart);
            }
          });
        } else {
          const partData = args.data.parts[partType] as UserPartInput;
          if (partData && partType !== 'body') {
            // "body" is not a real part
            const userPart = makeUserPartFromData(partData, user);
            config[partType] = userPart;
            if (!userPart.id) {
              partsToSave.push(userPart);
            }
          }
        }
      }));

      // Fill in missing bodyParts if we're not a complex hybrid
      // Complex hybrid should have specific parts already
      if (args.data.hybridType !== 'complex') {
        await Promise.all(bodyParts.map(async (partType) => {
          // if we already have a specific body part don't overwrite
          if (config[partType]) {
            return;
          }
          // If we don't have a bodyPart but we do have a "body", create the part accordingly
          const bodyData = args.data.parts.body;
          if (!bodyData) {
            return;
          }
          const partData = clone(bodyData);
          if (partType !== 'upperBody') {
            delete partData.id; // because we're making a new one, unless this is upperBody
          }

          // get the doll part we're going to clone
          const bodyPart = await getRepository(DollPart)
            .findOne(bodyData.dollPartId, { relations: ['company'] });
          if (!bodyPart) {
            return;
          }

          // Is there already a matching part for this body?
          const existingPart = await getRepository(DollPart).findOne({
            where: {
              company: bodyPart.company,
              name: bodyPart.name,
              scale: bodyPart.scale,
              type: partType,
            },
          });

          if (existingPart) {
            // found existing, use it
            partData.dollPartId = existingPart.id;
          } else {
            // Make a new part based on "body"
            const newDollPart = new DollPart();
            newDollPart.company = bodyPart.company;
            newDollPart.name = bodyPart.name;
            newDollPart.scale = bodyPart.scale;
            newDollPart.type = partType as DollPartType;
            newDollPart.addedBy = user;
            newDollPart.vetted = user.isMod || user.isAdmin;
            await getRepository(DollPart).save(newDollPart);
            partData.dollPartId = newDollPart.id;
          }

          const userPart = makeUserPartFromData(partData, user);
          config[partType] = userPart;
          partsToSave.push(userPart);
        }));
      }

      await getRepository(UserPart).save(partsToSave);
      await getRepository(DollConfiguration).save(config);

      return config;
    },
  },
};

export default resolver;
