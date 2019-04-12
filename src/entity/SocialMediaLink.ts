import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './Company';
import { FaceupArtist } from './FaceupArtist';
import { User } from './User';

export type SocialMediaLinkService = 'doa' | 'facebook' | 'instagram' |
  'tumblr' | 'etsy' | 'youtube' | 'pinterest' | 'website' | 'other';

@Entity()
export class SocialMediaLink {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  url: string;

  @Column({ type: 'varchar' })
  service: SocialMediaLinkService;

  @ManyToOne(() => User, (user: User) => user.socialLinks)
  user: User;

  @ManyToOne(() => FaceupArtist, (artist: FaceupArtist) => artist.socialLinks)
  artist: FaceupArtist;

  @ManyToOne(() => Company, (company: Company) => company.socialLinks)
  company: Company;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
