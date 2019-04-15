import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

type NotificationType = 'alert' | 'dollComment' | 'albumComment';

@Entity()
export class Notification {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  type: NotificationType;

  @Column()
  read: boolean;

  @ManyToOne(() => User, (user: User) => user.notifications)
  user: User;

  @Column({ type: 'text' })
  data: string;

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
