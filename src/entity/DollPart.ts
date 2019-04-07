import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Company } from './Company';
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

  @OneToMany(() => UserPart, (userPart: UserPart) => userPart.part)
  userParts: UserPart[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
