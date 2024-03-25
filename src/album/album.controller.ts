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
import uuidValidateV4 from './utils/uuid-album-validate.util';
import AlbumNotFoundError from './errors/album-not-found.error';
import IncorrectIdError from './errors/incorrect-album-id.error';
import prepareAlbumForResponse from './utils/prepare-album-for-response.util';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.albumService.create(createAlbumDto);
    return prepareAlbumForResponse(newAlbum);
  }

  @Get()
  async findAll() {
    const albums = await this.albumService.findAll();
    return albums.map((album) => prepareAlbumForResponse(album));
  }

  @Get(':id')
  async findOne(@Param('id') id: AlbumId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const album = await this.albumService.findOne(id);
    if (!album) throw new AlbumNotFoundError();
    return prepareAlbumForResponse(album);
  }

  @Put(':id')
  async update(
    @Param('id') id: AlbumId,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const album = await this.albumService.update(id, updateAlbumDto);
    if (!album) throw new AlbumNotFoundError();
    return prepareAlbumForResponse(album);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: AlbumId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = await this.albumService.remove(id);
    if (!isDeleted) throw new AlbumNotFoundError();
    return;
  }
}
