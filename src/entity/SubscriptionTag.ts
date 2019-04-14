import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
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
