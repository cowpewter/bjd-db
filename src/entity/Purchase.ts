import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';
import { UserPart } from './UserPart';

@Entity()
export class Purchase {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column('timestamp', { nullable: true })
  purchaseDate: Date;

  @Column('timestamp', { nullable: true })
  arrivalDate: Date;

  @Column({ nullable: true })
  purchasePrice: number; // in cents

  @Column({ nullable: true })
  shippingPrice: number; // in cents

  @ManyToOne(() => User, (user: User) => user.purchases)
  user: User;

  @OneToMany(() => UserPart, (part: UserPart) => part.purchase)
  parts: UserPart[];

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
