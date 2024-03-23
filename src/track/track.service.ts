import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackId, Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import prepareTrackForResponse from './utils/prepare-track-for-response.util';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId, ...otherInfo } = createTrackDto;
    return await this.trackRepository.save({
      ...otherInfo,
      artist: { id: artistId },
      album: { id: albumId },
    });
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: TrackId) {
    return await this.trackRepository.findOne({
      where: { id },
    });
  }

  async update(id: TrackId, updateTrackDto: UpdateTrackDto) {
    const { name, duration, artistId, albumId } = updateTrackDto;
    const track = await this.findOne(id);
    if (!track) return undefined;

    if (typeof name === 'string') {
      track.name = name;
    }
    if (typeof duration === 'number') {
      track.duration = duration;
    }
    if (typeof artistId === 'string') {
      track.artist.id = artistId;
    } else if (Object.is(null, artistId)) {
      track.artist = null;
    }
    if (typeof albumId === 'string') {
      track.album.id = albumId;
    } else if (Object.is(null, albumId)) {
      track.album = null;
    }

    return await this.trackRepository.save(track);
  }

  async remove(id: TrackId) {
    const track = await this.findOne(id);
    if (!track) return undefined;
    await this.trackRepository.remove(track);
    return true;
  }

  async getFavorites() {
    const favorites = await this.trackRepository.find({
      where: {
        isFavorite: true,
      },
      relations: ['artist', 'album'],
    });
    return favorites.map((track) => prepareTrackForResponse(track));
  }

  async addToFavorites(id: TrackId) {
    const track = await this.findOne(id);
    if (!track) return undefined;
    await this.trackRepository.update(id, {
      isFavorite: true,
    });
    return true;
  }

  async removeFromFavorites(id: TrackId) {
    const removingTrack = await this.trackRepository.findOne({
      where: {
        id,
        isFavorite: true,
      },
    });
    if (!removingTrack) return undefined;
    await this.trackRepository.update(id, {
      isFavorite: false,
    });
    return true;
  }
}
