import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from './Album';
import { Comment } from './Comment';
import { DollConfiguration } from './DollConfiguration';
import { DollDescription } from './DollDescription';
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

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.doll)
  configurations: DollConfiguration[];

  @OneToMany(() => Comment, (comment: Comment) => comment.doll)
  comments: Comment[];

  @ManyToMany(() => Album)
  albums: Album[];

  @Column('timestamp', { nullable: true })
  deleteTimestamp: Date;

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
