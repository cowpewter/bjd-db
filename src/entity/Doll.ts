import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Comment } from './Comment';
import { DollConfiguration } from './DollConfiguration';
import { DollDescription } from './DollDescription';
import { DollHistory } from './DollHistory';
import { Image } from './Image';
import { User } from './User';
import { Album } from './Album';

export type DollSex = 'Male' | 'Female' | 'Intersex';
export type DollGender = 'Masculine' | 'Feminine' | 'Nonbinary' | 'Agender';

@Entity()
export class Doll {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  sex: DollSex;

  @Column({ type: 'varchar', nullable: true })
  gender: DollGender;

  @Column({ default: false })
  isSold: boolean;

  @Column({ default: false })
  isWishlist: boolean;

  @Column({ default: true })
  allowComments: boolean;

  @ManyToOne(() => User, (user: User) => user.dolls, { nullable: false })
  user: User;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  profileImage: Image;

  @OneToOne(() => DollDescription, (description: DollDescription) => description.doll)
  @JoinColumn()
  description: DollDescription;

  @OneToOne(() => DollHistory, (history: DollHistory) => history.doll)
  @JoinColumn()
  history: DollHistory;

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.doll)
  configurations: DollConfiguration[];

  @OneToMany(() => Comment, (comment: Comment) => comment.doll)
  comments: Comment[];

  @ManyToMany(() => Album)
  albums: Album[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
