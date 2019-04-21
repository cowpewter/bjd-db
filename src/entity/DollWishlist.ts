import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Doll } from './Doll';
import { User } from './User';
import { UserPart } from './UserPart';

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

  @OneToMany(() => UserPart, (part: UserPart) => part.wishlist)
  parts: UserPart[];

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
