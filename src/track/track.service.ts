import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackId, Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Record<TrackId, Track> = {};
  private favorites: Record<TrackId, Track> = {};

  create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const newTrack = {
      id,
      ...createTrackDto,
    };
    this.tracks[id] = newTrack;
    return newTrack;
  }

  findAll() {
    return Object.values(this.tracks);
  }

  findOne(id: TrackId) {
    return this.tracks[id];
  }

  update(id: TrackId, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks[id];
    if (!track) return undefined;
    this.tracks[id] = Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: TrackId) {
    const track = this.tracks[id];
    if (!track) return undefined;
    delete this.tracks[id];
    delete this.favorites[id];
    return true;
  }

  cleanArtistId(artistId: string) {
    Object.values(this.tracks).map((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  cleanAlbumId(albumId: string) {
    Object.values(this.tracks).map((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  getFavorites() {
    return Object.values(this.favorites);
  }

  addToFavorites(id: TrackId) {
    const track = this.findOne(id);
    if (!track) return undefined;
    this.favorites[id] = track;
    return true;
  }

  removeFromFavorites(id: TrackId) {
    const removingTrack = this.favorites[id];
    if (!removingTrack) return undefined;
    delete this.favorites[id];
    return true;
  }
}
