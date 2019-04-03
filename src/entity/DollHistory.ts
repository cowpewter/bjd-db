import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Doll } from './Doll';

@Entity()
export class DollHistory {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: true })
  purchaseDate: Date;

  @Column({ nullable: true })
  arrivalDate: Date;

  @Column({ nullable: true })
  purchasedFrom: string;

  @Column({ nullable: true })
  paid: number; // in cents

  @Column({ nullable: true })
  traded: string;

  @Column({ nullable: true })
  tradeValue: number; // in cents

  @OneToOne(() => Doll, (doll: Doll) => doll.history)
  doll: Doll;

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
