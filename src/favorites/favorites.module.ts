import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AlbumModule, ArtistModule, TrackModule],
})
export class FavoritesModule {}
