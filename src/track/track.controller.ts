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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import uuidValidateV4 from './utils/uuidValidateV4';
import IncorrectIdError from './errors/incorrect-id.error copy';
import TrackNotFoundError from './errors/track-not-found.error';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const track = this.trackService.findOne(id);
    if (!track) throw new TrackNotFoundError();
    return track;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const track = this.trackService.update(id, updateTrackDto);
    if (!track) throw new TrackNotFoundError();
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = this.trackService.remove(id);
    if (!isDeleted) throw new TrackNotFoundError();
    return;
  }
}
