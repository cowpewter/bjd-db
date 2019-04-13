import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DollConfiguration } from './DollConfiguration';
import { DollPart } from './DollPart';
import { FaceupArtist } from './FaceupArtist';
import { Purchase } from './Purchase';
import { ResinColor } from './ResinColor';
import { User } from './User';

@Entity()
export class UserPart {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => User, (user: User) => user.parts)
  user: User;

  @ManyToOne(() => DollPart, (part: DollPart) => part.userParts)
  part: DollPart;

  @Column({ default: false })
  isWishlist: boolean;

  @ManyToOne(() => FaceupArtist, (artist: FaceupArtist) => artist.parts)
  artist: FaceupArtist;

  @ManyToOne(() => ResinColor, (color: ResinColor) => color.parts)
  resinColor: ResinColor;

  @ManyToOne(() => Purchase, (purchase: Purchase) => purchase.parts)
  purchase: Purchase;

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.head)
  headConfigs: UserPart[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.upperBody)
  upperBodyConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.lowerBody)
  lowerBodyConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightUpperArm)
  rightUpperArmConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightLowerArm)
  rightLowerArmConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightHand)
  rightHandConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftUpperArm)
  leftUpperArmConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftLowerArm)
  leftLowerArmConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftHand)
  leftHandConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightUpperLeg)
  rightUpperLegConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightLowerLeg)
  rightLowerLegConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightFoot)
  rightFootConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftUpperLeg)
  leftUpperLegConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftLowerLeg)
  leftLowerLegConfigs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftFoot)
  leftFootConfigs: DollConfiguration[];

  @ManyToMany(() => DollConfiguration)
  extraPartConfigs: DollConfiguration[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
