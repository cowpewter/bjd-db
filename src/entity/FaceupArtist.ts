import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Like } from './Like';
import { SocialMediaLink } from './SocialMediaLink';
import { User } from './User';
import { UserPart } from './UserPart';

@Entity()
export class FaceupArtist {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ length: 2, nullable: true })
  country: string; // ISO Country code

  @OneToMany(() => SocialMediaLink, (link: SocialMediaLink) => link.artist)
  socialLinks: SocialMediaLink[];

  @OneToMany(() => Like, (like: Like) => like.faceupArtist)
  likes: Like[];

  @ManyToOne(() => User, (user: User) => user.addedFaceupArtists)
  addedBy: User;

  @Column({ default: false })
  vetted: Boolean;

  @OneToMany(() => UserPart, (part: UserPart) => part.artist)
  parts: UserPart[];

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
