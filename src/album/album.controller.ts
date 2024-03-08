import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumId } from './entities/album.entity';
import uuidValidateV4 from './utils/uuidValidateV4';
import AlbumNotFoundError from './errors/album-not-found.error';
import IncorrectIdError from './errors/incorrect-id.error copy';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: AlbumId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const album = this.albumService.findOne(id);
    if (!album) throw new AlbumNotFoundError();
    return album;
  }

  @Put(':id')
  update(@Param('id') id: AlbumId, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const album = this.albumService.update(id, updateAlbumDto);
    if (!album) throw new AlbumNotFoundError();
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: AlbumId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = this.albumService.remove(id);
    if (!isDeleted) throw new AlbumNotFoundError();
    return;
  }
}
