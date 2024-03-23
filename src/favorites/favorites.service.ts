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
    return {
      artists: this.artistService.getFavorites(),
      albums: this.albumService.getFavorites(),
      tracks: this.trackService.getFavorites(),
    };
  }

  addTrack(id: string) {
    return this.trackService.addToFavorites(id);
  }

  deleteTrack(id: string) {
    return this.trackService.removeFromFavorites(id);
  }

  async addAlbum(id: string) {
    return await this.albumService.addToFavorites(id);
  }

  deleteAlbum(id: string) {
    return this.albumService.removeFromFavorites(id);
  }

  async addArtist(id: string) {
    return await this.artistService.addToFavorites(id);
  }

  deleteArtist(id: string) {
    return this.artistService.removeFromFavorites(id);
  }
}
