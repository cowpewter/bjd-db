import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comment } from './Comment';
import { Doll } from './Doll';
import { Image } from './Image';
import { User } from './User';

@Entity()
export class Album {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  allowComments: boolean;

  @Column({ default: false })
  isPrivate: boolean;

  @ManyToOne(() => User, (user: User) => user.albums)
  user: User;

  @OneToMany(() => Image, (image: Image) => image.album)
  images: Image[];

  @OneToMany(() => Comment, (comment: Comment) => comment.album)
  comments: Comment[];

  @ManyToMany(() => Doll)
  @JoinTable()
  dolls: Doll[];

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
