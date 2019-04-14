import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DollPart } from './DollPart';
import { ResinColor } from './ResinColor';
import { SocialMediaLink } from './SocialMediaLink';

@Entity()
export class Company {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ length: 2, nullable: true })
  country: string; // ISO Country code

  @OneToMany(() => SocialMediaLink, (link: SocialMediaLink) => link.company)
  socialLinks: SocialMediaLink[];

  @OneToMany(() => DollPart, (part: DollPart) => part.company)
  parts: DollPart[];

  @OneToMany(() => ResinColor, (color: ResinColor) => color.company)
  resinColors: ResinColor[];

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
