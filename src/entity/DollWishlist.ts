import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
