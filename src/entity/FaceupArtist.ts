import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
