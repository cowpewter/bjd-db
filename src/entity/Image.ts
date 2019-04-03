import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Album } from './Album';

@Entity()
export class Image {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  filename: string;

  @ManyToOne(() => Album, (album: Album) => album.images)
  album: Album;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
