import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Album } from './Album';
import { Doll } from './Doll';
import { User } from './User';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user: User) => user.userComments)
  user: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.album)
  replies: Comment[];

  @ManyToOne(() => Comment, (comment: Comment) => comment.replies)
  comment: Comment;

  @ManyToOne(() => Doll, (doll: Doll) => doll.comments)
  doll: Doll;

  @ManyToOne(() => Album, (album: Album) => album.comments)
  album: Album;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
