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

import { Album } from './Album';
import { Comment } from './Comment';
import { DollConfiguration } from './DollConfiguration';
import { DollDescription } from './DollDescription';
import { DollHistory } from './DollHistory';
import { DollWishlist } from './DollWishlist';
import { Image } from './Image';
import { User } from './User';

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

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: true })
  allowComments: boolean;

  @ManyToOne(() => User, (user: User) => user.dolls, { nullable: false })
  user: User;

  @ManyToOne(() => DollWishlist, (wishlist: DollWishlist) => wishlist.dolls)
  wishlist: DollWishlist;

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

  @Column({ nullable: true, default: null })
  deleteTimestamp: Date;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
