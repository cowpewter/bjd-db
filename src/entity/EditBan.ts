import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

@Entity()
export class EditBan {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @OneToOne(() => User, (user: User) => user.editBan)
  @JoinColumn()
  user: User;

  @Column()
  reason: string;

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
