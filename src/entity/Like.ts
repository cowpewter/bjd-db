import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from './Album';
import { Comment } from './Comment';
import { Company } from './Company';
import { Doll } from './Doll';
import { FaceupArtist } from './FaceupArtist';
import { User } from './User';

@Entity()
export class Like {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Album, (album: Album) => album.likes)
  album: Album;

  @ManyToOne(() => Company, (company: Company) => company.likes)
  company: Company;

  @ManyToOne(() => Comment, (comment: Comment) => comment.likes)
  comment: Comment;

  @ManyToOne(() => Doll, (doll: Doll) => doll.likes)
  doll: Doll;

  @ManyToOne(() => FaceupArtist, (artist: FaceupArtist) => artist.likes)
  faceupArtist: FaceupArtist;

  @OneToOne(() => User, (user: User) => user.userLikes)
  author: User;

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
