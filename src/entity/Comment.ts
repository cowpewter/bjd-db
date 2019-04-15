import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from './Album';
import { Doll } from './Doll';
import { Like } from './Like';
import { User } from './User';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user: User) => user.userComments)
  author: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.comment)
  replies: Comment[];

  @ManyToOne(() => Comment, (comment: Comment) => comment.replies)
  comment: Comment;

  @OneToMany(() => Like, (like: Like) => like.comment)
  likes: Like[];

  @ManyToOne(() => Doll, (doll: Doll) => doll.comments)
  doll: Doll;

  @ManyToOne(() => Album, (album: Album) => album.comments)
  album: Album;

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
