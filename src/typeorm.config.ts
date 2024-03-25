import { config } from 'dotenv';
import { User } from './user/entities/user.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
config();

export const typeormConfig = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track],
  synchronize: false,
  migrations: [__dirname + '../../migrations/**/*.ts'],
} satisfies DataSourceOptions;

export const appDataSource = new DataSource(typeormConfig);
