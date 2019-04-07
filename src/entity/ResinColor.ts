import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './Company';
import { UserPart } from './UserPart';

export type ResinColorType = 'white' | 'light' | 'tan' | 'dark' | 'black' |
  'grey' | 'red' | 'pink' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';

export type ResinType = 'opaque' | 'semi-translucent' | 'translucent';

@Entity()
export class ResinColor {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  colorType: ResinColorType;

  @Column({ type: 'varchar' })
  type: ResinType;

  @ManyToOne(() => Company, (company: Company) => company.resinColors)
  company: Company;

  @OneToMany(() => UserPart, (part: UserPart) => part.resinColor)
  parts: UserPart[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
