import { HttpException, HttpStatus } from '@nestjs/common';

class AlbumNotFoundError extends HttpException {
  constructor() {
    super('Album not found', HttpStatus.NOT_FOUND);
  }
}

export default AlbumNotFoundError;
