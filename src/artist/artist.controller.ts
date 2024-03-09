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
import uuidValidateV4 from './utils/uuidValidateV4';
import { AlbumService } from '../album/album.service';
import IncorrectIdError from './errors/incorrect-id.error copy';
import ArtistNotFoundError from './errors/artist-not-found.error';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ArtistId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const artist = this.artistService.findOne(id);
    if (!artist) throw new ArtistNotFoundError();
    return artist;
  }

  @Put(':id')
  update(@Param('id') id: ArtistId, @Body() updateArtistDto: UpdateArtistDto) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const artist = this.artistService.update(id, updateArtistDto);
    if (!artist) throw new ArtistNotFoundError();
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: ArtistId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = this.artistService.remove(id);
    if (!isDeleted) throw new ArtistNotFoundError();
    this.albumService.cleanArtistId(id);
    return;
  }
}
