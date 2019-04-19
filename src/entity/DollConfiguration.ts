import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Doll } from './Doll';
import { UserPart } from './UserPart';

export type DollScaleType = '1/1' | '1/2' | '1/3' | '1/4' | '1/7' |  '1/8' | '1/12' | 'Micro';
export type DollHybridType = 'none' | 'simple' | 'complex';

@Entity()
export class DollConfiguration {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  height: number; // in cm

  @Column()
  scale: DollScaleType;

  @Column({ type: 'varchar' })
  hybridType: DollHybridType;

  @Column({ default: false })
  isPrimary: boolean;

  @ManyToOne(() => Doll, (doll: Doll) => doll.configurations, { nullable: false })
  doll: Doll;

  @ManyToOne(() => UserPart, (part: UserPart) => part.headConfigs, { nullable: true })
  head: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.upperBodyConfigs, { nullable: true })
  upperBody: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.lowerBodyConfigs, { nullable: true })
  lowerBody: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.rightUpperArmConfigs, { nullable: true })
  rightUpperArm: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.rightLowerArmConfigs, { nullable: true })
  rightLowerArm: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.rightHandConfigs, { nullable: true })
  rightHand: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.leftUpperArmConfigs, { nullable: true })
  leftUpperArm: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.leftLowerArmConfigs, { nullable: true })
  leftLowerArm: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.leftHandConfigs, { nullable: true })
  leftHand: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.rightUpperLegConfigs, { nullable: true })
  rightUpperLeg: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.rightLowerLegConfigs, { nullable: true })
  rightLowerLeg: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.rightFootConfigs, { nullable: true })
  rightFoot: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.leftUpperLegConfigs, { nullable: true })
  leftUpperLeg: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.leftLowerLegConfigs, { nullable: true })
  leftLowerLeg: UserPart;

  @ManyToOne(() => UserPart, (part: UserPart) => part.leftFootConfigs, { nullable: true })
  leftFoot: UserPart;

  @ManyToMany(() => UserPart)
  @JoinTable()
  extraParts: UserPart[];

  @Column('timestamp', { nullable: true })
  deleteTimestamp: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTimestamp: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateTimestamp: Date;
}
