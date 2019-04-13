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

export const baseUserImageUrl = '/userImages';

@Entity()
export class Image {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  filename: string;

  @ManyToOne(() => User, (user: User) => user.images)
  user: User;

  @ManyToOne(() => Album, (album: Album) => album.images)
  album: Album;

  @Column({ nullable: true, default: null })
  deleteTimestamp: Date;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
