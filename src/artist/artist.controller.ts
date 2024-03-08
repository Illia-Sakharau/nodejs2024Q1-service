import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistId } from './entities/artist.entity';
import { Response } from 'express';
import uuidValidateV4 from './utils/uuidValidateV4';
import { AlbumService } from '../album/album.service';

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
  findOne(
    @Param('id') id: ArtistId,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!uuidValidateV4(id)) {
      res.status(400).send({
        message: ['Not valid artist ID'],
        error: 'Bad Request',
        statusCode: 400,
      });
      return;
    }
    const artist = this.artistService.findOne(id);
    if (!artist) {
      res.status(404).send({
        message: ['Artist not exist'],
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }
    return artist;
  }

  @Put(':id')
  update(
    @Param('id') id: ArtistId,
    @Res({ passthrough: true }) res: Response,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!uuidValidateV4(id)) {
      res.status(400).send({
        message: ['Not valid artist ID'],
        error: 'Bad Request',
        statusCode: 400,
      });
      return;
    }
    const artist = this.artistService.update(id, updateArtistDto);
    if (!artist) {
      res.status(404).send({
        message: ['Artist not exist'],
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }
    return artist;
  }

  @Delete(':id')
  remove(@Param('id') id: ArtistId, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidateV4(id)) {
      res.status(400).send({
        message: ['Not valid artist ID'],
        error: 'Bad Request',
        statusCode: 400,
      });
      return;
    }
    const isDeleted = this.artistService.remove(id);
    if (!isDeleted) {
      res.status(404).send({
        message: ['Artist not exist'],
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }
    this.albumService.cleanArtistId(id);
    res.status(204);
  }
}
