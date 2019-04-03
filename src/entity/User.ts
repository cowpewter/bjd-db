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

import { Comment } from './Comment';
import { Doll } from './Doll';
import { EmailAddress } from './EmailAddress';
import { Image } from './Image';

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

  @OneToMany(() => Doll, (doll: Doll) => doll.user)
  dolls: Doll[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  userComments: Comment[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}