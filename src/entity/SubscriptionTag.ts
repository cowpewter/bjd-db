import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EmailAddress } from './EmailAddress';

export type SubscriptionTagName = 'security' | 'newsletter' | 'dollComment';

@Entity()
export class SubscriptionTag {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'varchar' })
  name: SubscriptionTagName;

  @ManyToMany(() => EmailAddress)
  emailAddresses: EmailAddress[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
