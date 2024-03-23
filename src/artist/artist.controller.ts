import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistId } from './entities/artist.entity';
import uuidValidateV4 from './utils/uuid-artist-validate.util';
import { AlbumService } from '../album/album.service';
import IncorrectIdError from './errors/incorrect-artist-id.error';
import ArtistNotFoundError from './errors/artist-not-found.error';
import { TrackService } from '../track/track.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ArtistId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new ArtistNotFoundError();
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id') id: ArtistId,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const artist = await this.artistService.update(id, updateArtistDto);
    if (!artist) throw new ArtistNotFoundError();
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: ArtistId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = await this.artistService.remove(id);
    if (!isDeleted) throw new ArtistNotFoundError();
    this.albumService.cleanArtistId(id);
    this.trackService.cleanArtistId(id);
    return;
  }
}
