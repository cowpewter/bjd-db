import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Comment } from './Comment';
import { Doll } from './Doll';
import { Image } from './Image';

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

  @OneToMany(() => Image, (image: Image) => image.album)
  images: Image[];

  @OneToMany(() => Comment, (comment: Comment) => comment.album)
  comments: Comment[];

  @ManyToMany(() => Doll)
  @JoinTable()
  dolls: Doll[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
