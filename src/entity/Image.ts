import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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
