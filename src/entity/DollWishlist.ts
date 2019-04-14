import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Doll } from './Doll';
import { User } from './User';

@Entity()
export class DollWishlist {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  isPrivate: boolean;

  @OneToMany(() => Doll, (doll: Doll) => doll.wishlist)
  dolls: Doll[];

  @ManyToOne(() => User, (user: User) => user.wishlists)
  user: User;

  @Column('timestamp', { nullable: true })
  deleteTimestamp: Date;

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
