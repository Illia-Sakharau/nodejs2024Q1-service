import { HttpException, HttpStatus } from '@nestjs/common';

class ArtistNotFoundError extends HttpException {
  constructor() {
    super('Artist not found', HttpStatus.NOT_FOUND);
  }
}

export default ArtistNotFoundError;
