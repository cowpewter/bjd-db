import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DollConfiguration } from './DollConfiguration';

@Entity()
export class FaceupArtist {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  name: string;

  @Column({ length: 2, nullable: true })
  country: string; // ISO Country code

  @Column({ nullable: true })
  website: string;

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.faceupArtist)
  faceups: DollConfiguration[];

  @OneToMany(() => DollConfiguration, (config: DollConfiguration) => config.bodyArtist)
  bodyBlushes: DollConfiguration[];

  @CreateDateColumn()
  createTimestamp: Date;

  @UpdateDateColumn()
  updateTimestamp: Date;
}
