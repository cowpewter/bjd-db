import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from './Album';
import { Comment } from './Comment';
import { Company } from './Company';
import { CreateBan } from './CreateBan';
import { Doll } from './Doll';
import { DollPart } from './DollPart';
import { DollWishlist } from './DollWishlist';
import { EditBan } from './EditBan';
import { EmailAddress } from './EmailAddress';
import { FaceupArtist } from './FaceupArtist';
import { Image } from './Image';
import { Jwt } from './Jwt';
import { Like } from './Like';
import { Notification } from './Notification';
import { Purchase } from './Purchase';
import { ResinColor } from './ResinColor';
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

  @OneToMany(() => Purchase, (purchase: Purchase) => purchase.user)
  purchases: Purchase[];

  @OneToMany(() => Comment, (comment: Comment) => comment.author)
  userComments: Comment[];

  @OneToMany(() => Like, (like: Like) => like.author)
  userLikes: Like[];

  @OneToMany(() => Image, (image: Image) => image.user)
  images: Image;

  @OneToMany(() => Notification, (notif: Notification) => notif.user)
  notifications: Notification[];

  @OneToMany(() => Jwt, (jwt: Jwt) => jwt.user)
  jwts: Jwt[];

  @OneToOne(() => EditBan, (ban: EditBan) => ban.user)
  editBan: EditBan;

  @OneToOne(() => CreateBan, (ban: CreateBan) => ban.user)
  createBan: CreateBan;

  @OneToMany(() => Company, (company: Company) => company.addedBy)
  addedCompanies: Company[];

  @OneToMany(() => DollPart, (part: DollPart) => part.addedBy)
  addedDollParts: DollPart[];

  @OneToMany(() => FaceupArtist, (artist: FaceupArtist) => artist.addedBy)
  addedFaceupArtists: FaceupArtist[];

  @OneToMany(() => ResinColor, (color: ResinColor) => color.addedBy)
  addedResinColors: ResinColor[];

  @OneToMany(() => SocialMediaLink, (link: SocialMediaLink) => link.addedBy)
  addedSocialMediaLinks: SocialMediaLink[];

  @OneToMany(() => SocialMediaLink, (link: SocialMediaLink) => link.deletedBy)
  deletedSocialMediaLinks: SocialMediaLink;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTimestamp: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateTimestamp: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
