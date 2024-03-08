import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, ArtistId } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Record<ArtistId, Artist> = {};

  create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();
    const newArtist = {
      id,
      ...createArtistDto,
    };
    this.artists[id] = newArtist;
    return newArtist;
  }

  findAll() {
    return Object.values(this.artists);
  }

  findOne(id: ArtistId) {
    return this.artists[id];
  }

  update(id: ArtistId, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists[id];
    if (!artist) return undefined;
    this.artists[id] = Object.assign(artist, updateArtistDto);
    return artist;
  }

  remove(id: ArtistId) {
    const artist = this.artists[id];
    if (!artist) return undefined;
    delete this.artists[id];
    return true;
  }
}
