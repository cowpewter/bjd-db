import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { FaceupArtist } from './FaceupArtist';
import { User } from './User';

export type SocialMediaLinkService = 'doa' | 'facebook' | 'instagram' | 'twitter' |
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

const sortPriority = {
  website: 0,
  doa: 1,
  facebook: 2,
  instagram: 3,
  twitter: 4,
  tumblr: 5,
  etsy: 6,
  youtube: 7,
  pinterest: 8,
  other: 9,
};

export const sortLinks = (a: SocialMediaLink, b: SocialMediaLink) => {
  return sortPriority[a.service] - sortPriority[b.service];
};
