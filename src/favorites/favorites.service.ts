import { Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {}

  async getAll() {
    const artists = await this.artistService.getFavorites();
    const albums = await this.albumService.getFavorites();
    const tracks = await this.trackService.getFavorites();
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string) {
    return await this.trackService.addToFavorites(id);
  }

  async deleteTrack(id: string) {
    return await this.trackService.removeFromFavorites(id);
  }

  async addAlbum(id: string) {
    return await this.albumService.addToFavorites(id);
  }

  async deleteAlbum(id: string) {
    return await this.albumService.removeFromFavorites(id);
  }

  async addArtist(id: string) {
    return await this.artistService.addToFavorites(id);
  }

  async deleteArtist(id: string) {
    return await this.artistService.removeFromFavorites(id);
  }
}
