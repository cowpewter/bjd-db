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
import { Image } from './Image';
import { Doll } from './Doll';

@Entity()
export class Album {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  allowComments: boolean;

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
