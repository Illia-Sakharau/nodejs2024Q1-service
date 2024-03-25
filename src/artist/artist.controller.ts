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
import IncorrectIdError from './errors/incorrect-artist-id.error';
import ArtistNotFoundError from './errors/artist-not-found.error';
import prepareArtistForResponse from './utils/prepare-artist-for-response.util';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const newArtist = await this.artistService.create(createArtistDto);
    return prepareArtistForResponse(newArtist);
  }

  @Get()
  async findAll() {
    const artists = await this.artistService.findAll();
    return artists.map((artist) => prepareArtistForResponse(artist));
  }

  @Get(':id')
  async findOne(@Param('id') id: ArtistId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new ArtistNotFoundError();
    return prepareArtistForResponse(artist);
  }

  @Put(':id')
  async update(
    @Param('id') id: ArtistId,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const artist = await this.artistService.update(id, updateArtistDto);
    if (!artist) throw new ArtistNotFoundError();
    return prepareArtistForResponse(artist);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: ArtistId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = await this.artistService.remove(id);
    if (!isDeleted) throw new ArtistNotFoundError();
    return;
  }
}
