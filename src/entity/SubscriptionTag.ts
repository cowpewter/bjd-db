import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EmailAddress } from './EmailAddress';

export type SubscriptionTagName = 'security' | 'newsletter' | 'dollComment' | 'albumComment';

@Entity()
export class SubscriptionTag {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  name: SubscriptionTagName;

  @ManyToMany(() => EmailAddress)
  emailAddresses: EmailAddress[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
