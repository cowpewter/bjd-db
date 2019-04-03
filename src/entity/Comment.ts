import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Album } from './Album';
import { User } from './User';
import { Doll } from './Doll';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user: User) => user.userComments)
  user: User;

  @ManyToOne(() => Doll, (doll: Doll) => doll.comments)
  doll: Doll;

  @ManyToOne(() => Album, (album: Album) => album.comments)
  album: Album;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
