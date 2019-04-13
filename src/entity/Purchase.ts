import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './User';
import { UserPart } from './UserPart';

@Entity()
export class Purchase {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  purchaseDate: Date;

  @Column({ nullable: true, default: null })
  arrivalDate: Date;

  @Column({ nullable: true, default: null })
  purchasePrice: number; // in cents

  @Column({ nullable: true, default: null })
  shippingPrice: number; // in cents

  @ManyToOne(() => User, (user: User) => user.purchases)
  user: User;

  @OneToMany(() => UserPart, (part: UserPart) => part.purchase)
  parts: UserPart[];

  @Column({ nullable: true, default: null })
  deleteTimestamp: Date;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
