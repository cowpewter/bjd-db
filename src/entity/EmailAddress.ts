import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SubscriptionTag } from './SubscriptionTag';
import { User } from './User';

@Entity()
export class EmailAddress {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index({ unique: true })
  @Column()
  emailAddress: string;

  @Column({ default: 0 })
  softBounces: number;

  @Column({ default: 0 })
  hardBounces: number;

  @OneToOne(() => User, (user: User) => user.emailAddress)
  user: User;

  @ManyToMany(() => SubscriptionTag)
  @JoinTable()
  categories: SubscriptionTag[];

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
