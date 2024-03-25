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
import uuidValidateV4 from './utils/uuid-track-validate.util';
import IncorrectIdError from './errors/incorrect-track-id.error copy';
import TrackNotFoundError from './errors/track-not-found.error';
import prepareTrackForResponse from './utils/prepare-track-for-response.util';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const newTrack = await this.trackService.create(createTrackDto);
    return prepareTrackForResponse(newTrack);
  }

  @Get()
  async findAll() {
    const allTracks = await this.trackService.findAll();
    return allTracks.map((track) => prepareTrackForResponse(track));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const track = await this.trackService.findOne(id);
    if (!track) throw new TrackNotFoundError();
    return prepareTrackForResponse(track);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const track = await this.trackService.update(id, updateTrackDto);
    if (!track) throw new TrackNotFoundError();
    return prepareTrackForResponse(track);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = await this.trackService.remove(id);
    if (!isDeleted) throw new TrackNotFoundError();
    return;
  }
}
