import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import uuidTrackValidate from '../track/utils/uuid-track-validate.util';
import IncorrectTrackIdError from '../track/errors/incorrect-track-id.error copy';
import TrackNotExistError from './errors/track-not-exist.error';
import TrackNotFavoriteError from './errors/track-not-favorite.error';
import uuidAlbumValidate from '../album/utils/uuid-album-validate.util';
import IncorrectAlbumIdError from '../album/errors/incorrect-album-id.error';
import AlbumNotExistError from './errors/album-not-exist.error';
import AlbumNotFavoriteError from './errors/album-not-favorite.error';
import uuidArtistValidate from '../artist/utils/uuid-artist-validate.util';
import IncorrectArtistIdError from '../artist/errors/incorrect-artist-id.error';
import ArtistNotExistError from './errors/artist-not-exist.error';
import ArtistNotFavoriteError from './errors/artist-not-favorite.error';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    if (!uuidTrackValidate(id)) throw new IncorrectTrackIdError();
    const hasTrack = this.favoritesService.addTrack(id);
    if (!hasTrack) throw new TrackNotExistError();
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    if (!uuidTrackValidate(id)) throw new IncorrectTrackIdError();
    const isDeleted = this.favoritesService.deleteTrack(id);
    if (!isDeleted) throw new TrackNotFavoriteError();
    return;
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    if (!uuidAlbumValidate(id)) throw new IncorrectAlbumIdError();
    const hasAlbum = await this.favoritesService.addAlbum(id);
    if (!hasAlbum) throw new AlbumNotExistError();
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (!uuidAlbumValidate(id)) throw new IncorrectAlbumIdError();
    const isDeleted = this.favoritesService.deleteAlbum(id);
    if (!isDeleted) throw new AlbumNotFavoriteError();
    return;
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    if (!uuidArtistValidate(id)) throw new IncorrectArtistIdError();
    const hasArtist = await this.favoritesService.addArtist(id);
    if (!hasArtist) throw new ArtistNotExistError();
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!uuidArtistValidate(id)) throw new IncorrectArtistIdError();
    const isDeleted = this.favoritesService.deleteArtist(id);
    if (!isDeleted) throw new ArtistNotFavoriteError();
    return;
  }
}
