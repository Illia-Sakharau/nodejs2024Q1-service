import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ArtistId = string;

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: ArtistId; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Column({
    default: false,
  })
  isFavorite?: boolean;
}
