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
import { DollConfiguration } from './DollConfiguration';

export type DollPartType = 'head' | 'body';

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

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.head)
  heads: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.upperBody)
  upperBodies: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.lowerBody)
  lowerBodies: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightUpperArm)
  rightUpperArms: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightLowerArm)
  rightLowerArms: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftUpperArm)
  leftUpperArms: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftLowerArm)
  leftLowerArms: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightHand)
  rightHands: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftHand)
  leftHands: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightUpperLeg)
  rightUpperLegs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightLowerLeg)
  rightLowerLegs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftUpperLeg)
  leftUpperLegs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftLowerLeg)
  leftLowerLegs: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.rightFoot)
  rightFeet: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.leftFoot)
  leftFeet: DollConfiguration[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
