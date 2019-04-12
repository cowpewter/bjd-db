import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Album } from './Album';
import { Comment } from './Comment';
import { Doll } from './Doll';
import { DollWishlist } from './DollWishlist';
import { EmailAddress } from './EmailAddress';
import { Image } from './Image';
import { Jwt } from './Jwt';
import { SocialMediaLink } from './SocialMediaLink';
import { UserDescription } from './UserDescription';
import { UserPart } from './UserPart';

@Entity()
export class User {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index({ unique: true })
  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isMod: boolean;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  profileImage: Image;

  @OneToOne(() => EmailAddress, (emailAddress: EmailAddress) => emailAddress.user)
  @JoinColumn()
  emailAddress: EmailAddress;

  @OneToOne(() => UserDescription, (description: UserDescription) => description.user)
  @JoinColumn()
  description: UserDescription;

  @OneToMany(() => SocialMediaLink, (link: SocialMediaLink) => link.user)
  socialLinks: SocialMediaLink[];

  @OneToMany(() => Doll, (doll: Doll) => doll.user)
  dolls: Doll[];

  @OneToMany(() => Album, (album: Album) => album.user)
  albums: Album[];

  @OneToMany(() => DollWishlist, (wishlist: DollWishlist) => wishlist.user)
  wishlists: DollWishlist[];

  @OneToMany(() => UserPart, (part: UserPart) => part.user)
  parts: UserPart[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  userComments: Comment[];

  @OneToMany(() => Image, (image: Image) => image.user)
  images: Image;

  @OneToMany(() => Jwt, (jwt: Jwt) => jwt.user)
  jwts: Jwt[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
