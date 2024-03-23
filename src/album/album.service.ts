import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, AlbumId } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import prepareAlbumForResponse from './utils/prepare-album-for-response.util';

@Injectable()
export class AlbumService {
  private favorites: Record<
    AlbumId,
    Omit<Album, 'artist'> & { artistId: string | null }
  > = {};

  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId, ...otherInfo } = createAlbumDto;
    return await this.albumRepository.save({
      ...otherInfo,
      artist: {
        id: artistId,
      },
    });
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: AlbumId) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
    return album;
  }

  async update(id: AlbumId, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    const album = await this.findOne(id);
    if (!album) return undefined;

    if (typeof name === 'string') {
      album.name = name;
    }
    if (typeof year === 'number') {
      album.year = year;
    }
    if (typeof artistId === 'string') {
      album.artist = {
        id: artistId,
        name: '',
        grammy: false,
      };
    } else if (Object.is(null, artistId)) {
      album.artist = null;
    }
    return await this.albumRepository.save(album);
  }

  async remove(id: AlbumId) {
    const album = await this.findOne(id);
    if (!album) return undefined;
    await this.albumRepository.remove(album);

    delete this.favorites[id]; // remove after implement Favorites

    return true;
  }

  getFavorites() {
    return Object.values(this.favorites);
  }

  async addToFavorites(id: AlbumId) {
    const album = await this.findOne(id);
    if (!album) return undefined;
    this.favorites[id] = prepareAlbumForResponse(album);
    return true;
  }

  removeFromFavorites(id: AlbumId) {
    const removingAlbum = this.favorites[id];
    if (!removingAlbum) return undefined;
    delete this.favorites[id];
    return true;
  }
}
