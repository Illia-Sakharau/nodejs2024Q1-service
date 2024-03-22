import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UserId = string;

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UserId; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number; // integer number, increments on update

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // timestamp of last update
}
