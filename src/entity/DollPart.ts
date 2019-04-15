import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Company } from './Company';
import { User } from './User';
import { UserPart } from './UserPart';

export type DollPartType = 'head' | 'body' | 'upperBody' | 'lowerBody' |
  'upperRightArm' | 'lowerRightArm' | 'rightHand' |
  'leftUpperArm' | 'leftLowerArm' | 'leftHand' |
  'rightUpperLeg' | 'rightLowerLeg' | 'rightFoot' |
  'leftUpperLeg' | 'leftLowerLeg' | 'leftFoot' | 'accessory';

@Entity()
export class DollPart {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'varchar' })
  type: DollPartType;

  @Column()
  name: string;

  @ManyToOne(() => Company, (company: Company) => company.parts, { nullable: false })
  company: Company;

  @ManyToOne(() => User, (user: User) => user.addedDollParts)
  addedBy: User;

  @Column({ default: false })
  vetted: Boolean;

  @OneToMany(() => UserPart, (userPart: UserPart) => userPart.part)
  userParts: UserPart[];

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
