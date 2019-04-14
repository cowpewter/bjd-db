import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SocialMediaLink } from './SocialMediaLink';
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
