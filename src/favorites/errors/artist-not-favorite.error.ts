import { HttpException, HttpStatus } from '@nestjs/common';

class ArtistNotFavoriteError extends HttpException {
  constructor() {
    super('Artist is not favorite', HttpStatus.NOT_FOUND);
  }
}

export default ArtistNotFavoriteError;
