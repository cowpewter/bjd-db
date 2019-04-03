import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Doll } from './Doll';
import { DollPart } from './DollPart';
import { FaceupArtist } from './FaceupArtist';

export type DollScaleType = '1/1' | '1/2' | '1/3' | '1/4' | '1/8' | '1/12' | 'Micro';
export type DollHybridType = 'none' | 'simple' | 'complex';

@Entity()
export class DollConfiguration {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  height: number; // in cm

  @Column()
  scale: DollScaleType;

  @ManyToOne(() => Doll, (doll: Doll) => doll.configurations, { nullable: false })
  doll: Doll;

  @Column({ type: 'varchar' })
  hybridType: DollHybridType;

  @ManyToOne(() => DollPart, (part: DollPart) => part.heads)
  head: DollPart;

  @Column({ default: false })
  headIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.upperBodies)
  upperBody: DollPart;

  @Column({ default: false })
  upperBodyIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.lowerBodies)
  lowerBody: DollPart;

  @Column({ default: false })
  lowerBodyIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.rightUpperArms)
  rightUpperArm: DollPart;

  @Column({ default: false })
  rightUpperArmIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.leftUpperArms)
  leftUpperArm: DollPart;

  @Column({ default: false })
  leftUpperArmIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.rightLowerArms)
  rightLowerArm: DollPart;

  @Column({ default: false })
  rightLowerArmIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.leftLowerArms)
  leftLowerArm: DollPart;

  @Column({ default: false })
  leftLowerArmIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.rightHands)
  rightHand: DollPart;

  @Column({ default: false })
  rightHandIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.leftHands)
  leftHand: DollPart;

  @Column({ default: false })
  leftHandIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.rightUpperLegs)
  rightUpperLeg: DollPart;

  @Column({ default: false })
  rightUpperLegIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.leftUpperLegs)
  leftUpperLeg: DollPart;

  @Column({ default: false })
  leftUpperLegIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.rightLowerLegs)
  rightLowerLeg: DollPart;

  @Column({ default: false })
  rightLowerLegIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.leftLowerLegs)
  leftLowerLeg: DollPart;

  @Column({ default: false })
  leftLowerLegIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.rightFeet)
  rightFoot: DollPart;

  @Column({ default: false })
  rightFootIsModded: boolean;

  @ManyToOne(() => DollPart, (part: DollPart) => part.leftFeet)
  leftFoot: DollPart;

  @Column({ default: false })
  leftFootIsModded: boolean;

  @Column({ default: false })
  hasFaceup: boolean;

  @ManyToOne(() => FaceupArtist, (artist: FaceupArtist) => artist.faceups)
  faceupArtist: FaceupArtist;

  @Column({ default: false })
  hasBodyBlush: boolean;

  @ManyToOne(() => FaceupArtist, (artist: FaceupArtist) => artist.bodyBlushes)
  bodyArtist: FaceupArtist;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
