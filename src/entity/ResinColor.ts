import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { User } from './User';
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

  @ManyToOne(() => User, (user: User) => user.addedResinColors)
  addedBy: User;

  @Column({ default: false })
  vetted: Boolean;

  @OneToMany(() => UserPart, (part: UserPart) => part.resinColor)
  parts: UserPart[];

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
