import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, ArtistId } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  private favorites: Record<ArtistId, Artist> = {};

  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.save(createArtistDto);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: ArtistId) {
    return this.artistRepository.findOne({
      where: { id },
    });
  }

  async update(id: ArtistId, updateArtistDto: UpdateArtistDto) {
    const { grammy, name } = updateArtistDto;
    const artist = await this.findOne(id);
    if (!artist) return undefined;
    if (typeof grammy === 'boolean') {
      artist.grammy = grammy;
    }
    if (typeof name === 'string') {
      artist.name = name;
    }
    return await this.artistRepository.save(artist);
  }

  async remove(id: ArtistId) {
    const artist = await this.findOne(id);
    if (!artist) return undefined;
    await this.artistRepository.remove(artist);

    delete this.favorites[id]; // remove after implement Favorites

    return true;
  }

  getFavorites() {
    return Object.values(this.favorites);
  }

  async addToFavorites(id: ArtistId) {
    const artist = await this.findOne(id);
    if (!artist) return undefined;
    this.favorites[id] = artist;
    return true;
  }

  removeFromFavorites(id: ArtistId) {
    const removingArtist = this.favorites[id];
    if (!removingArtist) return undefined;
    delete this.favorites[id];
    return true;
  }
}
