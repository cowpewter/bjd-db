import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DollPart } from './DollPart';
import { Like } from './Like';
import { ResinColor } from './ResinColor';
import { SocialMediaLink } from './SocialMediaLink';
import { User } from './User';

@Entity()
export class Company {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ length: 2, nullable: true })
  country: string; // ISO Country code

  @ManyToOne(() => User, (user: User) => user.addedCompanies)
  addedBy: User;

  @Column({ default: false })
  vetted: Boolean;

  @OneToMany(() => SocialMediaLink, (link: SocialMediaLink) => link.company)
  socialLinks: SocialMediaLink[];

  @OneToMany(() => DollPart, (part: DollPart) => part.company)
  parts: DollPart[];

  @OneToMany(() => ResinColor, (color: ResinColor) => color.company)
  resinColors: ResinColor[];

  @OneToMany(() => Like, (like: Like) => like.company)
  likes: Like[];

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
