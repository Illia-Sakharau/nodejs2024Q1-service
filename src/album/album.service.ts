import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, AlbumId } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Record<AlbumId, Album> = {};
  private favorites: Record<AlbumId, Album> = {};

  create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const newAlbum = {
      id,
      ...createAlbumDto,
    };
    this.albums[id] = newAlbum;
    return newAlbum;
  }

  findAll() {
    return Object.values(this.albums);
  }

  findOne(id: AlbumId) {
    return this.albums[id];
  }

  update(id: AlbumId, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums[id];
    if (!album) return undefined;
    this.albums[id] = Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: AlbumId) {
    const album = this.albums[id];
    if (!album) return undefined;
    delete this.albums[id];
    delete this.favorites[id];
    return true;
  }

  cleanArtistId(artistId: string) {
    Object.values(this.albums).map((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  getFavorites() {
    return Object.values(this.favorites);
  }

  addToFavorites(id: AlbumId) {
    const album = this.findOne(id);
    if (!album) return undefined;
    this.favorites[id] = album;
    return true;
  }

  removeFromFavorites(id: AlbumId) {
    const removingAlbum = this.favorites[id];
    if (!removingAlbum) return undefined;
    delete this.favorites[id];
    return true;
  }
}
