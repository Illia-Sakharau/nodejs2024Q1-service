import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, ArtistId } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import prepareArtistForResponse from './utils/prepare-artist-for-response.util';

@Injectable()
export class ArtistService {
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
    return true;
  }

  async getFavorites() {
    const favorites = await this.artistRepository.find({
      where: {
        isFavorite: true,
      },
    });
    return favorites.map((artist) => prepareArtistForResponse(artist));
  }

  async addToFavorites(id: ArtistId) {
    const artist = await this.findOne(id);
    if (!artist) return undefined;
    await this.artistRepository.update(id, {
      isFavorite: true,
    });
    return true;
  }

  async removeFromFavorites(id: ArtistId) {
    const removingArtist = await this.artistRepository.findOne({
      where: {
        id,
        isFavorite: true,
      },
    });
    if (!removingArtist) return undefined;
    await this.artistRepository.update(id, {
      isFavorite: false,
    });
    return true;
  }
}
